<template>
<div>
  <div class="incar-mob-title" style="padding-left:.15rem">信用认证</div>


  <!-- 测试使用：起点 -->
   <!-- <div> -->
    <!-- <button @click="changeState('isAuthorized')">#身份认证#</button> -->
    <!-- <button @click="changeRank('depositRank')">#保证金等级#</button> -->
    <!-- <button @click="changeRank('sesameRank')">#芝麻信用等级#</button> -->
    <!-- <button @click="changeState('isReimburseDeposit')">#退保证金情况#</button> -->
  <!-- </div> -->
  <!-- <div> -->
    <!-- 身份认证情况：{{ isAuthorized?'已认证':'未认证' }} -->
    <!-- || 保证金等级：{{ depositRank }} -->
    <!-- || 芝麻分：{{ sesameRank }} -->
    <!-- || {{isReimburseDeposit ? "退款审核中" : "申请提现" }} -->
  <!-- </div> -->
  <!-- 测试使用：终点 -->

  <div v-if="contentShow">
    <img src="../../assets/images/icon_select@2x.png" alt="" style="margin:0 auto;display: block" :style="{width: '1.82rem',height: '1.57rem',marginTop:isAuthorized?'0.4rem':'0.6rem'}" >

    <div class="text_1" style="text-align:center">信用等级 {{ totalRank }}</div>
    <div class="text_2" style="text-align:center">
      <span v-if="depositRank">保证金 {{ depositRank }}</span>
      <span v-if="depositRank && sesameRank">+</span>
      <span v-if="sesameRank">芝麻信用 {{ sesameRank }}</span>
    </div>

    <div style="margin-top:.17rem;height:.18rem">
        <!-- <router-link v-show="hasCashDeposit" to="withdrawDeposit" class="text_3">{{ isReimburseDeposit ? "退款审核中" : "申请提现"}}</router-link> -->
        <div v-show="hasCashDeposit || isReimburseDeposit">
          <div @click="$router.push({name:'withdrawDeposit'})" class="text_3" v-if="isReimburseDeposit" style="text-align:center">退款审核中</div>
          <div v-else class="text_3" @click="withdraw" style="text-align:center">申请提现</div>
        </div>
    </div>

    <div style="display:flex;flex-direction:column;justify-content: center;align-items:center;height:2.3rem">

      <div style="display:flex;" v-if="isAuthorized">
          <div v-if="sesameIndentified" class="incar-mob-btn" style="width:2.5rem" @click="updateSesameInfo" >芝麻信用查询</div>
          <div v-else  class="incar-mob-btn" style="width:2.5rem"  @click="checkSesameInfo">芝麻信用认证</div>
      </div>

      <div class="incar-mob-btn" style="width:2.5rem" @click="identity" v-else>下一步：身份认证</div>

      <div v-if="isAuthorized && totalRank === 'A' && !isReimburseDeposit" style="margin: 0 auto">
          <div style="height:.15rem"></div>
          <submit-button text="保证金认证" subText="（AA等级认证）" width="2.5" height=".44" reverse @click.native="$router.push({name:'addDeposit'})"></submit-button>
      </div>
      <div v-if="isAuthorized && totalRank === 'A' && !isReimburseDeposit" style="margin: 0 auto">
        <div class="text_4">用户等级AA可用车辆：{{this.creditAA.car}}等</div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import IncarDialog from "@/components/IncarDialog";
import baseData from '../../assets/control';
import submitButton from '@/components/submitButton.vue'

