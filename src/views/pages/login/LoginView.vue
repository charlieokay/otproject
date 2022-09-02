<template>
    <div class="login_box">
        <div class="login_l_img">
            <img src="@/assets/login/login-img.png" />
        </div>
        <div class="login">
            <div class="login_logo">
                <a href="#">
                    <img src="@/assets/login/login_logo.png" />
                </a>
            </div>
            <div class="login_name">
                <p>
                    终端操作登录
                </p>
            </div>
            <form>
                <input class="myinput" type="text" v-model="user_id" placeholder="用户名" name="username">

                <input class="myinput" name="password" type="password" v-model="user_pwd" id="password"
                    placeholder="密码" />
                <input value="登录" style="width:100%;" @click="login" type="submit">
            </form>
            <el-alert :title="tips" type="success" center show-icon v-show="state" />
        </div>
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
            user_token: '',
            state: '',
            tips: ''

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

                    //判断登陆成功
                    if (res.status === 200) {
                        this.state = true
                        setTimeout(() => {
                            // this.$router.push('/checkinout');
                            this.tips = '请前往签到'
                        }, 3000);
                    } else {
                        alert('信息错误，请重新填写')
                    }
                    //跳转至product


                })
                .catch(err => {
                    alert(err)
                })
        },

    }
};
</script>

<style>
@charset "utf-8";
/* CSS Document */

/* * {
    font: 13px/1.5 "微软雅黑";
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
} */
/* 
body,
html {
    height: 100%;
    overflow: hidden;
} */

/* a {
    color: #27a9e3;
    text-decoration: none;
    cursor: pointer;
} */

img {
    border: none;
}

.login_box {
    width: 1100px;
    margin: 120px auto 0;
}

.login_box .login_l_img {
    float: left;
    width: 432px;
    height: 440px;
    margin-left: 50px;
}

.login_box .login_l_img img {
    width: 500px;
    height: 440px;
}

.login {
    height: 360px;
    width: 400px;
    padding: 50px;
    background-color: #ffffff;
    border-radius: 6px;
    box-sizing: border-box;
    float: right;
    margin-right: 50px;
    position: relative;
    margin-top: 50px;
}

.login_logo {
    width: 120px;
    height: 120px;
    border: 5px solid #93defe;
    border-radius: 100px;
    background: #fff;
    text-align: center;
    line-height: 110px;
    position: absolute;
    top: -60px;
    right: 140px;
}

.login_name {
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 20px;
}

.login_name p {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #444;
    padding: 10px 0 20px;
}

.login_logo img {
    width: 60px;
    height: 60px;
    display: inline-block;
    vertical-align: middle;
}


input[type="text"],
input[type="file"],
input[type="password"],
input[type="email"],
select {
    border: 1px solid #dcdee0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #555555;
    outline: none;
    width: 100%;
    margin-bottom: 15px;
    line-height: 50px;
    color: #888;
}

input[type="text"]:focus,
input[type="file"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
select:focus {
    border: 1px solid #27a9e3;
}

input[type="submit"],
input[type="button"] {
    display: inline-block;
    vertical-align: middle;
    padding: 12px 24px;
    margin: 0px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    color: #ffffff;
    background-color: #27a9e3;
    border-radius: 3px;
    border: none;
    -webkit-appearance: none;
    outline: none;
    width: 100%;
}

/* .copyright {
    font-size: 14px;
    color: #fff;
    display: block;
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 60px;
} */

#password_text {
    border: 1px solid #dcdee0;
    /* vertical-align: middle; */
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #888;
    outline: none;
    width: 100%;
    margin-bottom: 15px;
    display: block;
    line-height: 50px;
}
</style>