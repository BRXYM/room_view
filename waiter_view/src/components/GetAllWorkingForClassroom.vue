<template>
  <h2>教室使用记录>教室ID {{ workingStore.workList[0].work_classroom_id }}</h2>


  <el-table :data="toRaw(workingStore.workList)" style="width: 100%">
    <el-table-column prop="work_id" label="ID" width="150" />
    <el-table-column prop="work_user_id" label="使用者ID" width="150" />
    <el-table-column prop="work_classroom_id" label="房间号" width="150" />
    <el-table-column prop="work_waiter_id" label="审核管理员" width="150" />
    <el-table-column prop="work_start_time" label="开始时间" width="180" />
    <el-table-column prop="work_end_time" label="结束时间" width="180" />
    <el-table-column prop="work_classroom_remark" label="留言" width="180" />
    <el-table-column fixed="right" label="修改留言" width="120">
      <template #default="work">
        <el-button link type="primary" size="small" @click.prevent="updater = true , getworkid(work.$index)">修改留言</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="updater" title="修改教室" width="30%" align-center>
    <span>确认修改，它的信息将被修改
      <el-form :model="remark" label-width="120px">
        <el-form-item label="教室简介">
          <el-input v-model="remark.w_c_R"  type="textarea" maxlength="50" show-word-limit="true"/>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="update = false, updateremark()">
          确认修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import axios from "axios";
import { toRaw } from "vue";
import { useWorkingStore } from "../store/Working";
import { reactive,ref } from 'vue'
import { ElNotification } from 'element-plus'

const workingStore = useWorkingStore()

const updater = ref(false)

const remark = reactive({
  w_id: '',
  w_u_id: '',
  w_c_id: '',
  w_w_id: '',
  w_s_t: '',
  w_e_t: '',
  w_c_R: ''
})

function getworkid(id: number) {
  remark.w_id = workingStore.workList[id].work_id
  remark.w_u_id = workingStore.workList[id].work_user_id
  remark.w_c_id = workingStore.workList[id].work_classroom_id
  remark.w_w_id = workingStore.workList[id].work_waiter_id
  remark.w_s_t = workingStore.workList[id].work_start_time
  remark.w_e_t = workingStore.workList[id].work_end_time
  remark.w_c_R = workingStore.workList[id].work_classroom_remark
}

function updateremark() {
  axios.post("http://localhost:3000/working/update", {
    "work_id": remark.w_id,
    "work_user_id": remark.w_u_id,
    "work_classroom_id": remark.w_c_id,
    "work_waiter_id": remark.w_w_id,
    "work_start_time": remark.w_s_t,
    "work_end_time": remark.w_e_t,
    "work_classroom_remark": remark.w_c_R
  }).then(
    response => {
      ElNotification({
        title: '增加成功',
        message: '记录ID' + remark.w_id + ',教室ID' + remark.w_c_id,
        type: 'success',
      })
      getAllWorkingForClassroom()
      updater.value = false
    }
  )
}

function getAllWorkingForClassroom(){
  axios.get("http://localhost:3000/working/getworkingforclassroom",{
    params: {
      "work_classroom_id": workingStore.workList[0].work_classroom_id
    }
  }).then(
    response=>{
      workingStore.workList = response.data.working
    }
  )
}


</script>
