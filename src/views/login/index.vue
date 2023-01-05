<template>
  <div class="login-container">
    <div class="form-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title">欢迎登录</div>
        <div v-if="!isWeChat">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" name="username" type="text" tabindex="1" auto-complete="on" placeholder="清输入登录ID">
              <template #prefix><img class="prefix-icon" src="@/assets/images/account-icon.png" alt=""/></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" :type="passwordType" name="password" auto-complete="on" tabindex="2" show-password @keyup.enter.native="handleLogin" placeholder="请输入密码">
              <template #prefix><img class="prefix-icon" src="@/assets/images/password-icon.png" alt=""/></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="loginForm.code" maxlength="4" a auto-complete="off" name="code" tabindex="2" placeholder="请输入验证码" style="width: 50%" @keyup.enter.native="handleLogin">
              <template #prefix><img class="prefix-icon" src="@/assets/images/verification-icon.png" alt=""/></template>
            </el-input>
            <div class="login-code"><img :src="codeImg" @click="getCode"/></div>
          </el-form-item>
          <div class="btn-container">
            <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin">登录</el-button>
          </div>
        </div>

        <div v-if="isWeChat">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" name="mobile" type="text" tabindex="1" auto-complete="on" placeholder="清输入手机号码">
              <template #prefix><img class="prefix-icon" src="@/assets/images/account-icon.png" alt=""/></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="loginForm.code" maxlength="4" a auto-complete="off" name="code" tabindex="2" placeholder="请输入短信验证码" style="width: 60%" @keyup.enter.native="handleLogin">
              <template #prefix><img class="prefix-icon" src="@/assets/images/verification-icon.png" alt=""/></template>
            </el-input>
            <div class="login-code" style="width: 40%;">
              <el-button v-if="showSmsBtn" plain @click="sendSmsCode" style="width: 100%;height: 100%;font-size: 16px;">发送验证码</el-button>
              <el-alert v-else :title="smsCodeTips" type="warning" :closable="false" style="width: 100%;height: 100%;"></el-alert>
            </div>
          </el-form-item>
          <div class="btn-container">
            <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLoginByMobile">登录</el-button>
          </div>
        </div>

        <!-- </el-tab-pane> -->
        <!-- <el-tab-pane label="扫码登录" name="qrcode">
          <div class="main">
            <el-card hoverable style="width: 450px">
              <div style="width: 200px;margin: 0 auto;">
                <el-image :src="qrCodeUrl" fit="fill" style="width: 198px;height: 198px"/>
                <div style="padding: 14px;text-align: center; color: white;">
                  <span>微信扫码</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ tips }}</time>
                  </div>
                </div>
              </div>
            </el-card>
            <div v-if="showRefresh" class="shade"></div>
            <img v-if="showRefresh" class="refresh_img" :src="refreshIcon" slot="cover" @click="getLoginQrCode"/>
          </div>
        </el-tab-pane>
      </el-tabs> -->
      </el-form>
    </div>

    <!-- <div class="copyright">优材优建(青岛)供应链科技有限公司</div> -->
  </div>
</template>

<script>
import {getKaptcha, sendCode} from "@/api/login";
import {getQrcode, getQrConnect} from "@/api/qr_code";

