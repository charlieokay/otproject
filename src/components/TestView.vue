<template>
    <el-button @click="preview">测试按钮</el-button>

    <div class="demo-image__preview">
        <el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcLists" :initial-index="4"
            fit="cover" />
    </div>

</template>
  
  <script lang="ts">
import axios from 'axios';

export default {
    data() {
        return {
            url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            filePath: "/_system/N863613   R3/正式工艺/机加工/N863613检测.jpg",
            srcLists:
                [
                    '../assets/墨镜男孩.jpg',
                    '../assets/向日葵花束.jpeg',
                    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
                ]
        }
    },
    methods: {
        preview() {
            axios.post('/api/cloud-api/file-management/fileDownload',//API调取准备
                {
                    filePath: "/_system/N863613   R3/正式工艺/机加工/N863613检测.jpg",
                    responseType: "arraybuffer",//这里是声明期望返回的数据类型
                })
                .then(res => {
                    console.log(res.config.url)
                    const resurl = res.config.url

                })
                .catch(err => {
                    alert(err)
                })
        },
    }

}



</script>
  
  <style scoped>
  .demo-image__error .image-slot {
      font-size: 30px;
  }
  
  .demo-image__error .image-slot .el-icon {
      font-size: 30px;
  }
  
  .demo-image__error .el-image {
      width: 100%;
      height: 200px;
  }
  </style>
  
<!-- 


<template>
    //测试获取图片
    <div>
        <el-button @click="preview">预览</el-button>
        <img style="width:50px; height:50px" :src="imgUrl" />
    </div>

</template>

<script  lang="ts">
import axios from 'axios'
// import { ref } from 'vue'
// const url = ref(res.config.url)

export default {
    data() {
        return {
            imgUrl: ''
        }
    },
    methods: {
        // preview() {

        // }
    },

    created() {
        axios.post('/api/cloud-api/file-management/fileDownload',//API调取准备
            {
                filePath: "/_system/N863613   R3/正式工艺/机加工/N863613检测.jpg",
                responseType: "arraybuffer",//这里是声明期望返回的数据类型
            })
            .then(res => {
                // return 'data:image/png; base64,' + window.btoa(
                //     new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                // );
                return 'data:image/png;base64,' + window.btoa(
                    new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            }).then(ress => {
                this.imgUrl = ress
            })
            .catch(err => {
                alert(err)
            })
    }

}
</script>

<style>
</style> -->