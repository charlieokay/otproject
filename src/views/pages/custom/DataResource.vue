<template>
    <h2>数据资源获取页面，产品</h2>
    <button @click="getdata">点击获取数据</button>
    <div>
        <h3>dataresource,程序调用，工艺图纸</h3>
        <!-- <p>{{ msg }}</p> -->
        <hr>
        <h5>{{ }}</h5>
    </div>
    //示意数据
    <!-- 
                "id": 15,
                "tenant_id": "sysadmin",
                "create_user": "sysadmin",
                "create_date": "2022-08-15T21:46:49.306942",
                "update_user": "sysadmin",
                "update_date": "2022-08-16T11:24:24.459012",
                "remarks": null,
                "system_lang": null
            },
            {
                "status": 0,
                "version": "-",
                "product_no": "N899219   R3.5",
                "product_name": "O024757",
                "process_route_name": "正式工艺",
                "is_default_route": true,
                "process_id": null,
                "process_name": "机加工",
                "process_order": 1,
                "process_type": "system",
                "make_type": "outsourcing",
                "devices_name": "联聚-43",
                "estimated_processing_hours": 15000,
                "process_resource_columns": null,
                "system_data_resource_columns": null,
                "custom_main_columns": {},
                "custom_data_resource_columns": {
                    "packages": [
                        {
                            "id": "d409b500-2bd5-4235-9856-d3815f475740",
                            "name": "QC-N899219 R3.5.xlsx",
                            "file_name": "QC-N899219 R3.5.xlsx",
                            "file_path": "/_system/N899219   R3.5/正式工艺/机加工/QC-N899219 R3.5.xlsx",
                            "update_date": "2022-08-16T03:25:07.666Z",
                            "columnAttribute": {
                                "columns_type": "custom",
                                "process_type": "system",
                                "resource_type": "packages",
                                "columns_type_str": "客製",
                                "data_support_type": "muti_file",
                                "resource_type_str": "检验打包",
                                "data_support_type_str": "多檔案"
                            }
                        }
                    ],
                    "processes": [
                        {
                            "id": "1296e5dd-cd4c-4e70-a1ce-ef891279e17d",
                            "name": "O024757.NC",
                            "file_name": "O024757.NC",
                            "file_path": "/_system/N899219   R3.5/正式工艺/机加工/O024757.NC",
                            "update_date": "2022-08-16T03:25:19.248Z",
                            "columnAttribute": {
                                "columns_type": "custom",
                                "process_type": "system",
                                "resource_type": "processes",
                                "columns_type_str": "客製",
                                "data_support_type": "muti_file",
                                "resource_type_str": "加工程序",
                                "data_support_type_str": "多檔案"
                            }
                        }
                    ],
                    "drawingfile": [
                        {
                            "id": "7f16c6f8-4c5f-4d83-bbf7-71d6cab465b1",
                            "name": "QC-N899219检测.jpg",
                            "file_name": "QC-N899219检测.jpg",
                            "file_path": "/_system/N899219   R3.5/正式工艺/机加工/QC-N899219检测.jpg",
                            "update_date": "2022-08-16T03:24:55.519Z",
                            "columnAttribute": {
                                "columns_type": "custom",
                                "process_type": "system",
                                "resource_type": "drawingfile",
                                "columns_type_str": "客製",
                                "data_support_type": "muti_file",
                                "resource_type_str": "图档",
                                "data_support_type_str": "多檔案"
                            }
                        }
                    ]
                }, -->
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
            axios.get('/api/public/productSchedule/standard/?page_index=1&show_count=10',
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
                    //for循环，循环每一组数据，存放入一个数组内部一个对象[{***，***，}，{***，***}，{***，***}]
                    // for () {
                    //     res.content.data[].custom_data_resource_columns.processes[].
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