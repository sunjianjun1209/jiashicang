<template>
  <div class="index-container">
    <div class="left">
      <!-- 成本降低率 -->
      <cost-reduction-rate :rate="reduction" />
      <!-- 银行放款 -->
      <bank-loan />
    </div>
    <div class="center">
      <!-- 仪表盘 -->
      <dash-board :gmv="yearGmvAmount" :outside-gmv="otherGmv" />
      <!-- 供应采购 -->
      <supply-purchasing :supplier="supplier" :outside-buyer="anotherBuyer" />
    </div>
    <div class="right">
      <!-- 电子签章 -->
      <electronic-signature />
      <!-- 电子保函 -->
      <electronic-letter-of-guarantee />
    </div>
    <div class="bottom">
      <!-- 招标数据 -->
      <bidding-data />
      <!-- 询价数据 -->
      <inquiry-data />
    </div>
  </div>
</template>

<script>
import costReductionRate from "@/views/indexPage/left/costReductionRate.vue";
import electronicLetterOfGuarantee from "@/views/indexPage/left/electronicLetterOfGuarantee.vue";
import dashBoard from "@/views/indexPage/center/dashBoard.vue";
import supplyPurchasing from "@/views/indexPage/center/supplyPurchasing.vue";
import bankLoan from "@/views/indexPage/right/bankLoan.vue";
import electronicSignature from "@/views/indexPage/right/electronicSignature.vue";
import biddingData from "@/views/indexPage/bottom/biddingData.vue";
import inquiryData from "@/views/indexPage/bottom/inquiryData.vue";
import { getStat } from "@/api/boardApi";

export default {
  components: {
    costReductionRate,
    electronicLetterOfGuarantee,
    dashBoard,
    supplyPurchasing,
    bankLoan,
    electronicSignature,
    biddingData,
    inquiryData,
  },
  data() {
    return {
      userTotal: 0,
      goodsTotal: 0,
      allTotal: undefined,
      yearTotal: undefined,
      allSupplierTotal: undefined,
      yearSupplierTotal: undefined,
      // gmv
      yearGmvAmount: 0,
      // 外部gmv
      otherGmv: 0,
      // 外部采购商
      anotherBuyer: 0,
      // 成本降低率
      reduction: 0,
      // 供应商
      supplier: 0,
      screenWidth: document.body.clientWidth,
    };
  },
  watch: {
    screenWidth: {
      handler(newval, oldval) {
        if (
          confirm(
            "检测到浏览页面尺寸变化，通过刷新可获得最佳观看效果，\n\n是否刷新？"
          ) == true
        ) {
          this.$router.push("/reload");
        }
      },
    },
  },
  created() {
    // getStat().then((res) => {
    //   const target = res.data.data;

    //   this.yearGmvAmount = target.yearGmvAmount;
    //   this.otherGmv = target.otherGmv;
    //   this.anotherBuyer = target.anotherBuyer;
    //   this.reduction = target.reduction;
    //   this.supplier = target.supplier;
    // });
  },
  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index-container {
  background-image: url("../../assets/images/container-bg.png");
  background-size: 100% 100%;
  .left {
    grid-area: 1 / 1 / 6 / 3;
  }
}

.center {
  grid-area: 1 / 3 / 6 / 5;
}
.right {
  grid-area: 1 / 5 / 6 / 7;
}

.font-test {
  font-size: 4rem;
}
</style>
