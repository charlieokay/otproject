<template>
    <h2>产品信息获取页面</h2>
    <button @click="getdata">点击获取数据</button>
</template>

<script>
import axios from 'axios'
import userToken from '../login/LoginView.vue'
export default {
    methods: {
        getdata() {
            axios.get('/api/public//products/dropDownList?page_index=1&show_count=20',
                {
                    headers: { "Authorization": "Bearer " + localStorage.getItem('Authorization') }
                    //将token存入请求头
                }
            )
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    alert(err)
                })
        }
    }
}
</script>

<style>
</style>