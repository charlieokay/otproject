<template>
    <!-- 选择签到机台 -->
    <!-- <div v-for="machine in machineList" :key="machine.index">
        {{ machine }}
    </div> -->
    <div>
        选择设备:
        <el-select clearable placeholder="请选择需要签到的机台" @change="checkIn($event)">
            <el-option v-for="list in machineList" :key="list.serialNumber" :value="list.machineName">
                {{ list.machineName }}
            </el-option>
        </el-select>
        <!-- <el-alert :title="已签到" type="success" center show-icon v-show="state" /> -->
        <p>{{ arrMachine }}</p>
        <hr />
        <el-card class="mycard" v-for="item in arrMachine" :key="item.index" :data="item.value">
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
            <!-- 点击签出，逻辑操作实现，将该机台从localStorage中移除，便不会遍历该机台的数据 -->
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
            selectMachine: ''//获取选择框内的机台名称进行赋值
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

        //此处解决了localstorage中的数据永久存储问题
        const arr = localStorage.getItem("machineList")
        this.arrMachine = JSON.parse(arr)
        //TODO：若localStorage中机台为空，则无法获取，需要进行调整

    },
    methods: {
        //签出操作
        checkOut(e) {
            // alert(e)
            this.arrMachine = this.arrMachine.filter((value, index) => {
                return value != e
            })
            localStorage.setItem("machineList", JSON.stringify(this.arrMachine));

            // alert(this.arrMachine)

            // alert(e)//获取到本卡片机台名称
            // let aee = localStorage.getItem("machineList")
            // alert(aee)
            // let list = aee.filter(el => { return el != e })
            // alert(list)
            // alert(aee, '首次获取')
            // aee.forEach((element) => {
            //     // console.log(element)
            //     // return element != e
            //     if (element != e) {
            //         return this.arrMachine
            //         // console.log(e)
            //         // this.arrMachine.remove("e")
            //     }
            // });
            // alert(aee, "第二次获取")

            // localStorage.setItem("machineList", JSON.stringify(aee));

            // this.arrMachine = aee
            // alert(e.machineName)
            // alert('完成签出')
            // localStorage.removeItem();
        },

        //签到操作
        checkIn(e) {
            //e 即为获取的选择框的数据，机台名称
            // alert(e)
            // localStorage.setItem(e, e)

            // console.log(localStorage.getItem(e))
            //将添加到localstorage中的机台添加到machineLocal数组中
            // this.machineLocal.push(localStorage.getItem(e))
            localStorage.setItem("machineList", JSON.stringify(this.arrMachine));
            this.arrMachine.push(e)

            localStorage.setItem("machineList", JSON.stringify(this.arrMachine));
            //TODO1.此处需要进行 if判断 ，是否已经签到，若已经签到（arrMachine已经存在该机台，则反馈该机台已经完成签到）
            //TODO2.签到机台时，会滞后一个机台  

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
.mycard {
    width: 20%;
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
    width: 30%;
}

.outbutton {
    float: right;
}
</style>
  