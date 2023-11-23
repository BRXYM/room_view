import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
// 创建pinia实例
const pinia = createPinia()
// 挂载到根实例上
createApp(App).use(pinia).mount('#app')

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
 
const app = createApp(App)
app.use(ElementPlus)
