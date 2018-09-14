<template>
    <div class="credit" id="credit">
        <div class="main">
            <div class="title">
                信用认证
            </div>
            <div class="explain">
                信用等级越高，可用越多车型
            </div>
            <div >
                <div class="explain-img" style="padding: 0 .05rem">
                    <div class="title-img1"></div>
                    <div class="title-img2"></div>
                </div>
                <div class="icon-explain">
                    <div class="title-explain">信用认证</div>
                    <div class="title-explain">身份认证</div>
                </div>
            </div>
            <div>
                <div class="credit-bag credit-bag1">
                    <div class="credit-bag-img">
                        <img src="../../assets/images/icon_levelAA@3x.png" alt="">
                        <div class="grade">信用等级AA</div>
                    </div>
                    <div class="credit-explain">
                        <div class="credit-explain-t">认证方式：</div>
                        <div>支付{{bail.AA}}保证金 或 芝麻信用≥{{zhima.AA}}</div>
                        <div class="credit-explain-t">用车权限：</div>
                        <!--<div>S (北汽EV160等)</div>-->
                        <!--<div>M+ (大众POLO等)</div>-->
                        <div v-for="ite in this.creditAA.cars">{{ite.grades}}</div>
                    </div>
                </div>
                <div class="credit-bag credit-bag2">
                    <div class="credit-bag-img">
                        <img src="../../assets/images/icon_levelA@3x.png" alt="">
                        <div  class="grade">信用等级A</div>
                    </div>
                    <div class="credit-explain">
                        <div class="credit-explain-t">认证方式：</div>
                        <div>支付{{bail.A}}保证金 或 芝麻信用≥{{zhima.A}}且＜{{zhima.AA}}</div>
                        <div class="credit-explain-t">用车权限：</div>
                        <!--<div>S (北汽EV160等)</div>-->
                        <div v-for="item in this.creditA.cars">{{item.grades}}</div>
                    </div>
                </div>
            </div>
            <div class="select-pay">
                <div class="select-pay-type">
                    <img src="../../assets/images/Rectangle.png" alt="">
                    <p>选择认证方式</p>
                </div>
                <div class="pay-list pay-list2" @click="tag ='2'">
                    <span class="pay-list-left pay-list-left-pay">
                        <span class="main-payType">芝麻信用认证</span>
                    </span>
                    <span class="pay-list-right">
                        <input type="radio" name="pay" v-model="tag" value="2" :style="tag==2?'border:0':''" />
                    </span>
                </div>
                <div class="pay-list pay-list1" @click="tag ='1'" v-if="refundBtn">
                    <span class="pay-list-left pay-list-left-pay">
                        <span class="main-payType">保证金认证</span>
                    </span>
                    <span class="pay-list-right">
                        <input type="radio" name="pay" v-model="tag" value="1" :style="tag==1?'border:0':''" />
                    </span>
                </div>

                <div class="pay-list pay-list1" v-else>
                      <span class="pay-list-left pay-list-left-pay">
                          <span class="main-payType">保证金认证</span><span style="font-size: .14rem;color: #fea30b">&nbsp;(退款中)</span>
                      </span>
                </div>

                <div class="btn-div" @click="buy()">
                   去认证
                </div>
            </div>
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
    import baseData from '../../assets/control';
    export default {
        name: "credit",
        data() {
            //数据
            return {
                tag:2,
                refundBtn:true,
                dialogInfo: {
                  type: "confirm",
                  dialogShow: false,
                  content: "",
                  title: "",
                  confirmText: "确定",
                  cancelText: "取消"
                },
              creditA:null,
              creditAA:null,
              bail:null,
              zhima:null,
            }
        },
        methods: {
            //方法
            checkStatusSubmit(){
              this.dialogInfo.dialogShow =false
            },
            checkStatusGoback(){
              this.dialogInfo.dialogShow =false;
            },
          //方法  芝麻回调
            zhimasuccess(){
              this.$toast.loading.show();
              var req={
                uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
                platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
              }
              this.$http.post(this.HOST1 + '/v/user/status', req).then((response) => {
                var res = response.data;
                this.$toast.loading.hide();
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
            buy(){
                var req={
                  uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                  userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                  token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
                  platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                  appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                  areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                }
                if(this.tag == 1){
                    this.$dsBridge.call('nativeHideNavRightItem',{})
                    this.$router.push({name:'payDeposit',query: { NewUser:  this.$route.query.NewUser }})
                }else if(this.tag==2){
                    this.$dsBridge.call('nativeHideNavRightItem',{})
                    this.$http.post(this.HOST1 + '/v/user/status', req).then((response) => {
                      var res = response.data;
                      if (res.status == 200) {
                        //身份认证  // 已认证';   不填资料
                        this.userZmInfo =res.attachment.userZmInfo;
                        if((res.attachment.licenseStatus ==13) || (res.attachment.status ==18) ){
                          this.$http.post(this.HOST1 + '/v/zhima/getAuthorizeUrl', req).then((response) => {
                            var res = response.data;
                            if (res.status == 200) {
                              var tbUrl = res.attachment.url;
                              this.$dsBridge.call('sesameCallbackUrl',{tbUrl:tbUrl})
                            }
                          }, (error) => {

                          })
                        }else if(res.attachment.licenseStatus ==11 || res.attachment.status ==10){
                          this.$toast.error('身份认证审核中，请耐心等待')
                        }else{
                          //无身份认证  填写资料
                          this.$router.push({name:'authenticationSesame',query: { NewUser:  this.$route.query.NewUser }})
                        }
                      }
                    }, (error) => {

                    })

                }
            }
        },
        created(){
          const data=parseInt(this.$cookie.get('areaCode'));
          if(baseData[data]){
            this.bail=baseData[data].bail;
            this.zhima=baseData[data].zhima;
            this.creditA=baseData[data].creditA;
            this.creditAA=baseData[data].creditAA;
          }else {
            this.bail=baseData['default'].bail;
            this.zhima=baseData['default'].zhima;
            this.creditA=baseData['default'].creditA;
            this.creditAA=baseData['default'].creditAA;
          }
          //右上角跳过
          if(this.$route.query.NewUser=='true'){
              this.$dsBridge.call('nativeAddNavRightItem',{title:'跳过'},()=>{
              this.$dsBridge.call('pushIndex')
            })
          }else{
            this.$dsBridge.call('nativeHideNavRightItem')
          }
          //保证金不可选
          var req={
            uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
            userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
            token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
            platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
            appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
            areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
          }
          var name = this.$route.name;
          this.$http.post(this.HOST1 + '/v/user/status', req).then((response) => {
            var res = response.data;
            if (res.status == 200) {
              //身份认证未认证  选车进入路由   退款状态  无芝麻分
              if( (res.attachment.licenseStatus ==10)  && name === 'authenticationCredit' && res.attachment.depositStatus==2 && res.attachment.authorize==0){
                this.refundBtn=false;
              }
            }
          }, (error) => {

          })
        },
        mounted() {
            //生命周期，实例化，并挂载到dom

        },
        components: { IncarDialog },
        props: {
            //接收父组件的传值
        },
        watch: {
            //监听数据的改变
          '$store.state.zhimaIdCardFinish':'zhimasuccess',
        }
    }
</script>

<style scoped lang="scss">

#credit{
    .select-pay{
          .main-payType{
            font-size: .16rem;
          }
        .btn-div{
            margin:auto;
            text-align: center;
            color: #FFFFFF;
            font-size: .18rem;
            width: 1.3rem;
            height: .44rem;
            line-height: .44rem;
            background: #296CFF;
            box-shadow: 0 0 6px 0 rgba(41,108,255,0.45);
            border-radius: 30px;
        }
        .pay-list2{
            border-bottom: 1px solid #ebebeb;
        }
        .pay-list{
            position: relative;
            height: .5rem;
            .pay-list-left{
                line-height: .5rem;
                font-size: .16rem;
                color: #484848;
            }
            .pay-list-right{
                position: absolute;
                right: .3rem;
                top:.18rem;
            }
        }
        .select-pay-type{
            margin: .2rem 0 .07rem 0;
            img{
                display: inline-block;
                vertical-align: middle;
                width: .06rem;
                height: .18rem;
            }
            p{
                display: inline-block;
                vertical-align: middle;
                font-size: .14rem;
                color: #202A48;
            }
        }
        input[type=radio]{
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

        input[type=radio]:after{
            content:'';
            color: white;
            position: absolute;
            width: 100%;
            height:102%;
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
            font-size: .13rem;
            text-align: center;
            /*增加一些动画*/
            -webkit-transition : all ease-in-out 300ms;
            -moz-transition : all ease-in-out 300ms;
            transition : all ease-in-out 300ms;
        }
        input[type=radio]:checked:after{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            transform: scale(1);
        }
    }
    .main{
        padding: 0 .15rem;
        overflow: hidden;
    }
    .title{
        color: #0E193A;
        height: .6rem;
        padding: 0;
        line-height: .6rem;
        font-size: .32rem;
        font-weight: bold;
    }
    .explain{
        font-size: .14rem;
        color: #999999;
        letter-spacing: 0;
        margin-bottom: .16rem;
        line-height: .12rem;
    }
    .icon-explain{
        display: flex;
    }
    .title-explain{
        font-size: .14rem;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
        flex: auto;
        margin-bottom: .05rem;
    }
    .explain-img{
      display: flex;
      margin-bottom: .08rem;
    }

    .title-img1{
        flex: auto;
        border-radius: 5px 0 0 5px;
      width: 1.7rem;
        margin: 0 .04rem 0 0;
        display: inline-block;
        height: .1rem;
        background: #296CFF;
    }
    .title-img2{
      flex: auto;
        text-align: right;
        display: inline-block;
        border-radius:0 5px  5px 0;
        width: 1.7rem;
        height: .1rem;
        background: #D8D8D8;
    }
    .credit-bag{
        margin: .06rem 0 0 0;
        display: flex;
        background: #FFFFFF;
        box-shadow: 0 2px 11px 0 rgba(234,237,244,0.55);
        border-radius: 9px;
        .credit-explain-t{
            font-weight: bold ;
            font-size: .11rem;
        }
    }
    .credit-bag1{
        min-height: 1.2rem;
        .credit-bag-img img{
            margin: .3rem .36rem .08rem .42rem;
            height: .36rem;
            width: .35rem;
        }
        .credit-explain {
            margin: .15rem 0 0 0;
            font-size: .115rem !important;
            color: #484848;
            letter-spacing: 0;
            line-height: .2rem;
            flex: auto;
            div{
              font-size: .115rem !important;
            }
        }
    }
    .credit-bag2{
        min-height: 1rem;
        margin: .2rem 0 0 0;
        .credit-bag-img img{
            margin: .18rem .36rem .08rem .42rem;
            height: .36rem;
            width: .35rem;
        }
        .credit-explain{
            margin: .12rem 0 0 0;
            font-size: .115rem !important;
            color: #484848;
            letter-spacing: 0;
            line-height: .2rem;
            flex: auto;
            div{
              font-size: .115rem !important;
            }
        }
    }

    .grade{
        text-align: center;
        font-size: .12rem;
        color: #333333;
    }

    .credit-bag-img{
        width: 1.2rem;
        height: 1.2rem;
    }

}
</style>
