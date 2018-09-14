<template>
	<div class="snake-box">
      <div class="toast-msg" v-if="type=='msg'">{{msg}}</div>
      <div class="toast" v-if="type=='success'">
          <img src="./img/success.png" alt="">
          <div class="toast-tip">{{successmsg}}</div>
      </div>
      <div class="toast" v-if="type=='error'">
          <img src="./img/tip.png" alt="">
        <div class="toast-tip">{{errormsg}}</div>
      </div>
        <div class="toast" v-if="type=='loading'">
            <img src="./img/jiazai.gif" alt="">
            <div class="toast-tip">{{loading}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
              msg:'',
              remain:1,
              type:'msg',
              successmsg:'已完成',
              errormsg:'失败',
              loading:'加载中',
            }
        },
        methods: {
            remove(){
              setTimeout(()=>{
                this.hide();
              },this.remain*1000)
            },
            hide(){
              try {
                document.getElementsByTagName('body')[0].removeChild(this.$el);
              }catch (e){

              }
            }
        },
        mounted() {
        },
        components: {},
    }
</script>
<style>

    .snake-box{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    .toast-msg{
        background: rgba(50,50,50,.7);
        color: white;
        text-align: center;
        padding: 5px 10px;
        border-radius: 8px;
    }
    .toast{
        position: fixed;
        z-index: 5000;
        width: 1.56rem;
        height: 1.15rem;
        top: 180px;
        left: 50%;
        margin-left: -0.78rem;
        background: rgba(17, 17, 17, 0.7);
        text-align: center;
        border-radius: 5px;
        color: #FFFFFF;
    }
    .toast>img{
        width: .38rem;
        margin: auto;
        margin-top: .26rem;
        display: block;
    }
    .toast-tip{
        font-size: .14rem;
        line-height: .14rem;
        margin-top: .1rem;
    }

</style>
