import { v4 as uuidv4} from 'uuid'
export const getUUID=function (){//暴露一个方法给state计算uuid
    let uuid_token=localStorage.getItem('UUIDTIKEN')
    if(!uuid_token)
    {
        uuid_token=uuidv4()//生成uuid
        localStorage.setItem('UUIDTIKEN',uuid_token)
    }
    return uuid_token
}
