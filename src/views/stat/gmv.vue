<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="5" class="panel-group">
      <el-col :xs="4" :sm="4">
        <div class="card-panel-col">
          <div
            :class="
              listQuery.dateType == 'allTotal'
                ? 'card-panel selected'
                : 'card-panel'
            "
            @click="handleSetLineChartData('allTotal')"
          >
            <div class="card-panel-description">
              <div class="card-panel-text">全部累计(万元)</div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="allNumber ? allNumber : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="allTotal ? allTotal : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div
            :class="
              listQuery.dateType == 'yearTotal'
                ? 'card-panel selected'
                : 'card-panel'
            "
            @click="handleSetLineChartData('yearTotal')"
          >
            <div class="card-panel-description">
              <div class="card-panel-text">本年累计(万元)</div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="yearNumber ? yearNumber : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="yearTotal ? yearTotal : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div
            :class="
              listQuery.dateType == 'monthTotal'
                ? 'card-panel selected'
                : 'card-panel'
            "
            @click="handleSetLineChartData('monthTotal')"
          >
            <div class="card-panel-description">
              <div class="card-panel-text">本月累计(万元)</div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="monthNumber ? monthNumber : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="monthTotal ? monthTotal : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div
            :class="
              listQuery.dateType == 'lastweekTotal'
                ? 'card-panel selected'
                : 'card-panel'
            "
            @click="handleSetLineChartData('lastweekTotal')"
          >
            <div class="card-panel-description">
              <div class="card-panel-text">上周累计(万元)</div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="lastweekNumber ? lastweekNumber : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="lastweekTotal ? lastweekTotal : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div
            :class="
              listQuery.dateType == 'weekTotal'
                ? 'card-panel selected'
                : 'card-panel'
            "
            @click="handleSetLineChartData('weekTotal')"
          >
            <div class="card-panel-description">
              <div class="card-panel-text">本周累计(万元)</div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="weekNumber ? weekNumber : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="weekTotal ? weekTotal : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div
            :class="
              listQuery.dateType == 'yesterdayTotal'
                ? 'card-panel selected'
                : 'card-panel'
            "
            @click="handleSetLineChartData('yesterdayTotal')"
          >
            <div class="card-panel-description">
              <div class="card-panel-text">昨日累计(万元)</div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="yesterdayNumber ? yesterdayNumber : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="yesterdayTotal ? yesterdayTotal : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div
            :class="
              listQuery.dateType == 'todyTotal'
                ? 'card-panel selected'
                : 'card-panel'
            "
            @click="handleSetLineChartData('todyTotal')"
          >
            <div class="card-panel-description">
              <div class="card-panel-text">本日累计(万元)</div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="todyNumber ? todyNumber : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
              <div>
                <count-to
                  :start-val="0"
                  :end-val="todyTotal ? todyTotal : 0"
                  :duration="1500"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card-panel-col">
          <div
            :class="
              listQuery.dateType == 'customize'
                ? 'card-panel selected'
                : 'card-panel'
            "
          >
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
              <el-button
                type="success"
                icon="el-icon-search"
                circle
                size="mini"
                @click="handleSetLineChartData('customize')"
              />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="20" :sm="20">
        <el-row :gutter="5" class="panel-group">
          <el-col :xs="21" :sm="21" :lg="21">
            <el-table
              :data="detailList"
              element-loading-text="正在查询中。。。"
              border
              fit
              highlight-current-row
            >
              <el-table-column
                align="center"
                label=""
                prop="type"
                width="100px"
              />
              <el-table-column
                align="right"
                label="商城"
                :formatter="formatNum"
                prop="shop"
              />
              <el-table-column align="center" label="询价">
                <el-table-column
                  align="right"
                  label="材料"
                  :formatter="formatNum"
                  prop="taskMaterial"
                />
                <!--<el-table-column align="center" label="租赁" prop="taskLease"/>-->
                <el-table-column
                  align="right"
                  label="劳务"
                  :formatter="formatNum"
                  prop="taskService"
                />
              </el-table-column>
              <el-table-column align="center" label="招标">
                <el-table-column
                  align="right"
                  label="材料"
                  :formatter="formatNum"
                  prop="unionMaterial"
                />
                <el-table-column
                  align="right"
                  label="租赁"
                  :formatter="formatNum"
                  prop="unionLease"
                />
                <el-table-column
                  align="right"
                  label="劳务"
                  :formatter="formatNum"
                  prop="unionService"
                />
              </el-table-column>
              <el-table-column
                align="right"
                label="集招"
                :formatter="formatNum"
                prop="unified"
              />
              <el-table-column
                align="right"
                label="其他"
                :formatter="formatNum"
                prop="other"
              />
              <el-table-column
                align="right"
                label="合计"
                :formatter="formatNum"
                prop="total"
              />
            </el-table>
          </el-col>

          <el-col :xs="3" :sm="3" :lg="3">
            <div class="card-panel-col">
              <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-refresh"
                @click="handleRefresh"
                >刷新</el-button
              >
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
import { index, dayDetail, monthDetail } from "@/api/stat_gmv";
import { formatScales } from "@/utils/NumberUtils";
import CountTo from "vue-count-to";
import { Line } from "@antv/g2plot";

