<template>
    <el-tabs v-model="activeName" class="demo-tabs" @click="handleClick">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import type { TabsPaneContext } from 'element-plus'

export default {
    data() {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClick(tab: TabsPaneContext, event: Event) {
            console.log(tab, event)
        }
    }
}


</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>
