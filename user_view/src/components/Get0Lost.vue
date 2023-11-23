<template>
    <h2>寻找失主</h2>
    
  
   <el-table :data="toRaw(lostStore.lostList)" style="width: 100%">
     <el-table-column prop="lost_id" label="失物ID" width="130" />
     <el-table-column prop="lost_user_id" label="创建者ID" width="130" />
     <el-table-column prop="lost_infor" label="物品名称" width="130" />
     <el-table-column prop="lost_remark" label="物品描述" width="200" />
     <el-table-column prop="" label="" />
   </el-table>
  
  </template>
  
  <script lang="ts" setup>
  import { toRaw } from "vue";
  import {useLostStore} from "../store/Lost";
  const lostStore = useLostStore()
  


  </script>
  