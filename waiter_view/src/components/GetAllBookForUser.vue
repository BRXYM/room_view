<template>
    <h2>用户预约信息>用户ID {{ bookStore.bookList[0].book_user_id }}</h2>
    
   <el-table :data="toRaw(bookStore.bookList)" style="width: 100%">
     <el-table-column prop="book_id" label="预约ID" width="130" />
     <el-table-column prop="book_user_id" label="预约人ID" width="130" />
     <el-table-column prop="book_classroom_id" label="预约教室ID" width="130" />
     <el-table-column prop="book_waiter_id" label="审核ID" width="130" />
     <el-table-column prop="audit" label="是否通过审核" width="130" />
     <el-table-column prop="book_start_time" label="预约开始时间" width="180" />
     <el-table-column prop="book_end_time" label="预约结束时间" width="180" />
     <el-table-column prop="" label="" />
   </el-table>
  
  </template>
  
  <script lang="ts" setup>
  import { toRaw } from "vue";
  import {useBookStore} from "../store/Book";
  const bookStore = useBookStore()
  


  </script>
  