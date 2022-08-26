<template>
    <h2>图档，文档类型，文档名称，产品名称</h2>
    <button @click="getdata">点击获取数据</button>
    <div>
        <h3>dataresource,程序调用，工艺图纸</h3>
        <p>{{ showList }}</p>
        <hr>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            showList: [],
            product_name: '',//产品名称
            devices_name: '',//机台名称
            drawingfile_name: '',
            drawingfile_file_name: '',//文件名
            drawingfile_file_path: '',//文件地址
            resource_type: '',//类型英文
            resource_type_str: ''//类型中文

        }
    },
    // beforeCreate() {
    //     this.showList.push('12345')
    //     console.log(this.showList)
    // },
    methods: {
        getdata() {
            axios.get('/api/public//productSchedule/standard/?page_index=1&show_count=16',
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
                    // console.log(res);
                    // this.msg = res
                    let msg = res.data.content.data[0]
                    let custom_data = res.data.content.data[0].custom_data_resource_columns.drawingfile[0]
                    this.showList.push(msg.devices_name)
                    this.showList.push(msg.product_name)
                    this.showList.push(custom_data.name)
                    this.showList.push(custom_data.file_name)
                    this.showList.push(custom_data.file_path)
                    this.showList.push(custom_data.columnAttribute.resource_type)
                    this.showList.push(custom_data.columnAttribute.resource_type_str)
                    console.log(this.showList)//拿出固定数据

                    // this.msg = res.data.content.data[1]
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