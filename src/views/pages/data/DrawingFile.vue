<template>
    <h2>图档，文档类型，文档名称，产品名称</h2>
    <button @click="getdata">点击获取数据</button>
    <div>
        <h3>dataresource,程序调用，工艺图纸</h3>
        <p>{{ msg }}</p>
        <hr>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            product_name: '',
            msg: '',
            lists: ''

        }
    },
    methods: {
        getdata() {
            axios.get('/api/public/productSchedule/standard/?page_index=1&show_count=10',
                {
                    // responseType: 'blob',
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
                    // res.
                    this.msg = res.data.content.data[1]
                    // this.lists.push(res.content.data[2])
                    //for循环，循环每一组数据，存放入一个数组内部一个对象[{***，***，}，{***，***}，{***，***}]
                    // 文档类型 resource_type_str，文档名称 ，产品名称
                    // for () {
                    //     this.product_name = res.content.data[].product_name
                    //     // res.content.data[].custom_data_resource_columns.processes[].
                    // }
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