<template>
<div>
  <div class="incar-mob-title" style="margin-bottom:0;margin-left:.15rem">推荐有奖</div>

  <div style="display:flex;flex-direction:column;align-items:center;margin-top:.58rem">
    <img src="@/assets/images/huodong2@3x.png" alt="" style="width:2.52rem;height:2.93rem">
    <div style="height:.82rem;width:3.3rem;border-bottom:.5px solid #EBEBEB">
      <div style="height:.4rem"></div>
      <p style="text-align:center" class="invite_content">分享到</p>
    </div>
  </div>


  <div style="display:flex;flex-wrap:nowrap;height:1.25rem;">
    <div style="width:.15rem"></div>

    <div class="cell_container">
      <div style="height:.27rem"></div>
      <img src="@/assets/images/icon_fx_weixin@2x.png" alt="" style="width:.4rem;height:.4rem;" 
      @click="how_to_share('2')">
      <div style="height:.06rem"></div>
      <p style="text-align:center" class="invite_content">微信</p>
    </div>
    <div class="cell_container">
      <div style="height:.27rem"></div>
      <img src="@/assets/images/icon_fx_qq@2x.png" alt="" style="width:.4rem;height:.4rem;"
      @click="how_to_share('1')">
      <div style="height:.06rem"></div>
      <p style="text-align:center" class="invite_content">QQ</p>
    </div>
    <div class="cell_container">
      <div style="height:.27rem"></div>
      <img src="@/assets/images/icon_fx_penyouquan@2x.png" alt="" style="width:.4rem;height:.4rem;"
      @click="how_to_share('3')">
      <div style="height:.06rem"></div>
      <p style="text-align:center" class="invite_content">朋友圈</p>
    </div>

    <div style="width:.15rem"></div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      shareObj: {},
      flag: false
    };
  },
  methods: {
    how_to_share(val) {
      this.$toast.loading.show();
      this.$dsBridge.call("shareSocialThirdParty", {
        type: val,
        data: this.shareObj
      });
    }
  },
  created() {
    this.$http.get(this.HOST1 + "/share/share-invite.json", {
      params: {
        uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : "",
        type: "1"
      }
    }).then(res => {
      this.shareObj = res.data.attachment;
    });
  }
};
</script>

<style scoped>
.invite_content {
  font-family: PingFangSC-Regular;
  font-size: 0.15rem;
  color: #0e193a;
  letter-spacing: 0;
}

.cell_container {
  display: flex;
  width: 1.15rem;
  height: 1.25rem;
  flex-direction: column;
  align-items: center;
}
</style>

