<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
          @select="handleSelect">
          <el-menu-item index="0" @click="view = 0">教室管理系统--服务员</el-menu-item>

          <div class="flex-grow" />

          <el-menu-item index="1" type="primary" style="margin-left: 16px" @click="drawer = true,getAllWaiter()">
            帮助
          </el-menu-item>

          <el-menu-item index="2" @click="view = 1,drawer = true,getAllWaiter()" v-show="userLogin === 0">登录</el-menu-item>
          <el-sub-menu index="3" v-show="userLogin === 1">
            <template #title>我的</template>
            <el-menu-item index="3-1" @click="view = 18">个人信息</el-menu-item>
            <el-menu-item index="3-2" @click="userLogin = 0">退出登录</el-menu-item>
            <!--            <el-sub-menu index="2-4">-->
            <!--              <template #title>item four</template>-->
            <!--              <el-menu-item index="2-4-1">item one</el-menu-item>-->
            <!--              <el-menu-item index="2-4-2">item two</el-menu-item>-->
            <!--              <el-menu-item index="2-4-3">item three</el-menu-item>-->
            <!--            </el-sub-menu>-->
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LeftMenu />
        </el-aside>
        <el-main>
          <Welcome v-if="view === 0" />
          <Waiterlogin v-if="view === 1" />
          <GetAllClassroom v-if="view === 2" />
          <GetAllWorking v-if="view === 3" />
          <GetAllWorkingForUser v-if="view === 4" />
          <GetAllWorkingForClassroom v-if="view === 5" />
          <GetAllBookForAudit0 v-if="view === 6" />
          <GetAllBookForAudit v-if="view === 7" />
          <GetAllBookForUser v-if="view === 8" />
          <GetAllBookForClassroom v-if="view === 9" />
          <Add1Lost v-if="view === 10" />
          <Get0Lost v-if="view === 11" />
          <Add0Lost v-if="view === 12" />
          <Get1Lost v-if="view === 13" />
          <GetLostForTime v-if="view === 14" />
          <GetAllUser v-if="view === 15" />
          <GetAllAdmin v-if="view === 16" />
          <Get3Lost v-if="view === 17" />
          <UpdateWaiter v-if="view === 18" />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-backtop :right="50" :bottom="100" />


  <el-drawer v-model="drawer" title="帮助文档" :with-header="false">
    <!-- <span> -->
    <div class="common-layout">
      <el-container>
        <el-header>用户端-帮助文档</el-header>


        <el-main>
          <div class="demo-collapse">
            <el-collapse v-model="helpmenu" accordion>
              <el-collapse-item title="系统登录-用户账号信息" name="1">

                <div>

                  <el-table :data="toRaw(users)" style="width: 100%">
                    <el-table-column prop="user_id" label="用户ID" width="100" />
                    <el-table-column prop="user_name" label="用户姓名" width="100" />
                    <el-table-column prop="password" label="用户密码" />
                  </el-table>

                </div>
              </el-collapse-item>
              <el-collapse-item title="系统登录-服务员账号信息" name="2">
                <el-table :data="toRaw(waiterStore.waiterList)" style="width: 100%">
                  <el-table-column prop="waiter_id" label="服务员ID" width="100" />
                  <el-table-column prop="waiter_name" label="服务员姓名" width="100" />
                  <el-table-column prop="password" label="服务员密码" />
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="系统登录-管理员账号信息" name="3">
                <div>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="管理员ID" width="100" />
                    <el-table-column prop="name" label="管理员姓名" width="100" />
                    <el-table-column prop="address" label="管理员密码" />
                  </el-table>
                </div>
              </el-collapse-item>
              <!-- <el-collapse-item title="相关文档" name="4">
                <div>
                  <el-link href="">开题报告</el-link>
                </div>
                <div>
                  Controlled consequences: users should be granted the freedom to
                  operate, including canceling, aborting or terminating current
                  operation.
                </div>
              </el-collapse-item> -->
            </el-collapse>
          </div>
        </el-main>



        <!-- <el-footer>
          <div class="demo-rate-block">
            <el-rate v-model="Rate" :colors="colors" allow-half />
          </div>
        </el-footer> -->
      </el-container>
    </div>
    <!-- </span> -->
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, toRaw } from 'vue'
import LeftMenu from "./components/LeftMenu.vue";
import { useViewStore } from "./store/ViewControl";
import { storeToRefs } from 'pinia'
import axios from "axios";
import { useClassroomStore } from "./store/Classroom"
import { useWorkingStore } from "./store/Working"
import { useUserStore } from "./store/User";
import { ElNotification } from 'element-plus'
import { useBookStore } from "./store/Book";
import { useWaiterStore } from './store/Waiter';
import { useAdmStore } from './store/Adm';
import Get1Lost from './components/Get1Lost.vue';
import { useLostStore } from './store/Lost';
import GetAllAdmin from './components/GetAllAdmin.vue';
import GetAllUser from './components/GetAllUser.vue';
import GetAllBookForUser from './components/GetAllBookForUser.vue';

