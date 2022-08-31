<template>
    <div>
        <!-- <img style="width:50px;height:50px"
            :src="'https://61.177.38.142:8888/API/V1/Private/SynFactory/FileManagement/Download/_system/N824318   R2.5/正式工艺/机加工/N824318检测.jpg'" /> -->
    </div>

</template>

<script setup lang="ts">
import axios from 'axios'

axios.post('/api/API/V1/Private/SynFactory/FileManagement/Download',
    {
        responseType: "stream",
        params: {
            filedata: "/_system/N863613   R3/正式工艺/机加工/N863613检测.jpg"
        },
        data: {
            filedata: "/_system/N863613   R3/正式工艺/机加工/N863613检测.jpg"
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('Authorization'),
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",


        },
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        alert(err)
    })
</script>

<style>
</style>