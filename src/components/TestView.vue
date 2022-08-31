<template>
    //测试获取图片
    <div>
        <img style="width:50px;height:50px" />
    </div>

</template>

<script  lang="ts">
import axios from 'axios'
// import { ref } from 'vue'

// const url = ref(res.config.url)

export default {

    created() {
        axios.post('/api/cloud-api/file-management/fileDownload',//API调取准备
            {
                filePath: "/_system/N863613   R3/正式工艺/机加工/N863613检测.jpg",
                responseType: 'blob'
                // params: {
                //     filedata: "/_system/N863613   R3/正式工艺/机加工/N863613检测.jpg"
                // },
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem('Authorization'),
                // },
            })
            .then(res => {
                /* 使用URL.createObjectURL方法获取blob对象的url地址 */
                // imgLists.value = URL.createObjectURL(res.data)
                // url = res.config.url
                console.log(res)
            })
            .catch(err => {
                alert(err)
            })
    }

}
</script>

<style>
</style>