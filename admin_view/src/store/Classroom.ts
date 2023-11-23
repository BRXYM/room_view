import {defineStore} from "pinia";

interface State{
    classList:classInfo[]
}

export const useClassroomStore = defineStore('classroom',{
    state:()=>{
        return{
            classList:[]
        }
    },
    getters:{

    },
    actions:{

    }
})

interface classInfo{
    classroom_id:number
    classroom_num:number
    classroom_build:string
    classroom_room:string
    classroom_remark:string
}