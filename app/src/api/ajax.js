import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'

const requests=axios.create({
    baseURL:"/api",
    timeout:5000
});

requests.interceptors.request.use((config)=>{

    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }//store中有uuid则给请求头加上 detail

    if(store.state.user.token)
        config.headers.token=store.state.user.token

    nprogress.start()
    return config
})

// 给出去的是promise对象
requests.interceptors.response.use((res)=>{
    nprogress.done()
    // {code: 200, message: '成功', data: Array(17), ok: true}
    return res.data
},(error)=>{
    return Promise.reject(new Error('faile1'));
    // throw new Error('faile1');   接口错误时
});

export  default requests;
