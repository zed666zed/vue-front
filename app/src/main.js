import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// import router from '@/router/index2'

import store from '@/store'
Vue.config.productionTip = false
// 注册全局组件
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav);
import Carousel from '@/components/Carousel'
Vue.component('Carousel',Carousel);
import Pagination from '@/components/Pagination'
Vue.component('Pagination',Pagination);
import * as API from '@/api'
// import {reqCategoryList} from "@/api";
// reqCategoryList()测试
import {MessageBox} from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import VueLazyLoad from 'vue-lazyload'
import Apirl from '@/assets/images/1.png' //图片 不用暴露(json)
Vue.use(VueLazyLoad,{  //v-lazy
  loading:Apirl
})

new Vue({
  beforeCreate() {
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },//全局事件总线
  // 注册路由,书写时组件都拥有$router和$route属性
  router,
  // 拥有$store属性
  store,
  render: h => h(App),
}).$mount('#app')
