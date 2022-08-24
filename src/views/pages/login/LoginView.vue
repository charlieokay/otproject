<template>
    <h4>登录首页</h4>
    <div>
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
            })
                .then(res => {
                    console.log(res);
                    console.log('-----------------')
                    console.log(res.data.content.token_data.token);//获取数据集内部token
                    // axios.defaults.headers.common['Authorization'] = res.headers.authorization
                    // const Token = res.data.content.token_data.token;
                    // //将Token存入localStorage中
                    // localStorage.setItem("token", Token)
                    // // this.changeLogin({ Authorization: this.Token });
                    // if (Token) {
                    //     this.$router.push('/product')//登录成功跳转到product页面
                    // } else {
                    //     this.$router.push('/login')
                    // }

                    const userToken = res.data.content.token_data.token;
                    // console.log(userToken + '打印userToken------------')
                    // 将用户token保存到vuex中
                    this.changeLogin(userToken);

                    this.$router.push('/product');
                    alert('进入成功')

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