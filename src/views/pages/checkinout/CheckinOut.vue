<template>
    <!-- 选择签到机台 -->
    <div>
        选择设备:
        <el-tree-select v-model="value" :data="data" :render-after-expand="false" show-checkbox>
        </el-tree-select>
        <el-button type="success">签到</el-button>
    </div>
    <hr>

    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>机台名称:联聚-33</span>
                <el-tag class="ml-2" type="info" text>状态</el-tag>
            </div>
        </template>
        <div class="text item">
            <span>操作人员: {{}}</span><br>
            <span>当前工单: {{}}</span><br>
            <span>产品名称: {{}}</span><br />
            <span>加工程序: {{}}</span><br />
            <span>签到时间: {{}}</span><br />
        </div>
        <!-- 点击签出，逻辑操作实现，将该机台从虚拟mock中移除，便不会遍历该机台的数据 -->
        <el-button class="outbutton" type="warning">签出</el-button>
    </el-card>

</template>
<script lang="ts">
export default {
    data() {
        return {
            value: '',
            data: [
                {
                    value: '1',
                    label: '联聚',
                    children: [
                        {
                            value: '1-1',
                            label: '一区',
                            children: [
                                {
                                    value: '1-1-1',
                                    label: '联聚-23',
                                },
                            ],
                        },
                        {
                            value: '1-2',
                            label: '二区',
                            children: [
                                {
                                    value: '1-2-1',
                                    label: '联聚-33',
                                },
                                {
                                    value: '1-2-2',
                                    label: '联聚-34',
                                },
                                {
                                    value: '1-2-3',
                                    label: '联聚-35',
                                }
                            ],
                        },
                        {
                            value: '1-3',
                            label: '三区',
                            children: [
                                {
                                    value: '1-3-1',
                                    label: '联聚-43',
                                },
                            ],
                        },
                    ],
                },

            ]
        }
    },


}

</script>
  
  <style>
  .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  
  .text {
      font-size: 14px;
  }
  
  .item {
      margin-bottom: 18px;
  }
  
  .box-card {
      width: 35%;
  }
  
  .outbutton {
      text-align: right;
  }
  </style>
  