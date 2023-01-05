<template>
  <chartsContainer title="成本降低率">
    <template slot="content">
      <div class="content">
        <div :class="containerClass">
          <number-count-to :value="rate || 0" :decimals="1" suffix="%" />
        </div>
      </div>
    </template>
  </chartsContainer>
</template>

<script>
import NumberCountTo from "@/components/Widgets/NumberCountTo.vue";
import chartsContainer from "@/components/slots/ChartSlot.vue";
export default {
  components: {
    chartsContainer,
    NumberCountTo,
  },
  props: ["rate"],
  data() {
    return {
      containerClass: "circle",
    };
  },
  mounted() {
    setTimeout(() => {
      this.containerClass = "circle-pause";
    }, 2000);
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 4rem;
  font-family: "douyu";
  font-size: 1rem;
  font-weight: bold;
  color: #19e1cb;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    height: 4rem;
    line-height: 2.5rem;
    text-align: center;
    width: 8rem;
    animation: 1s float ease-in-out 2s alternate;
    transition: all 0.2s;
    background-repeat: no-repeat;
    -webkit-text-stroke: 1px black;
  }
}

.circle {
  background-size: 100% 100%;
  background-image: url("../../../assets/images/circle.gif");
}
.circle-pause {
  background-size: 100% 80%;
  background-position: 50% 50%;
  background-image: url("../../../assets/images/circle-pause.png");
}

@keyframes float {
  from {
    line-height: 2.5rem;
  }
  to {
    line-height: 3rem;
  }
}
</style>
