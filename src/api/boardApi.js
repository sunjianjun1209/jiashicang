import request from "@/utils/request";

/**
 * @name 电子保函
 */
export function guarantee() {
  return request({
    url: "/stat/all/getGuaranteeByYear",
    method: "get",
  });
}

/**
 * @name 电子签章
 */
export function caStatByYear() {
  return request({
    url: "/stat/all/getCaStatByYear",
    method: "get",
  });
}

/**
 * @name 供应商入驻
 */
export function bankByYear() {
  return request({
    url: "/stat/all/getBankByYear",
    method: "get",
  });
}

/**
 * @name 杂项数据
 * @returns allGmvAmount - gmv
 * @returns otherGmv 外部gmv
 */
export function getStat() {
  return request({
    url: "/stat/all/getStat",
    method: "get",
  });
}

/**
 * @name 招标数据
 * @params {number} type 1本月 2上月 3本年
 */
export function unionStat(query) {
  return request({
    url: "/stat/all/getUnionStat",
    method: "get",
    params: query,
  });
}

/**
 * @name 询价数据
 * @params {number} type 1本月 2上月 3本年
 */
export function biddingData(query) {
  return request({
    url: "/stat/all/getTaskStat",
    method: "get",
    params: query,
  });
}

/**
 * @name 供应商入驻数据
 *
 */
export function supplierData(query) {
  return request({
    url: "/stat/enterprise/monthDetail?dateType=yearTotal&startDate=&endDate=",
    method: "get",
    params: query,
  });
}
