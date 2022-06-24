<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in List" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
      <!--            <div class="swiper-slide">-->
      <!--              <img src="./images/banner2.jpg" />-->
      <!--            </div>-->
      <!--            <div class="swiper-slide">-->
      <!--              <img src="./images/banner3.jpg" />-->
      <!--            </div>-->
      <!--            <div class="swiper-slide">-->
      <!--              <img src="./images/banner4.jpg" />-->
      <!--            </div>-->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
 import Swiper from 'swiper'
 export default {
   name:'Carousel',
   props:['List'],
   watch:{
     List:{
       immediate:true,
       handler(newValue,oldValue){
         this.$nextTick(()=>{
           var mySwiper = new Swiper ('.swiper-container', {
             // direction: 'vertical', // 垂直切换选项
             loop: true, // 循环模式选项

             // 如果需要分页器
             pagination: {
               el: '.swiper-pagination',
               clickable:true
             },

             // 如果需要前进后退按钮
             navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
             },

             // 如果需要滚动条
             scrollbar: {
               el: '.swiper-scrollbar',
             },
           })
         })
       }
     }
   }
 }

</script>

<style>

</style>