const waiterStore = useWaiterStore()
const { waiterList } = storeToRefs(waiterStore)
const adminStore = useAdmStore()
const { admList } = storeToRefs(adminStore)
const lostStore = useLostStore()
const { lostList } = storeToRefs(lostStore)

const userStore = useUserStore()
const { userlist } = storeToRefs(userStore)

const viewStore = useViewStore()
const { view, userLogin } = storeToRefs(viewStore)
const classroomStore = useClassroomStore()
const { classList } = storeToRefs(classroomStore)

const workingStore = useWorkingStore()
const { workList } = storeToRefs(workingStore)

const bookStore = useBookStore()
const { bookList } = storeToRefs(bookStore)

const activeIndex = ref('0')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const drawer = ref(false)

const Rate = ref(null)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

const helpmenu = ref("2")


const users = ref()
const waiters = ref()


const tableData = [
  {
    date: '333',
    name: '钟离',
    address: '333',
  },]

onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#E6A23C');
  document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0');
  document.body.style.setProperty('--el-color-primary-light-3', '#95d475');
})


//判断是否登录
watch(view, (newValue) => {
  if (userLogin.value === 0 && view.value !== 1) {
    view.value = 1
    ElNotification({
      title: '请先登录',
      message: '请先登录',
      type: 'error',
    })
  } else {
    switch (newValue) {
      case 1:
        break
      case 2: getAllClassroom()
        break
      case 3: getAllWorking()
        break
      case 4: getAllWorkingForUser()
        break
      case 5: getAllWorkingForClassroom()
        break
      case 6: getAllBook()
        break
      case 7: getAllbookForWaiter()
        break
      case 8: getAllBookForUser()
        break
      case 9: getAllBookForclassroom()
        break
      case 10:
        break
      case 11: getAll0Lost()
        break
      case 12:
        break
      case 13: getAll1Lost()
        break
      case 14:
        break
      case 15: getAllUser()
        break
      case 16: getAllAdmin()
        break
      case 17: getAll3Lost()
        break
    }
  }
})


function getAllBookForUser() {
  axios.get("http://localhost:3000/book/getbookforuser", {
    params: {
      "book_user_id": bookStore.bookList[0].book_user_id
    }
  }).then(
    response => {
      if (response.data.book.length) {
        bookList.value = response.data.book
      } else {
        ElNotification({
          title: '无预约记录',
          message: '用户' + bookStore.bookList[0].book_user_id,
          type: 'warning',
        })
        view.value = 2
      }
    }
  )
}

function getAllWorkingForClassroom() {
  axios.get("http://localhost:3000/working/getworkingforclassroom", {
    params: {
      "work_classroom_id": workingStore.workList[0].work_classroom_id
    }
  }).then(
    response => {
      workList.value = response.data.working
    }
  )
}

