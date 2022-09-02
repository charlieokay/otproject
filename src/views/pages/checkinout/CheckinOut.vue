<template>
    <!-- 选择签到机台 -->
    <!-- <div v-for="machine in machineList" :key="machine.index">
        {{ machine }}
    </div> -->
    <div>
        <el-select class="select" clearable placeholder="请选择需要签到的机台" @change="checkIn($event)">
            <el-option v-for="list in machineList" :key="list['serialNumber']" :value="list['machineName']">
                {{ list['machineName'] }}
            </el-option>
        </el-select>
        <hr />
        <el-card class="mycard" v-for="item in arrMachine" :key="item['index']" :data="item['value']">
            <template #header>
                <div class="card-header">
                    <span>{{ item }}</span>
                    <el-tag class="ml-2" type="info" text>状态</el-tag>
                </div>
            </template>
            <div>
                <span>操作人员: {{}}</span><br>
                <span>当前工单: {{}}</span><br>
                <span>产品名称: {{}}</span><br />
                <span>加工程序: {{}}</span><br />
                <span>签到时间: {{ checkTime }}</span><br />
            </div>
            <br>

            <!-- :class="{ 'active1': isright }" -->
            <!-- 点击签出，逻辑操作实现，将该机台从localStorage中移除，便不会遍历该机台的数据 -->
            <el-button class="getdevice" type="warning" data-msg="tototo" @click="getDevice(item)">选中</el-button>
            <el-button class="outbutton" type="warning" data-msg="tototo" @click="checkOut(item)">签出</el-button>
        </el-card>


    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            //收录数据库内部全部机台名称，machineName,serialNumber
            machineList: [],
            // showMachineList: [],//展示签到机台列表
            arrMachine: [],//初始化存入LocalStorage中数据localStorage.getItem("machineList")
            selectMachine: '',//获取选择框内的机台名称进行赋值
            isright: true,//
            checkTime: []
        }
    },
    //获取数据库内全部设备
    created() {
        axios
            .post("api/v1/Private/SynFactory/EquipmentList", {
                count: 100,
                equipmentName: "",
                equipmentType: 0,
                groupID: "",
                startIndex: 0
            })
            .then((res) => {
                console.log(res)
                res.data.content.data.forEach((item) => {
                    const machineName = item.machineName;//机台名称
                    const serialNumber = item.serialNumber;//机台编号

                    this.machineList.push(
                        {
                            "machineName": machineName,
                            "serialNumber": serialNumber
                        }
                    )
                    // console.log(item)
                });
                // console.log(res.data.content.data)
            })
            .catch((err) => {
                alert(err);
            });
        //此处解决了localstorage中的数据永久存储问题
        const arr = localStorage.getItem("machineList")
        this.arrMachine = JSON.parse(arr)
        //TODO：若localStorage中机台为空，则无法获取，需要进行调整
        //签到时间
        // this.gettime()
    },
    methods: {
        //签到操作
        checkIn(e) {
            //e 即为获取的选择框的数据，机台名称
            //将添加到localstorage中的机台添加到machineLocal数组中
            // this.machineLocal.push(localStorage.getItem(e))
            localStorage.setItem("machineList", JSON.stringify(this.arrMachine));
            this.arrMachine.push(e)

            localStorage.setItem("machineList", JSON.stringify(this.arrMachine));
            //TODO1.此处需要进行 if判断 ，是否已经签到，若已经签到（arrMachine已经
        },
        //签出操作
        checkOut(e) {
            //TODO添加判断，是否确认签出
            // alert(e)
            this.arrMachine = this.arrMachine.filter((value, index) => {
                return value != e
            })
            localStorage.setItem("machineList", JSON.stringify(this.arrMachine));
        },

        getDevice(item) {
            // alert(item)
            localStorage.setItem("getDevice", item);
        }

    }
}
</script>

<style>
.customstyle {
    background: v-bind(background);
    border: v-bind(border);
    /* background: #6dc377;
    border: 5px solid #1f4693; */
}

.active1 {
    background-color: rgba(44, 145, 217, 0.855);
}


.mycard {
    width: 20%;
    text-align: left;
    float: left;
    margin-left: 15px;
    margin-bottom: 5px;
}

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
    width: 20%;
}

/* .select {
    float: left
} */

.outbutton {
    float: right;
}
</style>
  