<template>
  <div id="susply">
    <div class="left">
      <img
        src="@/assets/images/susply-left.png"
        alt="图片加载失败"
        title="供应商(家)"
      />
      <div>
        <p><number-count-to :value="supplier || 0" /></p>
        <p>供应商(家)</p>
      </div>
    </div>
    <div class="right">
      <img
        src="@/assets/images/susply-right.png"
        alt="图片加载失败"
        title="外部采购商(家)"
      />
      <div>
        <p><number-count-to :value="outsideBuyer || 0" /></p>
        <p>外部采购商(家)</p>
      </div>
    </div>
  </div>
</template>

<script>
import NumberCountTo from "@/components/Widgets/NumberCountTo.vue";
export default {
  props: ["supplier", "outsideBuyer"],
  components: {
    NumberCountTo,
  },
};
</script>

<style scoped lang="scss">
#susply {
  box-sizing: border-box;
  width: 100%;
  background-image: url("../../../assets/images/suppy-bg.png");
  background-size: 100% 100%;
  & > div {
    box-sizing: border-box;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    width: 7rem;
    height: 3.8rem;
    font-size: 0.45rem;
    background-image: url("../../../assets/images/suppy-child-bg.png");
    background-size: 100% 100%;
    line-height: 0.1rem;
    img {
      width: 2rem;
      height: 2.3rem;
      margin-right: 0.4rem;
    }
    p:first-child {
      font-family: "douyu";
      font-size: 0.7rem;
    }
  }
  & > div:first-child {
    color: #ffd725;
  }
  & > div:last-child {
    color: #0dde79;
  }
}
</style>
