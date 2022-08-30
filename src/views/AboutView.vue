<template>

  <!-- <h2>ceshi </h2> -->
  <PdfPreview />
  <HelloWorld msg="123456" />

</template>

  <script lang="ts">
  // import PDFView from "./components/pdfPreview.vue"
  // import jsPdf from "../components/pdfPreview.vue"
  import HelloWorld from "@/components/HelloWorld.vue";
  import PdfPreview from "@/components/PdfPreview.vue";
  export default {
    data() {
      return {
        filepath: "../assets/testfile.pdf"
      };
    },
    components: { PdfPreview, HelloWorld }
  }
  
  
  </script>