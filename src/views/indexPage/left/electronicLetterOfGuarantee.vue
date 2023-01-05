<template>
  <chartsContainer title="电子保函">
    <template slot="content">
      <div id="electronic-letter-guarantee">
        <div class="electronic-letter-guarantee-header">
          <div></div>
          担保金额：<span>{{ cashAmount }}</span
          >万元
        </div>
        <div id="eleletter-container"></div>
      </div>
    </template>
  </chartsContainer>
</template>

<script>
import { guarantee } from "@/api/boardApi";
import { Chart, registerTheme } from "@antv/g2";
import chartsContainer from "@/components/slots/ChartSlot.vue";
export default {
  components: {
    chartsContainer,
  },
  data() {
    return {
      dataSource: [],
      cashAmount: 3500,
      screenWidth:
        document.body.clientWidth > 600
          ? document.body.clientWidth
          : document.body.clientWidth * 5,
    };
  },
  mounted() {
    const chart = new Chart({
      container: "eleletter-container",
      autoFit: true,
      padding: [30, 20, this.screenWidth / 90, this.screenWidth / 50],
    });
    registerTheme("newTheme", {
      minColumnWidth: this.screenWidth / 130,
      maxColumnWidth: this.screenWidth / 130,
    });
    chart.theme("newTheme");
    chart.data(this.dataSource);
    chart.scale("count", {
      alias: "数额",
    });
    chart.axis("count", {
      grid: null,
      label: {
        style: {
          fontSize: this.screenWidth / 120,
        },
      },
    });
    chart.axis("MONTH", {
      tickLine: null,
      grid: null,
      label: {
        style: {
          fontSize: this.screenWidth / 150,
        },
        // formatter: (text) => (Number(text) > 0 ? text + "月" : ""),
        formatter: (text) => text + "月",
      },
      line: {
        style: {
          stroke: "#008E7230",
        },
      },
    });

    chart.scale("MONTH", {
      // type: "linear",
      tickInterval: 1,
    });

    chart.tooltip({
      // showMarkers: true,
      customContent: (title, data) => {
        return `<div class="tooltip-container">
            <div class="content-container">
              <p class="title">${title}月</p>
              数量 
                <span class="tooltip-y-data">
                  ${data.length > 0 ? data[0].value : 0}
                <span>
            </div>
          </div>`;
      },
    });
    chart.interaction("active-region");

    chart
      .interval()
      .position("MONTH*count")
      .style("MONTH", (val) => {
        return {
          fillOpacity: 1,
          fill: "l(90) 0:#00E3C050 1:#0068DC50",
          stroke: "l(90) 0:#00EBB1 1:#03171F",
          lineWidth: 2,
        };
      })
      .label("count", {
        style: {
          fill: "white",
          fontSize: this.screenWidth / 120,
        },
      });

    chart.render();

    // guarantee().then((res) => {
    //   this.cashAmount = (res.data.data.cashAmount / 10000).toFixed(0);
    //   this.dataSource = res.data.data.list.map((ele) => {
    //     return {
    //       ...ele,
    //       MONTH: ele.MONTH.toString(),
    //     };
    //   });
    //   chart.changeData(this.dataSource);
    // });
  },
};
</script>

<style scoped lang="scss">
#electronic-letter-guarantee {
  width: 100%;
  height: 7rem;
  .electronic-letter-guarantee-header {
    height: 0.5rem;
    float: right;
    font-size: 0.4rem;
    display: flex;
    align-items: center;
    span {
      // font-size: 0.5rem;
    }
    div {
      width: 0.2rem;
      height: 0.2rem;
      margin-right: 0.2rem;
      border-radius: 50%;
      background-color: #23fffc;
    }
  }

  #eleletter-container {
    width: 100%;
    height: calc(100% - 0.5rem);
  }
}
</style>
