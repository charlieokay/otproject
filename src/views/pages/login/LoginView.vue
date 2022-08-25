<template>
    <h4>登录首页</h4>
    <div>
        <!-- <h5>{{ user_token }}</h5> -->
        <h4>请输入用户名</h4>
        <input type="text" v-model="user_id" placeholder="用户名" />
        <h4>请输入密码</h4>
        <input type="text" v-model="user_pwd" placeholder="密码" />
        <br>
        <br>
        <button @click="login">登录</button>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from "vuex";


export default {
    data() {
        return {
            user_id: 'sysadmin',
            user_pwd: 'Syntec1234',
            user_token: ''
        };
    },
    methods: {
        ...mapMutations(['changeLogin']),
        login() {
            this.loading = true;
            axios.post('/api/public/user/login', {
                "user_id": this.user_id,
                "user_pwd": this.user_pwd,
                headers: { "Authorization": "Bearer " + localStorage.getItem('Authorization') }
            })
                .then(res => {
                    //返回res数据
                    console.log(res);

                    //获取数据集内部token
                    const Token = res.data.content.token_data.token;

                    //将Token渲染到页面
                    this.user_token = Token
                    //将Token存入localStorage中
                    localStorage.setItem("Authorization", Token)

                    //跳转至product
                    this.$router.push('/product');

                })
                .catch(err => {
                    alert(err)
                })
        },

    }
};
</script>
<style>
</style>