<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="5" class="panel-group">
      <el-col :xs="6" :sm="6" :lg="4">
        <div class="card-panel-col">
          <div :class="listQuery.dateType == 'allTotal'?'card-panel selected':'card-panel'" @click="handleSetLineChartData('allTotal')">
            <div class="card-panel-description">
              <div class="card-panel-text">全部累计</div>
              <count-to :start-val="0" :end-val="allTotal?allTotal:0" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div :class="listQuery.dateType == 'yearTotal'?'card-panel selected':'card-panel'" @click="handleSetLineChartData('yearTotal')">
            <div class="card-panel-description">
              <div class="card-panel-text">本年累计</div>
              <count-to :start-val="0" :end-val="yearTotal?yearTotal:0" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div :class="listQuery.dateType == 'monthTotal'?'card-panel selected':'card-panel'" @click="handleSetLineChartData('monthTotal')">
            <div class="card-panel-description">
              <div class="card-panel-text">本月累计</div>
              <count-to :start-val="0" :end-val="monthTotal?monthTotal:0" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div :class="listQuery.dateType == 'weekTotal'?'card-panel selected':'card-panel'" @click="handleSetLineChartData('weekTotal')">
            <div class="card-panel-description">
              <div class="card-panel-text">本周累计</div>
              <count-to :start-val="0" :end-val="weekTotal?weekTotal:0" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div :class="listQuery.dateType == 'lastweekTotal'?'card-panel selected':'card-panel'" @click="handleSetLineChartData('lastweekTotal')">
            <div class="card-panel-description">
              <div class="card-panel-text">上周累计</div>
              <count-to :start-val="0" :end-val="lastweekTotal?lastweekTotal:0" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div :class="listQuery.dateType == 'yesterdayTotal'?'card-panel selected':'card-panel'" @click="handleSetLineChartData('yesterdayTotal')">
            <div class="card-panel-description">
              <div class="card-panel-text">昨日累计</div>
              <count-to :start-val="0" :end-val="yesterdayTotal?yesterdayTotal:0" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div :class="listQuery.dateType == 'todyTotal'?'card-panel selected':'card-panel'" @click="handleSetLineChartData('todyTotal')">
            <div class="card-panel-description">
              <div class="card-panel-text">本日累计</div>
              <count-to :start-val="0" :end-val="todyTotal?todyTotal:0" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div :class="listQuery.dateType == 'customize'?'card-panel selected':'card-panel'">
            <div class="card-panel-description">
              <div class="card-panel-text">自定义统计</div>
              <el-date-picker
                v-model="dateArray"
                type="daterange"
                align="right"
                size="mini"
                style="width: 220px"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
              <el-button type="success" icon="el-icon-search" circle size="mini" @click="handleSetLineChartData('customize')" />
            </div>
          </div>
        </div>

      </el-col>
      <el-col :xs="18" :sm="18" :lg="20">
        <el-row :gutter="5" class="panel-group">
          <el-col :xs="4" :sm="4" :lg="4">
            <div class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">采购商</div>
                  <count-to :start-val="0" :end-val="detail.buyer?detail.buyer:0" :duration="1500" class="card-panel-num" />
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="4" :sm="4" :lg="4">
            <div class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">供应商</div>
                  <count-to :start-val="0" :end-val="detail.supplier?detail.supplier:0" :duration="1500" class="card-panel-num" />
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="4" :sm="4" :lg="4">
            <div class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">班组</div>
                  <count-to :start-val="0" :end-val="detail.supplier?detail.team:0" :duration="1500" class="card-panel-num" />
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="4" :sm="4" :lg="4">
            <div class="card-panel-col">
              <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-refresh"
                @click="handleRefresh"
              >刷新
              </el-button>
            </div>
          </el-col>
        </el-row>
        <div class="stat-panel">
          <ve-line :data="chartData" :settings="chartSettings" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { index, dayDetail, monthDetail } from '@/api/stat_enterprise'
import CountTo from 'vue-count-to'

export default {
  components: {CountTo},
  data() {
    return {
      dateArray: [],
      listQuery: {
        types: [],
        dateType: undefined
      },
      allTotal: 0,
      yearTotal: 0,
      monthTotal: 0,
      weekTotal: 0,
      lastweekTotal: 0,
      yesterdayTotal: 0,
      todyTotal: 0,
      detail: {
        buyer: 0,
        supplier: 0,
        team: 0
      },
      chartData: {},
      chartSettings: {},
      statisticsLoading: false
    }
  },
  created() {
    // this.init()
  },
  methods: {
    init() {
      index().then(response => {
        const indexData = response.data.data
        this.allTotal = indexData.allTotal
        this.yearTotal = indexData.yearTotal
        this.monthTotal = indexData.monthTotal
        this.weekTotal = indexData.weekTotal
        this.lastweekTotal = indexData.lastweekTotal
        this.yesterdayTotal = indexData.yesterdayTotal
        this.todyTotal = indexData.todyTotal
      })

      this.handleSetLineChartData('allTotal')
    },
    handleSetLineChartData(type) {
      this.listQuery.dateType = type

      if (this.dateArray && this.dateArray.length === 2) {
        this.listQuery.startDate = this.dateArray[0]
        this.listQuery.endDate = this.dateArray[1]
      } else {
        this.listQuery.startDate = null
        this.listQuery.endDate = null
      }

      if (type === 'allTotal' || type === 'yearTotal') {
        this.chartSettings = {
          labelMap: {
            'dataDate': '月份',
            'amount': '月认证',
            'totalAmount': '累计认证'
          }
        }
        monthDetail(this.listQuery).then(response => {
          const dataList = response.data.data.list

          this.chartData = {
            columns: ['dataDate', 'amount', 'totalAmount'],
            rows: dataList
          }

          this.setShowDetail(response.data.data.detail)
        })
      } else {
        this.chartSettings = {
          labelMap: {
            'dataDate': '日期',
            'amount': '日认证',
            'totalAmount': '累计认证'
          }
        }

        dayDetail(this.listQuery).then(response => {
          const dataList = response.data.data.list

          this.chartData = {
            columns: ['dataDate', 'amount', 'totalAmount'],
            rows: dataList
          }

          this.setShowDetail(response.data.data.detail)
        })
      }
    },
    setShowDetail(detail){
      this.detail.buyer = detail.buyer ? detail.buyer : 0
      this.detail.supplier = detail.supplier ? detail.supplier : 0
      this.detail.team = detail.team ? detail.team : 0
    },
    handleRefresh: function() {
      this.init()
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
      margin-bottom: 20px;
    }
  }

  .panel-group {
    .card-panel-col {
      margin-bottom: 20px;
    }

    .card-panel {
      height: 108px;
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
        font-size: 48px;
      }

      .card-panel-description {
        float: left;
        font-weight: bold;
        margin: 26px;

        .card-panel-text {
          line-height: 18px;
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  .stat-panel {
    margin-top: 80px;
  }

  .filter-item {
    display: block;
    margin: 10px auto 0;
  }

  .selected {
    background-color: #42b983!important;
    color: #fff!important;
    border-color: #42b983!important;
  }
</style>
