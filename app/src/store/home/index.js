import {reqGetCategoryList,reqGetBannerList,reqGetFloorList} from "@/api";
const actions={
    async getCategoryList(context,value){
        let result=await reqGetCategoryList()
        if(result.code==200)
        context.commit('GETCATEGORYLIST',result.data)

    },

    async getBannerList(context,value){
        let result=await reqGetBannerList()
        if(result.code==200)
            context.commit('GETBANNERLIST',result.data)
    },
    async getFloorList(context,value){
        let result=await reqGetFloorList()
        if(result.code==200)
            context.commit('GETFLOORLIST',result.data)
    }

}
const mutations={
    GETCATEGORYLIST(state,value){
         value.length--//数据多了
        state.categoryList=value
    },
    GETBANNERLIST(state,value){
        state.bannerList=value
    },
    GETFLOORLIST(state,value){
        state.floorList=value
    }
}
const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const getters={

}
export default {
    // namespaced:true,开启命名空间
    actions,
    mutations,
    state,
    getters
}