function getAllWorkingForUser() {
  axios.get("http://localhost:3000/working/getworkingforuser", {
    params: {
      "work_user_id": workingStore.workList[0].work_user_id
    }
  }).then(
    response => {
      workList.value = response.data.working
    }
  )
}


setInterval(() => {
  if (view.value === 6) {
    getAllBook()
  }
}, 10000)


function getAllBook() {
  axios.post("http://localhost:3000/book/getbookforaudit", {
    "book_waiter_id": "",
    "audit": '未通过'
  }).then(
    response => {
      bookList.value = response.data.book
    }
  )
}

function getAllClassroom() {
  axios.get("http://localhost:3000/classrooms/getAllClassrooms").then(
    response => {
      classList.value = response.data.classroom
      // const test = response.data.classroom
      // console.log(test)
    }
  )
}


function getAllbookForWaiter() {
  axios.get("http://localhost:3000/book/getbookforwaiter", {
    params: {
      "book_waiter_id": waiterList.value.waiter_id
    }
  }).then(
    response => {
      bookList.value = response.data.book

      // if (response.data.book.length) {
      //   bookList.value = response.data.book
      // } else {
      //   ElNotification({
      //     title: '无预约记录',
      //     message: '教室' + bookStore.bookList[0].book_classroom_id,
      //     type: 'warning',
      //   })
      // }
    }
  )
}


function getAllWorking() {
  axios.get("http://localhost:3000/working/getAllWorking", {
    params: {
      // "work_user_id": userStore.userlist.user_id
    }
  }).then(
    response => {
      workList.value = response.data.working
    }
  )
}



//获取用户预约信息
function getAllBookForclassroom() {
  axios.get("http://localhost:3000/book/getbookforclassroom", {
    params: {
      "book_classroom_id": bookStore.bookList[0].book_classroom_id
    }
  }).then(
    response => {
      if (response.data.book.length) {
        bookList.value = response.data.book
      } else {
        ElNotification({
          title: '无预约记录',
          message: '教室' + bookStore.bookList[0].book_classroom_id,
          type: 'warning',
        })
        view.value = 2
      }
    }
  )
}


//获取所有用户信息
function getAllUser() {
  axios.get("http://localhost:3000/users/getAllUsers").then(
    response => {
      userlist.value = response.data.user
    }
  )
}
//获取所有管理员信息
function getAllAdmin() {
  axios.get("http://localhost:3000/admin/getAllAdmin").then(
    response => {
      admList.value = response.data.admin
      // const test = response.data.classroom
      // console.log(test)
    }
  )
}

//获取丢失物品信息
function getAll0Lost() {
  axios.get("http://localhost:3000/lost/getlostfortype", {
    params: {
      lost_type: '遗失'
    }
  }).then(
    response => {
      lostList.value = response.data.lost
    }
  )

}


function getAll1Lost() {
  axios.get("http://localhost:3000/lost/getlostfortype", {
    params: {
      lost_type: '招领'
    }
  }).then(
    response => {
      lostList.value = response.data.lost
    }
  )
}

function getAll3Lost() {
  axios.get("http://localhost:3000/lost/getlostfortype", {
    params: {
      lost_type: '结束'
    }
  }).then(
    response => {
      lostList.value = response.data.lost
    }
  )
}

function getAllusers() {
  axios.get("http://localhost:3000/users/getAllUsers", {
    params: {
    }
  }).then(
    response => {
      users.value = response.data.user
    }
  )
}
function getAllWaiter() {
  axios.get("http://localhost:3000/waiter/getAllWaiters").then(
    response => {
      waiterList.value = response.data.waiter
      // const test = response.data.classroom
      // console.log(test)
    }
  )
}
watch(helpmenu, (newvalue) => {
  // switch (newvalue) {
  //   case 1:

  //     break;

  //   case 2:

  //     break;

  //   case 3:

  //     break;
  // }
  if (newvalue == 1) {
    getAllusers();
    // console.log(users);
    // console.log("test")
  } else if (newvalue == 2) {
    getAllWaiter()
  }
})

</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
