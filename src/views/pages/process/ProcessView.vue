<template>
    <h2>程序调用模块</h2>
    <el-button @click="getdata">获取按钮</el-button>
    <el-row>
        <el-col class="mycard" v-for="list in showLists" :key="list['product_name']" :span="8"
            :offset="list['index'] > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
                <img class="image" src="" />
                <div style="padding: 14px">
                    <!-- <span>{{ list.product_name }}</span><br />
                    <span>{{ list.devices_name }}</span><br />
                    <span>{{ list.tenant_id }}</span><br />
                    <span>{{ list.name }}</span><br />
                    <span>{{ list.file_name }}</span><br />
                    <span>{{ list.file_path }}</span><br />
                    <span>{{ list.resource_type }}</span><br />
                    <span>{{ list.resource_type_str }}</span><br /> -->
                    <span>{{ list['product_name'] }}</span><br />
                    <span>{{ list['devices_name'] }}</span><br />
                    <span>{{ list['tenant_id'] }}</span><br />
                    <span>{{ list['name'] }}</span><br />
                    <span>{{ list['file_name'] }}</span><br />
                    <span>{{ list['file_path'] }}</span><br />
                    <span>{{ list['resource_type'] }}</span><br />
                    <span>{{ list['resource_type_str'] }}</span><br />
                    <div class="bottom">
                        <time class="time">{{ }}</time>
                        <el-button text class="button">Operating</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>

</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            showLists: [],//存储渲染数据
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
                    //启用两个forEach循环，进行循环获取数据
                    //第一，通过循环获取data()下所有机台下属信息
                    //第二，通过循环获取客制的模块下属数据信息

                    const data_get = res.data.content.data
                    data_get.forEach((item) => {
                        const devices_name = item.devices_name
                        const product_name = item.product_name
                        const getDevice = localStorage.getItem("getDevice")
                        if (getDevice === devices_name) {
                            const tenant_id = item.tenant_id
                            item?.custom_data_resource_columns?.processes.
                                forEach((item1) => {
                                    const name = item1.name
                                    const file_name = item1.file_name
                                    const file_path = item1.file_path
                                    const resource_type = item1.columnAttribute.resource_type
                                    const resource_type_str = item1.columnAttribute.resource_type_str

                                    // 将数据存入数组内对象
                                    this.showLists.push({
                                        "devices_name": devices_name,
                                        "product_name": product_name,
                                        "tenant_id": tenant_id,
                                        "name": name,
                                        "file_name": file_name,
                                        "file_path": file_path,
                                        "resource_type": resource_type,
                                        "resource_type_str": resource_type_str
                                    })
                                })
                        }
                    })
                })
                .catch(err => {
                    alert(err)
                })
        }
    }
}
</script>
<style>
.time {
    font-size: 12px;
    color: #999;
}

.mycard {
    width: 30%;
    text-align: left;
    float: left;

}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 10px;
}
</style>