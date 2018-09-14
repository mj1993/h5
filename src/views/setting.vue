<template>
<div>
  
  <div class="incar-mob-title" style="margin-left:.15rem;margin-bottom:0">设置</div>
  <div style="height:.25rem;border-bottom:1px solid #EBEBEB;margin:0 .21rem"></div>
  <div style="display:flex;flex-direction:column;height:4.18rem">

    <div class="incar-mob-cell" v-for="item in cellList" :key="item.id" @click="$router.push({ name : item.routeName })">
      <span class="cell_title">{{ item.title }}</span>
      <div style="flex:1"></div>
      <img src="../assets/images/return.png" alt="" style="width:.07rem;height:.13rem">
    </div>

    <div style="flex:1"></div>
  </div>
  <submit-button text="退出登录" @click.native="logOut" reverse></submit-button>
  <div class="text_bottom_appversion">版本号 : v{{ appVersion }}</div>

</div>
</template>

<script>
import submitButton from "../components/submitButton.vue";

export default {
  components: { submitButton },
  data() {
    return {
      appVersion: "",
      cellList: [
        {
          title: "用户协议",
          routeName: "agreement"
        },
        {
          title: "关于大道",
          routeName: "about"
        }
      ]
    };
  },
  created() {
    this.appVersion = this.$cookie.get("appVersion")
      ? this.$cookie.get("appVersion")
      : "";
  },
  methods: {
    logOut() {
      this.$http(this.HOST1 + "/v/user/logout.json", {
        params: {
          uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : ""
        }
      })
        .then(res => {
          if (res.data.status.toString() === "200") {
            this.$toast.error("退出成功");
            this.$dsBridge.call("userLogout");
          } else {
            this.$toast.error("网络错误，请稍后重试");
          }
        })
        .catch(res => {
          this.$toast.error(res);
        });
    }
  }
};
</script>

<style scoped>
.incar-mob-cell {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 0.6rem;
  border-bottom: 1px solid #ebebeb;
  margin: 0 0.21rem;
}

.cell_title {
  color: #0e193a;
  line-height: 0.22rem;
  font-family: PingFangSC-Regular;
  font-size: 0.16rem;
  letter-spacing: 0;
}

.text_bottom_appversion {
  margin: 0.14rem 0 0.4rem 0;
  align-self: center;
  font-family: PingFangSC-Regular;
  font-size: 0.12rem;
  color: #999999;
  letter-spacing: 0;
  text-align: center;
}
</style>

