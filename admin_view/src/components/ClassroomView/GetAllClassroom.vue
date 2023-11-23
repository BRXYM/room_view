
<template>
  <h2>所有教室信息</h2>

  <el-table :data="toRaw(classroomStore.classList)" border:true style="width: 100%">
    <el-table-column prop="classroom_id" label="ID" width="200" />
    <el-table-column prop="classroom_num" label="教室容纳人数" width="150" />
    <el-table-column prop="classroom_build" label="教室楼号" width="150" />
    <el-table-column prop="classroom_room" label="教室房间" width="180" />
    <el-table-column prop="classroom_remark" label="简介" width="180" />
    <el-table-column prop="" label="" />
    <el-table-column fixed="right" label="修改" width="120">
      <template #default="room">
        <el-button link type="primary" size="small" @click.prevent="updateview = true,getid(room.$index)">修改</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="删除" width="120">
      <template #default="room">
        <el-button link type="primary" size="small"
          @click.prevent="getid(room.$index), deleteview = true">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="deleteview" title="删除教室" width="30%" align-center>
    <span>确认删除，它的信息将被删除
      <br>
      教室ID：{{ updateclassroom.classroom_id }}
      <br>
      教室容纳人数：{{ updateclassroom.classroom_num }}<br>
      教室楼号：{{ updateclassroom.classroom_build }}<br>
      教室房间：{{ updateclassroom.classroom_room }}<br>
      简介：{{ updateclassroom.classroom_remark }}
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteview = false">取消删除</el-button>
        <el-button type="primary" @click="deleteview = false, deleteroom()">
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="updateview" title="修改教室" width="30%" align-center>
    <span>确认修改，它的信息将被修改
      <el-form :model="updateclassroom" label-width="120px">
        <el-form-item label="教室容纳人数">
          <el-input v-model="updateclassroom.classroom_num" type="number" />
        </el-form-item>
        <el-form-item label="教室楼号">
          <el-input v-model="updateclassroom.classroom_build" type="text"  />
        </el-form-item>
        <el-form-item label="教室房间">
          <el-input v-model="updateclassroom.classroom_room" type="number" />
        </el-form-item>
        <el-form-item label="教室简介">
          <el-input v-model="updateclassroom.classroom_remark"  type="textarea" maxlength="50" show-word-limit="true"/>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateview = false, updateroom()">
          确认修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toRaw } from "vue";
import { useClassroomStore } from "../../store/Classroom";
import axios from 'axios';
import { ElNotification } from 'element-plus'
const classroomStore = useClassroomStore();
const deleteview = ref(false)
const updateview = ref(false)

const uid = ref()
const updateclassroom = ref({
  classroom_id: '',
  classroom_num: '',
  classroom_build: '',
  classroom_room: '',
  classroom_remark: ''
})



function getid(id: number) {
  updateclassroom.value.classroom_id = classroomStore.classList[id].classroom_id
  updateclassroom.value.classroom_num = classroomStore.classList[id].classroom_num
  updateclassroom.value.classroom_build = classroomStore.classList[id].classroom_build
  updateclassroom.value.classroom_room = classroomStore.classList[id].classroom_room
  updateclassroom.value.classroom_remark = classroomStore.classList[id].classroom_remark
  uid.value = id
}

function updateroom() {
  axios.put("http://localhost:3000/classrooms/update", {
    "classroom_id":updateclassroom.value.classroom_id,
    "classroom_num":updateclassroom.value.classroom_num,
    "classroom_build":updateclassroom.value.classroom_build,
    "classroom_room":updateclassroom.value.classroom_room,
    "classroom_remark":updateclassroom.value.classroom_remark
  }).then(
    response => {
      if (response.data.code === "001") {
        getAllClassroom()
        ElNotification({
          title: '修改成功',
          message: '教室ID：' + updateclassroom.value.classroom_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '修改失败',
          message: '教室ID：' + updateclassroom.value.classroom_id,
          type: 'error',
        })
      }
    }
  )
}


function getAllClassroom() {
  axios.get("http://localhost:3000/classrooms/getAllClassrooms").then(
    response => {
      classroomStore.classList = response.data.classroom
      // const test = response.data.classroom
      // console.log(test)
    }
  )
}

function deleteroom() {
  axios.delete("http://localhost:3000/classrooms/delete", {
    params: {
      classroom_id: updateclassroom.value.classroom_id
    }
  }).then(
    response => {
      if (response.data.code === "001") {
        classroomStore.classList.splice(uid.value, 1)
        ElNotification({
          title: '删除成功',
          message: '教室ID：' + updateclassroom.value.classroom_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '教室ID：' + updateclassroom.value.classroom_id,
          type: 'error',
        })
      }
    }
  )

}
</script>
