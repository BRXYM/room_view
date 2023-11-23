import {defineStore} from "pinia";

interface State{
    workList:workInfo[]
}

export const useWorkingStore = defineStore('work',{
    state:()=>{
        return{
            workList:[]
        }
    },
    getters:{

    },
    actions:{

    }
})

interface workInfo{
    work_id:number
    work_classroom_id:number
    work_waiter_id:number
    work_start_time:string
    work_end_time:string
    work_classroom_remark:string
}