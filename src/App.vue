<template>
  <el-tabs type="border-card">
    <el-tab-pane label="签到签出">
      <CheckinOut />
    </el-tab-pane>

    <el-tab-pane label="工单详情">
      <OrderList />
    </el-tab-pane>

    <!-- <el-tab-pane label="测试">
      <AboutView />
    </el-tab-pane> -->

    <!-- <el-tab-pane label="Product">
      <ProductView />
    </el-tab-pane> -->

    <el-tab-pane label="程序调用">
      <ProcessView />
    </el-tab-pane>
    <el-tab-pane label="工艺图纸">
      <DrawingFile v-if="isRouterAlive" />
      <!-- 进行v-if判断，完成刷新 -->
    </el-tab-pane>

    <el-tab-pane label="登录">
      <LoginView />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import type {TabsPaneContext} from "element-plus";
import CheckinOut from "./views/pages/checkinout/CheckinOut.vue";
// import HomeView from './views/HomeView.vue'
// import AboutView from './views/AboutView.vue'
// import ProductView from './views/pages/product/ProductView.vue'
import ProcessView from "./views/pages/process/ProcessView.vue";
import DrawingFile from "./views/pages/drawingfile/DrawingFile.vue";
import LoginView from "./views/pages/login/LoginView.vue";
import OrderList from "./views/pages/orderlist/OrderList.vue";
import {onMounted, ref, watch, nextTick, provide} from "vue"; //要引入方法

export default {
  components: {
    CheckinOut,
    // HomeView,
    // AboutView,
    // ProductView,
    ProcessView,
    DrawingFile,
    LoginView,
    OrderList,
  },
  setup() {
    // 局部组件刷新
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide("reload", reload);
    return {
      isRouterAlive,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.demo-tabs > .el-tabs__content {
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
