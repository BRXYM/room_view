
<template>
  <h2>所有使用信息</h2>

  <el-table :data="toRaw(workingStore.workList)" border:true style="width: 100%">
    <el-table-column prop="work_id" label="ID" width="200" />
    <el-table-column prop="work_user_id" label="使用者" width="150" />
    <el-table-column prop="work_classroom_id" label="教室ID" width="150" />
    <el-table-column prop="work_waiter_id" label="审核人员ID" width="180" />
    <el-table-column prop="work_start_time" label="开始时间" width="180" />
    <el-table-column prop="work_start_time" label="结束时间" width="180" />
    <el-table-column prop="work_classroom_remark" label="使用备注" width="180" />
    <el-table-column prop="" label="" />
    <el-table-column fixed="right" label="修改" width="120">
      <template #default="room">
        <el-button link type="primary" size="small" @click.prevent="updateview = true, getid(room.$index)">修改</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="删除" width="120">
      <template #default="room">
        <el-button link type="primary" size="small"
          @click.prevent="getid(room.$index), deleteview = true">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="deleteview" title="删除使用记录" width="30%" align-center>
    <span>确认删除，它的信息将被删除<br>
      使用记录ID：{{ updateworking.work_id }}<br>
      使用者ID：{{ updateworking.work_user_id }}<br>
      教室ID：{{ updateworking.work_classroom_id }}<br>
      审核人员ID：{{ updateworking.work_waiter_id }}<br>
      开始使用时间：{{ updateworking.work_start_time }}<br>
      结束使用时间：{{ updateworking.work_end_time }}<br>
      使用备注：{{ updateworking.work_classroom_remark }}
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteview = false">取消删除</el-button>
        <el-button type="primary" @click="deleteview = false, deleteworking()">
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="updateview" title="修改使用记录" width="30%" align-center>
    <span>确认修改，它的信息将被修改
      <el-form :model="updateworking" label-width="120px">
        <el-form-item label="使用者ID">
          <!-- <el-input v-model="updatebook.book_user_id" type="number" /> -->
          <el-select v-model="updateworking.work_user_id" filterable placeholder="用户ID">
            <el-option v-for="item in userStore" :key="item.user_id" :label="item.user_id" :value="item.user_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="教室ID">
          <!-- <el-input v-model="updatebook.book_classroom_id" type="text" /> -->
          <el-select v-model="updateworking.work_classroom_id" filterable placeholder="教室ID">
            <el-option v-for="item in classroomStore" :key="item.classroom_id" :label="item.classroom_id"
              :value="item.classroom_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核人员ID">
          <!-- <el-input v-model="updatebook.book_waiter_id" type="number" /> -->
          <el-select v-model="updateworking.work_waiter_id" filterable placeholder="用户ID">
            <el-option v-for="item in waiterStore" :key="item.waiter_id" :label="item.waiter_id"
              :value="item.waiter_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="updateworking.work_start_time" type="datetime" placeholder="丢失时间" value-format="YYYY-MM-DD hh:mm:ss" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="updateworking.work_end_time" type="datetime" placeholder="丢失时间" value-format="YYYY-MM-DD hh:mm:ss" />
        </el-form-item>
        <el-form-item label="使用备注">
          <el-input v-model="updateworking.work_classroom_remark" type="textarea" maxlength="50" show-word-limit="true" />
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
import { useWorkingStore } from "../../store/Working";
import axios from 'axios';
import { ElNotification } from 'element-plus'
import { useUserStore } from '../../store/User';
import { useClassroomStore } from "../../store/Classroom";
import { useWaiterStore } from "../../store/Waiter";
const classroomStore = useClassroomStore().classList;
const waiterStore = useWaiterStore().waiterList;
const userStore = useUserStore().userlist;
const workingStore = useWorkingStore();
const deleteview = ref(false)
const updateview = ref(false)

const uid = ref()
const updateworking = ref({
  work_id: '',
  work_user_id: '',
  work_classroom_id: '',
  work_waiter_id: '',
  work_start_time: '',
  work_end_time: '',
  work_classroom_remark: ''
})




function getid(id: number) {
  updateworking.value.work_id = workingStore.workList[id].work_id
  updateworking.value.work_user_id = workingStore.workList[id].work_user_id
  updateworking.value.work_classroom_id = workingStore.workList[id].work_classroom_id
  updateworking.value.work_waiter_id = workingStore.workList[id].work_waiter_id
  updateworking.value.work_start_time = workingStore.workList[id].work_start_time
  updateworking.value.work_end_time = workingStore.workList[id].work_end_time
  updateworking.value.work_classroom_remark = workingStore.workList[id].work_classroom_remark
  uid.value = id
}

function updateroom() {
  axios.put("http://localhost:3000/working/update", {
    "work_id":updateworking.value.work_id,
    "work_user_id":updateworking.value.work_user_id,
    "work_classroom_id":updateworking.value.work_classroom_id,
    "work_waiter_id":updateworking.value.work_waiter_id,
    "work_start_time":updateworking.value.work_start_time,
    "work_end_time":updateworking.value.work_end_time,
    "work_classroom_remark":updateworking.value.work_classroom_remark
  }).then(
    response => {
      if (response.data.code === "001") {
        getAllWorking()
        ElNotification({
          title: '修改成功',
          message: '使用记录：' + updateworking.value.work_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '修改失败',
          message: '使用记录：' + updateworking.value.work_id,
          type: 'error',
        })
      }
    }
  )
}



function deleteworking() {
  axios.delete("http://localhost:3000/working/delete", {
    params: {
      work_id: updateworking.value.work_id
    }
  }).then(
    response => {
      if (response.data.code === "001") {
        workingStore.workList.splice(uid.value, 1)
        ElNotification({
          title: '删除成功',
          message: '使用记录ID：' + updateworking.value.work_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '使用记录ID：' + updateworking.value.work_id,
          type: 'error',
        })
      }
    }
  )

}


function getAllWorking() {
  axios.get("http://localhost:3000/working/getAllWorking", {
  }).then(
    response => {
      workingStore.workList = response.data.working
    }
  )
}

</script>
