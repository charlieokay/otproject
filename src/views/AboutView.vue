<template>

  <h2>测试获取图片 </h2>

  <hr>
  <TestView />

</template>

  <script  lang="ts">
  // import PdfPreview from "../components/PdfPreview.vue"
  // import jsPdf from "../assets/testfile.pdf"//引用pdf路径
  import TestView from "@/components/TestView.vue";
  
  // import PdfPreview from "@/components/PdfPreview.vue";
  
  export default {
    data() {
      return {
        jsPdf: './testfile.pdf'
      };
    },
    components: {
      // PdfPreview,
      TestView
    }
  }
  
  
  </script>