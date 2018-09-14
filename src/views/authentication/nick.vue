<template>
    <div class="nick">
        <div class="name" >
            <div><input type="text" v-model="nick" maxlength="8" id="nick-input"></div>
            <div class="name-r" @click="dele"><img src="../../assets/images/Shape@3x.png" alt=""></div>
        </div>
        <div class="bor"></div>
        <div class="explain">4-8个字符，仅支持中文、英文大小写、数字或组合</div>
    </div>
</template>

<script>
    export default {
        name: "nick",
        data() {
            //数据
            return {
              nick:null,
              nickNew:null,
            }
        },
        methods: {
            //方法
          dele(){
            this.nick=''
          },
          preservation(){
            document.getElementById('nick-input').blur();
            var data={
                nick:this.nick,
                uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
                platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                timestamp: this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
            }
            this.$http.post(this.HOST1 +'/v/user/update-user-info',data).then((response)=>{
              var res = response.data;
              if (res.status == 200) {
                this.$dsBridge.call('changeUserInfo',{type:'userName',content:this.nick})
                this.$toast.success(res.message);
                setTimeout( ()=> {
                  this.$router.goBack(-1);
                },1000)
              }else{
                this.$toast.error(res.message);
              }
            })
          }
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
          this.$dsBridge.call('modifyNativeNavBarTitle', {title:'修改昵称'});
          this.$dsBridge.call('nativeAddNavRightItem', {title: '保存',color:'#296CFF'}, this.preservation);
          var req={
            uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
            userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
            token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
            platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
            appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
          }
          this.$http.post(this.HOST1 + '/v/user/user-info.json', req).then((response) => {
            console.log(response)
            var res = response.data;
            if (res.status == 200) {
              this.nick=res.attachment.nick
            }else{
              this.$toast.error(res.message);
            }
          }, (error) => {
            this.$toast.error(res.message);
          })
        },
        components: {
            //注册子组件
        },
        props: {
            //接收父组件的传值
        },
        watch: {
            //监听数据的改变
          nick(curVal,oldVal){
            this.nickNew =curVal;
          }
        }
    }
</script>

<style scoped lang="scss">
.nick{
    padding:0 .2rem 0 .2rem;
  .bor{
    margin: .147rem 0 .148rem 0;
    border-bottom: 1px solid #ebebeb;
  }
  .name{
    margin-top: .48rem;
    position: relative;
    input{
      width: 99%;
      font-family: PingFangSC-Medium;
      font-size: .16rem;
      color: #101938;
      letter-spacing: 0.5px;
      line-height: .16rem;
    }
    img{
      position: absolute;
      right: 0;
      bottom:0;
      width: .18rem;
      height: .18rem;
    }
    .name-r{
      float: right;
    }

  }
  .explain{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0.38px;
    line-height: .16rem;
  }
}

</style>