export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("管理员密码长度应大于6"));
      } else {
        callback();
      }
    };
    return {
      liginType: "account",
      loginForm: {
        mobile: undefined,
        username: undefined,
        password: undefined,
        kaptchaKey: "",
        code: "",
        openid: undefined
      },
      codeImg: require("@/assets/images/codeimg-error.jpg"),
      loginRules: {
        username: [{required: true, message: "管理员账户不允许为空", trigger: "blur"},],
        password: [{required: true, message: "管理员密码不允许为空", trigger: "blur"}, {validator: validatePassword, trigger: "blur"},],
        mobile: [{required: true, message: "手机号不允许为空", trigger: "blur"},],
        code: [{required: true, message: "验证码不允许为空", trigger: "blur"},],
      },
      passwordType: "password",
      loading: false,
      qrCodeUrl: require("@/assets/space.jpg"),
      refreshIcon: require("@/assets/refresh.png"),
      showRefresh: false,
      redirect_url: "",
      interval: 0,
      expireSeconds: 0,
      tips: "使用微信扫码",
      showSmsBtn: true,
      smsCodeTips: undefined,
      websiteUrl: "https:" + process.env.VUE_APP_BASE,
      wxOpenIdUrl: "https:" + process.env.VUE_APP_BASE + '/chaos-admin-api/wx/auth'
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  computed:{
    isWeChat() {
      // 判断H5页面是否在微信/企业微信环境中打开：
      let ua = navigator.userAgent.toLowerCase(); // 将用户代理头的值转为小写
      return ua.match(/MicroMessenger/i) == "micromessenger"
    },
  },
  created() {
    if (this.isWeChat) {
      let openid = this.$route.query.openid;
      if (!openid) {
        let redirect_url = encodeURIComponent(this.websiteUrl + "/chaos-data/#/login?redirect=%2Fdashboard")
        window.location.replace(this.wxOpenIdUrl + "?url=" + redirect_url);
      } else {
        this.loginForm.openid = openid
        this.handleLoginByOpenid(openid)
      }
    }

    this.getCode();
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
    clearInterval(this.interval);
  },
  methods: {
    handleTabClick(tab, event) {
      if (this.liginType === "qrcode" && this.expireSeconds <= 0) {
        this.getLoginQrCode();
      }
    },
    getCode() {
      getKaptcha()
        .then((response) => {
          this.loginForm.kaptchaKey = response.data.data.kaptchaKey;
          this.codeImg = response.data.data.codeImg;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendSmsCode() {
      let myreg = /^1[3456789]\d{9}$/
      if (myreg.test(this.loginForm.mobile)) {
        sendCode(this.loginForm.mobile).then((response) => {
          // 超时时间
          this.expireSeconds = 60;
          this.countDown();

          this.$message.info(response.data.message);
        }).catch((err) => {
          this.$message.error(err.data.message);
        });
      } else {
        this.$message.error('请填写正确的手机号')
      }
    },
    handleLogin() {
      let openid = this.$route.query.openid;
      if (openid) {
        this.loginForm.openid = openid
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid && !this.loading) {
          this.loading = true;
          this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
            this.loading = false;

            clearInterval(this.interval);

            this.$router.push({path: this.redirect || "/"});
          }).catch((response) => {
            if (response.data.data) {
              this.loginForm.kaptchaKey = response.data.data.kaptchaKey;
              this.codeImg = response.data.data.codeImg;
            }
            this.$message.error(response.data.message);
            this.loading = false;
          });
        } else {
          this.loading = false;
          return false;
        }
      });
    },
    handleLoginByMobile() {
      this.$refs.loginForm.validate((valid) => {
        if (valid && !this.loading) {
          this.loading = true;
          this.$store.dispatch("LoginByMobile", this.loginForm).then(() => {
            this.loading = false;

            this.$router.push({path: this.redirect || "/"});
          }).catch((response) => {
            this.$message.error(response.data.message);
            this.loading = false;
          });
        } else {
          this.loading = false;
          return false;
        }
      });
    },
    handleLoginByOpenid(openid) {
      if (openid) {
        this.loading = true;
        this.$store.dispatch("LoginByOpenId", {openid}).then(() => {
          this.$router.push({path: this.redirect || "/"});
          this.loading = false
        }).catch((response) => {
          this.loading = false
          /*this.$message.error(response.data.message);*/
        });
      }
    },
    getLoginQrCode() {
      this.showRefresh = false;
      clearInterval(this.interval);
      getQrcode().then((res) => {
          let result = res.data.data;
          let uuid = result.code;
          this.qrCodeUrl = result.qrCodeUrl;
          // 超时时间
          this.expireSeconds = result.expireSeconds;
          this.countDown();

          this.qrConnect(uuid);
          this.loading = false;
        })
        .catch((res) => {
          this.$message.warning({message: res.message, type: "warning"});
        });
    },
    countDown() {
      this.interval = setInterval(() => {
        // 如果活动未结束，对时间进行处理
        if (this.expireSeconds > 0) {
          this.expireSeconds = this.expireSeconds - 1;

          this.smsCodeTips = this.expireSeconds + "秒后可重发";
          this.tips = "有效时间" + this.expireSeconds + "秒";
          this.showSmsBtn = false
        } else {
          this.expireSeconds = 0;

          this.tips = "二维码已失效"
          this.showRefresh = true
          this.showSmsBtn = true
          clearInterval(this.interval);
        }
      }, 1000);
    },
    qrConnect(uuid) {
      if (this.expireSeconds > 0) {
        getQrConnect({uuid})
          .then((res) => {
            let qrCode = res.data.data;
            let token = qrCode.token;
            if (!token) {
              this.qrConnect(uuid);
            } else {
              this.tips = "扫码成功,正在跳转...";

              this.$store.dispatch("LoginByToken", token).then(() => {
                this.loading = false;

                clearInterval(this.interval);

                this.$router.push({path: this.redirect || "/"});
              });
            }
          })
          .catch((error) => {
            this.$message.warning({
              message: error.data.message,
              type: "warning",
            });
          });
      }
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login-bg.png");
  background-size: 100% 100%;

  .el-input {
    border: 1px #19e1cc90 solid;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    color: #454545;
    height: 1.3rem;

    input {
      background: transparent;
      border: 0;
      font-size: 0.4rem;
      -webkit-appearance: none;
      border-radius: 2px;
      //     padding: 12px 5px 12px 15px;
      color: $light_gray;
      //     height: 47px;
      caret-color: $cursor;

      ::placeholder {
        color: #19e1cc;
      }

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px transparent inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    margin-bottom: 0.6rem;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

::v-deep .el-input__inner {
  height: 100%;
  box-sizing: border-box;
  padding-left: 1rem;
}

::v-deep .el-button.is-loading:before {
  background-color: transparent;
}

.login-container {
  height: 23rem;
  width: 100%;
  background-color: 1rem;
  overflow: hidden;

  .login-form {
    background-image: url("../../assets/images/login-form-bg.png");
    background-size: 105% 127%;
    background-position: -0.45rem -3rem;
    background-repeat: no-repeat;
    width: 14rem;
    height: 12rem;
    max-width: 100%;
    overflow: hidden;
  }

  .login-code {
    width: 4rem;
    height: 1.3rem;
    float: right;
    border: 1px #19e1cb90 solid;
    border-radius: 2px;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      cursor: pointer;
      vertical-align: middle;
    }
  }

  .prefix-icon {
    margin: 0.4rem 0.2rem 0 0.2rem;
    width: 0.4rem;
    height: auto;
  }

  .btn-container {
    width: 100%;
    text-align: center;

    .login-btn {
      height: 1.8rem;
      width: 6rem;
      background-image: url("../../assets/images/login-btn-bg.png");
      background-size: 100% 100%;
      background-color: transparent;
      border: 0;
      color: #49e3f9;
      font-size: 0.5rem;
      letter-spacing: 0.3rem;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title {
    font-size: 0.8rem;
    color: #fff;
    font-family: "douyu";
    text-align: center;
    margin: 1.2rem 0 0.8rem;
  }

  .copyright {
    width: 100%;
    font-size: 0.7rem;
    color: #19e1cb;
    text-align: center;
    position: absolute;
    bottom: 1rem;
    letter-spacing: 0.08rem;
  }
}

.main {
  position: relative;
}

.shade {
  background-color: #000000;
  opacity: 0.3;
  width: 198px;
  height: 198px;
  position: absolute;
  top: 0;
}

.refresh_img {
  width: 70px;
  height: 70px;
  position: absolute;
  top: 60px;
  left: 65px;
}

.el-card {
  background: none;
  border: none;
}

.el-card__body {
  padding: 0px !important;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.loginTab {
  > > > .el-tabs__item {
    color: #ffffff;
  }

  > > > .el-tabs__item:hover {
    color: #1890ff;
  }
}
</style>
