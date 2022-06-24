import {reqGetSearchInFo} from "@/api";
const actions={
    async getSearchList({commit},value){
        let result=await reqGetSearchInFo(value)
        if(result.code==200)
            commit('GETSEARCHLIST',result.data)
    }

}
const mutations={

    GETSEARCHLIST(state,value){
        state.searchList=value
    }
}
const state={
   searchList:[],
}
const getters={
    goodsList(state){
      return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },

}
export default {
    actions,
    mutations,
    state,
    getters
}
