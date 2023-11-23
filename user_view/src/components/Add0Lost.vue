<template>
        <h2>新增寻找物品</h2>
    <el-form :model="lose" label-width="120px">
      <el-form-item label="物品名称">
        <el-input v-model="lose.infor" maxlength="50"/>
      </el-form-item>
      <el-form-item label="物品描述">
        <el-input v-model="lose.remark" type="textarea" maxlength="50" show-word-limit="true"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addlost">提交</el-button>
      </el-form-item>
    </el-form>
  </template>

  <script lang="ts" setup>
  import axios from 'axios';
import { reactive } from 'vue'
import { useUserStore } from "../store/User";
import { ElNotification } from 'element-plus'

const userStore = useUserStore()
  
  const lose= reactive({
    infor: '',
    remark:''
  })
  
  function addlost () {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() +1;
    let day = new Date().getDate();
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    let date = year + '-' + month + '-' + day +'-' +hour +':'+ minute +':'+ second

    axios.post("http://localhost:3000/lost/add",{
        lost_id:0,
        lost_user_id:userStore.userlist.user_id,
        lost_infor:lose.infor,
        lost_remark:lose.remark,
        lost_time:date,
        lost_type:'招领'
    }).then(
        response => {
            if(response.data.code==="001"){
                ElNotification({
                  title: "新增寻找物品",
                  message: response.data.message,
                  type: 'success',
                })
            }else{
                ElNotification({
                  title: "新增寻找物品",
                  message: response.data.message,
                  type: 'error',
                })
            }
        })

  }
  </script>
  