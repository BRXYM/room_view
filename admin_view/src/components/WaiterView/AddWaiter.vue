<template>
  <h2>新增服务员</h2>
  <el-form :model="waiter" label-width="120px">
    <el-form-item label="服务员ID">
      <el-input v-model="waiter.waiter_id" type="number" maxlength="50" />
    </el-form-item>
    <el-form-item label="服务员密码">
      <el-input v-model="waiter.password" type="text" maxlength="50" />
    </el-form-item>
    <el-form-item label="服务员姓名">
      <el-input v-model="waiter.waiter_name" type="text" maxlength="50" />
    </el-form-item>
    <el-form-item label="服务员电话">
      <el-input v-model="waiter.waiter_phone" type="text" maxlength="11" />
    </el-form-item>
    <el-form-item label="服务员邮箱">
      <el-input v-model="waiter.waiter_email" type="text" maxlength="50" />
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
const viewStore = useViewStore()
const { view } = storeToRefs(viewStore)

const waiter = reactive({
  waiter_id: '',
  password: '',
  waiter_name: '',
  waiter_phone: '',
  waiter_email: ''
})
const time = ref()

function addlost() {
  axios.post("http://localhost:3000/waiter/add", {
    "waiter_id": waiter.waiter_id,
    "waiter_name": waiter.waiter_name,
    "password": waiter.password,
    "waiter_phone":waiter.waiter_phone,
    "waiter_email": waiter.waiter_email
  }).then(
    response => {
      if (response.data.code === "001") {
        ElNotification({
          title: "新增成功",
          message: response.data.message,
          type: 'success',
        })
        view.value = 12
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
