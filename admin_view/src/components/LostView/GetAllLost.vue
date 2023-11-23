
<template>
  <h2>所有遗失物品信息</h2>

  <el-table :data="toRaw(LostStore.lostList)" border:true style="width: 100%">
    <el-table-column prop="lost_id" label="ID" width="200" />
    <el-table-column prop="lost_user_id" label="用户ID" width="150" />
    <el-table-column prop="lost_infor" label="物品名称" width="150" />
    <el-table-column prop="lost_remark" label="物品描述" width="180" />
    <el-table-column prop="lost_time" label="时间" width="180" />
    <el-table-column prop="lost_type" label="丢失类型" width="180" />
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
  <el-dialog v-model="deleteview" title="删除物品" width="30%" align-center>
    <span>确认删除，它的信息将被删除
      <br>
      ID：{{ updatelost.lost_id }}<br>
      用户ID：{{ updatelost.lost_user_id }}<br>
      物品名称：{{ updatelost.lost_infor }}<br>
      物品描述：{{ updatelost.lost_remark }}<br>
      时间：{{ updatelost.lost_time }}<br>
      类型：{{ updatelost.lost_type }}
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteview = false">取消删除</el-button>
        <el-button type="primary" @click="deleteview = false, deletelost()">
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="updateview" title="修改失物" width="30%" align-center>
    <span>确认修改，它的信息将被修改
      <el-form :model="updatelost" label-width="120px">
        <el-form-item label="用户ID">
          <!-- <el-input v-model="updatelost.lost_user_id" type="number" /> -->
          <el-select v-model="updatelost.lost_user_id" filterable placeholder="用户ID">
            <el-option v-for="item in userStore" :key="item.user_id" :label="item.user_id" :value="item.user_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="物品名称">
          <el-input v-model="updatelost.lost_infor" type="text" maxlength="50"/>
        </el-form-item>
        <el-form-item label="物品描述">
          <el-input v-model="updatelost.lost_remark" type="textarea" maxlength="50" show-word-limit="true" />
        </el-form-item>
        <el-form-item label="丢失时间">
        <el-date-picker v-model="time" type="datetime" placeholder="丢失时间" value-format="YYYY-MM-DD hh-mm-ss" />
       </el-form-item>
        <el-form-item label="类型"> 
          <!-- <el-input v-model="updatelost.lost_type" type="number" /> -->
          <el-select v-model="updatelost.lost_type" placeholder="丢失状态" style="width: 115px">
            <el-option label="遗失" value="遗失" />
            <el-option label="招领" value="招领" />
            <el-option label="结束" value="结束" />
          </el-select>
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
import { useLostStore } from "../../store/Lost";
import axios from 'axios';
import { ElNotification } from 'element-plus'
import { useUserStore } from '../../store/User';
import { useClassroomStore } from "../../store/Classroom";
import { useWaiterStore } from "../../store/Waiter";
const classroomStore = useClassroomStore().classList;
const waiterStore = useWaiterStore().waiterList;
const userStore = useUserStore().userlist;
const LostStore = useLostStore();
const deleteview = ref(false)
const updateview = ref(false)

const uid = ref()
const updatelost = ref({
  lost_id: '',
  lost_user_id: '',
  lost_infor: '',
  lost_remark: '',
  lost_time: '',
  lost_type: ''
})

const time = ref()


function getid(id: number) {
  updatelost.value.lost_id = LostStore.lostList[id].lost_id
  updatelost.value.lost_user_id = LostStore.lostList[id].lost_user_id
  updatelost.value.lost_infor = LostStore.lostList[id].lost_infor
  updatelost.value.lost_remark = LostStore.lostList[id].lost_remark
  updatelost.value.lost_time = LostStore.lostList[id].lost_time
  updatelost.value.lost_type = LostStore.lostList[id].lost_type
  time.value = LostStore.lostList[id].lost_time
  uid.value = id
}

function updateroom() {
  axios.post("http://localhost:3000/lost/update", {
    "lost_id": updatelost.value.lost_id,
    "lost_user_id": updatelost.value.lost_user_id,
    "lost_infor": updatelost.value.lost_infor,
    "lost_remark": updatelost.value.lost_remark,
    "lost_time": time.value,
    "lost_type": updatelost.value.lost_type
  }).then(
    response => {
      if (response.data.code === "001") {
        getAllLost()
        ElNotification({
          title: '修改成功',
          message: 'ID：' + updatelost.value.lost_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '修改失败',
          message: 'ID：' + updatelost.value.lost_id,
          type: 'error',
        })
      }
    }
  )
}


function getAllLost() {
  axios.get("http://localhost:3000/lost/getAllLost").then(
    response => {
      LostStore.lostList = response.data.lost
      // const test = response.data.classroom
      // console.log(test)
    }
  )
}

function deletelost() {
  axios.delete("http://localhost:3000/lost/delete", {
    params: {
      lost_id: updatelost.value.lost_id
    }
  }).then(
    response => {
      if (response.data.code === "001") {
        LostStore.lostList.splice(uid.value, 1)
        ElNotification({
          title: '删除成功',
          message: '教室ID：' + updatelost.value.lost_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '教室ID：' + updatelost.value.lost_id,
          type: 'error',
        })
      }
    }
  )

}
</script>
