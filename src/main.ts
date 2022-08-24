import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

createApp(App).use(store).use(router).mount('#app')

// 添加请求拦截器，在请求头中加token


axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers!.Authorization != localStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });