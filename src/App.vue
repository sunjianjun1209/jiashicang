<template>
  <div id="app">
    <div class="container">
      <header></header>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      formId: 1,
      // loginForm: {
      //   username: "zhangqi",
      //   password: "zhangqi",
      // },
    };
  },
  created() {
    // 微信用户免登陆
    // var ua = navigator.userAgent.toLowerCase(); // 将用户代理头的值转为小写
    // if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //   this.$store.dispatch("loginNoKaptcha", this.loginForm).then(() => {
    //     this.$router.push({ path: "/" });
    //   });
    // }
  },
};
</script>

<style lang="scss" scoped>
#app {
  background-color: #000000;
  width: 100%;
  color: #fff;
  & > .container > header {
    height: 2rem;
  }
}
</style>
