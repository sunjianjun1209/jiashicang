import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import Element from "element-ui";
import "./styles/element-variables.scss";
import "./styles/font.scss";
import "@/styles/index.scss"; // global css
import "@/styles/resize.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "./icons"; // icon
import "./permission"; // permission control
import "@/common/flexable";

import * as filters from "./filters"; // global filters

import "@/utils/global"; // 自定义全局js

Vue.use(Element, {
  size: Cookies.get("size") || "mini", // set element-ui default size
});

import { DICT_TYPE, getDictDataLabel, getDictDatas } from "@/utils/dict";
Vue.prototype.getDictDatas = getDictDatas;
Vue.prototype.getDictDataLabel = getDictDataLabel;
Vue.prototype.DICT_TYPE = DICT_TYPE;

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
