<template>
    <div id="list">
        <div class="main">
            <div class="head " @click="imgUrlBtn">
              <img v-bind:src="imgUrl" alt="" v-if="imgUrl">
            </div>
            <div class="main-list" @click="nickBtn">
                <div class="main-l">昵称</div>
                <div style="flex: 1"></div>
                <div class="main-r">{{nick}}</div>
                <div class="main-c"> <img src="../../assets/images/return.png" alt="" class="main-list-bottom-img"></div>

            </div>
            <div class="main-list" @click="promise">
                <div class="main-l">信用认证</div>
                <div style="flex: 1"></div>
                <div class="main-r" v-bind:class="{text:setCol0r,textOn:setCol0rS}">{{setText}}</div>
                <div class="main-c"> <img src="../../assets/images/return.png" alt="" class="main-list-bottom-img"></div>
            </div>
            <div class="main-list" @click="identity">
                <div class="main-l">身份认证</div>
                <div style="flex: 1"></div>
                <div class="main-r" v-bind:class="{text:identityCol0r,textOn:identityCol0rS}">{{identityText}}</div>
                <div class="main-c"> <img src="../../assets/images/return.png" alt="" class="main-list-bottom-img"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            //数据
            return {
                status:null,
                setCol0rS:false,
                identityCol0rS:false,
                setCol0r:false,
                identityCol0r:false,
                identityText:null,
                setText:null,
                imgUrl:null,
                nick:null,
                userZmInfo:false,
            }
        },
        methods: {
            //方法

            //头像
            imgUrlBtn(){
              this.$dsBridge.call('modelNativeChosePhotoController',{type: 'systemPhotoVc'},(id)=>{
                this.imageIds(id);
              })
            },
            imageIds(s){
                var data=s.imageId;
                this.imgUrl= this.$cookie.get('imgUrl')+data;
                this.$dsBridge.call('changeUserInfo',{type:'userPhoto',content:data})
                //更换头像
                var data={
                  head:data,
                  uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                  userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                  token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
                  platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                  appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                  timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '',
                  areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                }
                this.$http.post(this.HOST1 +'/v/user/update-user-info',data).then((response)=>{
                  var res = response.data;
                  if (res.status == 200) {
                    this.$toast.success(res.message);
                  }else{
                    this.$toast.error(res.message);
                  }
                })


            },
          // 信用认证
            promise(){
              if(this.setText == '退款中'){
                //是否有芝麻分userZmInfo
                if(this.userZmInfo ==1){
                  //信用认证
                  this.$router.push({name:'creditVerifySuccess',query: { NewUser: 'false' }})
                }else{
                  //退款中
                  this.$router.push({name:'withdrawDeposit',query: { NewUser: 'false' }})
                }
              }else if(this.setText == '已认证'){
                // fromUserCenter 从个人中心跳到认证成功
                this.$router.push({name:'creditVerifySuccess',query: { NewUser: 'false', fromUserCenter:'true'}})
              }else{
                this.$router.push({name:'authenticationCreditNew',query: { NewUser: 'false' }})
              }

            },
            // 身份认证
            identity(){
              this.$dsBridge.call('pushIdentityController',{type:'fromUserCenter',status:this.status});
            },
            nickBtn(){
              // 昵称
                this.$router.push({name:'authenticationNick'})
            },
            fetchData(){
                this.$dsBridge.call('nativeHideNavRightItem',{type:'systemPhotoVc'});
                this.$dsBridge.call('modifyNativeNavBarTitle', {title:''});
                var req={
                    uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                    userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                    token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
                    platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                    appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                    areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                }
                this.$http.post(this.HOST1 + '/v/user/status', req).then((response) => {
                var res = response.data;
                    if (res.status == 200) {
                        //身份认证
                        this.userZmInfo =res.attachment.userZmInfo;
                      if((res.attachment.licenseStatus ==13) || (res.attachment.status ==18) ){
                        this.identityText = '已认证';
                        this.identityCol0rS=true;
                        //0未认证、1已认证、2审核中
                        this.status=1;
                      }else if(res.attachment.licenseStatus ==10 ||res.attachment.status ==15 ||res.attachment.licenseStatus ==12){
                        this.identityText = '未认证';
                        this.status=0;
                      }else if(res.attachment.licenseStatus ==11 || res.attachment.status ==10){
                        this.identityText = '审核中';
                        this.status=2;
                        this.identityCol0r=true;
                      }

                        // 信用认证
                    // if(res.attachment.depositStatus ==2 && res.attachment.authorize ==1){
                        if(res.attachment.depositStatus ==2 ){
                            this.setText = '退款中';
                            this.setCol0r=true;
                        }else if(res.attachment.depositStatus ==1 || res.attachment.authorize ==1){
                            this.setText = '已认证';
                            this.setCol0rS=true;
                        }else if(res.attachment.depositStatus ==0 || res.attachment.authorize ==0){
                            this.setText = '未认证';
                        }
                    }
                }, (error) => {

                })
                this.$http.post(this.HOST1 + '/v/user/user-info.json', req).then((response) => {
                var res = response.data;
                if (res.status == 200) {
                    this.nick=res.attachment.nick;
                    this.imgUrl = this.$cookie.get('imgUrl')+res.attachment.picture;
                }else{
                    this.$toast.error(res.message);
                    setTimeout(()=>{
                    this.$dsBridge.call('pushIndex')
                    },1000)
                }
                }, (error) => {
                this.$toast.error("请求失败");
                setTimeout(()=>{
                    this.$dsBridge.call('pushIndex')
                },1000)
                })

            }
        },
        created() {
            this.fetchData();
        },
        components: {
            //注册子组件
        },
        props: {
            //接收父组件的传值
        },
        watch: {
            //监听数据的改变
            '$store.state.refreshCounter' : 'fetchData'
        }
    }
</script>

<style scoped lang="scss">
#list{
    .text{
        color: #FFAC0B !important;
    }
    .textOn{
        color: #296CFF !important;
    }
    .head{
        margin:.42rem auto 0;
        width: .93rem;
        height: .93rem;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: .93rem;
          height: .93rem;
        }
    }
    .main{
        color: #0E193A;
        padding:  0 .1rem;
        font-size:.16rem ;
    }
    .main-list{
        display: flex;
        clear: both;
        height: .6rem;
        border-bottom: 1px solid  #EBEBEB;
        .main-l{
          height: .6rem;
          line-height: .6rem;
          float: left;
          color: #0E193A;
          font-size: .16rem;
        }
        .main-r{
          font-size: .16rem;
          color: #999999;
          height: .6rem;
          line-height: .6rem;
          float: right;
        }
      .main-c{
        float: right;
      }
    }

    .main-list-bottom-img{
        margin-left:.17rem ;
        margin-top: .22rem;
        float: right;
        width: .07rem;
        height: .13rem;
    }
}
</style>
