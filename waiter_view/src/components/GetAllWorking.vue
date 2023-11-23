<template>
  <h2>所有使用记录</h2>
  

 <el-table :data="toRaw(workingStore.workList)" style="width: 100%">
 
   <el-table-column prop="work_id" label="ID" width="150" />
   <el-table-column prop="work_user_id" label="使用者ID" width="150" />
   <el-table-column prop="work_classroom_id" label="房间号" width="150" />
   <el-table-column prop="work_waiter_id" label="审核管理员" width="150" />
   <el-table-column prop="work_start_time" label="开始时间" width="180" />
   <el-table-column prop="work_end_time" label="结束时间" width="180" />
   <el-table-column prop="work_classroom_remark" label="留言" width="180"/>
   <el-table-column prop="" label="" />
   <el-table-column fixed="right" label="教室" width="80">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="getclassroomid(scope.$index)">其他记录</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="用户" width="80">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="getuserid(scope.$index)">其他记录</el-button>
      </template>
    </el-table-column>
  
 </el-table>

</template>

<script lang="ts" setup>
import { toRaw } from "vue";
import {storeToRefs} from "pinia";
import {useWorkingStore} from "../store/Working";
import {useViewStore} from "../store/ViewControl";


const workingStore = useWorkingStore()
const viewStore = useViewStore()
const { view } = storeToRefs(viewStore)

function getuserid(id:number){
  workingStore.workList[0].work_user_id = workingStore.workList[id].work_user_id
  view.value=4
}

function getclassroomid(id:number){
  workingStore.workList[0].work_classroom_id = workingStore.workList[id].work_classroom_id
  view.value=5
}





</script>
