<template>
  <h2>新增失物</h2>
  <el-form :model="lost" label-width="120px">
    <el-form-item label="用户ID">
      <!-- <el-input v-model="lost.lost_user_id" type="number" maxlength="50" /> -->
      <el-select v-model="lost.lost_user_id" filterable placeholder="用户ID">
    <el-option
      v-for="item in userStore"
      :key="item.user_id"
      :label="item.user_id"
      :value="item.user_id"
    />
  </el-select>
    </el-form-item>
    <el-form-item label="物品名称">
      <el-input v-model="lost.lost_infor" type="text" maxlength="50" />
    </el-form-item>
    <el-form-item label="物品描述">
      <el-input v-model="lost.lost_remark" type="textarea" maxlength="50" show-word-limit="true" />
    </el-form-item>
    <el-form-item label="时间">
      <el-date-picker v-model="time" type="datetime" placeholder="丢失时间" value-format="YYYY-MM-DD hh-mm-ss" />
    </el-form-item>
    <el-form-item label="类型">
      <!-- <el-input v-model="lost.lost_type" type="text" /> -->
      <el-select v-model="lost.lost_type" placeholder="丢失状态" style="width: 115px">
            <el-option label="遗失" value="遗失" />
            <el-option label="招领" value="招领" />
          </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addlost">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useViewStore } from "../../store/ViewControl";
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../store/User';
import { useClassroomStore } from "../../store/Classroom";
import { useWaiterStore } from "../../store/Waiter";
const classroomStore = useClassroomStore().classList;
const waiterStore = useWaiterStore().waiterList;
const userStore = useUserStore().userlist;
const viewStore = useViewStore()
const { view } = storeToRefs(viewStore)

const lost = reactive({
  lost_user_id: '',
  lost_infor: '',
  lost_remark: '',
  lost_type: ''
})
const time = ref()

function addlost() {
  axios.post("http://localhost:3000/lost/add", {
    "lost_id": 0,
    "lost_user_id": lost.lost_user_id,
    "lost_infor": lost.lost_infor,
    "lost_remark": lost.lost_remark,
    "lost_time": time.value,
    "lost_type": lost.lost_type
  }).then(
    response => {
      if (response.data.code === "001") {
        ElNotification({
          title: "新增成功",
          message: response.data.message,
          type: 'success',
        })
        view.value = 8
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
