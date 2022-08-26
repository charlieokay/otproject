<template>
    <h2>图档，文档类型，文档名称，产品名称</h2>
    <button @click="getdata">点击获取数据</button>
    <div>
        <h3>dataresource,程序调用，工艺图纸</h3>
        <p>{{ showLists }}</p>
        <!-- <ul v-for="list in showLists" :key="list['tenant_id']">
            <li>{{ list['product_name'] }}</li>
            <li>{{ list['devices_name'] }}</li>
            <li>{{ list['tenant_id'] }}</li>
            <li>{{ list.drawingfile_name }}</li>
            <li>{{ list.drawingfile_file_name }}</li>
            <li>{{ list.drawingfile_file_path }}</li>
            <li>{{ list.resource_type }}</li>
            <li>{{ list.resource_type_str }}</li>
        </ul> -->
        <hr>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            showLists: [],

            product_name: '',//产品名称
            devices_name: '',//机台名称
            tenant_id: '',
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
                    // let msg = res.data.content.data[0]
                    // let custom_data = res.data.content.data[0].custom_data_resource_columns.drawingfile[0]
                    // this.showList.push(msg.devices_name)
                    // this.showList.push(msg.product_name)
                    // this.showList.push(custom_data.name)
                    // this.showList.push(custom_data.file_name)
                    // this.showList.push(custom_data.file_path)
                    // this.showList.push(custom_data.columnAttribute.resource_type)
                    // this.showList.push(custom_data.columnAttribute.resource_type_str)
                    // //拿出固定数据
                    // console.log(this.showList)

                    //启用两个for循环，进行循环获取数据
                    //第一，通过循环获取data()下所有机台下属信息
                    //第二，通过循环获取客制的模块下属数据信息

                    const data_get = res.data.content.data
                    data_get.forEach((item) => {
                        const devices_name = item.devices_name
                        const product_name = item.product_name
                        const tenant_id = item.tenant_id
                        item?.custom_data_resource_columns?.drawingfile.
                            forEach((item1) => {
                                const name = item1.name
                                const file_name = item1.file_name
                                const file_path = item1.file_path
                                const resource_type_str = item1.columnAttribute.resource_type_str
                                this.showLists.push({ "devices_name": devices_name, "product_name": product_name, "tenant_id": tenant_id, "name": name, "file_name": file_name, "file_path": file_path, "resource_type_str": resource_type_str })
                            })
                    })
                    // data_get.forEach((item) => {
                    //     // 将数据存入数组内对象
                    //     let drawingfile_arr = value.custom_data_resource_columns.drawingfile
                    //     console.log(drawingfile_arr)
                    //     // devices_name: value.devices_name, 
                    //     // product_name: value.product_name,
                    //     // tenant_id: value.tenant_id,


                    //     item.forEach((drawingfile_value) = {
                    //         this.showLists.push({

                    //             drawingfile_name: drawingfile_arr.drawingfile_name, drawingfile_file_name: drawingfile_arr.drawingfile_file_name,
                    //             drawingfile_file_path: drawingfile_arr.drawingfile_file_path, resource_type: drawingfile_arr.resource_type, resource_type_str: drawingfile_arr.resource_type_str

                    //         })
                    //     })
                    //     // : '',
                    //     // : '',//文件名
                    //     // : '',//文件地址
                    //     // : '',//类型英文
                    //     // : ''//类型中文



                    //     // this.showLists.push(drawingfile_arr.drawingfile_name)
                    //     // this.showLists.push(drawingfile_arr.drawingfile_file_name)
                    //     // this.showLists.push(drawingfile_arr.drawingfile_file_path)
                    //     // this.showLists.push(drawingfile_arr.resource_type)
                    //     // this.showLists.push(drawingfile_arr.resource_type_str)
                    //     // console.log(drawingfile_arr)
                    //     // drawingfile_arr.forEach((val, idx, arr) => {
                    //     //     console.log(val)

                    //     // let drawingfile_get_one = value
                    //     // console.log(drawingfile_get_one)
                    //     // value.forEach((index) = > {
                    //     // console.log(index)
                    //     // })

                    //     // this.showLists.push(value.drawingfile_name)
                    //     // this.showLists.push(value.drawingfile_file_name)
                    //     // this.showLists.push(value.drawingfile_file_path)
                    //     // this.showLists.push(value.resource_type)
                    //     // this.showLists.push(value.resource_type_str)

                    //     // console.log('-------------第二层数据')
                    //     // console.log(value)
                    //     // console.log('--------------------')
                    //     // console.log('----------------')
                    //     // })
                    // });

                    // let custom_data = msg.custom_data_resource_columns.drawingfile[j]
                    // for (let i, i++, i < arr.length) {
                    //     console('输出次数')
                    //     // this.showList.push(res.data.content.data[i].devices_name)
                    //     // this.showList.push(res.data.content.data[i].product_name)
                    // }

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