<template>
    <ul class="pdf_pager">
        <li @click="scaleD">
            <p>放大</p>
        </li>
        <li @click="scaleX">
            <p>缩小</p>
        </li>
        <li @click="changePdfPage(0)">
            <p>上一页</p>
        </li>
        <li @click="changePdfPage(1)">
            <p>下一页</p>
        </li>
    </ul>
    <pdf src="/pdf/test.pdf" :page="currentPage" @progress="loadedRatio = $event" @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event" @loaded="loadPdfHandler" ref="wrapper" class="pdf"></pdf>
</template>

<script>
import pdf from 'vue-pdf'
export default {
    methods: {
        // vue-pdf 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
        changePdfPage(val) {
            if (val === 0 && this.currentPage > 1) {
                this.currentPage--;
            }
            if (val === 1 && this.currentPage < this.pageCount) {
                this.currentPage++;
            }
        },
        // pdf加载时
        loadPdfHandler(e) {
            this.currentPage = 1; // 加载的时候先加载第一页
        },
        //放大
        scaleD() {
            this.scale += 5;
            // this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
            this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
        },
        //缩小
        scaleX() {
            if (this.scale == 100) {
                return;
            }
            this.scale += -5;
            this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
            // this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
        }
        // vue-pdf 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    }
}
</script>

<style>
</style>