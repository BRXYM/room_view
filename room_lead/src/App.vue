<template>

  <!-- <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
          @select="handleSelect">
          <el-menu-item index="0" @click="view = 0">教室管理系统</el-menu-item>

          <div class="flex-grow" />
          <el-menu-item index="1" @click="view = 1" v-show="userLogin === 0">登录</el-menu-item>
          <el-sub-menu index="2" v-show="userLogin === 1">
            <template #title>我的</template>
            <el-menu-item index="2-1" @click="view = 12">个人信息</el-menu-item>
            <el-menu-item index="2-2" @click="userLogin = 0">退出登录</el-menu-item> -->
            <!--            <el-sub-menu index="2-4">-->
            <!--              <template #title>item four</template>-->
            <!--              <el-menu-item index="2-4-1">item one</el-menu-item>-->
            <!--              <el-menu-item index="2-4-2">item two</el-menu-item>-->
            <!--              <el-menu-item index="2-4-3">item three</el-menu-item>-->
            <!--            </el-sub-menu>-->
          <!-- </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LeftMenu />
        </el-aside>
        <el-main>
          <Welcome v-if="view === 0" />
          <Userlogin v-if="view === 1" />
          <GetAllClassroom v-if="view === 2" />
          <GetAllWorkingForUser v-if="view === 3" />
          <AddBook v-if="view === 4" />
          <GetAllBookForUser v-if="view === 5" />
          <Add1Lost v-if="view === 6" />
          <Get0Lost v-if="view === 7" />
          <Add0Lost v-if="view === 8" />
          <Get1Lost v-if="view === 9" />
          <GetAllWaiter v-if="view === 10" />
          <GetAllAdmin v-if="view === 11" />
          <UpdateUser v-if="view === 12" />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-backtop :right="50" :bottom="100" /> -->

  
  <el-button size="large"> <el-link href="http://localhost:3001/" target="_blank" type="primary" >用户端</el-link></el-button>
  
  <el-button size="large"><el-link href="http://localhost:3002/" target="_blank" type="warning">服务员端</el-link></el-button>
    <el-button size="large"><el-link href="http://localhost:3003/" target="_blank" type="danger">管理员端</el-link></el-button>


  <el-table :data="user" style="width: 100%">
    <el-table-column prop="user_id" label="用户ID" width="180" />
    <el-table-column prop="user_name" label="用户姓名" width="180" />
    <el-table-column prop="password" label="用户密码" />
  </el-table>
  <p></p>
  <el-table :data="waiter" style="width: 100%">
    <el-table-column prop="waiter_id" label="服务员ID" width="180" />
    <el-table-column prop="waiter_name" label="服务员姓名" width="180" />
    <el-table-column prop="password" label="服务员密码" />
  </el-table>
  <p></p>
  <el-table :data="admin" style="width: 100%">
    <el-table-column prop="date" label="管理员ID" width="180" />
    <el-table-column prop="name" label="管理员姓名" width="180" />
    <el-table-column prop="address" label="管理员密码" />
  </el-table>



</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
// import LeftMenu from "./components/LeftMenu.vue";
// import { useViewStore } from "./store/ViewControl";
// import { storeToRefs } from 'pinia'
import axios from "axios";
// import { useClassroomStore } from "./store/Classroom"
// import { useWorkingStore } from "./store/Working"
// import { useUserStore } from "./store/User";
// import { ElNotification } from 'element-plus'
// import { useBookStore } from "./store/Book";
// import AddBook from './components/AddBook.vue';
// import UpdateUser from './components/UpdateUser.vue';
// import GetAllWaiter from './components/GetAllWaiter.vue';
// import { useWaiterStore } from './store/Waiter';
// import { useAdmStore } from './store/Adm';
// import Get1Lost from './components/Get1Lost.vue';
// import { useLostStore } from './store/Lost';

// const waiterStore = useWaiterStore()
// const { waiterList } = storeToRefs(waiterStore)
// const adminStore = useAdmStore()
// const { admList } = storeToRefs(adminStore)
// const lostStore = useLostStore()
// const { lostList } = storeToRefs(lostStore)

// const userStore = useUserStore()
// const activeIndex = ref('1')
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const viewStore = useViewStore()
// const { view, userLogin } = storeToRefs(viewStore)
// const classroomStore = useClassroomStore()
// const { classList } = storeToRefs(classroomStore)

