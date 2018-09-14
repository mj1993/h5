<template>
<div>
  <div v-if="contentShow">
    <div class="incar-mob-title" style="padding-left:.15rem">信用认证</div>
    <div class="incar-mob-subtitle" style="margin-left:.2rem;margin-bottom:.25rem" >信用等级越高，可用越多车型</div>

    <div @click="select('AA')" :class="['container',selectedLevel === 'AA' ? 'active' : '']">
      <div class="box">
        <div class="item_1">￥{{ rankAA }}</div>
        <div class="subcontainer">
          <div class="item_2">AA级</div>
          <div class="item_3">可用车辆：{{this.creditAA.car}}等</div>
        </div>
      </div>
    </div>

    <div @click="select('A')" :class="['container', selectedLevel === 'A' ? 'active' : '']">
      <div class="box">
        <div class="item_1">￥{{ rankA }}</div>
        <div class="subcontainer">
          <div class="item_2">A级</div>
          <div class="item_3">可用车辆：{{this.creditA.car}}等</div>
        </div>
      </div>
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

    <div style="display:flex;margin-top:.3rem">
      <span class="incar-mob-btn btn-active" style="margin:auto;width:1.3rem" @click="submit">支付</span>
    </div>

  </div>

</div>
</template>

<script>
  import baseData from '../../assets/control';
export default {
  data() {
    return {
      payStyle: 2,
      flag: true,
      selectedLevel: "AA",
      chargeAmount: '',
      outTradeNo:'',
      rankAA:'',
      rankA:'',
      creditA:null,
      creditAA:null,
      contentShow:false
    };
  },
  computed: {},
  methods: {
    checkThis(val) {
      this.payStyle = val;
    },
    select(val) {
      this.selectedLevel = val;
      this.chargeAmount = val === "AA" ? this.rankAA : this.rankA;
    },
    submit() {
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
        money: parseInt(this.chargeAmount) * 100,
        latitude: this.$cookie.get("latitude") ? this.$cookie.get("latitude") : '',
        longitude: this.$cookie.get("longitude") ? this.$cookie.get("longitude") : '',
        level: this.selectedLevel, // 选择保证金目标等级

        phoneSysVersion: this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
        device_brand: this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',

        timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '',
        sign: this.$cookie.get("sign") ? this.$cookie.get("sign") : '',
        token: this.$cookie.get("token") ? this.$cookie.get("token") : '',
        userId: this.$cookie.get("userId") ? this.$cookie.get("userId") : '',
        adCode: this.$cookie.get("adCode") ? this.$cookie.get("adCode") : '',
        plateForm: this.$cookie.get("plateForm") ? this.$cookie.get("plateForm") : ''
      };
      this.$http
        .post(this.HOST1 + "/v/account/recharge-bail-v2", bodyData)
        .then(response => {
          if (response.data.status === 200) {
            this.outTradeNo = response.data.attachment.outTradeNo;
            this.flag = true;
            if (parseInt(this.payStyle) === 1) {
              this.$toast.loading.hide();
              this.$dsBridge.call("aliPay", {
                str: response.data.attachment.str
              }); 
            } else {
              this.$toast.loading.hide();
              this.$dsBridge.call("wxPay", response.data.attachment.bean);
            }
          } else {
            this.$toast.error(response.data.message);
          }
        })
        .catch(error => {
          this.$toast.error("调起支付失败");
        });
    }
  },
  mounted() {
    const data=parseInt(this.$cookie.get('areaCode'));
    if(baseData[data]){
      this.bail=baseData[data].bail;
      this.zhima=baseData[data].zhima;
      this.creditA=baseData[data].creditA;
      this.creditAA=baseData[data].creditAA;
    }else{
      this.bail=baseData['default'].bail;
      this.zhima=baseData['default'].zhima;
      this.creditA=baseData['default'].creditA;
      this.creditAA=baseData['default'].creditAA;
    }
    // 设置支付回调，侦测支付是否成功。  由原生返回数据
    this.$dsBridge.register("DDWEBVIEW_PAY_FINISH", code => {
      this.flag = true;
      if (parseInt(code) === 1) {
        //success
        var req = {
          outTradeNo: this.outTradeNo,
          payMent: parseInt(this.chargeAmount * 100),
          areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
        };
        this.$http
          .post(this.HOST1 + "/v/account/pay-notify", req)
          .then(res => {});
        this.$dsBridge.call("nativeHideNavRightItem", {});
        this.$router.push({ name: "creditVerifySuccess" , query : { NewUser : this.$route.query.NewUser }});
      } else if (parseInt(code) === 2) {
        this.$toast.error("支付失败");
      } else {
        this.$toast.error("您已取消支付");
      }
    });
  },
  // 安卓的判断
  created() {
    if(this.$route.query.NewUser=='true'){
      this.$dsBridge.call("nativeAddNavRightItem", { title: "跳过" }, ovid => {
        this.$dsBridge.call("pushIndex");
      });
    }

    // this.$toast.loading.show();
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
      };
      this.$http
      .post(this.HOST1 + "/v/user/status", bodyData)
      .then(({ data: { attachment: { A , AA } } }) => {
      // .then(res => {
        // alert(JSON.stringify(data, null, 2));
        this.rankAA = AA;
        this.rankA = A;
        this.chargeAmount = AA;

        this.contentShow = true;
      })

  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  width: 3.45rem;
  height: 0.95rem;

  margin: 0.15rem 0 0 0.15rem;

  border-radius: 10px;
  box-shadow: 0 3px 5px 0 rgba(234, 237, 244, 0.6);
}

.active {
  position: relative;
  box-shadow: 0 3px 5px 0 rgba(211, 184, 134, 0.28);
}

.container .box {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0.25rem 0 0.25rem 0.15rem;
  position: relative;
  z-index: 3;
}

.active:before {
  content: " ";
  display: inline-block;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right top, #dabb89 0%, #e9dac0 100%);
  border-radius: 10px;
  position: absolute;
  z-index: 1;
}
.active:after {
  content: " ";
  display: inline-block;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: 2;
}

.item_1 {
  font-family: PingFangSC-Medium;
  font-size: 26px;
  color: #0e193a;
  letter-spacing: 0;
  line-height: 26px;

  margin-left: 0.16rem;
}

.subcontainer {
  margin-left: 0.2rem;
}

.item_2 {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #0e193a;
  letter-spacing: 0;
}

.item_3 {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #0e193a;
  letter-spacing: 0;
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

