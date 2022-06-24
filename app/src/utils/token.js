
export const setToken=function (token){//获得store的数据设置token
    localStorage.setItem('TOKEN',token)
}

export const getToken=function (){//获得token给store
    return localStorage.getItem('TOKEN')
}

export const removeToken=()=>{
    localStorage.removeItem('TOKEN')
}
