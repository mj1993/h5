<template>
<div>
  <div style="diaplay:flex;flex-direction:column;padding-left:.15rem">
    <div id="header">余额充值</div>
    <div class="minor">充值金额</div>
  </div>

  <div>
    <div style="display:flex;flex-wrap:wrap;margin-left:.075rem">
       <div v-for="item in rechargeList" @click="select(item)" class="button-box" :class="item.id === selectedId ? 'button-active' : 'button-notactive'" :key="item.id" >
           <div style="margin:auto;" >
             <div style="font-size: .16rem;color:inherit;text-align:center">充{{ item.rechargePrice }}元</div>
             <div style="font-size: .12rem;color:inherit;text-align:center" v-if="item.extraPrice">赠送{{ item.extraPrice }}元</div>
           </div>
       </div>
    </div>

    <div class="paybox">
        <div style="display:flex;align-items:center;margin-top:.29rem;margin-bottom:.12rem">
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

    <incar-dialog
    type="alert"
    :isVisible="dialogVisible"
    content="请选择充值金额"
    :isCenter="true"
    @close="dialogVisible = false"
    ></incar-dialog>

    <incar-dialog
    type="alert"
    :isVisible="dialogVisible_2"
    content="充值成功"
    :isCenter="true"
    @close="backToWallet"
    ></incar-dialog>
</div>
     <div @click="charge" class="button bottom-button">立即支付</div>
</div>
</template>

<script>
import IncarDialog from "@/components/IncarDialog";

export default {
  components: {IncarDialog },
  data() {
    return {
      payStyle: 2,
      rechargePrice: 0,
      extraPrice: 0,
      flag: true,
      selectedId: -1,
      rechargeList: [],
      dialogVisible: false,
      dialogVisible_2: false,
      outTradeNo:''
    };
  },
  methods: {
    select(item) {
      if(this.selectedId != item.id){
        this.selectedId = item.id;
        this.rechargePrice = item.rechargePrice;
        this.extraPrice = item.extraPrice;
      }else{
        this.selectedId = -1;
        this.rechargePrice = 0;
        this.extraPrice = 0;
      }
    },
    checkThis(val) {
      this.payStyle = val;
    },
    backToWallet(){
      this.$router.goBack(-1);
    },
    charge() {
      if (!this.flag) {
        return;
      }
      this.flag = false;
      setTimeout(() => {
        this.flag = true;
      }, 5000);

      if (this.rechargePrice === 0) {
        this.dialogVisible = true;
        this.flag = true;
        return;
      }

      let bodyData = {
        style: this.payStyle,
        money: this.rechargePrice * 100,

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
        uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : ''
      };
      this.$http
        .post(this.HOST1 + "/v/account/recharge.json", bodyData)
        .then(response => {
          if (response.data.status === 200) {
            this.outTradeNo = response.data.attachment.outTradeNo;
            this.flag = true;
              if (parseInt(this.payStyle) === 1) {
              this.$dsBridge.call("aliPay", { str: response.data.attachment.str });
            } else {
              this.$dsBridge.call("wxPay", response.data.attachment.bean);
            }
          }
        })
        .catch(error => {
          this.$toast.error('调起支付失败');
        });
    }
  },
  created() {
    let bodyData = {
      platform: this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
      appVersion: this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
      phoneSysVersion: this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
      device_brand: this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
       
      timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
    };
    this.$http
      .get(this.HOST1 + "/v/account/my-account.json", bodyData)
      .then(response => {
        if (response.status === 200) {
          this.rechargeList = response.data.attachment.rechargeModel;
          for(var i=0;i<this.rechargeList.length;i++){
            if(this.rechargeList[i]['rechargePrice']==50){
              this.selectedId=this.rechargeList[i]['id'];
              this.rechargePrice = this.rechargeList[i]['rechargePrice'];
              this.extraPrice = this.rechargeList[i]['extraPrice'];
              return;
            }
          }
          this.selectedId=this.rechargeList[0]['id'];
          this.rechargePrice = this.rechargeList[0]['rechargePrice'];
          this.extraPrice = this.rechargeList[0]['extraPrice'];
        }
      })
      .catch(error => {
        this.$toast.error('获取列表失败');
      });
  },
  mounted(){
    this.$store.commit('setNativeTitle','余额充值')

    // 设置支付回调，侦测支付是否成功。  由原生返回数据
    this.$dsBridge.register('DDWEBVIEW_PAY_FINISH', (code) => {
        this.flag=true;
        if (parseInt(code) === 1) {
            //success
            var req = {
              outTradeNo: this.outTradeNo,
                payMent: parseInt(this.rechargePrice * 100), areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
            }
            this.$http.post(this.HOST1 + '/v/account/pay-notify', req).then(({data}) => {

            })
            this.$router.push({name:'balanceChargeSuccess', query: { fromH5: this.$route.query.fromH5 }})

        } else if (parseInt(code) === 2) {
            this.$toast.error('支付失败');
        } else {
            this.$toast.error('您已取消支付');
        }
    })
  }
};
</script>

<style scoped>
#header {
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  margin: 0.16rem 0;
  font-weight: bold;
}

.minor {
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  color: #999999;
  letter-spacing: 0;
  line-height: 0.12rem;
  margin-left: 0.05rem;
  margin-bottom: 0.2rem;
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

.img-inline {
  width: 0.34rem;
  height: 0.34rem;
}

.button {
  color: #fff;
  margin: 0.26rem 1.16rem;
  width: 1.3rem;
  text-align: center;
  line-height: .44rem;
  height: 0.44rem;
  font-size: 0.18rem;
}

.button-box {
  display: flex;
  flex-direction: column;
  font-family: PingFangSC-Regular;

  /* margin:.09rem .075rem; */
  margin: 0.09rem 0.075rem;
  border-radius: 0.12rem;
  width: 1.65rem;
  height: 0.56rem;
}

.button-notactive {
  color: #0e193a;
  border: 1px solid #c0c0cd;
}

/* .img-inline{
    display: inline;
} */
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

