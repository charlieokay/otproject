<!-- <template>
    <div class="pdf-preview">

    </div>
    <div class="pdf-wrap">
        <vue-pdf-embed :source="state.source" :style="scaleFun" class="vue-pdf-embed" :page="state.pageNum" />
    </div>

</template>
<script lang="ts">
import { reactive, onMounted, computed } from "vue";
const props = defineProps({
    pdfUrl: {
        type: String,
        required: true,

    }
})

export default {
    data() {
        return {
            state: {
                source: props.pdfUrl, //预览pdf文件地址
                pageNum: 1, //当前页面
                scale: 1, // 缩放比例
                numPages: 0, // 总页数
            }
        }
    },
}

onMounted(() => {
});


</script>
<style lang="css" scoped>
.pdf-preview {
    position: relative;
    height: 100vh;
    padding: 20px 0;
    box-sizing: border-box;
    background: rgb(66, 66, 66);
}

.vue-pdf-embed {
    text-align: center;
    width: 515px;
    border: 1px solid #e5e5e5;
    margin: 0 auto;
    box-sizing: border-box;
}
</style> -->

//vue3预览pdf
<template>
    <div>
        <!-- <h4>{{  source  }}</h4>
        <h3>ceshi</h3> -->

        <div>
            <el-button @click="prev">上一页</el-button>
            <el-button @click="next">下一页</el-button>
            <el-button @click="zoomA">放大</el-button>
            <el-button @click="zoomB">缩小</el-button>
        </div>

        <vue-pdf-embed :source="source" class="vue-pdf-embed" :style="scaleFun" :page="pageNum" />



    </div>
</template>
 
<script lang="ts">

import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs"; // 获得总页数
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'PdfPreview',
    components: {
        VuePdfEmbed,
    },
    data() {
        return {
            source:
                "../assets/testfile.pdf",
            pageNum: 1,
            scale: 1,  // 缩放比例
            numPages: 0, // 总页数
        };
    },
    mounted() {
        const loadingTask = createLoadingTask(this.source);
        loadingTask.promise.then((pdf) => {
            this.numPages = pdf.numPages;
        });
    },
    computed: {
        scaleFun(index) { // 缩放
            var scale = this.scale;
            return `transform:scale(${scale})`;
        },
    },
    methods: {
        prev() {
            if (this.pageNum > 1) {
                this.pageNum -= 1;
            }
        },
        next() {
            if (this.pageNum < this.numPages) {
                this.pageNum += 1;
            }
        },
        zoomA() {
            this.scale += 0.1;
        },
        zoomB() {
            this.scale -= 0.1;
        },
    },
});
</script>
 
<style scoped>
.div {
    top: 0;
    position: fixed;
    z-index: 999;
}

.vue-pdf-embed {
    text-align: center;
}
</style>