// const workingStore = useWorkingStore()
// const { workList } = storeToRefs(workingStore)

// const bookStore = useBookStore()
// const { bookList } = storeToRefs(bookStore)

const user = ref()
const waiter = ref()
const admin = [
  {
    date: '333',
    name: '钟离',
    address: '333',
  },]

if(true){
  getAllusers()
  getAllWaiter()
}

function getAllusers() {
  axios.get("http://localhost:3000/users/getAllUsers").then(
    response => {
      user.value = response.data.user
    }
  )
}

function getAllWaiter() {
  axios.get("http://localhost:3000/waiter/getAllWaiters").then(
    response => {
      waiter.value = response.data.waiter
      // const test = response.data.classroom
      // console.log(test)
    }
  )
}


//判断是否登录
// watch(view,()=>{
  
//   if(userLogin.value===0&&view.value!==1){
//     view.value = 1
//     ElNotification({
//       title: '请先登录',
//       message: '请先登录',
//       type: 'error',
//     })
    
//   }
// })



//获取所有教室信息
// watch(view, (newValue) => {
//   if (newValue === 2||newValue===4) {
//     getAllClassroom()
//   }
// })
// function getAllClassroom() {
//   axios.get("http://localhost:3000/classrooms/getAllClassrooms").then(
//     response => {
//       classList.value = response.data.classroom
//       // const test = response.data.classroom
//       // console.log(test)
//     }
//   )
// }
// //获取所有使用记录
// watch(view, (newValue) => {
//   if (newValue === 3) {
//     getAllWorking()
//   }
// })
// function getAllWorking() {
//   axios.get("http://localhost:3000/working/getworkingforuser", {
//     params: {
//       "work_user_id": userStore.userlist.user_id
//     }
//   }).then(
//     response => {
//       workList.value = response.data.working
//     }
//   )
// }



// //获取用户预约信息
// watch(view, (newValue) => {
//   if (newValue === 5){
//     getAllBook()
//   }
// })
// function getAllBook() {
//   axios.get("http://localhost:3000/book/getbookforuser", {
//     params: {
//       "book_user_id": userStore.userlist.user_id
//     }
//   }).then(
//     response => {
//       bookList.value = response.data.book
//     }
//   )
// }

// watch(userLogin, (newvalue) => {
//   if (newvalue === 1) {
//     ElNotification({
//       title: userStore.userlist.user_name,
//       message: '登陆成功，欢迎使用',
//       type: 'success',
//     })
//   }
// })

// //获取所有服务人员信息
// watch(view, (newValue) => {
//   if (newValue === 10) {
//     getAllWaiter()
//   }
// })
// function getAllWaiter() {
//   axios.get("http://localhost:3000/waiter/userGetAllWaiter").then(
//     response => {
//       waiterList.value = response.data.waiter
//       // const test = response.data.classroom
//       // console.log(test)
//     }
//   )
// }
// //获取所有管理员信息
// watch(view, (newValue) => {
//   if (newValue === 11) {
//     getAllAdmin()
//   }
// })
// function getAllAdmin() {
//   axios.get("http://localhost:3000/admin/getAllAdmin").then(
//     response => {
//       admList.value = response.data.admin
//       // const test = response.data.classroom
//       // console.log(test)
//     }
//   )
// }

// //获取丢失物品信息
// watch(view, (newValue) => {
//   if (newValue === 7) {
//     getAll0Lost()
//   }
// })
// function getAll0Lost() {
//   axios.get("http://localhost:3000/lost/getlostfortype", {
//     params: {
//       lost_type:"遗失"
//     }
//   }).then(
//     response => {
//       lostList.value = response.data.lost
//     }
//   )

// }

// watch(view, (newValue) => {
//   if (newValue === 9) {
//     getAll1Lost()
//   }
// })
// function getAll1Lost() {
//   axios.get("http://localhost:3000/lost/getlostfortype", {
//     params: {
//       lost_type:"招领"
//     }
//   }).then(
//     response => {
//       lostList.value = response.data.lost
//     }
//   )

// }


</script>

<style scoped>
/* .flex-grow {
  flex-grow: 1;
} */
</style>
