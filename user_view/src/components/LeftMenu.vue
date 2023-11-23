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
        <span>我想要使用教室</span>
      </template>
      <el-menu-item-group>
        <template #title><span>查看</span></template>
        <el-menu-item index="1-1" @click="view = 2">查看所有教室</el-menu-item>
        <el-menu-item index="1-2" @click="view = 3">查看使用记录</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>预约</span></template>
        <el-menu-item index="1-3" @click="view = 4">预约教室</el-menu-item>
        <el-menu-item index="1-4" @click="view = 5">查看预约记录</el-menu-item>
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
        <span>我丢失/捡到了物品</span>
      </template>
      <el-menu-item-group>
        <template #title><span>我捡到了某物</span></template>
        <el-menu-item index="2-1" @click="view = 6">新建挂失物品</el-menu-item>
        <el-menu-item index="2-2" @click="view = 7">寻找失主</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>我丢失了某物</span></template>
        <el-menu-item index="2-3" @click="view = 8">新建寻找物品</el-menu-item>
        <el-menu-item index="2-4" @click="view = 9">寻找失物</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="3" @click="view = 10">
      <el-icon><document /></el-icon>
      <template #title >联系服务人员</template>
    </el-menu-item>
    <el-menu-item index="4" @click="view = 11">
      <el-icon><setting /></el-icon>
      <template #title >联系管理人员</template>
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
