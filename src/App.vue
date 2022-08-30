<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">功能测试页面</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/product">Product</router-link> |
    <router-link to="/process">程序调用</router-link> |
    <router-link to="/drawingfile">工艺图纸</router-link>

  </nav>
  <router-view />
</template>
<script lang="ts">

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
