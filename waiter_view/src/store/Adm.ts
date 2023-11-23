import {defineStore} from "pinia";

interface State{
    adminList:admInfo[]
}

export const useAdmStore = defineStore('adm',{
    state:()=>{
        return{
            admList:[]
        }
    },
    getters:{

    },
    actions:{

    }
})

interface admInfo{
    adm_id:number,
    adm_password:number,
    adm_name:string,
    adm_phone:number
}