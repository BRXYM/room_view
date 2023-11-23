
<template>
  <h2>所有用户信息</h2>

  <el-table :data="toRaw(UserStore.userlist)" border:true style="width: 100%">
    <el-table-column prop="user_id" label="ID" width="200" />
    <el-table-column prop="password" label="用户密码" width="150" />
    <el-table-column prop="user_name" label="用户姓名" width="150" />
    <el-table-column prop="user_phone" label="用户电话" width="180" />
    <el-table-column prop="user_email" label="用户邮箱" width="180" />
    <el-table-column prop="" label="" />
    <el-table-column fixed="right" label="修改" width="120">
      <template #default="room">
        <el-button link type="primary" size="small"
          @click.prevent="updateview = true, getid(room.$index)">修改</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="删除" width="120">
      <template #default="room">
        <el-button link type="primary" size="small"
          @click.prevent="getid(room.$index), deleteview = true">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="deleteview" title="删除用户" width="30%" align-center>
    <span>确认删除，它的信息将被删除
      <br>
      ID：{{ updateuser.user_id }}<br>
      密码：{{ updateuser.password }}<br>
      用户姓名：{{ updateuser.user_name }}<br>
      用户电话：{{ updateuser.user_phone }}<br>
      用户邮箱：{{ updateuser.user_email }}
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteview = false">取消删除</el-button>
        <el-button type="primary" @click="deleteview = false, deleteuser()">
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="updateview" title="修改用户" width="30%" align-center>
    <span>确认修改，它的信息将被修改
      <el-form :model="updateuser" label-width="120px">
        <el-form-item label="用户ID">
          <el-input v-model="updateuser.user_id" type="number" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="updateuser.password" type="text" maxlength="50" />
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="updateuser.user_name" type="text" maxlength="50" />
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="updateuser.user_phone" type="number" maxlength="11" />
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="updateuser.user_email" type="text" maxlength="50" />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateview = false, updateUser()">
          确认修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toRaw } from "vue";
import { useUserStore } from "../../store/User";
import axios from 'axios';
import { ElNotification } from 'element-plus'
const UserStore = useUserStore();
const deleteview = ref(false)
const updateview = ref(false)

const uid = ref()
const updateuser = ref({
  user_id: '',
  password: '',
  user_name: '',
  user_phone: '',
  user_email: ''
})



function getid(id: number) {
  updateuser.value.user_id = UserStore.userlist[id].user_id
  updateuser.value.password = UserStore.userlist[id].password
  updateuser.value.user_name = UserStore.userlist[id].user_name
  updateuser.value.user_phone = UserStore.userlist[id].user_phone
  updateuser.value.user_email = UserStore.userlist[id].user_email
  uid.value = id
}

function updateUser() {
  axios.put("http://localhost:3000/users/update", {
    "user_id": updateuser.value.user_id,
    "user_name": updateuser.value.user_name,
    "password": updateuser.value.password,
    "user_phone": updateuser.value.user_phone,
    "user_email": updateuser.value.user_email
  }).then(
    response => {
      if (response.data.code === "001") {
        getAllUser()
        ElNotification({
          title: '修改成功',
          message: 'ID：' + updateuser.value.user_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '修改失败',
          message: 'ID：' + updateuser.value.user_id,
          type: 'error',
        })
      }
    }
  )
}


function getAllUser() {
  axios.get("http://localhost:3000/users/getAllUsers").then(
    response => {
      UserStore.userlist = response.data.user
      // const test = response.data.classroom
      // console.log(test)
    }
  )
}

function deleteuser() {
  axios.delete("http://localhost:3000/users/delete", {
    params: {
      user_id: updateuser.value.user_id
    }
  }).then(
    response => {
      if (response.data.code === "001") {
        UserStore.userlist.splice(uid.value, 1)
        ElNotification({
          title: '删除成功',
          message: '用户ID：' + updateuser.value.user_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '用户ID：' + updateuser.value.user_id,
          type: 'error',
        })
      }
    }
  )

}
</script>
