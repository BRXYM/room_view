import {defineStore} from "pinia";
export const useViewStore = defineStore('control',{
    state:()=>{
        return{
            view:0,
            userLogin:0,
            book_classroom_id:0
        }
    },
    getters:{

    },
    actions:{

    }
})