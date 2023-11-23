<template>
  <h2>新增教室</h2>
  <el-form :model="classroom" label-width="120px">
    <el-form-item label="教室容纳人数">
      <el-input v-model="classroom.classroom_num" type="number" maxlength="50" />
    </el-form-item>
    <el-form-item label="教室楼号">
      <el-input v-model="classroom.classroom_build" type="text" maxlength="50" />
    </el-form-item>
    <el-form-item label="教室房间">
      <el-input v-model="classroom.classroom_room" type="number" maxlength="50" />
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="classroom.classroom_remark" type="textarea" maxlength="50" show-word-limit="true" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addclassroom">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { reactive } from 'vue'
import { useUserStore } from "../../store/User";
import { ElNotification } from 'element-plus'
import { useViewStore } from "../../store/ViewControl";
import { storeToRefs } from 'pinia'
const viewStore = useViewStore()
const { view } = storeToRefs(viewStore)

const classroom = reactive({
  classroom_num: '',
  classroom_build: '',
  classroom_room: '',
  classroom_remark: ''
})

function addclassroom() {
  axios.post("http://localhost:3000/classrooms/add", {
    classroom_id: 0,
    classroom_num: classroom.classroom_num,
    classroom_build: classroom.classroom_build,
    classroom_room: classroom.classroom_room,
    classroom_remark: classroom.classroom_remark
  }).then(
    response => {
      if (response.data.code === "001") {
        ElNotification({
          title: "新增成功",
          message: response.data.message,
          type: 'success',
        })
        view.value = 2
      } else {
        ElNotification({
          title: "新增失败",
          message: response.data.message,
          type: 'error',
        })
      }
    })

}
</script>
