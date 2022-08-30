import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pdf from 'vue3-pdfjs'
// import 'element-ui/lib/theme-chalk/index.css'

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(pdf)
    .mount('#app')
