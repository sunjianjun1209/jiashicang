<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-date-picker
        v-model="dateArray"
        type="daterange"
        style="width: 250px"
        value-format="yyyy-MM-dd"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="filter-item"
      />

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="dailyStat">查找</el-button>
    </div>

    <el-table :data="detailList" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="left" label="" prop="projectClass" width="160"/>
      <el-table-column align="left" label="项目" prop="projectDetail" width="160"/>
      <el-table-column align="right" :label="dateStr" prop="subTotal" width="220"/>
      <el-table-column align="right" label="本年" prop="yearTotal" width="180"/>
      <el-table-column align="right" label="全部累计" prop="total" width="180"/>
    </el-table>

  </div>
</template>

<script>
import {handleDailyStat} from '@/api/stat_gmv'

export default {
  components: {},
  data() {
    return {
      detailList: [],
      dateArray: [],
      listQuery: {},
      downloadLoading: false,
      statisticsLoading: false,
      spanArr: []
    }
  },
  computed: {
    dateStr: function () {
      return this.dateArray[0] + '至' + this.dateArray[1]
    }
  },
  methods: {
    dailyStat() {
      if (this.dateArray && this.dateArray.length === 2) {
        this.listQuery.startDate = this.dateArray[0]
        this.listQuery.endDate = this.dateArray[1]
      } else {
        this.$message.error('请选择日期范围!')
        return
      }

      handleDailyStat(this.listQuery).then(response => {
        this.detailList = response.data.data
      }).catch(() => {
        this.detailList = undefined
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-table {
  > > > .el-table_1_column_4 {
    background-color: #fdf6ec;
  }
}
</style>
