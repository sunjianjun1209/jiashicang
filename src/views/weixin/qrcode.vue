<template>
    <div class="main">
        <el-card hoverable style="width: 200px">
            <el-image :src="qrCodeUrl" fit="fill" style="width: 198px;height: 198px"/>
            <div style="padding: 14px;text-align: center;">
                <span>微信扫码</span>
                <div class="bottom clearfix">
                    <time class="time">{{tips}}</time>
                </div>
            </div>
        </el-card>
        <div v-if="showRefresh" class="shade"></div>
        <img v-if="showRefresh" class="refresh_img" :src="refreshIcon" slot="cover" @click="init"/>
    </div>
</template>

<script>
import {getQrcode, getQrConnect} from '@/api/qr_code'

export default {
    name: "qrCode",
    data() {
        return {
            qrCodeUrl: require('@/assets/space.jpg'),
            refreshIcon: require('@/assets/refresh.png'),
            showRefresh: false,
            redirect_url: '',
            interval: 0,
            expireSeconds: 0,
            tips: '使用微信扫码'
        }
    },
    created() {
        this.redirect_url = this.$route.query.url
        console.log("url:" + this.redirect_url)
        this.init();
    },
    methods: {
        init() {
            this.showRefresh = false;
            clearInterval(this.interval)
            getQrcode().then(res => {
                let result = res.data.data
                let uuid = result.code
                this.qrCodeUrl = result.qrCodeUrl
                // 超时时间
                this.expireSeconds = result.expireSeconds
                this.countDown()

                this.qrConnect(uuid);
                this.loading = false
            }).catch(res => {
                this.$message.warning({
                    message: res.message,
                    type: 'warning'
                })
            })
        },
        countDown() {
            this.interval = setInterval(() => {
                // 如果活动未结束，对时间进行处理
                if (this.expireSeconds > 0) {
                    this.expireSeconds = this.expireSeconds - 1
                    this.tips = "有效时间" + this.expireSeconds + "秒"
                } else {
                    this.expireSeconds = 0
                    this.tips = "二维码已失效"
                    this.showRefresh = true
                    clearInterval(this.interval)
                }
                console.log(this.expireSeconds)
            }, 1000)
        },
        qrConnect(uuid) {
            if (this.expireSeconds > 0) {
                getQrConnect({uuid}).then(res => {
                    let qrCode = res.data.data
                    console.log(qrCode)
                    let openid = qrCode.openid
                    let nickName = qrCode.nickName
                    if (!openid) {
                        this.qrConnect(uuid);
                    } else {
                        this.tips = "扫码成功,正在跳转..."

                        let mediator = '&'
                        if (this.redirect_url.indexOf("?") < 0
                            && this.redirect_url.indexOf("%3F") < 0
                            && this.redirect_url.indexOf("%3f") < 0) {
                            mediator = '?'
                        }
                        console.log(this.redirect_url + mediator + "_ctime=" + new Date().getTime() + "&openid=" + openid + "&nickname=" + nickName)
                        window.location.href = this.redirect_url + mediator + "_ctime=" + new Date().getTime() + "&openid=" + openid + "&nickname=" + nickName;
                    }
                });
            }
        }
    }
}
</script>

<style>
    .main {position: relative;}
    .shade {background-color: #000000;opacity: 0.3;width: 198px;height: 198px;position: absolute;top: 0;}
    .refresh_img {width: 70px;height: 70px;position: absolute;top: 60px;left: 65px;}
    .el-card__body {padding: 0px!important;}
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
        clear: both
    }
</style>
