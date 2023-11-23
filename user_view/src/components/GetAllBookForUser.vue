<template>
    <h2>个人预约记录</h2>
    
  
   <el-table :data="toRaw(bookStore.bookList)" style="width: 100%" :row-class-name="tableRowClassName">
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


  interface book {
    audit:string
  }

  const tableRowClassName = ({
  row,
}: {
  row: book
}) => {
  if (row.audit === '未通过') {
    return 'warning-row'
  } else if (row.audit === '通过') {
    return 'success-row'
  }
  return ''
}

  </script>
  <style>
  .el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
  }
  .el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
  }
  </style>