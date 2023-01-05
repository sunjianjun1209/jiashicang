<template>
  <div class="">加载中... ...</div>
</template>

<script>
export default {
  created() {
    this.$router.push("/dashboard");
  },
};
</script>

<style scoped>
div {
  display: flex;
  height: 15rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-family: "douyu";
  color: #4bf9ef90;
}
</style>
