<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.type" clearable style="width: 150px; margin-left: 4px;" placeholder="请选择招标类型">
        <el-option key="2" label="询价" value="2" />
        <el-option key="3" label="招标" value="3" />
      </el-select>

      <el-input v-model="listQuery.company" clearable style="width: 180px; margin-left: 4px;" placeholder="请输入企业名称"/>
      <el-date-picker
        v-model="hitDateArray"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="中标开始日期"
        end-placeholder="中标结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
        style="width: 250px; margin-left: 4px;"/>
      <el-input v-model="listQuery.startRate" clearable style="width: 130px; margin-left: 4px;" placeholder="降低率">
        <template slot="append">%</template>
      </el-input> -
      <el-input v-model="listQuery.endRate" clearable style="width: 130px; margin-left: 4px;" placeholder="降低率">
        <template slot="append">%</template>
      </el-input>

      <el-button v-permission="['stat:reduction']" type="primary" style="margin-left: 4px;" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <div class="operator-container">
      <label v-if="reduction">总体成本降低率约{{ reduction }}%</label>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="类型" prop="type" min-width="50" width="80px">
        <template slot-scope="scope">
          {{ scope.row.type == 2 ? '询价':'招标' }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="招标编号" prop="bizId" width="180"/>

      <el-table-column align="center" label="招标标题" prop="taskTitle"/>

      <el-table-column align="center" label="企业" prop="company"/>

      <el-table-column align="center" label="集团" prop="subgroup"/>

      <el-table-column align="center" label="中标日期" prop="hitTime" width="150"/>

      <el-table-column align="right" label="预算" prop="budget" width="110"/>

      <el-table-column align="right" label="中标金额" prop="quote" width="110"/>

      <el-table-column align="right" label="降低率" prop="rate" width="110">
        <template slot-scope="scope">
          {{ (scope.row.rate * 100).toFixed(2) }}%
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>

  </div>
</template>

<style>
.append_label {
  margin-top: 5px;
  display: block;
}
</style>

<script>
import {queryReduction} from '@/api/stat_gmv'

import Pagination from '@/components/Pagination'

export default {
  name: 'User',
  components: {Pagination},
  filters: {
    formatDate: function (value) { // 时间戳转换日期格式方法
      if (value == null) {
        return ''
      } else {
        const date = new Date(value * 1000)
        const y = date.getFullYear()
        let MM = date.getMonth() + 1
        const d = date.getDate()

        MM = MM < 10 ? ('0' + MM) : MM
        return y + '-' + MM + '-' + d
      }
    },
  },
  data() {
    return {
      reduction: undefined,
      list: null,
      total: 0,
      listLoading: true,
      hitDateArray: [],
      listQuery: {
        type: undefined,
        company: undefined,
        subGroups: undefined,
        startRate: undefined,
        endRate: undefined,
        page: 1,
        limit: 20,
        sort: '',
        order: 'desc'
      },
      downloadLoading: false,
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
        }]
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true

      if (this.hitDateArray && this.hitDateArray.length === 2) {
        this.listQuery.hitStartDate = this.hitDateArray[0]
        this.listQuery.hitEndDate = this.hitDateArray[1]
      } else {
        this.listQuery.hitStartDate = undefined
        this.listQuery.hitEndDate = undefined
      }

      queryReduction(this.listQuery).then(response => {
        this.reduction = response.data.data.reduction
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.reduction = 0
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1

      this.getList()
    },
  }
}
</script>
