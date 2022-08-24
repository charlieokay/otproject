<template>
    <h2>产品信息获取页面</h2>
    <button @click="getdata">点击获取数据</button>
</template>

<script >
import axios from 'axios'
export default {
    methods: {
        getdata() {
            axios.get('/api/public/products'
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