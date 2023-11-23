<template>
  <h2>用户使用记录>用户ID {{ workingStore.workList[0].work_user_id }}</h2>
  

 <el-table :data="toRaw(workingStore.workList)" style="width: 100%">
 
   <el-table-column prop="work_id" label="ID" width="150" />
   <el-table-column prop="work_user_id" label="使用者ID" width="150" />
   <el-table-column prop="work_classroom_id" label="房间号" width="150" />
   <el-table-column prop="work_waiter_id" label="审核管理员" width="150" />
   <el-table-column prop="work_start_time" label="开始时间" width="180" />
   <el-table-column prop="work_end_time" label="结束时间" width="180" />
   <el-table-column prop="work_classroom_remark" label="留言" width="180"/>
   <el-table-column prop="" label="" />
 </el-table>

</template>

<script lang="ts" setup>
import { toRaw } from "vue";
import {useWorkingStore} from "../store/Working";

const workingStore = useWorkingStore()



</script>
