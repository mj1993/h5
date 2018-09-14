<template>
    <div id="complete">
        <div class="title">
            违章处理完成
        </div>
        <div class="main">
            <div class="main-img">
                <img src="../../assets/images/wancheng@2x.png" alt="">
            </div>
            <div class="main-list main-title">
                <p class="main-title-p">违章记录</p>
            </div>
            <div class="main-listl main-list2" style="margin-top: .16rem">
                <span class="main-list-left">违章车辆:</span>
                <span class="main-list-right">
                    <span class="main-list-icont">{{car_number}}</span>
                </span>
            </div>
            <div class="main-listl main-list2">
                <span class="main-list-left">违章时间:</span>
                <span class="main-list-right">
                    <span class="main-list-icont">
                        {{formatDate(new Date(peccancy_time*1000),'yyyy年MM月dd日 hh:mm:ss')}}
                    </span>
                </span>
            </div>
            <div class="main-listl">
                <span class="main-list-left">违章地点:</span>
                <span class="main-list-right">
                    <span class="main-list-icont">{{peccancy_addr}}</span>
                </span>
            </div>
            <div class="main-listl main-list2">
                <span class="main-list-left">违章原因:</span>
                <span class="main-list-right">
                    <span class="main-list-icont">{{peccancy_why}}</span>
                </span>
            </div>
            <div class="main-listl main-list2">
                <span class="main-list-left">罚款金额:</span>
                <span class="main-list-right">
                    <span class="main-list-icont">{{peccancy_money}}</span>
                </span>
            </div>
            <div class="main-listl main-list2">
                <span class="main-list-left">违章扣分:</span>
                <span class="main-list-right">
                    <span class="main-list-icont">{{peccancy_score}}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/common.css'

    export default {
        name: "complete",
        data() {
            //数据
            return {
                peccancy_score: null,
                peccancy_money: null,
                peccancy_why: null,
                peccancy_addr: null,
                peccancy_time: null,
                car_number: null,
                peccancy_exp_time: null,
                penalty_for_delay: null,
                peccancy_id: null,
            }
        },
        methods: {
            //方法
        },
        mounted() {
            this.$store.commit('setNativeTitle','违章处理完成')
            //生命周期，实例化，并挂载到dom
            var req = {
                peccancy_id: this.$route.params.id,
                platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                phoneSysVersion:this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
                device_brand:this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
                timestamp:this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
            }
            //罚款金额
            this.$http.post(this.HOST1 + '/car-peccancy/count-due-money', req).then((response) => {
                var res = response.data;
                if (res.code == 200) {
                    this.penalty_for_delay = res.data.penalty_for_delay
                }
            }, (error) => {

            })

            //车辆详情
            this.$http.post(this.HOST1 + '/car-peccancy/info', req).then((response) => {
                var res = response.data;
                if (res.code == 200) {
                    this.peccancy_score = res.data.peccancy_score;
                    this.peccancy_money = res.data.peccancy_money;
                    this.peccancy_why = res.data.peccancy_why;
                    this.peccancy_addr = res.data.peccancy_addr;
                    this.peccancy_time = res.data.peccancy_time;
                    this.car_number = res.data.car_number;
                    this.peccancy_exp_time = res.data.peccancy_exp_time;
                }
            }, (error) => {
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
        }
    }
</script>

<style scoped>
    .main-listl span{
        font-size: .14rem;
        line-height: .24rem;
    }
    .main-list2 {
        height: .26rem;
        line-height: .26rem;
    }

    .main-title {
        border-bottom: 1px solid #ededed !important;
    }

    .main-img {
        width: 1.97rem;
        margin: .31rem auto 0;
        height: 2rem;
    }

    .main-img img {
        width: 100%;
    }

    .main-title-p {
        text-align: center;
        width: 100%;
        font-size: 0.14rem;
        color: #999;
    }

    .main-list {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 90%;
        margin:.6rem auto 0;
        font-size: 0.16rem;
    }

    .main {
        width: 90%;
        margin: auto;
    }

    .main-list-left {
        display: inline-block;
        color: #999;
        font-weight: 400;
        vertical-align: text-top;
        width: .72rem;
    }

    .main-list-right {
        width: 76%;
        height: 100%;
        vertical-align: text-top;
        display: inline-block;
    }
</style>
