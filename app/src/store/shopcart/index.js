import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from "@/api";
const actions={
    async getCartList(context,value){
        let result=await reqCartList()
        if(result.code==200)
            context.commit('GETCARTLIST',result.data)
    },
    async deleteCartListBySkuId(context,value){
        let result=await reqDeleteCartById(value)
        if(result.code==200){
            return 'ok'}
        else {
            return Promise.reject(new Error('faile'))//不是200的错误 非接口错误

        }

    },
    async updateCheckById(context,{skuId,isChecked}){
        let result=await reqUpdateCheckedById(skuId,isChecked) //await才能让promise显型
        if(result.code==200){
            return 'ok'}
        else {
            return Promise.reject(new Error('faile'))}

    },
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll=[]
        getters.cartList.cartInfoList.forEach(item=>{
            let promise= item.isChecked==1? dispatch('deleteCartListBySkuId',item.skuId):''//这里不需要await是因为需要promise 而不是成功与失败
            PromiseAll.push(promise)
        })
       return Promise.all(PromiseAll) //全部请求成功才为true

    },
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseAll=[]
        getters.cartList.cartInfoList.forEach(item=>{
            let promise=  dispatch('updateCheckById',
            {skuId:item.skuId,
             isChecked:isChecked})

            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)

    },


}
const mutations={
    GETCARTLIST(state,value){
        state.cartList=value
    },


}
const state={
    cartList:[]
}
const getters={
   cartList(state){
       return state.cartList[0]||{}
   }
}
export default {
    actions,
    mutations,
    state,
    getters
}
