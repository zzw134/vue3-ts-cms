import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/css/index.less'

// import './service/axios_demo'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).mount('#app')
