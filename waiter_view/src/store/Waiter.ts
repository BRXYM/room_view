import {defineStore} from "pinia";

interface State{
    waiterList:waiterInfo[]
}

export const useWaiterStore = defineStore('waiter',{
    state:()=>{
        return{
            statusCode:'',
            code:'',
            waiterList:[],
            message:''
        }
    },
    getters:{

    },
    actions:{

    }
})

interface waiterInfo{
    waiter_id:number,
    password:number,
    waiter_phone:number,
    waiter_emain:string,
    waiter_name:string
}