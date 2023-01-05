import request from "@/utils/request";
import Qs from "qs";

export function listSupplierStat(query) {
  return request({
    url: "/supplier/stat/list",
    method: "get",
    params: query,
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
}
