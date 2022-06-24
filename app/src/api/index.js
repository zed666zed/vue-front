import requests from './ajax'
import mockRequests from "@/api/mockAjax";
// export const reqGetCategoryList = () => requests.get('/product/getBaseCategoryList')
// export const reqGetCategoryList=()=>requests({
//     url:'/product/getBaseCategoryList',
//     method:'get'
// });
export function reqGetCategoryList() {
    return requests.get('/product/getBaseCategoryList')
}


// export const reqGetSearchInFo = (params) => requests({
//     url: '/list',
//     method: 'post',
//     data: params
// })//暴露函数名

export function reqGetSearchInFo(params) {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}//暴露函数  用法一样


export const reqGetBannerList = () => mockRequests({
    url: '/banner',
    method: 'get'
});
export const reqGetFloorList = () => mockRequests({
    url: '/floor',
    method: 'get'
});

export const reqGoodsInFo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get'
})

export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

export const reqCartList = () => requests({
    url: `/cart/cartList`,
    method: 'get'
})

export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

export const reqUserRegister = (data) => requests({
    url: `/user/passport/register`,
    data,
    method: 'post'
})

export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

export const reqUserLogin = (data) => requests({//获取token
    url: `/user/passport/login`,
    data,
    method: 'post'
})

export const reqUserInfo = () => requests({//需要带着用户的token向服务器要信息
    url: `/user/passport/auth/getUserInfo`,
    method: 'get'
})

export const reqLogout = () => requests({
    url: `/user/passport/logout`,
    method: 'get'
})

export const reqAddressInfo = () => requests({
    url: `/user/userAddress/auth/findUserAddressList`,
    method: 'get'
})

export const reqOrderInfo = () => requests({
    url: `/order/auth/trade`,
    method: 'get'
})

export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
})

export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})

export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

export const reqMyorderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})






