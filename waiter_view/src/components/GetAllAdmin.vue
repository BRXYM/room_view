<template>
    <h2>联系管理人员</h2>
    
  
   <el-table :data="toRaw(admStore.admList)" style="width: 100%">
     <el-table-column prop="admin_id" label="管理员ID" width="130" />
     <el-table-column prop="admin_name" label="管理员姓名" width="130" />
     <el-table-column prop="admin_phone" label="管理员手机号" width="130" />
     <el-table-column prop="" label="" />
   </el-table>
  
  </template>
  
  <script lang="ts" setup>
  import { toRaw } from "vue";
  import {useAdmStore} from "../store/Adm";
  const admStore = useAdmStore()
  


  </script>
  