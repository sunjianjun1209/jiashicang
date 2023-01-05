<template>
  <div id="sheet-slot">
    <header>
      <p class="title">{{ title }}</p>
      <p class="filter">
        <span
          :class="activeTab === 1 && 'active'"
          @click="handleChangeActiveTab(1)"
          >本月</span
        >
        <span
          :class="activeTab === 2 && 'active'"
          @click="handleChangeActiveTab(2)"
          >上月</span
        >
        <span
          :class="activeTab === 3 && 'active'"
          @click="handleChangeActiveTab(3)"
          >本年</span
        >
      </p>
    </header>
    <div id="sheet-content-container">
      <div class="sheet-container">
        <ul>
          <li class="sheet-header"></li>
          <li class="sheet-row">发布数量</li>
          <li class="sheet-row">中标数量</li>
          <li class="sheet-row">中标金额(万元)</li>
        </ul>
        <div class="slot-container">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "标题",
    },
  },
  data() {
    return {
      activeTab: 1,
    };
  },
  methods: {
    handleChangeActiveTab(index) {
      this.activeTab = index;
      this.$emit("change", index);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#sheet-slot {
  width: 22.5rem;
  margin: 0 auto;
  header {
    box-sizing: border-box;
    height: 1.1rem;
    width: 100%;
    background-image: url("../../assets/images/sheet-slot-header-bg.png");
    background-repeat: no-repeat;
    background-size: 99% 100%;
    background-position: 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-family: "douyu";
      font-size: 0.45rem;
      color: #dfeef3;
    }
    .filter {
      font-size: 0.4rem;
      line-height: 0.7rem;
      color: #19e1cb;
      span {
        display: inline-block;
        box-sizing: border-box;
        cursor: pointer;
        width: 1.2rem;
        margin-right: 0.2rem;
        text-align: center;
      }
    }
    .filter span.active {
      color: #f5fcfe;
      border-bottom: 0.08rem solid #19e1cb;
      border-radius: 0.05rem;
    }
  }
  #sheet-content-container {
    width: 100%;
    height: 7rem;
    box-sizing: border-box;
    background-size: 103% 120%;
    background-repeat: no-repeat;
    background-position: -0.4rem -0.7rem;
    padding: 1.2rem 1rem 0.8rem;
    .sheet-container {
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
      .sheet-header {
        height: 1.2rem;
        line-height: 1.2rem;
        color: #4bf9ef;
        background-color: #4bf9ef35;
      }
      .sheet-row {
        color: #4bf9ef;
        font-size: 0.45rem;
        width: 4rem;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        background-color: #4bf9ef05;
        &:nth-child(3) {
          background-color: #4bf9ef15;
        }
      }
    }
    .slot-container {
      height: 100%;
      width: calc(100% - 4rem);
    }
  }
}
</style>
