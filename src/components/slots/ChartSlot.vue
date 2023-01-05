<template>
  <div id="chart-slot">
    <header>{{ title }}</header>
    <div class="content-container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#chart-slot {
  width: 100%;

  header {
    box-sizing: border-box;
    padding-left: 1.2rem;
    height: 1rem;
    width: 100%;
    font-family: "douyu";
    font-size: 0.45rem;
    // color: #dfeef3;
    // color: #000000;
    line-height: 1.15rem;
    background-image: url("../../assets/images/chart-slot-header.png");
    background-repeat: no-repeat;
    background-size: 80% 100%;
    background-position: 0 0;
  }
  .content-container {
    box-sizing: border-box;
    padding: 0.4rem 0;
  }
}
</style>

<script>
import { string } from "clipboard";

export default {
  props: {
    title: {
      type: string,
      default: () => "标题",
    },
  },
};
</script>
