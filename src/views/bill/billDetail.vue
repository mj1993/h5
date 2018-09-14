<template>
  <div>
    <div id="header">账单明细</div>
    <div class="cell" v-for="item in billDetail" :key="item.id">
      <div class="time">{{item.create_time}}<span style="font-size:.16rem;float:right;color:#296CFF">{{item.income=='充值'?'+':'-'}}{{ item.money }}元</span></div>
      <p class="content">账单编号：{{item.orderSerialNumber}}</p>
      <p class="content">{{ item.income}}：{{item.style}}{{item.account_balance}}</p>
    </div>
    <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
        <span slot="no-more" style="font-size:.12rem;">没有更多记录了</span>
        <span slot="no-results" style="font-size:.12rem;">没有更多记录了</span>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  data() {
    return {
      pageNo: 1,
      billDetail: [],
      pageSize:15

    };
  },
  mounted(){
      this.$store.commit('setNativeTitle','账单明细')
  },
  components: { InfiniteLoading },
  methods: {
    infiniteHandler($state) {
      var bodyData = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
        token: this.$cookie.get("token") ? this.$cookie.get("token") : '',
        platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
        appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
        phoneSysVersion:this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
        timestamp:this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
      };
      this.$http
        .post(this.HOST1 + '/v/account/bill-detail.json', bodyData)
        .then((response) => {
          var bills = response.data.attachment.adList;
          if (response.data.status === 200) {
            this.billDetail = this.billDetail.concat(
              bills.map(el => {
                el.create_time = this.formatDate(
                  new Date(el.create_time),
                  "yyyy年MM月dd日 hh:mm:ss"
                );
                el.money = (el.money / 100).toFixed(2);
                switch (el.income) {
                  case 1:
                    el.income = "充值";
                    break;
                  case 2:
                    el.income = "支出";
                    break;
                  case 3:
                    el.income = "提现";
                }

                switch (el.style) {
                  case 1:
                    el.style = "支付宝";
                    break;
                  case 2:
                    el.style = "微信";
                    break;
                  case 3:
                    el.style = "信用卡";
                    break;
                  case 4:
                    el.style = "余额";
                    break;
                  case 5:
                    el.style = "企业账户";
                    break;
                  case 6:
                    el.style = "系统转入";
                }

                return el;
              })
            );
            if (bills.length === this.pageSize) {
                this.pageNo++;
                $state.loaded();
            } else {
              $state.complete();
            }
          } else {
            $state.complete();
          }
        })
        .catch(error => {
          $state.complete();
        });
    }
  }
};
</script>

<style>
#header {
  font-size:.32rem;
  font-family: PingFangSC-Medium;
  margin:.25rem 0 .25rem .15rem;
  font-weight: bold;
}

.cell {
  font-family: PingFangSC-Regular;
  margin: 0 0.22rem;
  padding: 0.13rem 0 0.17rem 0;
  border-bottom: 1px solid #ebebeb;
}

.time {
  font-size: 0.16rem;
  padding: 0.06rem 0;
  /* margin:.06rem; */
}

.content {
  font-size: 0.14rem;
  padding: 0.03rem 0;
}
</style>

