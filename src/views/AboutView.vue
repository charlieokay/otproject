<template>

  <h2>ceshi </h2>
  <PdfPreview :pdfUrl="jsPdf" />

</template>

  <script  lang="ts">
  import PdfPreview from "../components/PdfPreview.vue"
  // import jsPdf from "../assets/testfile.pdf"//引用pdf路径
  
  // import PdfPreview from "@/components/PdfPreview.vue";
  
  export default {
    data() {
      return {
        jsPdf: './testfile.pdf'
      };
    },
    components: {
      PdfPreview
    }
  }
  
  
  </script>