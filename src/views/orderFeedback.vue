<template>
<div style="display:flex;flex-direction:column;height:6.4rem;">

  <div class="incar-mob-title" style="margin-left:.15rem">取消原因</div>
  <p class="incar-mob-subtitle" style="margin-left:.15rem;line-height: .15rem;">为何取消呢？</p>
  <p class="incar-mob-subtitle" style="margin-left:.15rem;line-height: .15rem;margin-top:.07rem">留下您取消的原因,让我们更好的为您服务。</p>

  <!-- 遍历 服务器返回数据 渲染标签 -->
  <div style="display:flex;flex-direction:row;flex-wrap:wrap;margin:.25rem .1rem">
    <!-- <cell-for-feedback :text="item.text" :index="item.index" v-for="item in modifiedList" :key="item.id" style="margin:.05rem;"></cell-for-feedback> -->
      <div :style="{ border: item.id === selectedId ? '.01rem solid #296CFF' : '.01rem solid #ECECEE' }" class="cell_container"  style="margin:.05rem" v-for="item in itemList" :key="item.id" @click="select(item.id)">
        <p :class="['feedback_content',item.id === selectedId ? 'active_item' : 'disabled_item']">{{ item.reason }}</p>
      </div>
  </div>

  <!-- 用于填补空白 -->
  <div style="flex:1"></div>
  <submit-button text="提交反馈" width="2.28" height=".44" @click.native="submit" v-if="selectedId > 0"></submit-button>
  <submit-button text="提交反馈" width="2.28" height=".44" v-else disabled></submit-button>
  <div style="height:.4rem"></div>
  
</div>
</template>

<script>
import submitButton from '../components/submitButton.vue'
import * as R from 'ramda'

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
// 2.成功提交后，本页面给出弹框提示“感谢您的反馈”，弹框1s消失后跳转首页。
//3.如点击返回按钮，直接返回首页。

export default {
  components: { submitButton },
  data() {
    return {
      itemList: [
        {
          "id": 1,
          "reason": "1.找不到车"
        },
        {
          "id": 2,
          "reason": "2.零部件缺失"
        },
        {
          "id": 3,
          "reason": "3.零部件缺失"
        },
        {
          "id": 4,
          "reason": "4.零部件缺失"
        },
        {
          "id": 5,
          "reason": "5.零部件缺失"
        }
      ],
      selectedId : -1
    };
  },
  methods: {
    select(val){
      if(this.selectedId === val){
        this.selectedId = -1;
      } else {
        this.selectedId = val;
      }
    },
    submit() {
      let bodyData = {
        orderId: this.$cookie.get("orderId"),
        uid: this.$cookie.get("uid"),
        token: this.$cookie.get("token"),
        order_reason_id: this.$cookie.get("order_reason_id"),
      };

      this.$http(this.HOST1 + "/v/orderReason/saveOrderReason", bodyData).then(res => {
        alert(JSON.stringify(res,null,4));
        if(res.data.status === 200){
          this.$toast.success('感谢您的反馈~');
          (async () => {
            await sleep(1000);
            this.$dsBridge.call("pushIndex");
          })();
        } else {
          this.$toast.error(res.data.message);
        }
      });
    },
  },
  created() {
    let bodyData = {
      type : 1 ,//当前页面就是【取消订单】后跳转的，故不需要写2  1、取消订单理由，2、异常结束订单理由，小于等于1公里
      uid : this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
      token : this.$cookie.get("token") ? this.$cookie.get("token") : '',
    };
    // alert(JSON.stringify(bodyData,null,2));
    this.$http(this.HOST1 + '/v/orderReason/getReasonByType',bodyData).then(res => {
      alert(JSON.stringify(res,null,4))
    })
  }
};
</script>

<style scoped>
.feedBack_title {
  font-family: PingFangSC-Medium;
  font-size: .32rem;
  color: #0e193a;
  letter-spacing: 0;
  line-height: .32rem;
  font-weight: bold;
}

.cell_container {
  border-radius: 0.04rem;
  width: 1.08rem;
  height: 0.62rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.feedback_content {
  font-family: PingFangSC-Regular;
  font-size: 0.16rem;
  letter-spacing: 0;
  text-align: center;
}

.active_item {
  color: #296cff;
}

.disabled_item {
  color: #999999;
}
</style>
