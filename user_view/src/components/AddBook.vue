<template>
  <h2>预约教室</h2>
  <el-form label-width="120px">
    <el-form-item label="预约教室ID">
      <!-- <el-input v-model="toRaw(bookStore.bookList)[0].book_classroom_id" /> -->
      <el-select v-model="classrooomid" filterable placeholder="教室ID">
        <el-option v-for="item in ClassroomStore" :key="item.classroom_id" :label="item.classroom_id"
          :value="item.classroom_id" />
      </el-select>
    </el-form-item>
    <div class="block">
      <span class="demonstration">使用时间</span>
      <el-date-picker v-model="timevalue" type="datetimerange" range-separator="至" start-placeholder="开始时间"
        end-placeholder="结束时间" value-format="YYYY-MM-DD HH:mm:ss" />
    </div>
    <el-form-item>
      <el-button type="primary" @click="timeweather()">提交</el-button>
      <el-button @click="view = 2">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from "pinia";
import { useBookStore } from "../store/Book";
import { useViewStore } from "../store/ViewControl";
import axios from "axios";
import { ElNotification } from 'element-plus'
import { useUserStore } from "../store/User";
import { useClassroomStore } from '../store/Classroom';


const ClassroomStore = useClassroomStore().classList;
const bookStore = useBookStore();
const viewStore = useViewStore()
const { view, book_classroom_id } = storeToRefs(viewStore)
const userStore = useUserStore()

const timevalue = ref<[Date, Date]>([
  new Date(),
  new Date(),
])


const classrooomid = book_classroom_id
function timeweather() {
  axios.get("http://localhost:3000/book/getbookforclassroom", {
    params: {
      book_classroom_id: classrooomid.value
    }
  }).then(
    response => {
      const bookweather = ref()
      const weather = ref(1)
      bookweather.value = response.data.book
      for (var i = 0; i < bookweather.value.length; i++) {
        if (timevalue.value[0] >= bookweather.value[i].book_end_time || timevalue.value[1] <= bookweather.value[i].book_start_time) {
        } else {
          weather.value = 0
          ElNotification({
            title: "教室" + classrooomid.value + "时间冲突",
            dangerouslyUseHTMLString: true,
            message: '开始时间' + bookweather.value[i].book_start_time +'</br>' + '结束时间' + bookweather.value[i].book_end_time,
            type: "error",
          })
          break
        }

      }
      if (weather.value === 1) {
        addbook()
      }
    }
  )

}


function addbook() {
  axios.post("http://localhost:3000/book/add", {
    "book_id": 0,
    "book_user_id": userStore.userlist.user_id,
    "book_classroom_id": classrooomid.value,
    "book_waiter_id": "0",
    "audit": "未通过",
    "book_start_time": timevalue.value[0],
    "book_end_time": timevalue.value[1]
  }).then(
    response => {
      if (response.data.code === '001') {
        ElNotification({
          title: "教室" + classrooomid.value,
          message: response.data.message,
          type: 'success',
        })
        view.value = 5
      } else {
        ElNotification({
          title: "教室" + classrooomid.value,
          message: response.data.message,
          type: 'error',
        })
      }


    }
  )


}

</script>
<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.block:last-child {
  border-right: none;
}

.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>