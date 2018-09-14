<template>
  <div style="diaplay:flex;flex-direction:column">
    <div id="header">兑换优惠码</div>
    <div class="inputbox">
      <input placeholder="请输入优惠码" v-model="couponCode">
    </div>
    <div @click="checkForExchange" :class="['button',couponCode?'button_active':'button_disabled']">
      <div class="button-text">立即兑换</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponCode: ""
    };
  },
  methods: {
    checkForExchange() {
      var bodyData = {
        code: this.couponCode,
        uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
        token: this.$cookie.get("token") ? this.$cookie.get("token") : '',

        platform: this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
        appVersion: this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
        phoneSysVersion: this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
        device_brand: this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
         
        timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
      };
      this.$http
        .post(this.HOST1 + "/v/coupon/add-to-user", bodyData)
        .then(response => {
          let { data: { status, message } } = response;
          if (status === 200) {
            this.$toast.success(message);
            this.couponCode = "";
          } else {
            this.$toast.error(message);
          }
        });
    }
  }
};
</script>

<style scoped>
#header {
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  margin: 0.25rem 0 0.25rem 0.15rem;
  font-weight: bold;
}

.inputbox {
  margin: 0 0.23rem;
  border-bottom: 1px solid #ebebeb;
}

input {
  font-family: PingFangSC-Regular;
  font-size: 0.16rem;
  letter-spacing: 0.005rem;

  padding-top: 0.2rem;
  padding-bottom: 0.15rem;

  width: 100%;
}

.input_empty {
  color: #c5c5c5;
}

.input_anything {
  color: #1c2438;
}

.button {
  display: flex;
  width: 1.3rem;
  height: 0.44rem;
  margin-top: 0.47rem;
  margin-left: 1.23rem;
}

.button-text {
  font-family: PingFangSC-Regular;
  font-size: 0.18rem;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 18px;
  margin: auto;
}

.button_active {
  background: #296cff;
  box-shadow: 0 0 0.06rem 0 rgba(41, 108, 255, 0.45);
  border-radius: 0.24rem 0.24rem 0.24rem 0.24rem;
}

.button_disabled {
  background: #d8d8d8;
  border-radius: 0.24rem 0.24rem 0.24rem 0.24rem;
}
</style>

