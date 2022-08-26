<template>
  <el-tabs type="border-card">
    <el-tab-pane label="User" @click="tochange">User</el-tab-pane>
    <el-tab-pane label="Config">Config</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
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
      // console.log(tab, event)
    },
    tochange() {
      console.log('.......')
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

