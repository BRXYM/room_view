<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">折叠</el-radio-button>
  </el-radio-group>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>教室管理</span>
      </template>
      <el-menu-item-group>
        <template #title><span>查看</span></template>
        <el-menu-item index="1-1" @click="view = 2">查看所有教室</el-menu-item>
        <el-menu-item index="1-2" @click="view = 3">所有使用记录</el-menu-item>
        <el-menu-item index="1-3" @click="view = 4">用户使用记录</el-menu-item>
        <el-menu-item index="1-4" @click="view = 5">教室使用记录</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>审核</span></template>
        <el-menu-item index="1-5" @click="view = 6">预约申请</el-menu-item>
        <el-menu-item index="1-6" @click="view = 7">所有审核</el-menu-item>
        <el-menu-item index="1-7" @click="view = 8">用户预约信息</el-menu-item>
        <el-menu-item index="1-8" @click="view = 9">教室预约信息</el-menu-item>
      </el-menu-item-group>
<!--      <el-menu-item-group title="预约">-->
<!--        <el-menu-item index="1-3">预约教室</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--      <el-sub-menu index="1-4">-->
<!--        <template #title><span>item four</span></template>-->
<!--        <el-menu-item index="1-4-1">item one</el-menu-item>-->
<!--      </el-sub-menu>-->
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>管理失物</span>
      </template>
      <el-menu-item-group>
        <template #title><span>有人捡到了某物</span></template>
        <el-menu-item index="2-1" @click="view = 10">新建挂失物品</el-menu-item>
        <el-menu-item index="2-2" @click="view = 11">寻找失主</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>有人丢失了某物</span></template>
        <el-menu-item index="2-4" @click="view = 12">新建寻找物品</el-menu-item>
        <el-menu-item index="2-5" @click="view = 13">寻找失物</el-menu-item>
        <el-menu-item index="2-7" @click="view = 14">时间寻找失物</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="3" @click="view = 15">
      <el-icon><document /></el-icon>
      <template #title >查看使用用户</template>
    </el-menu-item>
    <el-menu-item index="4" @click="view = 16">
      <el-icon><setting /></el-icon>
      <template #title >联系管理人员</template>
    </el-menu-item>
    <el-menu-item index="5" @click="view = 17">
      <el-icon><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M640 384v256H384V384h256zm64 0h192v256H704V384zm-64 512H384V704h256v192zm64 0V704h192v192H704zm-64-768v192H384V128h256zm64 0h192v192H704V128zM320 384v256H128V384h192zm0 512H128V704h192v192zm0-768v192H128V128h192z"></path></svg></el-icon>
      <template #title >查看已被认领物品</template>
    </el-menu-item>
    
  </el-menu>
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {useViewStore} from "../store/ViewControl";
import {storeToRefs} from "pinia";
import axios from "axios";
import { ElNotification } from 'element-plus'


const viewStore = useViewStore()
const { view,userLogin } = storeToRefs(viewStore)
const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
  if (userLogin.value===0) {
    ElNotification({
      title: '请先登录',
      message: '请先登录',
      type: 'error',
    })
    view.value = 1
  }
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
  if (userLogin.value===0) {
    ElNotification({
      title: '请先登录',
      message: '请先登录',
      type: 'error',
    })
    view.value = 1
  }
}




</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
