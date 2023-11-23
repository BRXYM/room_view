import {defineStore} from "pinia";

interface State{
    lostList:lostInfo[]
}

export const useLostStore = defineStore('lost',{
    state:()=>{
        return{
            lostList:[]
        }
    },
    getters:{

    },
    actions:{
        
    }
})

interface lostInfo{
    lost_id:number,
    lost_user_id:number,
    lost_infor:string,
    lost_remark:string,
    lost_time:string,
    lost_type:number
}