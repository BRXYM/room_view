<template>
  <h2>新增使用记录</h2>
  <el-form :model="working" label-width="120px">
    <el-form-item label="使用者ID">
      <!-- <el-input v-model="book.book_user_id" type="number" /> -->
      <el-select v-model="working.work_user_id" filterable placeholder="用户ID">
    <el-option
      v-for="item in userStore"
      :key="item.user_id"
      :label="item.user_id"
      :value="item.user_id"
    />
  </el-select>
    </el-form-item>
    <el-form-item label="教室ID">
      <!-- <el-input v-model="book.book_classroom_id" type="number" /> -->
      <el-select v-model="working.work_classroom_id" filterable placeholder="教室ID">
    <el-option
      v-for="item in classroomStore"
      :key="item.classroom_id"
      :label="item.classroom_id"
      :value="item.classroom_id"
    />
  </el-select>
    </el-form-item>
    <el-form-item label="审核ID">
      <!-- <el-input v-model="book.book_waiter_id" type="number" /> -->
      <el-select v-model="working.work_waiter_id" filterable placeholder="审核ID">
    <el-option
      v-for="item in waiterStore"
      :key="item.waiter_id"
      :label="item.waiter_id"
      :value="item.waiter_id"
    />
  </el-select>
    </el-form-item>
    <el-form-item label="使用时间">
    <el-date-picker
      v-model="timevalue"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      value-format="YYYY-MM-DD HH:ss:mm"
    /></el-form-item>
    <el-form-item label="使用备注">
      <el-input v-model="working.work_classroom_remark" type="textarea" maxlength="50" show-word-limit="true" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="addclassroom">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue'
import { reactive } from 'vue'
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
const timevalue = ref<[Date, Date]>([
  new Date(),
  new Date(),
])

const working = reactive({
  work_user_id: '',
  work_classroom_id: '',
  work_waiter_id: '',
  work_classroom_remark: ''
})

function addclassroom() {
  axios.post("http://localhost:3000/working/add", {
    work_id: 0,
    work_user_id: working.work_user_id,
    work_classroom_id: working.work_classroom_id,
    work_waiter_id: working.work_waiter_id,
    work_start_time: timevalue.value[0],
    work_end_time: timevalue.value[1],
    work_classroom_remark: working.work_classroom_remark
  }).then(
    response => {
      if (response.data.code === "001") {
        ElNotification({
          title: "新增成功",
          message: response.data.message,
          type: 'success',
        })
        view.value = 4
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
