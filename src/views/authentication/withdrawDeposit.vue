<template>
<div class="withdrawDeposit" v-if="contentShow">
  <div class="incar-mob-title" style="margin-left:.15rem">申请提现</div>
  <!--提现-->
  <div style="display:flex;flex-direction:column;margin-top:.5rem" v-if="beforeWithdraw">
      <div style="width: 100%;text-align: center">
          <div style="font-size: .3rem;line-height: .3rem;margin-top:-0.15rem;display: inline-block;vertical-align: middle">￥</div>
          <div style="font-size: .42rem;line-height: .42rem;display: inline-block;vertical-align: middle;">{{carBail}}</div>
      </div>
      <div style="height:.17rem"></div>
      <div style="font-family: PingFangSC-Regular;color:#999;font-size: .14rem;width: 100%;text-align: center">&nbsp;&nbsp;保证金（元）</div>
      <div style="height:.57rem"></div>
      <div style="font-family: PingFangSC-Regular;color:#999;font-size: .12rem;text-align:center;width:3.27rem;margin:auto">{{ reimburseDepositText }}</div>
      <div style="height:1.7rem"></div>
      <span @click="submit" class="incar-mob-btn" style="margin:auto;width:1.3rem">提现</span>
  </div>
  <!--取消提现-->
  <div style="display:flex;flex-direction:column;" v-else>
      <div style="height:.4rem"></div>
      <img src="../../assets/images/Group_2.png" alt="" style="  width: 1.82rem;height: 1.57rem;margin:auto">
      <p class="firstText">
        {{firstText}}
        <!--正在检查是否有违章和事故记录请您耐心等待...-->
      </p>
      <div class="secondText" >{{ secondText }}
        <!--需要20天的审核时间，若没有违章、事故和异常用车等情况，保证金会原路退还（申请日期：2018年03月13日)。-->
      </div>
      <!-- 通过【sesameIndentified】来判断是否显示芝麻信用认证页面 -->
      <div v-if="sesameIndentified" class="sesameIndentified">
            <div class="incar-mob-btn" @click="Authentication">芝麻信用认证</div>
            <div class="incar-mob-btn1" @click="Cancellation">取消提现</div>
      </div>
      <div v-else class="sesameIndentified sesameIndentified1">
          <div class="incar-mob-btn2 " @click="Cancellation">取消提现</div>
      </div>
  </div>



  <incar-dialog
    :type="dialogInfo.type"
    :title="dialogInfo.title"
    :isVisible="dialogInfo.dialogShow"
    :content="dialogInfo.content"
    :confirmText="dialogInfo.confirmText"
    :isCenter="true"
    @enterAction="checkStatusSubmit"
    @close="checkStatusGoback"
  ></incar-dialog>

    <incar-dialog
     title="申请提现将导致无法使用“大众POLO”等车型"
     content="是否确认申请提现？"
    :isVisible="dialogShow_1"
    @close="dialogShow_1 = false"
    @enterAction="checkStatusSubmit"/>

    <incar-dialog
     title="申请提现将导致无法用车"
     content="是否确认申请提现？"
    :isVisible="dialogShow_2"
    @close="dialogShow_2 = false"
    @enterAction="checkStatusSubmit"/>
</div>
</template>

<script>
  import IncarDialog from "@/components/IncarDialog";
