<template>
    <h2>寻找失主</h2>
    
  
   <el-table :data="toRaw(lostStore.lostList)" style="width: 100%" highlight-current-row="1">
     <el-table-column prop="lost_id" label="失物ID" width="130" />
     <el-table-column prop="lost_user_id" label="创建者ID" width="130" />
     <el-table-column prop="lost_infor" label="物品名称" width="130" />
     <el-table-column prop="lost_remark" label="物品描述" width="200" />
     <el-table-column prop="" label="" />
     <el-table-column fixed="right" label="认领" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="centerDialogVisible = true,getid(scope.$index)">认领</el-button>
      </template>
    </el-table-column>
   </el-table>
  
   <el-dialog
    v-model="centerDialogVisible"
    title="提示"
    width="30%"
    align-center
  >
    <span>确认被认领了么，它的信息将被修改</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false,updatelost()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>


  </template>
  
  <script lang="ts" setup>
  import { toRaw } from "vue";
  import {useLostStore} from "../store/Lost";
  import { ref } from 'vue'
  import axios from "axios";
  import { ElNotification } from 'element-plus'


  const lostStore = useLostStore()
  const centerDialogVisible = ref(false)

  const newlost = ref({
        lost_id:'',
        lost_user_id:'',
        lost_infor:"",
        lost_remark:"",
        lost_time:""
  })
  const uid = ref()
  function getid(id:number){
    newlost.value = lostStore.lostList[id]
    uid.value = id
  }

  function updatelost(){
    axios.post("http://localhost:3000/lost/update",{
        "lost_id":newlost.value.lost_id,
        "lost_user_id":newlost.value.lost_user_id,
        "lost_infor":newlost.value.lost_infor,
        "lost_remark":newlost.value.lost_remark,
        "lost_time":newlost.value.lost_time,
        "lost_type":'结束'
    }).then(
      response=>{
        if(response.data.code==="001"){
          lostStore.lostList.splice(uid.value,1)
          ElNotification({
          title: '认领成功',
          message: '物品' + newlost.value.lost_infor,
          type: 'success',
        })
        }else{
          ElNotification({
          title: '认领失败',
          message: '物品' + newlost.value.lost_infor,
          type: 'error',
        })
        }
      }
    )

  }

  

  </script>

  <style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  </style>