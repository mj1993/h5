<template>
  <div id="wallet">
    <div class="title">
      钱包
    </div>
    <div class="Wmain">
      <img src="../../assets/images/qianbaobg_@2x2.png" alt="" class="wallet-img">
      <div class="Wmain-icon">￥</div>
      <div class="Wmain-money" :style="this.balance>10000?'font-size:0.6rem':''">{{balance}}</div>
      <div class="Wmain-balance">账户余额</div>
      <div class="Wmain-recharge" @click="pay">
        <img v-bind:src="imgUrl" alt="" v-if="imgUrl">
        <p>立即充值</p>
      </div>
    </div>
    <div class="Wmain-list">
      <div class="Wmain-list1" @click="voucherBtn">
        <div class="list-title">优惠券</div>
        <div><img src="../../assets/images/return.png" alt="" class="Wmain-list-bottom-img"></div>
        <div class="Wmain-voucher">{{voucher}}张</div>
      </div>
      <div class="bor"></div>
      <div class="Wmain-list2" @click="exchange">
        <div class="list-title">兑换优惠码</div>
        <div><img src="../../assets/images/return.png" alt="" class="Wmain-list-bottom-img"></div>
      </div>
      <div class="bor"></div>
    </div>
  </div>
</template>

<script>
  import '@/assets/style.css'

  export default {
    name: "wallet",
    data() {
      //数据
      return {
        voucher: null,
        balance: null,
        imgUrl: null,
      }
    },
    methods: {
      //方法
      pay() {
        try {
          this.$dsBridge.call('nativeHideNavRightItem')
        } catch (e) {
          console.log(e);
        }
        this.$router.push({name: 'balanceCharge', query: {fromH5: true}})
      },
      voucherBtn() {
        try {
          this.$dsBridge.call('nativeHideNavRightItem')
        } catch (e) {
          console.log(e);
        }
        this.$router.push({name: 'couponListNew'})
      },
      exchange() {
        try {
          this.$dsBridge.call('nativeHideNavRightItem')
        } catch (e) {
          console.log(e);
        }
        this.$router.push({name: 'couponExchangeNew'})
      },
      AddNav() {
        this.$dsBridge.call('pushRechargeBills', {})
      },


    },
    mounted() {
      //生命周期，实例化，并挂载到dom
      let req = {
        uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
        userId: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
        token: this.$cookie.get("token") ? this.$cookie.get("token") : '',
        platform: this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
        appVersion: this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
      }
      this.$http.post(this.HOST1 + '/v/account/my-wallet', req).then((response) => {
        var res = response.data;
        if (res.status == 200) {
          this.voucher = res.attachment.coupons;
          this.balance = res.attachment.balance;
        }else{
          this.$toast.error(res.message);
          setTimeout(()=>{
            this.$dsBridge.call('pushIndex')
          },1000)
        }
      }, (error) => {

      })
      //活动图片
      if (this.$cookie.get('isExist') == 1) {
        this.imgUrl = this.$cookie.get('imgUrl') + this.$cookie.get('RushedSendPicture')
      }
      //账单明细 显示
      this.$dsBridge.call('nativeAddNavRightItem', {title: '账单明细'}, this.AddNav)
    },
    components: {
      //注册子组件

    },
    props: {
      //接收父组件的传值

    },
    watch: {
      //监听数据的改变
    }
  }
</script>

<style scoped>
  * {
    font-family: STHeitiTC-Regular;
  }

  .title {
    color: #0E193A;
    height: .6rem;
    line-height: .9rem;
    font-size: .32rem;
    font-weight: bold;
    padding-left: .15rem;
  }

  .Wmain {
    position: relative;
    height: 2.28rem;
  }

  .wallet-img {

    width: 100%;
    height: 2.28rem;
    padding: 0 .04rem;
  }

  .Wmain-icon {
    color: #FFFFFF;
    font-size: .4rem;
    position: absolute;
    top: .71rem;
    left: .25rem;
  }

  .Wmain-money {
    font-weight: 200;
    color: #FFFFFF;
    font-size: .8rem;
    position: absolute;
    top: .7rem;
    left: .65rem;
  }

  .Wmain-balance {
    font-weight: 200;
    color: #FFFFFF;
    font-size: .15rem;
    position: absolute;
    bottom: .4rem;
    left: .49rem;
  }

  .Wmain-recharge p {
    width: .83rem;
    height: .3rem;
    line-height: .19rem;
    border: 1px solid #fff;
    padding: .05rem .1rem;
    border-radius: .2rem;
    font-weight: 200;
    color: #FFFFFF;
    font-size: .13rem;
    text-align: center;
    position: absolute;
    bottom: .35rem;
    right: .43rem;
  }

  .Wmain-recharge img {
    width: .39rem;
    height: .24rem;
    position: absolute;
    bottom: .55rem;
    right: 1.12rem;
    z-index: 999;
  }

  .Wmain-list {
    margin-top: .41rem;
    padding: 0 .15rem;
  }

  .Wmain-list1 {
    padding-bottom: .2rem;
  }

  .bor {
    clear: both;
    margin: .2rem 0 .2rem 0;
    border-bottom: 1px solid #EBEBEB;
  }

  .Wmain-list2 {
    clear: both;
    padding-bottom: .2rem;
  }

  .list-title {
    float: left;
    font-size: .16rem;
    color: #0E193A;
  }

  .Wmain-list-bottom-img {
    margin-top: .05rem;
    float: right;
    width: .07rem;
    height: .13rem;
  }

  .Wmain-voucher {
    float: right;
    font-size: .16rem;
    color: #999999;
    line-height: .23rem;
    margin-right: .15rem;
  }
</style>
