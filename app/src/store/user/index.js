import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api";
import{setToken,getToken,removeToken} from "@/utils/token";

const actions={
    async getCode(context,phone){
        let result=await reqGetCode(phone)
        if(result.code==200){
            context.commit('GETCODE',result.data)
            return "ok"
        }
        else{
            return  Promise.reject(new Error('faile'))
        }
    },
    async userRegister(context,user){
        let result=await reqUserRegister(user)
        if(result.code==200){
            return "ok"
        }
        else{
            return  Promise.reject(new Error('faile'))
        }
    },
    async userLogin(context,data){
        let result=await reqUserLogin(data)
        if(result.code==200){
            context.commit('USERLOGIN',result.data.token)//这里都可以不用存token了
            setToken(result.data.token)//登录时持久化存储token
            return "ok"
        }
        else{
            return  Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo(context){
        let result=await reqUserInfo()
        if(result.code==200){
            context.commit('GETUSERINFO',result.data)
            return "ok"
        }else {
            return  Promise.reject(new Error('faile'))
        }
    },
    async userLogout(context){
        let result=await reqLogout()
        if(result.code==200){
            context.commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },



}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,data){
        state.token=data
    },
    GETUSERINFO(state,data){
        state.userInfo=data
    },
    CLEAR(state){

        state.token=''
        state.userInfo={}
        removeToken()

    }

}
const state={
    code:'',
    // token:'',
    token:getToken(),//登录了localstorage上就有token 获取token
    userInfo:{}
}
const getters={

}
export default {
    actions,
    mutations,
    state,
    getters
}
