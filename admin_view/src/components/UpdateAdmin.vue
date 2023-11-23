<template >


  <div class="common-layout" v-if="but===1">
    <el-container>
      <el-header><h2>个人信息</h2></el-header>
      <el-main>
        <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
      </el-main>
    </el-container>

    <el-button @click="but = 0" style="float:left">修改信息</el-button>
  </div>

  



  <div class="common-layout" v-if="but===0">
    <el-container>
      <el-header> <h2>修改信息</h2></el-header>
      <el-main>
        <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >确认修改</el-button>
      <el-button @click="resetForm(ruleFormRef),but= 1">取消修改</el-button>
    </el-form-item>
  </el-form>

        
      </el-main>
    </el-container>
  </div>
  




</template>

<script lang="ts" setup>
import {useWaiterStore} from "../store/Waiter";
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import axios from "axios";
import { ElNotification } from 'element-plus'
import {useViewStore} from "../store/ViewControl";
import {storeToRefs} from "pinia";

const viewStore = useViewStore()
const { view,userLogin } = storeToRefs(viewStore)
const waiterStore = useWaiterStore()
let but = ref(1)


const ruleFormRef = ref<FormInstance>()

const activities = [
  {
    content: '姓名',
    timestamp: waiterStore.waiterList.waiter_name,
  },
  {
    content: '电话',
    timestamp:waiterStore.waiterList.waiter_phone,
  },
  
]

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入确认密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次密码不同"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  email: waiterStore.waiterList.waiter_email,
  phone: waiterStore.waiterList.waiter_phone
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      updateuser()
    } else {
      console.log('error submit!')
      return false
    }
  })
  
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

function updateuser(){
    axios.put("http://localhost:3000/waiter/update",{
        waiter_id:waiterStore.waiterList.waiter_id,
        password:ruleForm.pass,
        waiter_phone:ruleForm.phone,
        waiter_email:ruleForm.email,
        waiter_name:waiterStore.waiterList.waiter_name
    }).then(
        response=>{
            waiterStore.waiterList.password = ruleForm.pass
            waiterStore.waiterList.waiter_phone = ruleForm.phone
            waiterStore.waiterList.waiter_email = ruleForm.email
            ElNotification({
                  title:"服务员"+waiterStore.waiterList.waiter_name+"修改" ,
                  message: response.data.message+"，请重新登录",
                  type: 'success',
                })
            view.value = 0
            userLogin.value = 0
        }
    )
}
</script>

<style>

.left{
    margin-left: 100px;
    float: left;
  }
  .right{
  float: left;
  width: 20%;
}
</style>