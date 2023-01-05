<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select
        v-model="listQuery.division"
        clearable
        class="filter-item"
        placeholder="请选择招标类型"
      >
        <el-option key="0" label="物资" value="0" />
        <el-option key="1" label="租赁" value="1" />
        <el-option key="2" label="分包" value="2" />
        <el-option key="3" label="班组" value="3" />
      </el-select>
      <el-input
        v-model="listQuery.bizId"
        clearable
        class="filter-item"
        style="width: 200px"
        placeholder="请输入招标编号"
      />

      <el-input
        v-model="listQuery.realProj"
        clearable
        class="filter-item"
        style="width: 200px"
        placeholder="请输入项目名"
      />

      <el-date-picker
        v-model="dateArray"
        type="daterange"
        align="right"
        style="width: 250px"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy-MM-dd"
        unlink-panels
        start-placeholder="开始日期"
        range-separator="至"
        end-placeholder="结束日期"
        class="filter-item"
        :picker-options="pickerOptions"
      />

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查找</el-button
      >
      <el-button
        v-permission="['stat:union:service_export']"
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
        >导出</el-button
      >
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="序号"
        fixed
        type="index"
        width="55"
      />
      <el-table-column
        align="center"
        label="招标编号"
        fixed
        prop="bizId"
        width="150"
      >
        <template slot-scope="{ row }">
          <span class="skip" @click="handeltaskRouter(row)">{{
            row.bizId
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="子集团名称"
        fixed
        prop="subgroup"
        width="200"
      />
      <el-table-column
        align="center"
        label="分公司名称"
        fixed
        prop="office"
        width="200"
      />
      <el-table-column
        align="center"
        label="项目名称"
        fixed
        prop="realProj"
        width="200"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        align="center"
        label="标段名称"
        prop="serviceName"
        width="200"
      />

      <el-table-column
        align="center"
        label="工程地点"
        prop="address"
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.row.provinceName }} {{ scope.row.cityName }}
          {{ scope.row.areaName }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="项目用途分类"
        prop="useType"
        width="200"
      />
      <el-table-column
        align="center"
        label="结构型式"
        prop="struct"
        width="200"
      />
      <el-table-column
        align="center"
        label="建筑面积"
        prop="consArea"
        width="200"
      />
      <el-table-column
        align="center"
        label="招标内容"
        prop="indusName"
        width="200"
      />
      <el-table-column
        align="center"
        label="招标时间"
        prop="createTime"
        width="140"
      >
        <template slot-scope="scope">
          {{ intToTime(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="中标时间"
        prop="hitTime"
        width="140"
      >
        <template slot-scope="scope">
          {{ intToTime(scope.row.hitTime) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工程量计算规则"
        prop="calRole"
        width="200"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        align="center"
        label="付款方式"
        prop="payOther"
        width="200"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        align="center"
        label="发票类型"
        prop="invoiceTypeName"
        width="200"
      />
      <el-table-column
        align="center"
        label="税率（%）"
        prop="taxRate"
        width="200"
      />
      <el-table-column
        align="center"
        label="中标人名称"
        prop="company"
        width="200"
      />
      <el-table-column align="center" label="联系方式">
        <el-table-column align="center" label="联系人" prop="telName" />
        <el-table-column
          align="center"
          label="联系电话"
          prop="tel"
          width="200"
        />
      </el-table-column>
      <el-table-column align="center" label="效益分析">
        <el-table-column
          align="center"
          label="控制价"
          prop="budget"
          width="200"
        />
        <el-table-column
          align="center"
          label="本次招标中标价"
          prop="quote"
          width="200"
        />
        <el-table-column
          align="center"
          label="差额（盈+,亏-）"
          prop="difference"
          width="200"
        />
        <el-table-column
          align="center"
          label="比例（差额/控制价）"
          prop="differenceRate"
          width="200"
        />
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.taskStatus === 99"
            v-permission="['stat:union:service_detail']"
            type="success"
            @click="handleClick(scope.row)"
            >中标详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!--      详情弹窗-->
    <el-dialog
      :visible.sync="taskDetailDialogVisible"
      :title="dialogTitle"
      width="1000px"
    >
      <el-tabs
        :visible.sync="taskDetailDialogVisible"
        type="border-card"
        @tab-click="tabClick"
      >
        <el-tab-pane
          v-for="item in bidList"
          :key="item.bidId"
          :label="item.company"
        >
          <el-form
            ref="item"
            :model="item"
            status-icon
            label-position="right"
            label-width="120px"
          >
            <el-row :gutter="0">
              <el-col :span="12">
                <el-form-item label="用户名">
                  <span>{{ item.company }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投标报价">
                  <span>{{ item.quote }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投标时间">
                  <span>{{ intToTime(item.bidTime) }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="中标时间">
                  <span>{{ intToTime(item.hitTime) }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人">
                  <span>{{ item.telName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <span>{{ item.tel }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="无税总价">
                  <span>{{ item.quoteNotax }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="税金">
                  <span>{{ item.tax }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="税率">
                  <span>{{ item.taxRate }}</span>
                </el-form-item>
              </el-col>
              <template>
                <el-table
                  :data="tableData"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="itemName" label="物资名称" />
                  <el-table-column prop="itemModel" label="规格型号" />
                  <el-table-column prop="itemUnit" label="单位" />
                  <el-table-column prop="taxRate" label="税率" />
                  <el-table-column prop="quote" label="含税单价" />
                  <el-table-column prop="sum" label="含税金额合计" />
                  <el-table-column prop="quoteNotax" label="无税单价" />
                  <el-table-column prop="notaxSum" label="不含税金额合计" />
                  <el-table-column prop="quoteBase" label="标底无税总价" />
                  <el-table-column prop="discount" label="优惠率" />
                </el-table>
              </template>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, getBidDetail, getBidItem } from "@/api/stat_union_service";
import { dateToInt, timestampToTime } from "@/utils/DateUtils";
import Pagination from "@/components/Pagination";

const divisionMap = { 0: "物资", 1: "租赁", 2: "劳务", 3: "班组" };

export default {
  name: "StatUnionService",
  components: { Pagination },
  filters: {
    divisionFilter(status) {
      return divisionMap[status];
    },
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      dateArray: [],
      listQuery: {
        indusIds: [],
        realProj: undefined,
        hitStartTime: undefined,
        hitEndTime: undefined,
        hitTime: undefined,
        page: 1,
        limit: 20,
        sort: "anno_id",
        order: "desc",
      },
      downloadLoading: false,
      taskDetailDialogVisible: false,
      dialogTitle: null,
      bidId: null,
      tableData: [],
      bidList: [
        {
          company: null,
        },
      ],

      choiceDate0: "",
      pickerOptions: {
        // 设置不能选择的日期
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate0 = minDate.getTime();
          if (maxDate) {
            this.choiceDate0 = "";
          }
        },
        disabledDate: (time) => {
          const choiceDateTime = new Date(this.choiceDate0).getTime();
          const minTime = new Date(choiceDateTime).setMonth(
            new Date(choiceDateTime).getMonth() - 6
          );
          const maxTime = new Date(choiceDateTime).setMonth(
            new Date(choiceDateTime).getMonth() + 6
          );
          const min = minTime;
          const newDate =
            new Date(new Date().toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1;
          const max = newDate < maxTime ? newDate : maxTime;
          // 如果已经选中一个日期 则 返回 该日期前后一个月时间可选
          if (this.choiceDate0) {
            return time.getTime() < min || time.getTime() > max;
          }
          // 若一个日期也没选中 则 返回 当前日期以前日期可选
          return time.getTime() > newDate;
        },
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 跳转详情
    handeltaskRouter(row) {
      let router = "";
      if (this.listQuery.division == 0) {
        router = "/material/purchase/";
      } else if (this.listQuery.division == 1) {
        router = "/lease/purchase/";
      } else {
        router = "/labour/purchase/";
      }
      this.$router.push(router + row.annoId);
    },
    getList() {
      this.listLoading = true;
      if (this.dateArray && this.dateArray.length === 2) {
        this.listQuery.hitStartTime = dateToInt(this.dateArray[0]);
        this.listQuery.hitEndTime = dateToInt(this.dateArray[1]) + 24 * 60 * 60;
      } else {
        this.listQuery.hitStartTime = null;
        this.listQuery.hitEndTime = null;
      }

      fetchList(this.listQuery)
        .then((response) => {
          this.list = response.data.data.list;
          this.total = response.data.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    intToTime(timestamp) {
      if (timestamp) {
        return timestampToTime(timestamp);
      } else {
        return undefined;
      }
    },
    handleDownload() {
      var status = true;
      if (this.listQuery.division === undefined) {
        status = false;
        this.$notify.error({
          title: "请选择招标类型",
        });
      }

      if (this.dateArray && this.dateArray.length === 2) {
        this.listQuery.hitStartTime = dateToInt(this.dateArray[0]);
        this.listQuery.hitEndTime = dateToInt(this.dateArray[1]) + 24 * 60 * 60;
      } else {
        status = false;
        this.$notify.error({
          title: "请选择时间范围",
        });
        this.listQuery.hitStartTime = null;
        this.listQuery.hitEndTime = null;
      }
      if (status) {
        this.downloadLoading = true;
        exportFile("分包类数据统计", this.listQuery)
          .then((response) => {
            this.downloadLoading = false;
          })
          .catch((response) => {
            this.downloadLoading = false;
            this.$notify.error({
              title: "失败",
              message: response.data.message,
            });
          });
      }
    },

    getDetail(row) {
      return Promise.resolve(
        getBidDetail({ taskId: row.taskId })
          .then((response) => {
            this.bidList = response.data.data;
            this.dialogTitle = "招标标题：" + row.taskTitle;
          })
          .catch((response) => {
            this.$notify.error({
              title: "失败",
              // message: response.data.message
            });
          })
      );
    },

    handleClick(row) {
      this.getDetail(row).then(() => {
        this.taskDetailDialogVisible = true;
        this.bidId = this.bidList[0].bidId;
        this.getBidItem(this.bidId);
      });
    },
    getBidItem(bidId) {
      return Promise.resolve(
        getBidItem({ bidId: bidId })
          .then((response) => {
            this.tableData = response.data.data;
          })
          .catch((response) => {
            this.$notify.error({
              title: "失败",
              // message: response.data.message
            });
          })
      );
    },
    tabClick(tab) {
      this.getBidItem(this.bidList[tab.index].bidId);
    },
  },
};
</script>
<style>
.skip {
  color: #1890ff;
  cursor: pointer;
}
</style>
