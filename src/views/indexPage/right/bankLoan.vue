<template>
  <chartsContainer title="供应商入驻">
    <template slot="content">
      <div class="content">
        <div id="supplier-container"></div>
      </div>
    </template>
  </chartsContainer>
</template>

<script>
import { supplierData } from "@/api/boardApi";
// import { Line, registerTheme } from "@antv/g2";
import { Line } from "@antv/g2plot";
import chartsContainer from "@/components/slots/ChartSlot.vue";
export default {
  components: {
    chartsContainer,
  },
  data() {
    return {
      dataSource: [],
      screenWidth:
        document.body.clientWidth > 600
          ? document.body.clientWidth
          : document.body.clientWidth * 5,
    };
  },
  mounted() {
    // 单条线
    supplierData().then((res) => {
      this.dataSource = res.data.data.list;
      this.dataSource.pop();
      const chart = new Line("supplier-container", {
        data: this.dataSource,
        autoFit: true,
        padding: [30, 20, this.screenWidth / 60, this.screenWidth / 50],
        xField: "dataDate",
        yField: "amount",
        seriesField: "series",
        legend: false,
        xAxis: {
          label: {
            style: {
              fontSize: this.screenWidth / 120,
            },
          },
        },
        yAxis: {
          grid: null,
          tickCount: 6,
        },
        label: {
          style: {
            fontSize: this.screenWidth / 120,
            fill: "#ffffff",
          },
          offsetY: -this.screenWidth / 100,
        },
        tooltip: {
          customContent: (title, data) => {
            if (title) {
              return `<div class="tooltip-container">
            <div class="content-container">
              <p class="title">${title}</p>
                <p>
                  月认证
                  <span class="tooltip-y-data">
                    ${data.length > 0 ? data[0].value : 0}
                    </span>
                <p>
            </div>
          </div>`;
            }
          },
        },
        lineStyle: (val) => {
          const stroke = val.series === "月认证" ? "#9b95c9" : "#4bf9ef";
          const shadowColor = val.series === "月认证" ? "#4bf9ef" : "#4bf9ef";
          return {
            lineWidth: this.screenWidth / 200,
            opacity: 0.9,
            shadowBlur: 50,
            stroke,
            shadowColor,
          };
        },
      });

      chart.render();
    });
    // 两条线
    // const meta = {
    //   date: {
    //     alias: "销售日期",
    //   },
    //   amount: {
    //     alias: "月认证",
    //   },
    //   totalAmount: {
    //     alias: "累计认证",
    //   },
    // };

    // registerTheme("newTheme", {
    //   minColumnWidth: this.screenWidth / 130,
    //   maxColumnWidth: this.screenWidth / 130,
    // });
    // chart.theme("newTheme");
    // chart.scale("amount", {
    //   alias: "",
    // });
    // chart.axis("amount", {
    //   grid: null,
    //   label: {
    //     style: {
    //       fontSize: this.screenWidth / 120,
    //     },
    //   },
    // });
    // chart.axis("statDate", {
    //   tickLine: null,
    //   grid: null,
    //   label: {
    //     style: {
    //       fontSize: this.screenWidth / 150,
    //     },
    //     // formatter: (text) => (Number(text) > 0 ? text + "月" : ""),
    //     formatter: (text) => text + "月",
    //   },
    //   line: {
    //     style: {
    //       stroke: "#008E7230",
    //     },
    //   },
    //   tickInterval: 1,
    // });

    // chart.scale("statDate", {
    //   // type: "linear",
    //   tickInterval: 1,
    // });

    // chart.tooltip({
    //   // showMarkers: true,
    //   customContent: (title, data) => {
    //
    //   },
    // });
    // chart.interaction("active-region");
  },
  methods: {
    processData(data, yFields, meta) {
      const seriesKey = "series";
      const valueKey = "amount";
      const result = [];
      data.forEach((d) => {
        yFields.forEach((yField) => {
          const name = meta?.[yField]?.alias || yField;
          result.push({ ...d, [seriesKey]: name, [valueKey]: d[yField] });
        });
      });
      return result;
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 7rem;
  #supplier-container {
    width: 100%;
    height: 100%;
  }
}
</style>
