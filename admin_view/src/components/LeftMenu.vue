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
        <el-menu-item index="1-1" @click="view = 2">查看所有教室</el-menu-item>
        <el-menu-item index="1-2" @click="view = 3">增加教室</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path><path fill="currentColor" d="M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"></path></svg></el-icon>
        <span>使用记录管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" @click="view = 4">查看所有使用记录</el-menu-item>
        <el-menu-item index="2-2" @click="view = 5">增加使用记录</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224H128zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64z"></path><path fill="currentColor" d="M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224h784zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224H205.056z"></path></svg></el-icon>
        <span>预约记录管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" @click="view = 6">查看所有预约记录</el-menu-item>
        <el-menu-item index="3-2" @click="view = 7">增加预约记录</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M224 768v96.064a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V768H224zm0-64h576V160a64 64 0 0 0-64-64H288a64 64 0 0 0-64 64v544zm32 288a96 96 0 0 1-96-96V128a96 96 0 0 1 96-96h512a96 96 0 0 1 96 96v768a96 96 0 0 1-96 96H256zm304-144a48 48 0 1 1-96 0 48 48 0 0 1 96 0z"></path></svg></el-icon>
        <span>遗失物品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" @click="view = 8">查看所有遗失物品</el-menu-item>
        <el-menu-item index="4-2" @click="view = 9">增加遗失物品</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="5">
      <template #title>
        <el-icon><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"></path></svg></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1" @click="view = 10">查看所有用户</el-menu-item>
        <el-menu-item index="5-2" @click="view = 11">增加用户</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="6">
      <template #title>
        <el-icon><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M280.768 753.728 691.456 167.04a32 32 0 1 1 52.416 36.672L314.24 817.472a32 32 0 0 1-45.44 7.296l-230.4-172.8a32 32 0 0 1 38.4-51.2l203.968 152.96zM736 448a32 32 0 1 1 0-64h192a32 32 0 1 1 0 64H736zM608 640a32 32 0 0 1 0-64h319.936a32 32 0 1 1 0 64H608zM480 832a32 32 0 1 1 0-64h447.936a32 32 0 1 1 0 64H480z"></path></svg></el-icon>
        <span>服务员管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="6-1" @click="view = 12">查看所有服务员</el-menu-item>
        <el-menu-item index="6-2" @click="view = 13">增加服务员</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <!-- <el-menu-item index="3" @click="view = 15">
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
    </el-menu-item> -->
    
  </el-menu>
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import {
  Menu as IconMenu,
  Location,
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
