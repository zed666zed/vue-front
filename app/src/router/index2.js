import Vue from "vue";
import VueRouter from "vue-router"
import store from "@/store"
Vue.use(VueRouter)

const router= new VueRouter({
    routes:[
        {
            path:"/home",
            component:()=>{
                import('@/pages/Home')
            },
            meta:{
                show:true}
        },
        {
            path:"/register",
            component:()=>{
                import('@/pages/Register')
            },
            meta:{
                show:false}
        },
        {
            name:'search',
            path:"/search/:keyword?",
            component:()=>{
                import('@/pages/Search')
            },
            meta:{
                show:true}
        },
        {
            path:"/login",
            component:()=>{
                import('@/pages/Login')
            },
            meta:{
                show:false}
        },
        {   path:"*",
            redirect:"/home"
        },
        {
            path:"/center",
            redirect:"/center/myorder"
        }
        // 重定向
        ,
        {
            path:"/detail/:skuid",
            component:()=>{
                import('@/pages/Detail')
            },
            meta:{
                show:true}
        },
        {   path:"/addcartsuccess",
            name:'addcartsuccess',
            component:()=>{
                import('@/pages/AddCartSuccess')
            },
            meta:{
                show:true}

        },
        {   path:"/shopcart",
            name:'shopcart',
            component:()=>{
                import('@/pages/ShopCart')
            },
            meta:{
                show:true}

        },
        {
            path:"/trade",
            component:()=>{
                import('@/pages/Trade')
            },
            meta:{
                show:true},
            beforeEnter:(to,from,next)=>{
                if(from.path=='/shopcart')   {
                    next()
                } else{
                    next(false)//不会跳转 留在原处
                }
            }
        },
        {
            path:"/pay",
            component:()=>{
                import('@/pages/Pay')
            },
            meta:{
                show:true},
            beforeEnter:(to,from,next)=>{
                if(from.path=='/trade')   {
                    next()
                } else{
                    next(false)//不会跳转 留在原处
                }
            }
        },
        {
            path:"/paysuccess",
            component:()=>{
                import('@/pages/PaySuccess')
            },
            meta:{
                show:true}
        },
        {
            path:"/center",
            component:()=>{
                import('@/pages/Center')
            },
            meta:{
                show:true},
            children:[
                {
                    path:"myorder",
                    component:()=>{
                        import('@/pages/Center/MyOrder')
                    },
                },
                {
                    path:"grouporder",
                    component:()=>{
                        import('@/pages/Center/GroupOrder')
                    },
                }

            ]
        },
    ],
    scrollBehavior(to,from,savedPosition){
        return{ y:0 }
    },
})

router.beforeEach(async (to,from,next)=>{
    let token=store.state.user.token
    let name=store.state.user.userInfo.name
    if(token){
        if(to.path=='/login'){
            next('./home')
        }else {
            if (name) {
                next()
            }else{
                try {
                    // token令牌失效 相当于点了退出登录
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    store.dispatch('userLogout')
                    next('login')
                }
            }
        }
    }else{
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // toPath=='trade'
            next('./login?redirect='+toPath)//query参数 login后面
        }else{
            next()
        }
    }

})

export default router
