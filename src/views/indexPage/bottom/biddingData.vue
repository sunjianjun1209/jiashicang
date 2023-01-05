<template>
  <sheetContainer title="招标数据" @change="handleChange">
    <template slot="content">
      <div
        v-if="!dataSource || !dataSource.length === 0"
        class="blank-placeholder"
      >
        当前无数据
      </div>
      <div class="content" v-else>
        <ul
          v-for="item in dataSource"
          :key="item.name"
          class="sheet-children-container"
        >
          <li class="sheet-header">{{ item.name }}</li>
          <li class="sheet-row">{{ item.issueNum }}</li>
          <li class="sheet-row">{{ item.biddingNum }}</li>
          <li class="sheet-row">{{ item.biddingAmount }}</li>
        </ul>
      </div>
    </template>
  </sheetContainer>
</template>

<script>
import { unionStat } from "@/api/boardApi";
import sheetContainer from "@/components/slots/sheetSlot.vue";
export default {
  components: {
    sheetContainer,
  },
  data() {
    return {
      dataSource: null,
    };
  },
  created() {
    // this.getData(1);
  },
  methods: {
    handleChange(index) {
      this.getData(index);
    },
    getData(type) {
      unionStat({ type: type }).then((res) => {
        this.dataSource = res.data.data.map((ele) => {
          return {
            ...ele,
            biddingAmount: (ele.biddingAmount / 10000).toFixed(1),
          };
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  display: flex;
}
.sheet-children-container {
  border-left: #105d89 solid 0.05rem;
  .sheet-header {
    text-align: center;
    font-size: 0.5rem;
  }
  .sheet-row {
    color: #fff !important;
  }
}
</style>
