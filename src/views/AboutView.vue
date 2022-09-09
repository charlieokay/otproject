<!-- 引用组件
<template>
  <div>
    <el-dialog
      title="预览"
      :visible.sync="previewFileShow"
      width="80%"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleClose"
      style="height: auto"
    >
      <PreviewFile :file="previewFile" v-if="previewFileShow"></PreviewFile>
    </el-dialog>
  </div>
</template>

<script>
export default {
  //data声明组件
  data() {
    return {
      previewFile: {},
      // 传递的参数默认预览框是关闭状态,
      previewFileShow: false,
    };
  },
  methods: {
    //关闭组件
    handleClose() {
      this.previewFileShow = true;
    },
    //点击预览触发的事件
    preview(index, row) {
      this.previewFileShow = true;
      this.previewFile.fileName = row.fileName;
      this.previewFile.downloadUrl = row.url;
    },
  },
};
</script> -->
