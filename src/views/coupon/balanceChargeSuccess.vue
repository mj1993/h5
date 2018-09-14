<template>
<div>
  <div id="header">充值成功</div>
  <div class="flex-container">
    <img src="../../assets/images/icon_select@2x.png" alt="" class="img-item">
    <div class="para">充值成功</div>
    <div class="button">
      <div class="button-text" @click="back">完成</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  methods:{
    back(){
      if(this.$route.query.fromH5){
        this.$router.goBack(-2);
      } else {
        this.$dsBridge.call("dissmissCurrentVc");
      }
    }
  }
};
</script>

<style scoped>
#header {
  font-family: PingFangSC-Medium;
  font-size: 0.32rem;
  color: #0e193a;
  /* margin: 0.62rem 0 0.25rem 0.15rem; */
  margin:.62rem 0 .25rem .15rem;
  font-weight: bold;
}

.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-item {
  width: 1.82rem;
  height: 1.57rem;
  margin-top: 0.4rem;
  /* margin:auto; */
}

.para {
  font-family: PingFangSC-Regular;
  font-size: 0.16rem;
  color: #0e193a;
  margin: 0.22rem 0;
}

.button {
  display: flex;
  width: 1.32rem;
  height: 0.46rem;
  margin-top: 1.27rem;
  background: #296cff;
  box-shadow: 0 0 6px 0 rgba(41, 108, 255, 0.45);
  border-radius: .24rem .24rem .24rem .24rem;
}

.button-text {
  font-family: PingFangSC-Regular;
  font-size: 0.18rem;
  margin: auto;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 18px;
}
</style>
