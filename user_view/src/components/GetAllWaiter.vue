<template>
    <h2>联系服务人员</h2>
    
  
   <el-table :data="toRaw(waiterStore.waiterList)" style="width: 100%">
     <el-table-column prop="waiter_id" label="服务员ID" width="130" />
     <el-table-column prop="waiter_name" label="服务员姓名" width="130" />
     <el-table-column prop="waiter_phone" label="服务员电话" width="130" />
     <el-table-column prop="waiter_email" label="服务员邮箱" width="130" />
     <el-table-column prop="" label="" />
   </el-table>
  
  </template>
  
  <script lang="ts" setup>
  import { toRaw } from "vue";
  import {useWaiterStore} from "../store/Waiter";
  const waiterStore = useWaiterStore()
  


  </script>
  