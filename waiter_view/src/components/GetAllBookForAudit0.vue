<template>
  <h2>预约申请</h2>

  <el-table :data="toRaw(bookStore.bookList)" style="width: 100%">
    <el-table-column prop="book_id" label="预约ID" width="130" />
    <el-table-column prop="book_user_id" label="预约人ID" width="130" />
    <el-table-column prop="book_classroom_id" label="预约教室ID" width="130" />
    <el-table-column prop="book_waiter_id" label="审核ID" width="130" />
    <el-table-column prop="audit" label="是否通过审核" width="130" />
    <el-table-column prop="book_start_time" label="预约开始时间" width="180" />
    <el-table-column prop="book_end_time" label="预约结束时间" width="180" />
    <el-table-column prop="" label="" />
    <el-table-column fixed="right" label="审核" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small"
          @click.prevent="centerDialogVisible = true, getid(scope.$index)">审核</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="centerDialogVisible" title="提示" width="30%" align-center>
    <span>确认通过审核，它的信息将被修改
      <br>
      预约ID：{{ newbook.book_id }}
      <br>
      预约人ID：{{ newbook.book_user_id }}<br>
      预约教室ID：{{ newbook.book_classroom_id }}<br>
      预约开始时间：{{ newbook.book_start_time }}<br>
      预约结束时间：{{ newbook.book_end_time }}
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false,updatebook('未通过')">驳回申请</el-button>
        <el-button type="primary" @click="centerDialogVisible = false, updatebook('通过')">
          通过申请
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toRaw } from "vue";
import { useBookStore } from "../store/Book";
import axios from "axios";
import { ElNotification } from 'element-plus'
import { useWaiterStore } from "../store/Waiter";

const waiterStore = useWaiterStore()
const bookStore = useBookStore()
const centerDialogVisible = ref(false)
const uid = ref()
const newbook = ref({
  book_id: '',
  book_user_id: '',
  book_classroom_id: '',
  book_waiter_id: '',
  audit: '',
  book_start_time: '',
  book_end_time: ''
})

function getid(id: number) {
  newbook.value = bookStore.bookList[id]
  uid.value = id
}

function updatebook(audit) {
  axios.put("http://localhost:3000/book/update", {
    book_id: newbook.value.book_id,
    book_user_id: newbook.value.book_user_id,
    book_classroom_id: newbook.value.book_classroom_id,
    book_waiter_id: waiterStore.waiterList.waiter_id,
    audit: audit,
    book_start_time: newbook.value.book_start_time,
    book_end_time:newbook.value.book_end_time
  }).then(
    response=>{
      if(response.data.code==="001"){
        bookStore.bookList.splice(uid.value,1)
        ElNotification({
          title: '审核成功',
          message: '预约ID' + newbook.value.book_id,
          type: 'success',
        })
      }else{
        ElNotification({
          title: '审核失败',
          message: '预约ID' + newbook.value.book_id,
          type: 'error',
      })
    }
  }
  )
}



</script>