export default {
  components: {
    CountTo,
  },
  data() {
    return {
      detailList: [],
      dateArray: [],
      listQuery: {
        types: [],
        dateType: undefined,
      },
      allNumber: 0,
      allTotal: 0,
      yearNumber: 0,
      yearTotal: 0,
      monthNumber: 0,
      monthTotal: 0,
      weekNumber: 0,
      weekTotal: 0,
      lastweekNumber: 0,
      lastweekTotal: 0,
      yesterdayNumber: 0,
      yesterdayTotal: 0,
      todyNumber: 0,
      todyTotal: 0,
      chartData: {},
      chartSettings: {},
      downloadLoading: false,
      statisticsLoading: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      index().then((response) => {
        const indexData = response.data.data;
        this.allNumber = indexData.allTotal.number;
        this.allTotal = indexData.allTotal.amount;

        this.yearNumber = indexData.yearTotal.number;
        this.yearTotal = indexData.yearTotal.amount;

        this.monthNumber = indexData.monthTotal.number;
        this.monthTotal = indexData.monthTotal.amount;

        this.weekNumber = indexData.weekTotal.number;
        this.weekTotal = indexData.weekTotal.amount;

        this.lastweekNumber = indexData.lastweekTotal.number;
        this.lastweekTotal = indexData.lastweekTotal.amount;

        this.yesterdayNumber = indexData.yesterdayTotal.number;
        this.yesterdayTotal = indexData.yesterdayTotal.amount;

        this.todyNumber = indexData.todyTotal.number;
        this.todyTotal = indexData.todyTotal.amount;
      });

      this.handleSetLineChartData("allTotal");
    },
    handleSetLineChartData(type) {
      this.listQuery.dateType = type;

      if (this.dateArray && this.dateArray.length === 2) {
        this.listQuery.startDate = this.dateArray[0];
        this.listQuery.endDate = this.dateArray[1];
      } else {
        this.listQuery.startDate = null;
        this.listQuery.endDate = null;
      }

      if (type === "allTotal" || type === "yearTotal") {
        this.chartSettings = {
          labelMap: {
            dataDate: "月份",
            amount: "月交易量(万元)",
            totalAmount: "累计交易量(万元)",
          },
        };
        monthDetail(this.listQuery).then((response) => {
          const dataList = response.data.data.list;

          this.chartData = {
            columns: ["dataDate", "amount", "totalAmount"],
            rows: dataList,
          };

          this.detailList = response.data.data.detailList;
        });
      } else {
        this.chartSettings = {
          labelMap: {
            dataDate: "日期",
            amount: "日交易量",
            totalAmount: "累计交易量",
          },
        };

        dayDetail(this.listQuery).then((response) => {
          const dataList = response.data.data.list;

          this.chartData = {
            columns: ["dataDate", "amount", "totalAmount"],
            rows: dataList,
          };

          this.detailList = response.data.data.detailList;
        });
      }
    },
    handleRefresh: function () {
      this.init();
    },
    formatNum(row, column, cellValue) {
      return formatScales(cellValue, 2);
    },
  },
};
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
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
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
        background: #34bfa3;
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
      color: #34bfa3;
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
