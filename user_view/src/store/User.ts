import {defineStore} from "pinia";
interface State{
    userlist:userInfo[]
}

export const useUserStore = defineStore('user',{
    state:()=>{
        return{
            statusCode:'',
            code:'',
            userlist:[],
            message:''
        }
    },
    getters:{

    },
    actions:{

    }
})

interface userInfo{
    user_id:number
    password:string
    user_phone:number
    user_email:string
    user_name:string
}