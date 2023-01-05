import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "@/store";
import { getToken, removeToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 10000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-chaos-Admin-Token']为自定义key 请根据实际情况自行修改
      config.headers["X-chaos-Admin-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    const paramData = {};
    if (typeof params === "object") {
      paramData.params = params;
    }
    service
      .get(url, paramData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code === 501) {
      MessageBox.alert("系统未登录，请重新登录", "错误", {
        confirmButtonText: "确定",
        type: "error",
      }).then(() => {
        store.dispatch("FedLogOut").then(() => {
          location.reload();
        });
      });
      return Promise.reject("error");
    } else if (res.code === 502) {
      MessageBox.alert("系统内部错误，请联系管理员维护", "错误", {
        confirmButtonText: "确定",
        type: "error",
      });
      return Promise.reject("error");
    } else if (res.code === 503) {
      MessageBox.alert("请求业务目前未支持", "警告", {
        confirmButtonText: "确定",
        type: "error",
      });
      return Promise.reject("error");
    } else if (res.code === 504) {
      MessageBox.alert("更新数据已经失效，请刷新页面重新操作", "警告", {
        confirmButtonText: "确定",
        type: "error",
      });
      return Promise.reject("error");
    } else if (res.code === 505) {
      MessageBox.alert("更新失败，请再尝试一次", "警告", {
        confirmButtonText: "确定",
        type: "error",
      });
      return Promise.reject("error");
    } else if (res.code === 506) {
      MessageBox.alert("没有操作权限，请联系管理员授权", "错误", {
        confirmButtonText: "确定",
        type: "error",
      });
      return Promise.reject("error");
    } else if (res.code !== 0) {
      // 非5xx的错误属于业务错误，留给具体页面处理
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  (error) => {
    getToken() && removeToken();
    // 微信用户免登陆
    var ua = navigator.userAgent.toLowerCase(); // 将用户代理头的值转为小写

    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.$store.dispatch("loginNoKaptcha", this.loginForm).then(() => {
        this.$router.push({ path: "/" });
      });
    } else {
      if (error.response.data.code === 501) {
        MessageBox.alert("系统未登录，请重新登录", "错误", {
          confirmButtonText: "确定",
          type: "error",
        }).then(() => {
          store.dispatch("FedLogOut").then(() => {
            location.reload();
          });
        });
        return Promise.reject("error");
      }
    }

    Message({
      message: "服务正在维护，请稍后再试！",
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
export { post, get };
