import{ defineStore } from'pinia'

interface State{
    bookList:bookInfo[]
}

export const useBookStore = defineStore('book',{
    state:()=>{
        return{
            bookList:[]
        }
    },
    getters:{

    },
    actions:{
        
    }
})
interface bookInfo{
    book_id:number
    book_user_id:number
    book_classroom_id:number
    book_waiter_id:number
    audit:string
    book_start_time:string
    book_end_time:string
}