export default {
  data(){
    return {
      contentShow:false,
      btn:true,
      identityText:null,
      bail:null,
      carBail:null,
      reimburseDepositText:'',
      firstText:'',
      secondText:'',
      sesameIndentified:false,
      beforeWithdraw:false,
      confirm:'confirm-btn',
      dialogInfo: {
        type: "confirm",
        dialogShow: false,
        content: "",
        title: "",
        confirmText: "确定",
        cancelText: "取消"
      },
      dialogShow_1: false,
      dialogShow_2: false,
      depositRank: "", // 保证金等级
      sesameRank: "", // 芝麻认证等级
    }
  },
  components: { IncarDialog },
  methods:{
    Authentication(){
      //芝麻认证   判断是否完成身份认证
      var req={
        uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
        userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
        token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
        platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
        appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
      }
      this.$http.post(this.HOST1 + '/v/user/status', req).then((response) => {
            var res = response.data;
            if (res.status == 200) {
              //身份认证
              if((res.attachment.licenseStatus ==13) || (res.attachment.status ==18) ){
                  this.$http.post(this.HOST1 +'/v/zhima/getAuthorizeUrl.json',req).then((response) => {
                    var res = response.data;
                    if (res.status == 200) {
                      var tbUrl = res.attachment.url;
                      this.$dsBridge.call('sesameCallbackUrl',{tbUrl:tbUrl})
                    }else {
                      this.$toast.error(res.message);
                    }
                  }, (error) => {

                  })
              }else if((res.attachment.licenseStatus ==11) || (res.attachment.status ==15)){
                this.$toast.error('身份认证审核中，请耐心等待')
              } else{
                //从提现页面进入  填写资料
                this.$router.push({name:'authenticationSesame',query:{refund:'true'}})
              }
            }
          }, (error) => {
      })
    },
    //芝麻认证后的回调
      zhimasuccess(){
        var req={
          uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
          userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
          token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
          platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
          appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
        }
        this.$http.post(this.HOST1 + '/v/user/status', req).then((response) => {
          var res = response.data;
          if (res.status == 200) {
            // 信用认证
            if(res.attachment.authorize ==1 &&  res.attachment.userZmInfo==0){
              // 芝麻认证失败';
              this.dialogInfo.type = "alert";
              this.dialogInfo.dialogShow =true;
              this.dialogInfo.title = '您的芝麻信用分值不足';
              this.dialogInfo.content = '请用保证金方式进行信用认证';
              this.dialogInfo.confirmText = '知道了';
            }else  if( res.attachment.authorize ==1){
              // 芝麻认证成功'
              this.$router.push({name:'creditVerifySuccess',query: { NewUser:  this.$route.query.NewUser }})
            }else if(res.attachment.authorize ==0){
              this.dialogInfo.type = "alert";
              this.dialogInfo.dialogShow =true;
              this.dialogInfo.title = '授权失败，请重新尝试';
              this.dialogInfo.confirmText = '知道了';
            }
          }
        }, (error) => {

        })
    },
    // 取消提现
    Cancellation(){
      if(this.btn){
        this.btn=false;
        setTimeout( ()=>{
          this.btn=true
        },5000)
        this.dialogInfo.type = "confirm";
        this.dialogInfo.dialogShow =true;
        this.dialogInfo.title = '提示';
        this.dialogInfo.content = '是否确认取消';
        this.dialogInfo.confirmText = '确认';
      }

    },
    // 确定按钮
    checkStatusSubmit(){
      this.dialogShow_1=false;
      this.dialogShow_2=false;
      // 提现  确定按钮
      if(this.beforeWithdraw){
          this.dialogInfo.confirmText = '确定';
          if(this.bail=='200') {
            //退保证金
            this.$toast.loading.show();
            let bodyData = {
              uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
              userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
              token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
              platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
              appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
              timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
            }
            this.$http.post(this.HOST1 + '/v/account/return-bail.json',bodyData)
              .then((response) => {
                var res = response.data;
                this.$toast.loading.hide();
                if(res.status==200){
                  this.$router.push({name:'authenticationList'})
                }else {
                  this.$toast.error(res.message);
                }
              })
          }else  if(this.bail=='400'){
            this.dialogInfo.dialogShow =false;

          }else if(this.bail=='402'){
            this.dialogInfo.dialogShow =false;
            this.$router.push({name:'wallet'})

          }else if(this.bail=='403'){
            this.dialogInfo.dialogShow =false;
            this.$dsBridge.call('needHandleExceptionOrder')
          }else if(this.bail=='404'){
            this.dialogInfo.dialogShow =false;
            this.$dsBridge.call('customerService')

          }

      } else{
        // 取消提现  确定按钮
        this.$toast.loading.show();
        this.dialogInfo.confirmText = '确定';
        this.dialogInfo.dialogShow =false;
        let bodyData = {
          uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
          userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
          token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
          platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
          appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
          timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
        }
        this.$http.post(this.HOST1 + '/v/account/revocation-bill.json',bodyData)
          .then((response) => {
            var res = response.data;
            this.$toast.loading.hide();
            if(res.status==200){
              this.$toast.success(res.message);
              setTimeout( ()=> {
                this.$router.goBack(-1);
              },1000)
            }else {
              this.$toast.error(res.message);
            }
          })
      }
    },
    // 取消提现 取消
    checkStatusGoback(){
      this.btn=true;
      this.dialogInfo.dialogShow =false;
      this.confirm='return-bail';
    },
    submit(){
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
      }
      this.$http.post(this.HOST1 + '/v/account/return-bail-2.json',bodyData).then((response) => {
        var res = response.data
        if(res.status==200){
          this.bail='200';
          if (this.depositRank === "AA" && this.sesameRank === "A" ) {
            this.dialogShow_1 = true;
          } else if ( this.sesameRank !== "A" && this.sesameRank !== "AA" ) {
            this.dialogShow_2 = true;
          } else if((this.depositRank === "A" && this.sesameRank === "AA" ) ||  (this.depositRank === "A" && this.sesameRank === "A" ) ||  (this.depositRank === "AA" && this.sesameRank === "AA" )){
            this.checkStatusSubmit();
          }else{
            this.dialogInfo.type = "confirm";
            this.dialogInfo.dialogShow =true;
            this.dialogInfo.title = '申请提现';
            this.dialogInfo.content = '若您未进行芝麻信用授权，提现后将不能再使用车辆';
            this.dialogInfo.confirmText = '确定';
            this.dialogInfo.cancelText = '取消';
          }
        }else if(res.status==400){
          this.bail='400';
          this.dialogInfo.type = "confirm";
          this.dialogInfo.dialogShow =true;
        }else if(res.status==402){
          this.dialogInfo.type = "confirm";
          this.dialogInfo.dialogShow =true;
          this.dialogInfo.title = '您的账户有欠款';
          this.dialogInfo.content = '请先补交欠款';
          this.dialogInfo.confirmText = '去往我的钱包';
          this.bail='402';
        }else if(res.status==403){
          this.bail='403';
          this.dialogInfo.type = "confirm";
          this.dialogInfo.dialogShow =true;
          this.dialogInfo.title = '您有未完成的订单';
          this.dialogInfo.content = '请先处理订单';
          this.dialogInfo.confirmText = '跳转详情页面';
        }else if(res.status==404){
          this.bail='404';
          this.dialogInfo.type = "confirm";
          this.dialogInfo.dialogShow =true;
          this.dialogInfo.title = '您有异常的订单';
          this.dialogInfo.content = '请先处理订单';
          this.dialogInfo.confirmText = '联系客服';
        }

      }, (error) => {
        this.dialogInfo.dialogShow =false;
        this.$toast.error(res.message);
      })
    }
  },
  created(){
    // 获取提现金额
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
        plateForm: this.$cookie.get("plateForm") ? this.$cookie.get("plateForm") : ''
      }
      this.$http.post(this.HOST1 + '/v/user/status',bodyData)
        .then((response) => {
          var res = response.data;
          this.reimburseDepositText = res.attachment.reimburseDepositText;
          this.firstText = res.attachment.firstText;
          this.secondText = res.attachment.secondText;
          this.carBail=res.attachment.carBail;
          this.sesameRank = res.attachment.zhima;  // 芝麻信用等级
          this.depositRank = res.attachment.bail;  // 保证金认证等级
          //是否有保证金
          // this.beforeWithdraw = parseInt(res.attachment.depositStatus) === 2 ? true : false;
          if(res.attachment.depositStatus ==1){
            this.beforeWithdraw=true;
          }else if(res.attachment.depositStatus ==2){
            // 是否有芝麻分  无
            if(res.attachment.authorize ==0 && res.attachment.userZmInfo ==0){
              this.sesameIndentified=true;
            }else {
              this.sesameIndentified=false;
            }
          }
          console.log(res.attachment.authorize)
          console.log(res.attachment.userZmInfo)

          // alert(JSON.stringify(res,null,2))
          // alert(res.attachment.depositStatus)
          // alert(this.beforeWithdraw)
          // alert(this.sesameIndentified)
          this.contentShow=true;
        })

  },
  watch: {
    //监听数据的改变
    '$store.state.zhimaIdCardFinish':'zhimasuccess',
  }
}
</script>
<style scoped lang="scss">
  .withdrawDeposit{
    .firstText{
      width: 2.2rem;
      margin:0  auto .27rem;
      text-align: center;
      height: .36rem;
      line-height: .22rem;
      font-family: PingFangSC-Regular;
      font-size:.16rem;
      color: #0E193A;
      letter-spacing: -0.3px;
    }
    .secondText{
      font-family: PingFangSC-Regular;color:#999;font-size: .12rem;text-align:center;width:3.17rem;margin:auto
    }
  }
  .sesameIndentified{
    width: 2.5rem;
    margin: auto;
  }
  .sesameIndentified1{
    width: 1.42rem;
    margin:.8rem auto 0;
  }
  .incar-mob-btn{
    text-align: center;
    margin:.25rem auto .13rem;
    width: 2.5rem;
    height: .44rem;
  }
  .incar-mob-btn1 {
    width: 2.5rem;
    height: .44rem;
    display: inline-block;
    padding: 0 .4rem;
    line-height: .44rem;
    text-align: center;
    /* background-color:#296cff; */
    border-radius: .22rem;
    font-size: .18rem;
    color: #296cff;
    background: #ffffff;
    border: 1px solid #296cff;
  }
  .incar-mob-btn2 {
    width: 1.42rem;
    display: inline-block;
    height: .44rem;
    line-height: .44rem;
    text-align: center;
    border-radius: .22rem;
    font-size: .18rem;
    color: #fff;
    background: #296cff;
    box-shadow: 0 0 0.06rem 0 rgba(41, 108, 255, 0.45);
  }
</style>