export default {
  components: { IncarDialog , submitButton },
  data() {
    return {
      isReimburseDeposit: false, //是否退款中
      depositRank: "", // 保证金等级
      sesameRank: "", // 芝麻认证等级
      sesameIndentified: false, //芝麻认证是否通过
      isAuthorized: false, //身份认证
      dialogShow_1: false,
      dialogShow_2: false,
      contentShow:false,
      creditA:null,
      creditAA:null,
      identityStatus:null,
    };
  },
  computed: {
    totalRank() {
      if (this.depositRank === "AA" || this.sesameRank === "AA") {
        return "AA";
      } else if (this.depositRank === "A" || this.sesameRank === "A") {
        return "A";
      } else {
        return "";
      }
    },
    hasCashDeposit() {
      return Boolean(this.depositRank);
    }
  },
  methods: {
    //测试使用，产品环境删除
    // changeState(val) {
    //   this[val] = !this[val];
    // },
    // changeRank(val) {
    //   if (this[val] === "AA") {
    //     this[val] = "A";
    //   } else {
    //     this[val] = "AA";
    //   }
    // },
    identity() {
      if(this.$route.query.NewUser=='true'){
        this.$dsBridge.call("pushIdentityController", { type: "fromNewUser" , status:"0"});
      } else {
        this.$dsBridge.call("pushIdentityController", { type: "authFlow" , status:"0"});
      }
    },
    fetchData(){
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
      .then(({ data: { attachment: { zhima , depositStatus , licenseStatus , authorize , bail ,status } } }) => {
      // .then(res => {
        // alert(JSON.stringify(data, null, 2));

          this.sesameRank = zhima;  // 芝麻信用等级
          this.depositRank = bail;  // 保证金认证等级

          // 保证金状态：正常/退款
          if (parseInt(depositStatus) === 1) {
            this.isReimburseDeposit = false;
          } else if (parseInt(depositStatus) === 2) {
            this.isReimburseDeposit = true;
          }

        this.sesameIndentified = parseInt(authorize) === 1 ? true : false; // 芝麻信用认证通过 ： true/false
        // 身份认证是否通过： 驾照状态或者用户状态两个来判断
        if (parseInt(licenseStatus) === 13 || parseInt(status) === 18 || parseInt(licenseStatus) === 11 || parseInt(status) === 15) {
          this.isAuthorized = true;
        }

        if (parseInt(licenseStatus) === 13 || parseInt(status) === 18) {
          this.identityStatus = 2;
        } else if ( parseInt(licenseStatus) === 11 || parseInt(status) === 15 ) {
          this.identityStatus = 1;
        } else {
          this.identityStatus = 0;
        }

        // this.$toast.loading.hide();
        this.contentShow = true;
      })
    },
    // 控制两个弹窗
    withdraw() {
      // if (this.depositRank === "AA" && this.sesameRank === "A" ) {
      //   this.dialogShow_1 = true;
      // } else if ( this.sesameRank !== "A" && this.sesameRank !== "AA" ) {
      //   this.dialogShow_2 = true;
      // } else {
        this.$router.push("withdrawDeposit");
      // }
    },
      checkSesameInfo(){
        if(this.identityStatus == 2){
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
            .post(this.HOST1 + "/v/zhima/getAuthorizeUrl.json", bodyData)
            .then(({ data: { attachment : { url } } }) => {
                this.$dsBridge.call('sesameCallbackUrl',{ tbUrl:url }) //获取芝麻url，调用原生接口
            })
        } else if(this.identityStatus == 11){
          this.$toast.error('身份认证审核中，请耐心等待')
        } else {
          this.$router.push({name:'authenticationSesame'});
        }
      },
      updateSesameInfo() {
        let bodyData = {
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
          .post(this.HOST1 + "/v/zhima/getUserZmScore.json", bodyData)
          .then(({ data: { status, message } }) => {
            if (parseInt(status) === 200) {
              this.fetchData();
              this.$toast.error("信息更新成功");
            } else {
              this.$toast.error(message);

            }
          })
      }
  },
  created() {
    this.fetchData();
    const data=parseInt(this.$cookie.get('areaCode'));
    if(baseData[data]){
      this.creditA=baseData[data].creditA;
      this.creditAA=baseData[data].creditAA;
    }else {
      this.creditA=baseData['default'].creditA;
      this.creditAA=baseData['default'].creditAA;
    }
  },
  watch:{
    // '$store.state.zhimaOldUserFinish': 'fetchData'
    '$store.state.zhimaOldUserFinish': 'fetchData'
  }
};
</script>

<style scoped>
.text_1 {
  font-family: PingFangSC-Light;
  font-size: 0.28rem;
  color: #0e193a;
  letter-spacing: 0.88px;
  line-height: 0.32rem;
  margin-top: 0.2rem;
}

.text_2 {
  font-family: PingFangSC-Light;
  font-size: 0.16rem;
  color: #0e193a;
  letter-spacing: -0.3px;
  line-height: 0.13rem;
  margin-top: 0.16rem;
}

.text_3 {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 18px;
  color: #2579ff;
}

.text_4 {
  margin-top: 0.15rem;
  font-family: PingFangSC-Regular;
  font-size: 0.11rem;
  color: #999999;
}


</style>

