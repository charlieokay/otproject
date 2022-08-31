<template>

    <h2>产品信息获取页面</h2>
    <button @click="getdata">点击获取数据</button>
    <div>
        <h3>product数据</h3>
        <p>{{ msg }}</p>
        <hr>
        <h5>{{ name }}</h5>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            msg: '',
            name: ''
        }
    },
    methods: {
        getdata() {
            axios.get('/api/public/products/dropDownList?page_index=1&show_count=20',
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('Authorization'),
                        page_index: '1',
                        show_count: '20',

                    }
                    //将token存入请求头
                }
            )
                .then(res => {
                    console.log(res);
                    this.msg = res
                    // this.name = res.data.content.data[0].product_name//测试拿去嵌套数据
                    // console.log('----------------------')
                    // console.log(res.data.content.data[0].product_name)

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