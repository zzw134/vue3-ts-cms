import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/css/index.less'
import { mapMenus } from './utils/mapMenus'
import localCache from './utils/localCache'
import registerAll from './global'

// import './service/axios_demo'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 防止页面刷新路由没有动态加载以及动态加载一些数据
if (localCache.getCache('token') && localCache.getCache('userMenus')) {
  mapMenus(localCache.getCache('userMenus')).forEach((route) => {
    router.addRoute('main', route)
  })
  store.dispatch('getInitialDataList')
}

const app = createApp(App)
app.use(registerAll)
app.use(store).use(router).mount('#app')
