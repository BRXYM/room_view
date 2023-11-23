
<template>
  <h2>所有教室信息</h2>

  <el-table :data="toRaw(classroomStore.classList)" border:true style="width: 100%">
    <el-table-column prop="classroom_id" label="ID" width="200" />
    <el-table-column prop="classroom_num" label="教室容纳人数" width="150" />
    <el-table-column prop="classroom_build" label="教室楼号" width="150" />
    <el-table-column prop="classroom_room" label="教室房间" width="180" />
    <el-table-column prop="classroom_remark" label="简介" width="180"/>
    <el-table-column prop="" label="" />
    <el-table-column fixed="right" label="预约教室" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="getid(scope.$index)">预约</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script lang="ts" setup>
import { toRaw } from "vue";
import {storeToRefs} from "pinia";
import {useClassroomStore} from "../store/Classroom";
import {useViewStore} from "../store/ViewControl";
import {useBookStore} from "../store/Book";
const viewStore = useViewStore()
const { view,book_classroom_id } = storeToRefs(viewStore)
const bookStore = useBookStore()
const classroomStore = useClassroomStore();

function getid(id:number){
  book_classroom_id.value = classroomStore.classList[id].classroom_id
  view.value=4
}

</script>
