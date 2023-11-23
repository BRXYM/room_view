<template>
  <div class="loginBox">
    <h1>用户登录</h1>
    <div class="item">
      <div class="icon"><img src="../assets/icon1.png" alt="" /></div>
      <div class="txt"><input name="" type="text" v-model="login.ID" placeholder="请输入用户名" /></div>
    </div>
    <div class="item">
      <div class="icon"><img src="../assets/icon2.png" alt="" /></div>
      <div class="txt"><input name="" type="password" v-model="login.PASSWORD" placeholder="请输入您的密码" /></div>
    </div>
    <div class="item_3">
      <button class="btn" @click="LoginUser">登录</button>
    </div>
  </div>
  <div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from "axios";
import { useUserStore } from "../store/User";
import { storeToRefs } from "pinia";
import { useViewStore } from "../store/ViewControl";
import { useBookStore } from "../store/Book";
import { ElNotification } from 'element-plus'


const userStore = useUserStore()
const { statusCode, code, userlist, message } = storeToRefs(userStore)
const viewStore = useViewStore()
const { view, userLogin } = storeToRefs(viewStore)
const bookStore = useBookStore()
const { bookList } = storeToRefs(bookStore)


let login = ref({
  ID: '',
  PASSWORD: ''
})
function LoginUser() {
  axios.post("http://localhost:3000/users/login", {
    "user_id": login.value.ID,
    "password": login.value.PASSWORD,
  }).then(
    response => {
      if (response.data.code === "001") {
        userlist.value = response.data.user
        statusCode.value = response.data.statusCode
        code.value = response.data.code
        message.value = response.data.message
        view.value = 0
        userLogin.value = 1
        getAllBook()
        ElNotification({
          title: userStore.userlist.user_name,
          message: '登陆成功，欢迎使用',
          type: 'success',
        })
      }else if(response.data.code === "002"){
        ElNotification({
          title: response.data.message,
          message: '登陆失败',
          type: 'error',
        })
      }else{
        ElNotification({
          title: response.data.message,
          message: '登陆失败',
          type: 'error',
        })
      }

    },
    error => {
      console.log('登录失败', error.message)
    })
}


function getAllBook() {
  axios.get("http://localhost:3000/book/getbookforuser", {
    params: {
      "book_user_id": userStore.userlist.user_id

    }
  }).then(
    response => {
      bookList.value = response.data.book
    }
  )
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0
}

ul li {
  list-style: none
}

img {
  border: 0;
  max-width: 100%;
}

a {
  text-decoration: none;
  color: #333
}

.clear {
  clear: both
}

body {
  font-family: "微软雅黑", serif;
  width: 100%;
  margin: 0;
  height: 100vh;
  color: #fff;
  background: linear-gradient(-45deg, #231f6e, #20bdfe, #2600b4, #1d1a44);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  overflow: hidden
}

a:hover {
  text-decoration: underline
}

.loginBox {
  width: 520px;
  height: 500px;
  background: #74b2f5;
  background-size: 100% 100%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 5px;
}

.loginBox h1 {
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: 26px;
  margin-top: 90px;
  letter-spacing: 7px;
  margin-bottom: 20px
}

.loginBox .item {
  border-radius: 5px;
  width: 300px;
  height: 45px;
  margin-left: 105px;
  border: 1px solid #1d90c5;
  margin-bottom: 10px;
  background: rgba(11, 116, 180, 0.8);
  display: flex
}

.loginBox .item .icon {
  float: left;
  width: 45px;
}

.loginBox .item .icon img {
  display: block;
  width: 20px;
  margin: 12px;
}

.loginBox .item .txt {
  flex: 1;
}

.loginBox .item .txt input {
  border: 0;
  background: none;
  outline: none;
  width: 100%;
  height: 45px;
  line-height: 45px;
  color: #fff;
  letter-spacing: 1px;
  font-size: 14px
}

.loginBox .item .yzm {
  float: right;
  width: 100px;
  overflow: hidden;
  padding-left: 10px
}

.loginBox .item .yzm img {
  display: block;
  width: 100px;
  height: 45px;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
  opacity: 1;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
  opacity: 1;
}

input:-ms-input-placeholder {
  color: #fff;
  opacity: 1;
}

input::-webkit-input-placeholder {
  color: #fff;
  opacity: 1;
}

.loginBox .item_2 {
  width: 300px;
  margin-left: 105px;
  overflow: hidden;
  padding-bottom: 20px
}

.loginBox .item_2 a {
  float: right;
  color: #fff;
  font-size: 12px
}

.loginBox .item_2 input {
  float: left;
}

.loginBox .item_2 span {
  float: left;
  color: #fff;
  font-size: 12px
}

.loginBox .item_3 {
  width: 300px;
  margin-left: 105px;
  overflow: hidden
}

.loginBox .item_3 .btn {
  border-radius: 5px;
  width: 300px;
  height: 45px;
  background: #3FB5E3;
  outline: none;
  text-align: center;
  line-height: 45px;
  color: #fff;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #1d90c5;
  margin-bottom: 10px;
  cursor: pointer
}

input[type=checkbox] {
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 11px;
  height: 10px;

}

input[type=checkbox]:after {

  width: 6px;
  height: 13px;
  top: 0;
  content: " ";
  background: rgba(11, 116, 180, 1);
  border: 1px solid #1d90c5;
  color: #fff;
  display: inline-block;
  visibility: visible;
  padding: 0 3px;
  border-radius: 3px;
}

input[type=checkbox]:checked:after {
  content: "✓";
  font-size: 12px;
}

.loginBox .item_4 {
  width: 300px;
  margin-left: 105px;
  overflow: hidden;
  margin-top: 10px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.5px
}

.loginBox .item_4 a {
  color: #1d90c5;
  font-size: 12px;
  font-weight: bold;
  padding-left: 3px
}

.loginBox .item_5 {
  width: 300px;
  margin-left: 105px;
  overflow: hidden;
  margin-top: 80px;
  letter-spacing: 0.5px;
  margin-bottom: 70px
}

.loginBox .item_5 p {
  text-align: center;
  color: #fff;
  font-size: 14px;
}</style>
