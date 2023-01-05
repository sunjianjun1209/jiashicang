<template>
  <div class="dashboard-editor-container">
    <div id="container"></div>
  </div>
</template>

<script>
import {index, dayDetail, monthDetail} from '@/api/stat_gmv'
import {formatScales} from '@/utils/NumberUtils'
import CountTo from 'vue-count-to'
import { Line } from '@antv/g2plot'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      chart: undefined,
      detailList: [],
      dateArray: []
    }
  },
  created() {
    this.init()
  },
  mounted() {

  },
  methods: {
    init() {
      index().then(response => {
        const indexData = response.data.data

        this.allNumber = indexData.allTotal.number
        this.allTotal = indexData.allTotal.amount

        this.yearNumber = indexData.yearTotal.number
        this.yearTotal = indexData.yearTotal.amount
      })

      this.handleSetLineChartData()
    },
    handleSetLineChartData() {
      this.chartSettings = {
        labelMap: {
          'dataDate': '月份',
          'amount': '月交易量(万元)',
          'totalAmount': '累计交易量(万元)'
        }
      }
      monthDetail({dateType: 'allTotal'}).then(response => {
        const dataList = response.data.data.list

        this.chartData = {
          columns: ['dataDate', 'amount', 'totalAmount'],
          rows: dataList
        }

        const line = new Line('container', {
          data: dataList,
          xField: 'dataDate',
          yField: 'totalAmount',
        });
        line.render();

      })
    },
    formatNum(row, column, cellValue) {
      return formatScales(cellValue, 2)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 10px;
  }
}

.panel-group {
  .card-panel-col {
    margin-bottom: 20px;
  }

  .card-panel {
    height: 98px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    border-radius: 6px;

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shoppingCard {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shoppingCard {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 40px;
    }

    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 22px;

      .card-panel-text {
        line-height: 16px;
        font-size: 14px;
        margin-bottom: 10px;
      }

      .card-panel-num {
        font-size: 18px;
      }
    }
  }
}

.stat-panel {
  margin-top: 50px;
}

.filter-item {
  display: block;
  margin: 10px auto 0;
}

.selected {
  background-color: #42b983 !important;
  color: #fff !important;
  border-color: #42b983 !important;
}
</style>
