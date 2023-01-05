<template>
  <chartsContainer title="电子签章">
    <template slot="content">
      <div id="electronic-signature">
        <!-- <div class="number">
          <p>销售数量</p>
          <p><number-count-to :value="count || 0" />个</p>
        </div> -->
        <div class="finance">
          <!-- <p>销售金额</p> -->
          <p>客户数量</p>
          <p>
            <!-- <number-count-to :decimals="decimals" :value="account || 0" />万元-->
            <number-count-to :decimals="0" :value="account || 0" />家
          </p>
        </div>
      </div>
    </template>
  </chartsContainer>
</template>

<script>
import { caStatByYear } from "@/api/boardApi";
import NumberCountTo from "@/components/Widgets/NumberCountTo.vue";
import chartsContainer from "@/components/slots/ChartSlot.vue";
export default {
  data() {
    return {
      count: 0,
      account: 0,
      decimals: 1,
    };
  },
  created() {
    // caStatByYear().then((res) => {
    //   if (res.data.data.amount && res.data.data.amount.length > 9) {
    //     this.decimals = 0;
    //   }
    //   this.count = Number(res.data.data.count);
    //   // this.account = Number(res.data.data.amount) / 10000;
    //   this.account = Number(res.data.data.amount);
    // });
  },
  components: {
    chartsContainer,
    NumberCountTo,
  },
};
</script>

<style scoped lang="scss">
#electronic-signature {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    box-sizing: border-box;
    padding: 0.2rem 0 0 0.7rem;
    height: 3rem;
    width: 7.2rem;
    background-size: 100% 100%;
    font-size: 0.4rem;
    line-height: 0.6rem;
    p:first-child {
      margin-left: 0.2rem;
    }
    span {
      display: inline-block;
      font-family: "douyu";
      font-size: 0.7rem;
      min-width: 3rem;
      color: #23fffc;
      margin-right: 0.1rem;
    }
  }
  .number {
    background-image: url("../../../assets/images/elesignature-left.png");
  }
  .finance {
    background-image: url("../../../assets/images/elesignature-right.png");
    span {
      color: #23b9ff;
    }
  }
}
</style>
