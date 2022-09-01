<template>
    <!-- 选择签到机台 -->
    <!-- <div v-for="machine in machineList" :key="machine.index">
        {{ machine }}
    </div> -->
    <div>
        选择设备:
        <el-select clearable placeholder="Select" @change="getSelect($event)">
            <el-option v-for="list in machineList" :key="list.serialNumber" :value="list.machineName">
                {{ list.machineName }}
            </el-option>
            <!-- <el-button type="success" @click="checkin">签到</el-button> -->
        </el-select>
        <p>{{ machineLocal }}</p>

        <!-- <el-select v-model="value" clearable placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select> -->

    </div>
    <hr>

    <el-card class="box-card" v-for="item in showMachineList" :key="item.index">
        <template #header>
            <div class="card-header">
                <span>{{ item }}</span>
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

<script>
import axios from 'axios'
export default {
    data() {
        return {
            //收录数据库内部全部机台名称，machineName,serialNumber
            machineList: [],
            showMachineList: [],//展示签到机台列表

            arrMachine: [],//初始化存入LocalStorage中数据
        }
    },
    //获取数据库内全部设备
    created() {
        axios
            .post("api/v1/Private/SynFactory/EquipmentList", {
                count: 10,
                equipmentName: "",
                equipmentType: 0,
                groupID: "",
                startIndex: 0
            })
            .then((res) => {
                res.data.content.data.forEach((item) => {
                    const machineName = item.machineName;//机台名称
                    const serialNumber = item.serialNumber;//机台编号
                    this.machineList.push(
                        {
                            "machineName": machineName,
                            "serialNumber": serialNumber
                        }
                    )
                    console.log(item)
                });
                console.log(res.data.content.data)
            })
            .catch((err) => {
                alert(err);
            });
    },
    methods: {
        checkin() {
            alert('选择')
        },

        getSelect(e) {
            //e 即为获取的选择框的数据，机台名称
            // alert(e)e
            // localStorage.setItem(e, e)

            // console.log(localStorage.getItem(e))
            //将添加到localstorage中的机台添加到machineLocal数组中
            // this.machineLocal.push(localStorage.getItem(e))

            localStorage.setItem("machineList", JSON.stringify(this.arrMachine));
            this.arrMachine.push(e)
            //TODO：此处需要进行if判断，是否已经签到，若已经签到（arrMachine已经存在该机台，则反馈该机台已经完成签到）
            this.showMachineList = this.arrMachine//将localstorage中签到机台数据赋值给签到机台展示列表数组


            // this.machineLocal.push(e)
            // localStorage.setItem("List", JSON.stringify(e))
            // const data = localStorage.getItem("List");
            // // console.log(applicationItem)
            // const dataList = JSON.parse(data);
            // console.log(dataList);
            // console.log(typeof dataList)
        },
    }
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
  