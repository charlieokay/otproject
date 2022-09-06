<template>
  <div @click="screen">
    <el-button type="info" plain @click="refresh">刷新工单数据</el-button>
    <h4>工单信息</h4>
    <div class="handle-box"></div>
    <div class="reportwork"></div>
    <div class="workorder">
      <el-table :data="listData" style="width: 100%" height="600">
        <el-table-column fixed prop="orderNumber" label="工单号" />
        <el-table-column fixed prop="customerName" label="客户名称" />
        <el-table-column prop="machineID" label="机台ID" />
        <el-table-column prop="machineName" label="机台名称" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="partNumber" label="产品料号" />
        <el-table-column prop="requiredThroughput" label="需求工件数" />
        <el-table-column prop="standardProductionTime" label="已完成" />

        <!-- 进度条显示 -->
        <el-table-column prop="percentage" label="工单进度" width="200">
          <template #default="scope">
            <el-progress
              type="line"
              :stroke-width="15"
              :percentage="scope.row.percentage"
              :color="customColors"
            ></el-progress>
          </template>
        </el-table-column>

        <el-table-column prop="productionProcess" label="工序" />
        <el-table-column prop="expectedStartDate" label="预开工日期" />
        <el-table-column prop="orderExpectedDue" label="预完工日期" />

        <el-table-column prop="state" label="订单状态" />
      </el-table>
    </div>

    <div class="workorderstatus"></div>
  </div>
</template>

<script>
import axios from "axios";
import {inject} from "vue";

//遍历API获取想要的字段
let DataOrdList = [];
//时间戳转化年月日形式函数
const timetranslate = (value) => {
  if (typeof value == "undefined") {
    return "";
  } else {
    let date = new Date(parseInt(value));
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
  }
};

export default {
  data() {
    return {
      listData: [], //展示数据数组
      productionProcess: "",
      machineID: "",
      // productionProcessList:[],
      Initiallist: [],
      machineName: "", //选择几台获取数据
      options: [], //选择机台下拉框
      process: 69,

      percentage: 50,

      customColors: [
        {color: "#f56c6c", percentage: 20.0},
        {color: "#e6a23c", percentage: 40.0},
        {color: "#5cb87a", percentage: 60.0},
        {color: "#1989fa", percentage: 80.0},
        {color: "#6f7ad3", percentage: 100.0},
      ],
      state: "",
      DataOrdList: [],
    };
  },
  setup() {
    const refresh = inject("reload");
    //在方法体中的调用方法
    // refresh();
    return {
      refresh,
    };
  },
  //初始化列表
  beforeCreate() {
    axios
      .post("api/v1/Private/SynFactory/ProductionPlan/Search", {
        count: 200,
        machineIDList: [],
        productionProcessList: [],
        startIndex: 0,
      })
      .then((res) => {
        res.data.content.orderList.forEach((element) => {
          const orderExpectedDue = timetranslate(element.orderExpectedDue); //
          // console.log('预期完成时间', orderExpectedDue)
          const orderNumber = element.orderNumber;
          const customerName = element.customerName;
          element.productionOrderList.forEach((el) => {
            const productName = el.productName;
            const partNumber = el.partNumber;
            el.workOrderContent.forEach((workOrderContent) => {
              const requiredThroughput = workOrderContent.requiredThroughput;
              const standardProductionTime =
                workOrderContent.standardProductionTime;
              const productionProcess = workOrderContent.productionProcess;
              const expectedStartDate = timetranslate(
                workOrderContent.expectedStartDate
              ); //调用函数将时间戳转化为年月日时间
              const machineID = workOrderContent.machineInfo.machineID;
              const machineName = workOrderContent.machineInfo.machineName;
              const percentage = (
                (standardProductionTime / requiredThroughput) *
                100
              ).toFixed(2);
              // console.log(percentage)
              //TODO进度条显示，不能够显示真实数据

              //TODO 实际开工日期，需要从progress拿到   API接口：api/v1/Private/SynFactory/ProductionPlan/Progress
              //workerOrderSerialNumber: "20220906001401001" 工单号码
              //实际进度 actualProgress: 0.55
              //实际开始时间 actualStartDate: 1662447855000
              //   this.progressPercent = percentage;
              //判断工单状态、当日时间戳、预计开工日期、预计完工日期
              const nowTime = new Date().getTime();

              //状态确定
              const state =
                nowTime > this.orderExpectedDue
                  ? "逾期完工"
                  : nowTime <= this.expectedStartDate
                  ? "按时开工"
                  : "逾期开工";

              this.DataOrdList.push({
                orderExpectedDue: orderExpectedDue, //预计完工日期
                orderNumber: orderNumber, //订单号
                customerName: customerName, //客户名称
                productName: productName, //产品名称
                partNumber: partNumber, //产品料号
                expectedStartDate: expectedStartDate, //预计开工日期
                requiredThroughput: requiredThroughput, //需求工件数
                standardProductionTime: standardProductionTime, //已加工工件数

                percentage: percentage, //工单进度

                productionProcess: productionProcess, //工序
                machineID: machineID, //机台ID
                machineName: machineName, //机台名称
                state: state, //订单状态
              });
              this.listData = this.DataOrdList;
              this.progressPercent = percentage;
            });
          });
        });
      })
      .catch((err) => {
        alert(err);
      });
  },

  //1. 先区分筛选前的数据 初始 = []和筛选后的数据 listData = []
  //2. call api把值放入筛选前的数组
  //3. 写一个filer方法，把筛选后的值放入 listData()
  //4. 监控input变化,filer(productionProcess)，呼叫filer方法并传入productionProcess参数
  //5. render listData[]

  //1. 先区分筛选前的数据 初始 = []和筛选后的数据 listData = []
  //2. call api把值放入筛选前的数组
  //3. 写一个find方法，把值放入listData
  //4. 监控input变化,filer(productionProcess)，呼叫filer方法并传入productionProcess参数
  //5. render listData[]

  methods: {
    screen() {
      this.machineName = localStorage.getItem("getDevice");
      this.listData = this.DataOrdList.filter((temp) => {
        return temp.machineName == this.machineName;
      });
    },
  },
};
</script>
<style>
el-table-column {
  text-align: center;
}
</style>
