
<template>
  <h2>所有服务员信息</h2>

  <el-table :data="toRaw(WaiterStore.waiterList)" border:true style="width: 100%">
    <el-table-column prop="waiter_id" label="ID" width="200" />
    <el-table-column prop="password" label="服务员密码" width="150" />
    <el-table-column prop="waiter_name" label="服务员姓名" width="150" />
    <el-table-column prop="waiter_phone" label="服务员电话" width="180" />
    <el-table-column prop="waiter_email" label="服务员邮箱" width="180" />
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
  <el-dialog v-model="deleteview" title="删除服务员" width="30%" align-center>
    <span>确认删除，它的信息将被删除
      <br>
      ID：{{ updatewaiter.waiter_id }}<br>
      密码：{{ updatewaiter.password }}<br>
      用户姓名：{{ updatewaiter.waiter_name }}<br>
      用户电话：{{ updatewaiter.waiter_phone }}<br>
      用户邮箱：{{ updatewaiter.waiter_email }}
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteview = false">取消删除</el-button>
        <el-button type="primary" @click="deleteview = false, deletewaiter()">
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="updateview" title="修改服务员" width="30%" align-center>
    <span>确认修改，它的信息将被修改
      <el-form :model="updatewaiter" label-width="120px">
        <el-form-item label="用户ID">
          <el-input v-model="updatewaiter.waiter_id" type="number" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="updatewaiter.password" type="text" maxlength="50" />
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="updatewaiter.waiter_name" type="text" maxlength="50" />
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="updatewaiter.waiter_phone" type="number" maxlength="11" />
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="updatewaiter.waiter_email" type="text" maxlength="50" />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateview = false, updateWaiter()">
          确认修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toRaw } from "vue";
import { useWaiterStore } from "../../store/Waiter";
import axios from 'axios';
import { ElNotification } from 'element-plus'
const WaiterStore = useWaiterStore();
const deleteview = ref(false)
const updateview = ref(false)

const uid = ref()
const updatewaiter = ref({
  waiter_id: '',
  password: '',
  waiter_name: '',
  waiter_phone: '',
  waiter_email: ''
})



function getid(id: number) {
  updatewaiter.value.waiter_id = WaiterStore.waiterList[id].waiter_id
  updatewaiter.value.password = WaiterStore.waiterList[id].password
  updatewaiter.value.waiter_name = WaiterStore.waiterList[id].waiter_name
  updatewaiter.value.waiter_phone = WaiterStore.waiterList[id].waiter_phone
  updatewaiter.value.waiter_email = WaiterStore.waiterList[id].waiter_email
  console.log(updatewaiter.value)
  uid.value = id
}

function updateWaiter() {
  axios.put("http://localhost:3000/waiter/update", {
    "waiter_id": updatewaiter.value.waiter_id,
    "waiter_name": updatewaiter.value.waiter_name,
    "password": updatewaiter.value.password,
    "waiter_phone": updatewaiter.value.waiter_phone,
    "waiter_email": updatewaiter.value.waiter_email
  }).then(
    response => {
      if (response.data.code === "001") {
        getAllWaiter()
        ElNotification({
          title: '修改成功',
          message: 'ID：' + updatewaiter.value.waiter_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '修改失败',
          message: 'ID：' + updatewaiter.value.waiter_id,
          type: 'error',
        })
      }
    }
  )
}


function getAllWaiter() {
  axios.get("http://localhost:3000/waiter/getAllWaiters").then(
    response => {
      WaiterStore.waiterList = response.data.waiter
      // const test = response.data.classroom
      // console.log(test)
    }
  )
}

function deletewaiter() {
  axios.delete("http://localhost:3000/waiter/delete", {
    params: {
      waiter_id: updatewaiter.value.waiter_id
    }
  }).then(
    response => {
      if (response.data.code === "001") {
        WaiterStore.waiterList.splice(uid.value, 1)
        ElNotification({
          title: '删除成功',
          message: '用户ID：' + updatewaiter.value.waiter_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '用户ID：' + updatewaiter.value.waiter_id,
          type: 'error',
        })
      }
    }
  )

}
</script>
