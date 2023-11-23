import {defineStore} from "pinia";
interface State{
    userList:userInfo[]
}

export const useUserStore = defineStore('user',{
    state:()=>{
        return{
            userlist:[],
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