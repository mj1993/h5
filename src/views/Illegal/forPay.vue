<template>
    <div id="for-pay">
        <div class="title">
            逾期罚款
        </div>
        <p class="pay-title">请完成违约支付</p>
        <div class="main">
            <div class="main-list">
                <img :src="picture" alt="" class="main-list-img">
                <span class="main-list-LicenseTag main-list-span">{{LicenseTag}}</span>
                <span class="main-list-span">{{brand}}</span><span class="main-list-span">{{model}}</span>
            </div>
            <div class="main-list  main-list5">
                <span class="main-list-left">逾期罚款</span>
                <span class="main-list-right main-list-right-span">
                    <span class="main-list-icont">￥</span>
                    <span class="main-list-money">{{penalty_for_delay}}</span>
                </span>
            </div>
            <div class="pay-type">
                <img src="../../assets/images/Rectangle.png" alt="">
                <p>选择支付</p>
            </div>
            <div class="main-list main-list6" @click="payTitle('2')">
                <span class="main-list-left main-list-left-pay">
                    <img src="../../assets/images/weixin.png" alt="">
                    <span class="main-payType">微信</span>
                </span>
                <span class="main-list-right">
                    <input type="radio" name="pay" v-model="tag" value="2" :style="tag==2?'border:0':''" :class="objectClass"/>
                </span>
            </div>
            <div class="main-list main-list6" @click="payTitle('1')">
                <span class="main-list-left main-list-left-pay">
                    <img src="../../assets/images/ZFB.png" alt="">
                    <span class="main-payType">支付宝</span>
                </span>
                <span class="main-list-right">
                    <input type="radio" name="pay" v-model="tag" value="1" :style="tag==1?'border:0':''" :class="objectClass"/>
                </span>
            </div>
            <div class="btn-div" @click="buy">
                确认支付{{penalty_for_delay}}元
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/common.css'

    export default {
        name: "for-pay",
        data() {
            //数据
            return {
                flag:true,//防止按钮多次点击
                objectClass: false,
                tag: '2',   //支付平台
                penalty_for_delay: null,
                outTradeNo: '',
                LicenseTag: localStorage.getItem("car_number"),
                brand: null,
                model: null,
                picture: null,
                imgUrl: this.$cookie.get('imgUrl')
            }
        },
        methods: {
            //方法
            payTitle(type) {
                this.tag = type;
            },
            buy() {
                if(!this.flag){
                    return
                }
                this.flag=false;
                setTimeout(()=>{
                    this.flag=true;
                },5000)
                var req = {
                    peccancy_id: this.$route.params.id,
                    pay_type: this.tag,
                    pay_source: this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                    platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                    appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                    phoneSysVersion:this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
                    device_brand:this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
                    timestamp:this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                }
                this.$http.get(this.HOST1+'/car-peccancy/get-pay-order-num',{params:req}).then((response) => {
                    var res=response.data;
                    if(res.code==200){
                        var data = {
                            uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                            token: this.$cookie.get("token") ? this.$cookie.get("token") : '',
                            money: parseInt(this.penalty_for_delay * 100),
                            style: this.tag,
                            plateForm: this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                            orderNum: res.data.pay_order_num, areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                        }
                        // 订单号及相关数据
                        this.$http.post(this.HOST1 + '/v/account/recharge-peccancy', data).then((response) => {
                            var res = response.data;
                            if (res.status == 200) {
                                this.outTradeNo = res.attachment.outTradeNo;
                                //调起支付
                                if (this.tag == 1) {
                                    this.$dsBridge.call('aliPay', {'str': res.attachment.str});
                                } else {
                                    this.$dsBridge.call('wxPay', res.attachment.bean);
                                }
                            } else {
                            }
                        }, (error) => {
                        }).catch((error) => {});

                    }


                })


            }
        },
        mounted() {
            this.$store.commit('setNativeTitle','逾期罚款')
            //生命周期，实例化，并挂载到dom
            var req = {
                peccancy_id: this.$route.params.id,
                platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                phoneSysVersion:this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
                device_brand:this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
                 
                timestamp:this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
            }
            //金额
            this.$http.post(this.HOST1 + '/car-peccancy/count-due-money', req).then((response) => {
                var res = response.data;
                if (res.code == 200) {
                    this.penalty_for_delay = res.data.penalty_for_delay
                }
            }, (error) => {

            })

            //车辆信息
            var ddd = {
                LicenseTag: this.LicenseTag,
                uid: this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                token: this.$cookie.get("token") ? this.$cookie.get("token") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
            }

            this.$http.get(this.HOST1 + '/v/car/car-information', {params: ddd}).then((response) => {
                var res = response.data;
                if (res.status == 200) {
                    this.brand = res.attachment.carModel.brand
                    this.model = res.attachment.carModel.model
                    this.picture = this.imgUrl + res.attachment.carModel.picture
                } else {
                }
            }, (error) => {
            })
                .catch((error) => {
                });

            //注册支付回调
            this.$dsBridge.register('DDWEBVIEW_PAY_FINISH', (code) => {
                this.flag=true;
                if (code == 1) {
                    //success
                    var req = {
                        outTradeNo: this.outTradeNo,
                        payMent: parseInt(this.penalty_for_delay * 100), areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                    }
                    this.$http.post(this.HOST1 + '/v/account/pay-notify', req).then(({data}) => {
                        if (data.status == 200) {
                            this.$router.push({'name': 'IllegalComplete', params: {id: this.$route.params.id}})
                        }
                    })

                } else if (code == 2) {
                    this.$toast.error('支付失败');
                } else {
                    this.$toast.error('您已取消支付');
                }
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
    .main {
        width: 95%;
        margin: auto;
    }

    .pay-title {
        font-size: 0.14rem;
        margin: -0.23rem 0 .2rem 0;
        color: #999999;
        padding-left: .15rem;
    }

    .main-list-right {
        line-height: .6rem;
        font-size: 0.16rem;
        font-weight: 700;
        display: inline-block;
        color: black;
        text-align: right;
        padding-right: .2rem;

    }
    .main-list-right-span{
        /*display: flex;*/
        height: .72rem;
        line-height: .72rem;
        text-align: right;
        margin-right: .01rem;
    }

    .main-list-icont {
        align-items: baseline ;
        height: .5rem;
        display: inline-block;
        font-size: .2rem;
    }
    .main-list-money {
        align-items: baseline ;
        font-size: .32rem;
        font-weight: 400;
        height: .5rem;
        margin-left: .01rem;
        display: inline-block;
    }

    .main-payType {
        font-size: .16rem;
        display: inline-block;
        line-height: 0.6rem;
        position: absolute;
        font-weight: 400;
    }

    .main-list-left-pay img {
        margin: 0.15rem 0.1rem 0 0;
    }

    .main-list-left img {
        width: .3rem;

    }
    .main-list-left{
        font-weight: 400;
    }
    .btn-div {
        height: .44rem;
        line-height: .44rem;
        width: 2.05rem;
        margin-top: 1.17rem;
    }

    .pay-type {
        margin: 0.23rem auto .13rem;
        width: 90%;
        height: .2rem;
    }

    .pay-type img {
        /*display: inline !important;*/
        float: left;
        height: 0.2rem;
    }

    .pay-type p {
        font-weight: 800;
        margin-left: .2rem;
        font-size: 0.15rem;
    }

    .main-list-right input {
        margin-top: 0.25rem;
    }

    .main-list-img {
        width: .72rem;
        margin-right: .2rem;
        height:.37rem;
    }

    .main-list-LicenseTag {
        margin-right: 0.1rem;
    }


    .main-list-span{
        font-size: .15rem;
        font-weight: 400;

    }
    .main-list5{
        height: .72rem;
        line-height: .72rem;
    }
    .main-list6{
        height: .605rem;
        line-height: .605rem;
    }

</style>
