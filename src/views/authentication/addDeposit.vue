<!-- 还缺少获取返回列表——充值列表 -->

<template>
  <div>
    <div class="incar-mob-title" style="padding-left:.15rem">信用认证</div>

  <div v-if="contentShow">

    <div class="incar-mob-subtitle" style="margin-left:.2rem;margin-bottom:.16rem">信用等级越高，可用越多车型</div>

    <div style="display:flex;flex-direction:row;flex-wrap:nowrap;margin-left:.18rem">
      <div>
        <div :style="{ borderRadius:'5px 0 0 5px',width:'1.68rem',height:'.1rem', backgroundColor: '#296CFF'}"></div>
        <p style="text-align:center;margin-top:.08rem" class="font-gray">信用认证</p>
      </div>
      <div style="width:4px"></div>
      <div>
        <div :style="{ borderRadius:'0 5px 5px 0',width:'1.68rem',height:'.1rem', backgroundColor: isAuthorized ? '#296CFF' : '#D8D8D8'}"></div>
        <p style="text-align:center;margin-top:.08rem;" class="font-gray">身份认证</p>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;margin-top:.47rem;">
      <div style="width: 100%;text-align: center">
        <div style="font-size: .3rem;line-height: .3rem;margin-top:.03rem;display: inline-block;vertical-align: middle">￥</div>
        <div style="font-size: .42rem;line-height: .42rem;display: inline-block;vertical-align: middle">{{ depositToAdd }}</div>
      </div>
      <div style="text-align:center;margin:.24rem 0 .43rem 0" class="font-gray" v-if="isFullAmount">保证金（元）</div>
      <div style="text-align:center;margin:.24rem 0 .43rem 0" class="font-gray" v-else>补充金额（元）</div>
    </div>

    <div class="paybox">
        <div style="display:flex;align-items:center;margin-bottom:.12rem;margin-top:.3rem">
            <img src="../../assets/images/Rectangle.png" alt="" style="display:inline;height:.18rem;width:.06rem !important">
            <p class="payment_title">选择支付</p>
        </div>

        <section @click="checkThis(2)">
            <img src="../../assets/images/weixin.png" alt="微信支付logo" class="img-inline">
            <span class="payment">微信</span>
            <div style="flex:1"></div><!-- 放大的空白 -->
            <input type="radio" name="pay" v-model="payStyle" value="2" :style="payStyle==2?'border:0':''"/>
        </section>
        <section @click="checkThis(1)">
            <img src="../../assets/images/ZFB.png" alt="支付宝logo" class="img-inline">
            <span class="payment">支付宝</span>
            <div style="flex:1"></div><!-- 放大的空白 -->
            <input type="radio" name="pay" v-model="payStyle" value="1" :style="payStyle==1?'border:0':''"/>
        </section>
    </div>

    <div style="display:flex;margin-top:.45rem" @click="submit">
       <submit-button text="立即支付" subText="（AA等级认证）" width="2.5" height=".44" style="margin:auto" isBold></submit-button>
    </div>

  </div>
</div>
</template>

<script>
import submitButton from '@/components/submitButton.vue'

