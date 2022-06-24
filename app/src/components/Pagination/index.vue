<template>
  <div class="pagination">
    <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo == 1">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{ active: pageNo == 1 }">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }">
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPages - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPages" @click="$emit('getPageNo', totalPages)"
      :class="{ active: pageNo == totalPages }">{{ totalPages }}</button>
    <button @click="$emit('getPageNo', pageNo + 1)" :disabled="pageNo == totalPages">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",

  props: {

    pageNo: { // 当前页码
      type: Number,
      default: 1
    },
    pageSize: { // 每页数量
      type: Number,
      default: 5
    },
    total: { // 总数量
      type: Number,
      default: 0
    },
    continues: { // 连续页码数
      type: Number,
      default: 5
    }
  },
  computed: {

    /*
    总页码数
    依赖数据:
      总数量: total
      每页数量: pageSize
    */
    totalPages() {
      // 取出依赖数据   31 5 ==> 7
      const { total, pageSize } = this
      // 返回计算后的结果
      return Math.ceil(total / pageSize)
    },

    /*
    返回连续页码的开始页码(start)与结束页码(end):
    比如: {start: 3, end: 7}
    依赖数据:
        当前页码: pageNo
        最大连续页码数: continues
        总页码数: totalPages
    注意:
        start的最小值为1
        end的最大值为totalPages
        start与end之间的最大差值为continues-1
    */
    startNumAndEndNum() {
      //1.固定start 解决start问题 根据start计算end 解决end问题 修正start 解决start问题（现在）
      //2.解决总页数无连续页数多正常则计算start和end 解决start小于0 解决end大于总页数（好理解）
      const { pageNo, continues, totalPages } = this

      // 计算start
      /*
      pageNo continues totalPages     start到end
        4        5          10           23[4]56
      */
      let start = pageNo - Math.floor(continues / 2)  // 4 - 2（正常）
      /*
      pageNo continues totalPages  start到end
        2        5          10         1[2]345
      但start上面计算得到是: 0
      */
      // start的最小值是1, 如果小于1, 修正为1（前面超）
      if (start < 1) {
        start = 1
      }

      // 计算end
      /*
      pageNo continues totalPages     start到end
        4        5          10           23[4]56
      */
      // start与end之间的最大差值为continues-1
      let end = start + continues - 1    // 2 + 5 -1 （正常）


      /*
      pageNo continues totalPages     start到end
        4        5          5           123[4]5
      但上面计算的end为6, 应该为5    ==> end = totalPages
                 start为2, 应该为1  ==> start = end - continues + 1
      */
      // 如果end超过了totalPages, 修正为totalPages（后面超）
      if (end > totalPages) {

        // 根据最大连续页码修正start
        start = totalPages - continues + 1

        end = totalPages

        /*
         pageNo continues totalPages     start到end
            4        5          4           123[4]
          上面计算
              start为0  应该为1
              end为4   没问题
        */
        // start不能小于最小值1

        //不正常现象 总页数不足连续页数
        // if(continues>totalPages){
        //   start=1
        //   end=totalPages
        // }

        if (start < 1) {
          start = 1
        }
      }
      return { start, end }
    }
  },

}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
