<template>
  <h2>新增用户</h2>
  <el-form :model="user" label-width="120px">
    <el-form-item label="用户ID">
      <el-input v-model="user.user_id" type="number" maxlength="50" />
    </el-form-item>
    <el-form-item label="用户密码">
      <el-input v-model="user.password" type="text" maxlength="50" />
    </el-form-item>
    <el-form-item label="用户姓名">
      <el-input v-model="user.user_name" type="text" maxlength="50" />
    </el-form-item>
    <el-form-item label="用户电话">
      <el-input v-model="user.user_phone" type="text" maxlength="11" />
    </el-form-item>
    <el-form-item label="用户邮箱">
      <el-input v-model="user.user_email" type="text" maxlength="50" />
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

const user = reactive({
  user_id: '',
  password: '',
  user_name: '',
  user_phone: '',
  user_email: ''
})
const time = ref()

function addlost() {
  axios.post("http://localhost:3000/users/add", {
    "user_id": user.user_id,
    "user_name": user.user_name,
    "password": user.password,
    "user_phone":user.user_phone,
    "user_email": user.user_email
  }).then(
    response => {
      if (response.data.code === "001") {
        ElNotification({
          title: "新增成功",
          message: response.data.message,
          type: 'success',
        })
        view.value = 10
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
