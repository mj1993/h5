<template>
    <div id="navbar">
      <div @click="changeState" class="button" style="border:1px solid #19be6b">开发者模式{{ isDev ? ' : on' : ' : off'}}</div>
      <div @click="goTo(item.path)" class="button" v-for="item in routeList" :key="item.id" v-if="isDev">{{item.name}}</div>
    </div>
</template>

<script>
var routeList = [
  {
    path: "/",
    name: "主页"
  },
  {
    path: "/billDetail",
    name: "账单明细"
  },
  {
    path: "/orderFeedback",
    name:"信息反馈"
  },
  {
    path: "/setting",
    name:"设置"
  },
  {
    path:"/marketInvite",
    name:"推荐有奖"
  },
  {
    path: "/payDeposit",
    name: "信用认证·保证金"
  },
  {
    path: "/creditVerifySuccess",
    name: "信用认证·成功"
  },
  {
    path: "/addDeposit",
    name: "信用认证·补充保证金"
  },
  {
    path: "/withdrawDeposit",
    name: "信用认证·申请提现"
  },
  {
    path: "/parkingFee",
    name: "停车费（新）"
  },
  {
    path: "/balanceCharge",
    name: "余额充值（新）"
  },
  {
    path: "/couponList",
    name: "优惠券"
  },
  {
    path: "/couponBuy",
    name: "优惠券使用"
  },
  {
    path: "/couponExchange",
    name: "优惠券兑换"
  },
  {
    path: "/illegalList",
    name: "违章查询"
  },
  {
    path: "/illegalDetail/:id",
    name: "违章信息"
  },
  {
    path: "/illegalForPay/:id",
    name: "违章罚款"
  },
  {
    path: "/IllegalComplete/:id",
    name: "违章处理完成"
  }
];

export default {
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    changeState() {
      this.isDev = !this.isDev;
    }
  },
  data() {
    return {
      routeList: routeList,
      isDev: false
    };
  }
};
</script>

<style scoped>
#navbar {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  z-index: 20000;

  position: fixed;
  top: 0.05rem;
  right: 0.02rem;
}

.button {
  padding: 0.05rem;
  margin: 0.01rem 0.02rem;
  border: 0.5px dashed #1c2438;
  border-radius: 0.05rem; /* 圆角 */

  background-color: white;
  font-size: 0.1rem;
  color: #000;
  width: 1rem;
}

.button:active {
  border: 1px dashed #006aff;
  border-radius: 0.05rem; /* 圆角 */
  color: #006aff;
}
</style>
