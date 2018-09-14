<template>
    <div id="sesame">
        <div id="boy">
            <header>认证信息</header>
            <section>
                <p>
                    <span>姓名:</span>
                    <input type="text" id="userName" placeholder="请输入真实姓名" v-model="userName">
                </p>
            </section>
            <section>
                <p>
                    <span>身份证:</span>
                    <input type="text" id="identityCardNum" placeholder="请输入身份证号" v-model="identityCardNum">
                </p>
            </section>
            <section class="sen">
                <button class="but" v-if="hasError"  v-bind:class="{butOff:hasError,butOn:isActive}" >提交</button>
                <button class="but" v-if="isActive" @click="userSesame" v-bind:class="{butOff:hasError,butOn:isActive}" >提交</button>
            </section>
        </div>
        <div class="footer">
            <p>此信息仅用于认证
                <br> 大道用车将保护您的个人隐私泄漏
            </p>
        </div>
        <div class="foo">
            <span class="let"></span>
            <span id="center"></span>
            <span class="rig"></span>
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
    </div>
</template>

<script>
  import IncarDialog from "@/components/IncarDialog";
    export default {
        name: "sesame",
        data() {
            //数据
            return {
                isActive:false,
                userName:null,
                identityCardNum:null,
                hasError:true,
                dialogInfo: {
                  type: "confirm",
                  dialogShow: false,
                  content: "",
                  title: "",
                  confirmText: "确定",
                  cancelText: "取消"
                },
            }
        },
        methods: {
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
                    // 芝麻认证成功'  是否从提现页进入
                    if(this.$router.refund=='true'){
                      this.$router.push({name:'creditVerifyInfo',query: { NewUser:  this.$route.query.NewUser }})
                    }else{
                      this.$router.push({name:'creditVerifySuccess',query: { NewUser:  this.$route.query.NewUser }})
                    }
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
            userSesame(){
                var req={
                    uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                    userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                    token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
                    platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                    appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                    userName: this.userName,
                    identityCardNum: this.identityCardNum, areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                }
                this.$http.post(this.HOST1 +'/v/user/userSesameAuthentication.json',req).then((response) => {
                    var res = response.data;
                    if (res.status == 200) {
                      var tbUrl = res.attachment.url;
                      this.$dsBridge.call('sesameCallbackUrl',{tbUrl:tbUrl})
                    }else {
                        this.$toast.error(res.message);
                    }
                }, (error) => {

                })
            },
            example(){
                if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.identityCardNum) && /^[\u4e00-\u9fa5]{2,6}$/.test(this.userName))
                {
                    this.isActive=true,
                        this.hasError=false,
                        console.log( this.isActive,this.hasError);
                } else {
                    this.isActive=false,
                        this.hasError=true
                }
            }
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
            identityCardNum:'example',
            userName:'example',
            '$store.state.zhimaIdCardFinish':'zhimasuccess',
        }
    }
</script>

<style scoped lang="scss">
    html,
    body,
    div,
    h1,
    span,
    p,
    input,
    header,
    section {
        padding: 0;
        margin: 0;
        font-size: 0.01rem;
    }
    #userName,#identityCardNum{
        color: #000000
    }

    #sesame{
        background-color: rgb(243, 242, 248)!important;
        height: 100%;
    }

    #boy {
        /* height: 3.95rem; */
        background-color: #fff;
    }

    header {
        font-size: 0.32rem;
        color: #0E193A;
        line-height: 0.32rem;
        padding: 0.2rem 0.17rem;
        padding-bottom: 0.39rem
    }

    section {
        padding: 0 0.23rem;
        padding-bottom: 0.14rem;
    }

    section p {
        /* height: 0; */
        font-size: 0.01rem;
        padding-bottom: 0.14rem;
        border-bottom: 1px solid #EBEBEB;
        overflow: hidden;
    }

    section p span {
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #000000;

    }

    section p input {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #CECED1;
        border: none;
        padding-left: 0.26rem;
        outline: none;
    }

    .ppp {
        padding-bottom: 0.10rem;
    }
    #userCode{
        width: 40%
    }
    #userName{
        padding-left: 0.4rem;
    }
    #code {

        text-align: center;
        font-size: 0.12rem;
        width: 0.7rem;
        height: 0.3rem;
        line-height: 0.3rem;
        display: inline-block;
        border-radius: 0.04rem;
        margin-right: 0.06rem;
        float: right;
    }

    .green {
        border: 1px solid #00C68E;
        color: #00C68E;
    }

    .gray {
        border: 1px solid #D1D1D1;
        color: #D1D1D1;
    }

    .sen {
        padding-bottom: 0;
    }

    .but {
        margin-top: 0.21rem;
        width: 100%;
        height: 0.44rem;
        border-radius: 0.07rem;
        font-size: 0.2rem;
        line-height: 0.44rem;
        text-align: center;
        margin-bottom: 0.45rem;
        border: none;
        outline: none;
    }

    .butOn {
        background: #00C68E;
        color: #fff;
    }

    .butOff {
        color: #D1D1D1;
        background: #F1F1F1;
    }

    .footer {
        overflow: hidden;
        box-sizing: border-box;
        border-top: 1px solid #F0EFF4;
        background-color: rgb(243, 242, 248);
        text-align: center;
        font-size: 0.12rem;
    }

    .footer p {

        margin-top: 0.2rem;
        font-size: 0.12rem;
        line-height: 0.24rem;
        color: #C2C1C6;
        margin-bottom: 0.87rem;
    }

    .foo {
        margin-top: .8rem;
        text-align: center;
    }

    .foo span {
        display: inline-block;
        height: 0.36rem;
        width: 0.7rem;
        box-sizing: border-box;

    }

    .foo .let {
        margin-top: 0.1rem;
        width: 0.8rem;
        background: url('../../assets/images/zhima@2x.png') no-repeat;
        background-size: contain;
        vertical-align: middle;
    }

    .rig {
        background: url('../../assets/images/dadaologo@2x.png') no-repeat;
        background-size: contain;
        vertical-align: middle;

    }

    #center {
        height: 0.36rem;
        width: 0.01rem;
        border: 1px solid #E1E1E1;
        margin: 0 0.07rem;
        vertical-align: middle;
    }
</style>
