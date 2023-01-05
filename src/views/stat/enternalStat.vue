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
        :picker-options="pickerOptions"
      />

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="dailyStat">查找</el-button>
    </div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商城采购统计</span>
      </div>

      <el-table v-loading="listLoading" :data="orderStats" element-loading-text="正在查询中。。。" border fit highlight-current-row>
        <el-table-column align="center" label="采购方" prop="company" />
        <el-table-column align="right" label="数量" prop="number" />
        <el-table-column align="right" label="金额" prop="amount" />
      </el-table>

    </el-card>

    <el-card class="box-card" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <span>询价统计</span>
      </div>
      <el-table v-loading="listLoading" :data="taskStats" element-loading-text="正在查询中。。。" border fit highlight-current-row>
        <el-table-column align="center" label="采购方" prop="company" />
        <el-table-column align="right" label="数量" prop="number" />
        <el-table-column align="right" label="金额" prop="amount" />
      </el-table>

    </el-card>

    <el-card class="box-card" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <span>招标统计</span>
      </div>
      <el-table v-loading="listLoading" :data="unionStats" element-loading-text="正在查询中。。。" border fit highlight-current-row>
        <el-table-column align="center" label="采购方" prop="company" />
        <el-table-column align="right" label="数量" prop="number" />
        <el-table-column align="right" label="金额" prop="amount" />
      </el-table>

    </el-card>

    <el-card class="box-card" style="margin-top: 10px">
      <el-table v-loading="listLoading" :data="totalStats" element-loading-text="正在查询中。。。" border fit highlight-current-row>
        <el-table-column align="center" label="合计" prop="company" />
        <el-table-column align="right" label="数量" prop="number" />
        <el-table-column align="right" label="金额" prop="amount" />
      </el-table>
    </el-card>

  </div>
</template>

<script>
import { handleExternalStat } from '@/api/stat_gmv'

export default {
  components: {},
  data() {
    return {
      orderStats: [],
      taskStats: [],
      unionStats: [],
      totalStats: [],
      dateArray: [],
      listQuery: {},
      listLoading: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本月',
          onClick(picker) {
            const now = new Date()
            const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
            picker.$emit('pick', [start, now])
          }
        }, {
          text: '本年',
          onClick(picker) {
            const now = new Date()
            const start = new Date(now.getFullYear(), 0, 1, 0, 0, 0)
            picker.$emit('pick', [start, now])
          }
        }]
      }
    }
  },
  computed: {
    dateStr: function() {
      return this.dateArray[0] + '至' + this.dateArray[1]
    }
  },
  methods: {
    dailyStat() {
      this.listLoading = true

      if (this.dateArray && this.dateArray.length === 2) {
        this.listQuery.startDate = this.dateArray[0]
        this.listQuery.endDate = this.dateArray[1]
      } else {
        this.$message.error('请选择日期范围!')
        this.listLoading = false
        return
      }

      handleExternalStat(this.listQuery).then(response => {
        this.orderStats = response.data.data.orderStats
        this.taskStats = response.data.data.taskStats
        this.unionStats = response.data.data.unionStats
        this.totalStats = response.data.data.totalStats

        this.listLoading = false
      }).catch(() => {
        this.orderStats = []
        this.taskStats = []
        this.unionStats = []
        this.totalStats = []

        this.listLoading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
