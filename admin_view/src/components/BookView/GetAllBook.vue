
<template>
  <h2>所有预定信息</h2>

  <el-table :data="toRaw(BookStore.bookList)" border:true style="width: 100%">
    <el-table-column prop="book_id" label="ID" width="200" />
    <el-table-column prop="book_user_id" label="使用者" width="150" />
    <el-table-column prop="book_classroom_id" label="教室ID" width="150" />
    <el-table-column prop="book_waiter_id" label="审核人员ID" width="180" />
    <el-table-column prop="book_start_time" label="开始时间" width="180" />
    <el-table-column prop="book_start_time" label="结束时间" width="180" />
    <el-table-column prop="audit" label="是否通过审核" width="180" />
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
  <el-dialog v-model="deleteview" title="删除使用记录" width="30%" align-center>
    <span>确认删除，它的信息将被删除<br>
      使用记录ID：{{ updatebook.book_id }}<br>
      使用者ID：{{ updatebook.book_user_id }}<br>
      教室ID：{{ updatebook.book_classroom_id }}<br>
      审核人员ID：{{ updatebook.book_waiter_id }}<br>
      开始使用时间：{{ updatebook.book_start_time }}<br>
      结束使用时间：{{ updatebook.book_end_time }}<br>
      使用备注：{{ updatebook.audit }}
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteview = false">取消删除</el-button>
        <el-button type="primary" @click="deleteview = false, deletebook()">
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="updateview" title="修改预约" width="30%" align-center>
    <span>确认修改，它的信息将被修改
      <el-form :model="updatebook" label-width="120px">
        <el-form-item label="使用者ID">
          <!-- <el-input v-model="updatebook.book_user_id" type="number" /> -->
          <el-select v-model="updatebook.book_user_id" filterable placeholder="用户ID">
            <el-option v-for="item in userStore" :key="item.user_id" :label="item.user_id" :value="item.user_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="教室ID">
          <!-- <el-input v-model="updatebook.book_classroom_id" type="text" /> -->
          <el-select v-model="updatebook.book_classroom_id" filterable placeholder="教室ID">
            <el-option v-for="item in classroomStore" :key="item.classroom_id" :label="item.classroom_id"
              :value="item.classroom_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核人员ID">
          <!-- <el-input v-model="updatebook.book_waiter_id" type="number" /> -->
          <el-select v-model="updatebook.book_waiter_id" filterable placeholder="用户ID">
            <el-option v-for="item in waiterStore" :key="item.waiter_id" :label="item.waiter_id"
              :value="item.waiter_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="updatebook.book_start_time" type="datetime" placeholder="丢失时间" value-format="YYYY-MM-DD hh-mm-ss" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="updatebook.book_end_time" type="datetime" placeholder="丢失时间" value-format="YYYY-MM-DD hh-mm-ss" />
        </el-form-item>
        <el-form-item label="是否通过审核">
          <!-- <el-input v-model="updatebook.audit" type="text"/> -->
          <el-select v-model="updatebook.audit" placeholder="审核状态" style="width: 115px">
            <el-option label="通过" value="通过" />
            <el-option label="未通过" value="未通过" />
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
import { useBookStore } from "../../store/Book";
import axios from 'axios';
import { ElNotification } from 'element-plus'
import { useUserStore } from '../../store/User';
import { useClassroomStore } from "../../store/Classroom";
import { useWaiterStore } from "../../store/Waiter";
const classroomStore = useClassroomStore().classList;
const waiterStore = useWaiterStore().waiterList;
const userStore = useUserStore().userlist;
const BookStore = useBookStore();
const deleteview = ref(false)
const updateview = ref(false)

const uid = ref()
const updatebook = ref({
  book_id: '',
  book_user_id: '',
  book_classroom_id: '',
  book_waiter_id: '',
  book_start_time: '',
  book_end_time: '',
  audit: ''
})



function getid(id: number) {
  updatebook.value.book_id = BookStore.bookList[id].book_id
  updatebook.value.book_user_id = BookStore.bookList[id].book_user_id
  updatebook.value.book_classroom_id = BookStore.bookList[id].book_classroom_id
  updatebook.value.book_waiter_id = BookStore.bookList[id].book_waiter_id
  updatebook.value.book_start_time = BookStore.bookList[id].book_start_time
  updatebook.value.book_end_time = BookStore.bookList[id].book_end_time
  updatebook.value.audit = BookStore.bookList[id].audit
  uid.value = id
}

function updateroom() {
  axios.put("http://localhost:3000/book/update", {
    "book_id": updatebook.value.book_id,
    "book_user_id": updatebook.value.book_user_id,
    "book_classroom_id": updatebook.value.book_classroom_id,
    "book_waiter_id": updatebook.value.book_waiter_id,
    "book_start_time": updatebook.value.book_start_time,
    "book_end_time": updatebook.value.book_end_time,
    "audit": updatebook.value.audit
  }).then(
    response => {
      if (response.data.code === "001") {
        getAllBook()
        ElNotification({
          title: '修改成功',
          message: '使用记录：' + updatebook.value.book_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '修改失败',
          message: '使用记录：' + updatebook.value.book_id,
          type: 'error',
        })
      }
    }
  )
}



function deletebook() {
  axios.delete("http://localhost:3000/book/delete", {
    params: {
      book_id: updatebook.value.book_id
    }
  }).then(
    response => {
      if (response.data.code === "001") {
        BookStore.bookList.splice(uid.value, 1)
        ElNotification({
          title: '删除成功',
          message: '使用记录ID：' + updatebook.value.book_id,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '使用记录ID：' + updatebook.value.book_id,
          type: 'error',
        })
      }
    }
  )

}

function getAllBook() {
  axios.get("http://localhost:3000/book/getAllBook", {
  }).then(
    response => {
      BookStore.bookList = response.data.book
    }
  )
}


</script>