export default {
  components:{ submitButton },
  data() {
    return {
      isAuthorized: false,
      payStyle: 2,
      flag: true,
      depositToAdd : 0,
      outTradeNo:'',
      contentShow:false,
      isFullAmount : false
    };
  },
  methods: {
    checkThis(val) {
      this.payStyle = val;
    },
    submit(){
      this.$toast.loading.show();
      if (!this.flag) {
        return;
      }
      this.flag = false;
      setTimeout(() => {
        this.flag = true;
      }, 5000);

      let bodyData = {
        uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
        style: this.payStyle,
        platform: this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
        areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
        appVersion: this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
        bailType: 1,
        money: parseInt(this.depositToAdd * 100),
        latitude: this.$cookie.get("latitude") ? this.$cookie.get("latitude") : '',
        longitude: this.$cookie.get("longitude") ? this.$cookie.get("longitude") : '',
        level:'AA', // 选择保证金目标等级

        phoneSysVersion: this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
        device_brand: this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
         
        timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '',
        sign: this.$cookie.get("sign") ? this.$cookie.get("sign") : '',
        token: this.$cookie.get("token") ? this.$cookie.get("token") : '',
        userId: this.$cookie.get("userId") ? this.$cookie.get("userId") : '',
        adCode: this.$cookie.get("adCode") ? this.$cookie.get("adCode") : '',
        plateForm: this.$cookie.get("plateForm") ? this.$cookie.get("plateForm") : '',
      };

      this.$http
        .post(this.HOST1 + "/v/account/recharge-bail-v2", bodyData)
        .then(response => {
          if (response.data.status === 200) {
            this.outTradeNo = response.data.attachment.outTradeNo;
            this.flag = true;
            if (parseInt(this.payStyle) === 1) {
              this.$toast.loading.hide();
              this.$dsBridge.call("aliPay", { str: response.data.attachment.str });
            } else {
              this.$toast.loading.hide();
              this.$dsBridge.call("wxPay", response.data.attachment.bean);
            }
          } else {
            this.$toast.error(response.data.message);
          }
        })
    }
  },
  created() {
    //获取需要充值的金额
    let bodyData = {
        uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
        platform: this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
        appVersion: this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
        phoneSysVersion: this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
        device_brand: this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
         
        timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '',
        areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
        sign: this.$cookie.get("sign") ? this.$cookie.get("sign") : '',
        longitude: this.$cookie.get("longitude") ? this.$cookie.get("longitude") : '',
        latitude: this.$cookie.get("latitude") ? this.$cookie.get("latitude") : '',
        token: this.$cookie.get("token") ? this.$cookie.get("token") : '',
        userId: this.$cookie.get("userId") ? this.$cookie.get("userId") : '',
        adCode: this.$cookie.get("adCode") ? this.$cookie.get("adCode") : '',
        plateForm: this.$cookie.get("plateForm") ? this.$cookie.get("plateForm") : '',
      }
    this.$http.post(this.HOST1 + '/v/user/status',bodyData)
    .then(( { data:{ attachment:{ licenseStatus , carBail , status , AA , bail }}} ) => {
      if (parseInt(licenseStatus) === 13 || parseInt(status) === 18) {
          this.isAuthorized = true;
        }
      // this.depositToAdd = parseInt(AA) - parseInt(carBail);
      this.depositToAdd = (parseFloat(AA) - parseFloat(carBail)).toFixed(2);
      if(bail !== 'A' && bail !== 'AA'){
        this.isFullAmount = true;
      }
      this.contentShow = true;
    })
  },
  mounted() {
    // 设置支付回调，侦测支付是否成功。  由原生返回数据
    this.$dsBridge.register("DDWEBVIEW_PAY_FINISH", code => {
      this.flag = true;
      if (parseInt(code) === 1) {
        //success
        var req = {
          outTradeNo: this.outTradeNo,
          payMent: parseInt(this.depositToAdd * 100), areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
        };
        this.$http
          .post(this.HOST1 + "/v/account/pay-notify", req)
          .then(({ data }) => {});
        this.$router.push({ name: "creditVerifySuccess" });
          } else if (parseInt(code) === 2) {
            this.$toast.error("支付失败");
          } else {
            this.$toast.error("您已取消支付");
          }
      });
  }
};
</script>

<style scoped>
.font-gray {
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  color: #999999;
  line-height: 0.14rem;
}
.img-inline {
  width: 0.34rem;
  height: 0.34rem;
}

.payment_title {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #202a48;
  padding-left: 0.1rem;
}

.payment {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #0e193a;
  padding-left: 0.1rem;
}

.paybox {
  margin-left: 0.21rem;
}

.button-active {
  color: #fff;
  background: #296cff;
  box-shadow: 0 0 6px 0 rgba(41, 108, 255, 0.45);
  border: 0;
  /* border:0; */
}

.bottom-button {
  background: #296cff;
  box-shadow: 0 0 0.06rem 0 rgba(41, 108, 255, 0.45);
  border-radius: 0.24rem 0.24rem 0.24rem 0.24rem;
}

section {
  display: flex;
  padding: 0.13rem 0;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  margin: 0 0.25rem 0 0;
}

.btn-active {
  background: #296cff;
  box-shadow: 0 0 0.06rem 0 rgba(41, 108, 255, 0.45);
}
</style>

<style scoped>
input[type="radio"] {
  /*去除浏览器默认样式*/
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /*自定义样式*/
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 20px;
  height: 20px;
  border: 1px solid #c7c7c7;
  background: white;
  outline: none;
  cursor: pointer;
  /*设置为圆形，看起来是个单选框*/
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}

/**
* 单选框 选中之后的样式
**/
input[type="radio"]:after {
  content: "";
  color: white;
  position: absolute;
  width: 100%;
  height: 102%;
  display: block;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: none;
  background: url("../../assets/images/true.png") no-repeat;
  background-size: 100% 100%;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  transform: scale(0);
  font-size: 0.13rem;
  text-align: center;
  /*增加一些动画*/
  -webkit-transition: all ease-in-out 300ms;
  -moz-transition: all ease-in-out 300ms;
  transition: all ease-in-out 300ms;
}
input[type="radio"]:checked:after {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  transform: scale(1);
}
</style>



