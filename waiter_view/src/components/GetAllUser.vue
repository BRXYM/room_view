<template>
  <h2>查看所有用户</h2>


  <el-table :data="toRaw(userStore.userlist)" style="width: 100%">
    <el-table-column prop="user_id" label="用户ID" width="130" />
    <el-table-column prop="password" label="用户密码" width="130" />
    <el-table-column prop="user_name" label="用户姓名" width="130" />
    <el-table-column prop="user_phone" label="用户电话" width="130" />
    <el-table-column prop="user_email" label="用户邮箱" width="130" />
    <el-table-column prop="" label="" />
    <el-table-column fixed="right" label="预约教室" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="getbid(scope.$index)">查看预约申请</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="使用教室" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="getcid(scope.$index)">查看使用记录</el-button>
      </template>
    </el-table-column>
  </el-table>
  

</template>

<script lang="ts" setup>
import { toRaw } from "vue";
import { useUserStore } from "../store/User";
import { storeToRefs } from "pinia";
import { useViewStore } from "../store/ViewControl";
import { useBookStore } from "../store/Book";
import { useWorkingStore } from "../store/Working";

const viewStore = useViewStore()
const { view } = storeToRefs(viewStore)
const bookStore = useBookStore()
const userStore = useUserStore()
const workStore = useWorkingStore()

function getbid(id:number) {
  bookStore.bookList[0].book_user_id = userStore.userlist[id].user_id
  view.value = 8
}

function getcid(id:number){
  workStore.workList[0].work_user_id = userStore.userlist[id].user_id
  view.value = 4
}
</script>
