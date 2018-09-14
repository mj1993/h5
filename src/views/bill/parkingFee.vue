<template>
<div>
  <div style="diaplay:flex;flex-direction:column;padding-left:.15rem">
    <div id="header" v-text="content.title"></div>
    <section id="p1" v-text="content.para_1"></section>
    <section id="p2" v-text="content.para_2"></section>
    <input :placeholder="content.input" v-model="parkingFee" type="number">
  </div>
  <div class="box">
    <div class="button button_active" v-if="parkingFee" @click="submit" >确定</div>
    <div class="button button_disabled" v-else >确定</div>
  </div>

  <incar-dialog
    :type="dialogInfo.type"
    :title="dialogInfo.title"
    :isVisible="dialogInfo.dialogShow"
    :content="dialogInfo.content"
    :confirmText="dialogInfo.confirmText"
    :cancelText="dialogInfo.cancelText"
    :isCenter="true"
    @enterAction="checkStatusSubmit"
    @close="checkStatusGoback"
  ></incar-dialog>
</div>
</template>

<script>
import IncarDialog from "@/components/IncarDialog";

export default {
  data() {
    return {
      parkingFee: "",
      errorCount: 0,
      resStatus: 0,
      isPushHard: false,
      dialogInfo: {
        type: "confirm",
        dialogShow: false,
        content: "",
        title: "",
        confirmText: "确定",
        cancelText: "取消"
      },
      content: {
        title: "登记停车费",
        para_1: "请如实提交代交的停车费金额。",
        para_2:
          "风控系统实时审核通过，待车辆驶出停车场后系统会将同等金额补偿进您的余额账户。",
        input: "请输入代交的停车费金额"
      }
    };
  },
  computed: {
    parkingFeeInteger() {
      return parseInt(this.parkingFee);
    }
  },
  components: { IncarDialog },
  methods: {
    checkStatusGoback() {
      if (
        this.resStatus === 400 &&
        this.resMessage === "金额输入异常,您有一次修改提交的机会!"
      ) {
        this.dialogInfo.dialogShow = false;
        return;
      }
      this.$dsBridge.call("dissmissCurrentVc");
    },
    checkStatusSubmit() {
      if (this.resStatus === 400) {
        this.isPushHard = true;
        this.submit();
      }
      dialogInfo.dialogShow = false;
      this.$dsBridge.call("dissmissCurrentVc"); // 调用安卓的方法，返回上一级安卓页面
    },
    submit() {
      var bodyData = {
        uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
        orderId: this.$cookie.get("orderId"),
        parkingFee: parseInt(parseInt(this.parkingFee)*100),
        token: this.$cookie.get("token") ? this.$cookie.get("token") : '',
        platform: this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
        appVersion: this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
        phoneSysVersion: this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
        device_brand: this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
         
        timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '',
        areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
      };
      this.$http
        .post(this.HOST1 + "/v/order/submit-parking-fee-new", bodyData)
        .then(res => {
          this.dialogInfo.dialogShow = true;

          // 初始化形式
          this.dialogInfo.type = "confirm";
          this.dialogInfo.content = "";
          this.dialogInfo.title = "";
          this.dialogInfo.confirmText = "确定";
          this.dialogInfo.cancelText = "取消";

          this.resStatus = res.data.status;
          this.resMessage = res.data.message;

          if (res.data.status === 200) {
            this.dialogInfo.type = "alert";
            this.dialogInfo.content = res.data.message;
          } else if (res.data.status === 400) {
            if (res.data.message === "您已经提交过停车费") {
              this.dialogInfo.type = "alert";
              this.dialogInfo.title = "";
              this.dialogInfo.content = res.data.message;
            } else {
              this.dialogInfo.title = "金额异常";
              this.dialogInfo.content = res.data.message;
              this.dialogInfo.confirmText = "确认提交";
              this.dialogInfo.cancelText = "重新填写";
            }
          } else if (res.data.status === 401) {
            if (this.isPushHard === true) {
              this.dialogInfo.type = "alert";
              this.dialogInfo.title = "";
              this.dialogInfo.content = "提交成功，等待人工审核";
              return;
            }
            this.dialogInfo.type = "alert";
            this.dialogInfo.title = "金额异常";
            this.dialogInfo.content = "输入金额异常次数过多,已转由人工审核";
          } else if (res.data.status === 402) {
            this.dialogInfo.type = "alert";
            this.dialogInfo.content = res.data.message;
          } else {
            this.dialogInfo.type = "alert";
            this.dialogInfo.content = res.data.message;
          }
        })
        .catch(error => {
          alert(error);
        });
    }
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

input {
  font-family: PingFangSC-Regular;
  font-size: 0.3rem;
  line-height: 0.32rem;
  color: #0e193a;
  /* line-height: .15rem; */

  padding: 0.12rem 0 0.12rem 0.12rem;
  margin: 0.22rem 0 0 0;
  border-bottom: 1px solid #ebebeb;

  width: 100%;
  /* height: .58rem; */
}

::placeholder {
  font-size: 0.15rem;
  color: #c3c3c3;
  letter-spacing: 0;
}

section {
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  color: #999999;
  letter-spacing: 0;
}

#p1 {
  line-height: 0.15rem;
}

#p2 {
  line-height: 0.2rem;
  margin: 0.29rem 0 0 0;
}

.input_empty {
  color: #c3c3c3;
}

.input_anything {
  color: #0e193a;
}

.box {
  display: flex;
  margin-top: 0.62rem;
}

.button {
  margin: auto;
  width: 1.3rem;
  text-align: center;
  line-height: .44rem;
  height: 0.44rem;
  font-size: 0.18rem;
  color: #fff;
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

