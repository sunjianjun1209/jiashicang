<template>
  <countTo
    :startVal="0"
    :endVal="dataSource"
    :duration="2000"
    :decimals="decimals"
    :prefix="prefix"
    :suffix="suffix"
  />
</template>

<script>
import countTo from "vue-count-to";
export default {
  props: {
    value: {
      type: Number,
      default: () => 1,
    },
    prefix: {
      type: String,
      default: () => "",
    },
    suffix: {
      type: String,
      default: () => "",
    },
    decimals: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      dataSource: 0,
    };
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.dataSource = this.value;
  //   }, 700);
  // },
  watch: {
    value(newval) {
      this.dataSource = newval;
    },
    immediate: true,
  },
  components: {
    countTo,
  },
};
</script>
