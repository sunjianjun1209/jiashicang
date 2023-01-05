<template>
  <div id="gmv-dashborad">
    <div class="left">
      <div id="g2-container-left">
        <div class="title left-title">GMV</div>
      </div>
      <p>
        <number-count-to :value="gmvcal(gmv, 1) || 0" :decimals="1" />{{
          gmvUnit1
        }}
      </p>
    </div>
    <div class="right">
      <div id="g2-container-right">
        <div class="title right-title">
          <p>外部GMV</p>
          <p>
            占比率:
            <span>{{ ((outsideGmv / gmv) * 100).toFixed(0) || 0 }}</span>
            %
          </p>
        </div>
      </div>
      <p>
        <number-count-to :value="gmvcal(outsideGmv, 2) || 0" :decimals="1" />{{
          gmvUnit2
        }}
      </p>
    </div>
  </div>
</template>

<script>
import { Gauge } from "@antv/g2plot";
import { GMV_TARGET } from "@/dicts/index";

import NumberCountTo from "@/components/Widgets/NumberCountTo.vue";
export default {
  components: {
    NumberCountTo,
  },
  props: ["gmv", "outsideGmv"],
  computed: {
    outsideGmvRate() {
      return this.gmvcal(this.outsideGmv) / GMV_TARGET.OTHER_GMV_THIS_YEAR;
    },
  },
  data() {
    return {
      screenWidth:
        document.body.clientWidth > 600
          ? document.body.clientWidth
          : document.body.clientWidth * 5,
      dataLeft: 150.67,
      dataRight: 120,
      gmvUnit1: "亿",
      gmvUnit2: "亿",
      options: {
        // height: 210,
        percent: 0.75,
        autoFit: true,
        radius: 0.7,
        padding: [-25, 0, 0, 0],
        range: {
          color: ["l(0) 0:#56FEF2 0.5:#E0E17E 1:#F4664A", "#55FFF440"],
          width:
            (document.body.clientWidth > 600
              ? document.body.clientWidth
              : document.body.clientWidth * 5) / 120,
        },
        indicator: null,
        gaugeStyle: {
          lineCap: "round",
        },
        // statistic: {
        //   title: {
        //     content: "GMV",
        //     offsetY: this.screenWidth / 40,
        //     style: ({ percent }) => {
        //       return {
        //         fontSize: "0.8rem",
        //         fontWeight: "500",
        //         // lineHeight: 1,
        //       };
        //     },
        //   },
        // },
      },
    };
  },
  mounted() {},
  watch: {
    gmv(newVal) {
      const gaugeLeft = new Gauge("g2-container-left", {
        ...this.options,
        percent: (this.gmvcal(this.gmv) / GMV_TARGET.GMV_THIS_YEAR).toFixed(2),
      });

      const gaugeRight = new Gauge("g2-container-right", {
        ...this.options,
        percent: this.outsideGmvRate,
        // statistic: {
        //   title: {
        //     content: "外部GMV",
        //     offsetY: this.screenWidth / 60,
        //     style: ({ percent }) => {
        //       return {
        //         fontSize: "0.6rem",
        //         fontWeight: "500",
        //         // lineHeight: 1,
        //       };
        //     },
        //   },
        // },
      });

      gaugeLeft.render();
      gaugeRight.render();
    },
  },
  methods: {
    gmvcal(val, i) {
      // if (val.toFixed(0).toString().length < 7) {
      // this["gmvUnit" + i] = "万";
      // return val / 10000;
      // } else {
      // this["gmvUnit" + i] = "亿";
      return val / 100000000;
      // }
    },
  },
};
</script>

<style scoped lang="scss">
#gmv-dashborad {
  width: 100%;
  background-image: url("../../../assets/images/gmv-bg.png");
  background-size: 100% 100%;
  & > div {
    & > p {
      font-family: "douyu";
      color: #19e1cb;
      font-size: 0.4rem;
      text-align: center;
      margin-top: -0.1rem;
      span {
        font-size: 0.7rem;
      }
    }
  }
  #g2-container-right,
  #g2-container-left {
    height: 5rem;
    width: 100%;
    background-image: url("../../../assets/images/gmv-child-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .title {
      position: absolute;
      left: 0;
      width: 100%;
      text-align: center;
      font-weight: bold;
      &.right-title {
        line-height: 0.4rem;
        span {
          color: #19e1cb;
        }
        p:last-child {
          font-weight: normal;
          font-family: "douyu";
        }
      }
    }
  }
}
</style>
