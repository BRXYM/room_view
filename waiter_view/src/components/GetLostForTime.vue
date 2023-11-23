<template>
    <h2>时间寻找失物</h2>
    <div class="demo-date-picker">
        <div class="block">
            <span class="demonstration">选择丢失物品的时间</span>
            <el-date-picker v-model="time" type="date" placeholder="丢失时间" value-format="YYYY-MM-DD" />
            <el-button @click="getlost()">查找</el-button>
        </div>
    </div>
    <div v-if="tablecon===1" style="weight:100%">
    <el-table :data="toRaw(lostStore.lostList)" style="width: 100%" highlight-current-row="1">
     <el-table-column prop="lost_id" label="失物ID" width="130" />
     <el-table-column prop="lost_user_id" label="创建者ID" width="130" />
     <el-table-column prop="lost_infor" label="物品名称" width="130" />
     <el-table-column prop="lost_remark" label="物品描述" width="200" />
     <el-table-column prop="" label="" />
   </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from "axios";
import { toRaw } from "vue";
import {useLostStore} from "../store/Lost";
const lostStore = useLostStore()
const time = ref()

const tablecon = ref(0)

function getlost() {
    axios.get("http://localhost:3000/lost/getlostfortime",{
        params:{
            lost_time:time.value
        }
    }).then(
        response=>{
            lostStore.lostList = response.data.lost
            tablecon.value = 1
        }
    )
}



</script>
<style scoped>
.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
