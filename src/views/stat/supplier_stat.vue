<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.company" clearable class="filter-item" style="width: 300px;" placeholder="请输入企业名称"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table ref="tableList" :data="list" v-loading="listLoading" style="width: 100%" stripe highlight-current-row @sort-change="changeTableSort">
      <el-table-column type="index" label="序号" width="80"/>
      <el-table-column prop="company" label="公司名称" width="280"/>
      <el-table-column align="right" prop="taskBiddingNumber" label="询价投标次数" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.taskBiddingNumber }}</template>
      </el-table-column>
      <el-table-column align="right" prop="taskBiddindAmount" label="询价投标金额" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.taskBiddindAmount }}</template>
      </el-table-column>
      <el-table-column align="right" prop="taskHitNumber" label="询价中标次数" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.taskHitNumber }}</template>
      </el-table-column>
      <el-table-column align="right" prop="hitAmount" label="询价中标金额" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.taskHitAmount }}</template>
      </el-table-column>
      <!--<el-table-column align="right" prop="taskAvgAmount" label="询价平均中标金额" :sortable="'custom'">
        <template slot-scope="scope">{{scope.row.taskAvgAmount}}</template>
      </el-table-column>-->

      <el-table-column align="right" prop="unionBiddingNumber" label="招标投标次数" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.unionBiddingNumber }}</template>
      </el-table-column>
      <el-table-column align="right" prop="unionBiddindAmount" label="招标投标金额" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.unionBiddindAmount }}</template>
      </el-table-column>
      <el-table-column align="right" prop="unionHitNumber" label="招标中标次数" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.unionHitNumber }}</template>
      </el-table-column>
      <el-table-column align="right" prop="unionHitAmount" label="招标中标金额" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.unionHitAmount }}</template>
      </el-table-column>
      <!--<el-table-column align="right" prop="unionAvgAmount" label="招标平均中标金额" :sortable="'custom'">
        <template slot-scope="scope">{{scope.row.unionAvgAmount}}</template>
      </el-table-column>-->

      <el-table-column align="right" prop="biddingNumber" label="累计投标次数" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.biddingNumber }}</template>
      </el-table-column>
      <el-table-column align="right" prop="biddindAmount" label="累计投标金额" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.biddindAmount }}</template>
      </el-table-column>
      <el-table-column align="right" prop="hitNumber" label="累计中标次数" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.hitNumber }}</template>
      </el-table-column>
      <el-table-column align="right" prop="hitAmount" label="累计中标金额" :sortable="'custom'">
        <template slot-scope="scope">{{ scope.row.hitAmount }}</template>
      </el-table-column>
      <!--<el-table-column align="right" prop="avgAmount" label="平均中标金额" :sortable="'custom'">
        <template slot-scope="scope">{{scope.row.avgAmount}}</template>
      </el-table-column>-->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
  </div>
</template>

<script>
import {listSupplierStat} from '@/api/cnqc/supplier_stat'
import Pagination from '@/components/Pagination'

export default {
  name: 'SupplierStat',
  components: {Pagination},
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      type: 0,
      listQuery: {
        type: 0,
        comapny: undefined,
        industries: [],
        page: 1,
        limit: 20,
        sort: 'a.id',
        order: 'desc'
      },
      checkAll: false,
      allIndustries: [],
      isIndeterminate: true,
      currentSort: undefined
    }
  },
  created() {
    this.changeTableSort({prop: 'biddingNumber', order: 'descending'})
  },
  methods: {
    getList() {
      this.listLoading = true

      listSupplierStat(this.listQuery).then(res => {
        this.list = res.data.data.list
        this.total = res.data.data.total
        this.listLoading = false

        this.listQuery.type = this.type
      }).catch(err => {
        this.list = []
        this.total = 0
        this.listLoading = false

        this.listQuery.type = this.type
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetQuery() {
      this.changeTableSort(this.currentSort)

      this.listQuery.page = 1
    },
    changeTableSort(column) {
      this.currentSort = column

      // 获取字段名称和排序类型
      if (column.prop === 'unionBiddingNumber') {
        this.listQuery.sort = 'union_bidding_number'
      } else if (column.prop === 'taskBiddingNumber') {
        this.listQuery.sort = 'task_bidding_number'
      } else if (column.prop === 'biddingNumber') {
        this.listQuery.sort = 'bidding_number'
      } else if (column.prop === 'unionBiddindAmount') {
        this.listQuery.sort = 'union_biddind_amount'
      } else if (column.prop === 'taskBiddindAmount') {
        this.listQuery.sort = 'task_biddind_amount'
      } else if (column.prop === 'biddindAmount') {
        this.listQuery.sort = 'biddind_amount'
      } else if (column.prop === 'unionHitNumber') {
        this.listQuery.sort = 'union_hit_number'
      } else if (column.prop === 'taskHitNumber') {
        this.listQuery.sort = 'task_hit_number'
      } else if (column.prop === 'hitNumber') {
        this.listQuery.sort = 'hit_number'
      } else if (column.prop === 'unionHitAmount') {
        this.listQuery.sort = 'union_hit_amount'
      } else if (column.prop === 'taskHitAmount') {
        this.listQuery.sort = 'task_hit_amount'
      } else if (column.prop === 'hitAmount') {
        this.listQuery.sort = 'hit_amount'
      } else if (column.prop === 'unionAvgAmount') {
        this.listQuery.sort = 'union_avg_amount'
      } else if (column.prop === 'taskAvgAmount') {
        this.listQuery.sort = 'task_avg_amount'
      } else if (column.prop === 'avgAmount') {
        this.listQuery.sort = 'avg_amount'
      } else {
        this.listQuery.sort = undefined
      }

      this.listQuery.order = column.order == 'ascending' ? 'asc' : column.order == 'descending' ? 'desc' : undefined
      this.getList()
    },
  }
}
</script>
