<template>
    <h4>工单信息</h4>

    <div class="handle-box">
        <!-- <el-input  v-model="productionProcess" placeholder="名称" ></el-input> -->
        <!-- 监控input变化,filer(productionProcess) -->
        <!-- <el-input  v-model="productionProcess" placeholder="工序数" ></el-input>  -->
        <!-- <el-input v-model="machineName" placeholder="机台ID"></el-input> -->
        <el-select v-model="machineName" clearable placeholder="机台名称">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.machineName" />
        </el-select>
        <el-button type="primary" @click="filter(String(machineName))">搜索</el-button>
    </div>

    <div class="reportwork"></div>

    <div class="workorder">
        <!-- <span>111111{{ listData.percentage }}</span> -->
        <el-table :data="listData" style="width: 100%">
            <el-table-column fixed prop="orderNumber" label="工单号" />
            <el-table-column fixed prop="customerName" label="客户名称" />
            <el-table-column prop="machineID" label="机台ID" />
            <el-table-column prop="machineName" label="机台名称" />
            <el-table-column prop="productName" label="产品名称" />
            <el-table-column prop="partNumber" label="产品料号" />
            <el-table-column prop="requiredThroughput" label="需求工件数" />
            <el-table-column prop="standardProductionTime" label="已完成" />
            <el-table-column prop="percentage" label="工单进度" width="200">
                <el-progress :percentage="percentage" :color="customColors" />
            </el-table-column>
            <el-table-column prop="productionProcess" label="工序" />
            <el-table-column prop="expectedStartDate" label="预开工日期" />
            <el-table-column prop="orderExpectedDue" label="预完工日期" />

            <el-table-column prop="state" label="订单状态" />
        </el-table>

    </div>

    <div class="workorderstatus"></div>
</template>
  
  <script>
import axios from "axios";

//遍历API获取想要的字段
let DataOrdList = [];
const maplist = (parma) => {
    parma.forEach((orderList) => {
        const orderExpectedDue = orderList.orderExpectedDue ? orderList.orderExpectedDue : "";//
        const orderNumber = orderList.orderNumber ? orderList.orderNumber : "";
        const customerName = orderList.customerName ? orderList.customerName : "";
        orderList.productionOrderList.forEach((productionOrderList) => {
            const productName = productionOrderList.productName;
            const partNumber = productionOrderList.partNumber;

            productionOrderList.workOrderContent.forEach((workOrderContent) => {
                const requiredThroughput = workOrderContent.requiredThroughput;
                const standardProductionTime = workOrderContent.standardProductionTime;
                const productionProcess = workOrderContent.productionProcess;
                const expectedStartDate = workOrderContent.expectedStartDate;//
                const machineID = workOrderContent.machineInfo.machineID;
                const machineName = workOrderContent.machineInfo.machineName;
                DataOrdList.push({
                    orderExpectedDue: orderExpectedDue,//预计完工日期
                    orderNumber: orderNumber,//订单号
                    customerName: customerName,//客户名称
                    productName: productName,//产品名称
                    partNumber: partNumber,//产品料号
                    expectedStartDate: expectedStartDate,//预计开工日期
                    requiredThroughput: requiredThroughput,//需求工件数
                    standardProductionTime: standardProductionTime,//已加工工件数
                    // percentage:(standardProductionTime/requiredThroughput)*100,//工单进度
                    productionProcess: productionProcess,//工序
                    machineID: machineID,//机台ID
                    machineName: machineName,//机台名称
                    // state:state//订单状态
                });
            });
        });
    });
    // console.log("DataOrdList", DataOrdList);
    return DataOrdList;
};

//判断工单状态、当日时间戳、预计开工日期、预计完工日期
// const nowTime = Math.round(new Date() / 1000);
//         const state = 0;
//         if(nowTime < this.expectedStartDate){
//              this.state = 1
//         } else if(nowTime >= this.expectedStartDate && nowTime < this.orderExpectedDue ){
//             this.state = 2
//         } else{
//           this.state = 3
//         }

export default {

    data() {
        return {
            listData: [], //展示数据数组
            productionProcess: "",
            machineID: "",
            // productionProcessList:[],
            Initiallist: [],
            machineName: "",
            options: [],//选择机台下拉框
            percentage: "80",
            customColors: [
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#6f7ad3', percentage: 100 },
            ],
        };
    },


    //初始化列表
    beforeCreate() {
        axios
            .post("api/v1/Private/SynFactory/ProductionPlan/Search", {
                // ProductNamePartNo: "",
                count: 200,
                // expectedStartDateEnd: 1669075200000,
                // expectedStartDateStart: 1653696000000,
                // lastModifyTimeEndDate: null,
                // lastModifyTimeStartDate: null,
                machineIDList: [],
                // multiSNSearch: "",
                productionProcessList: [],
                startIndex: 0,

                // onDownloadProgress(a){
                //     this.percentage=Math.round(a.standardProductionTime.loaded / a.requiredThroughput * 100);
                // }
            })
            .then((res) => {
                console.log(res.data.content.orderList)
                //console.log("时间",res.data.content.orderList.productionOrderList.workOrderContent);
                // console.log(this.expectedStartDate);
                // this.$moment(this.orderExpectedDue).tz('Australia/Sydney').format('MMMM Do YYYY, h:mm:ss a')

                res.data.content.orderList.forEach((item, item1) => {
                    var date = new Date(parseInt(item.orderExpectedDue));
                    item.orderExpectedDue = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}
                                          ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

                    var date1 = new Date(parseInt(item1.expectedStartDate));
                    item.expectedStartDate = `${date1.getFullYear()}/${date1.getMonth() + 1}/${date1.getDay()}
                                          ${date1.getHours()}:${date1.getMinutes()}:${date1.getSeconds()}`;

                }),

                    this.Initiallist = maplist(res.data.content.orderList);
                this.listData = this.Initiallist;

                console.log(this.listData);
            })
            .catch((err) => {
                alert(err);
            });
    },
    beforeUpdate() {
        const machineName = localStorage.getItem("getDevice")
        this.listData = this.Initiallist.filter((temp) => {
            //console.log(temp.productionProcessList)
            //console.log(temp.machineIDList);
            //=== 严格比较
            return temp.machineName == machineName;
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
        //根据机台名称筛选列表
        // filter(machineName) {
        //     console.log("machineName", machineName);
        //     // console.log(this.Initiatllist)
        //     //filter((t)=>{return (条件)})
        //     this.listData = this.Initiallist.filter((temp) => {
        //         //console.log(temp.productionProcessList)
        //         //console.log(temp.machineIDList);
        //         //=== 严格比较
        //         return temp.machineName == machineName;
        //     });

        //     // console.log("listData", this.listData);
        //     // console.log(productionProcess)
        //     //  console.log(this.listData)
        // },

    },
};

</script>
  <style>
  el-table-column {
      text-align: center;
  }
  </style>
  