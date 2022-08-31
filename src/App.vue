<template>
  <el-tabs type="border-card">

    <el-tab-pane label="签到签出">
      <HomeView />
    </el-tab-pane>

    <el-tab-pane label="工单详情">
      待接入
      <!-- <router-link to="/">Home</router-link> -->
    </el-tab-pane>

    <el-tab-pane label="About">
      <AboutView />
      <!-- <router-link to="/about">功能测试页面</router-link> -->
    </el-tab-pane>

    <el-tab-pane label="Product">
      <ProductView />
    </el-tab-pane>
    <el-tab-pane label="程序调用">
      <ProcessView />
    </el-tab-pane>
    <el-tab-pane label="工艺图纸">
      <DrawingFile />
    </el-tab-pane>

    <el-tab-pane label="登录">
      <LoginView />
    </el-tab-pane>
  </el-tabs>
</template>

<script  lang="ts">
import type { TabsPaneContext } from 'element-plus'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import ProductView from './views/pages/product/ProductView.vue'
import ProcessView from './views/pages/process/ProcessView.vue'
import DrawingFile from './views/pages/drawingfile/DrawingFile.vue'
import LoginView from './views/pages/login/LoginView.vue'
export default {
  components: {
    HomeView,
    AboutView,
    ProductView,
    ProcessView,
    DrawingFile,
    LoginView
  },

  methods: {

  },


}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
