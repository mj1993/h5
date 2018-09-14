<template>
    <div id="detail">
        <div class="title">
            违章信息
        </div>
        <div class="main">
            <div class="main-title">
                <p class="main-title-p"></p>
                <span class="main-title-span">处理有效期至:</span>
                <span class="main-title-span">{{formatDate(new Date(peccancy_exp_time*1000),'yyyy年MM月dd日')}}</span>
                <span class="main-title-span" v-if="is_overdue==true">(已逾期)</span>
            </div>

            <div class="main-list">
                <span class="main-list-left">违章车辆</span>
                <span class="main-list-right">
                    <span class="main-list-right-span1">{{car_number}}</span>
                    <span class="main-list-right-span2"></span>
                </span>
            </div>
            <div class="main-list">
                <span class="main-list-left">违章时间</span>
                <span class="main-list-right">
                    <span class="main-list-right-span1">{{formatDate(new Date(peccancy_time*1000),'yyyy年MM月dd日 hh:mm:ss')}}</span>
                    <span class="main-list-right-span2"></span>
                </span>
            </div>
            <div class="main-list1">
                <span class="main-list-left1">违章地点</span>
                <span class="main-list-right1">
                    <span class="main-list-right-span1">{{peccancy_addr}}
                    </span><span class="main-list-right-span2"></span>
                </span>
            </div>
            <div class="main-list">
                <span class="main-list-left">违章原因</span>
                <span class="main-list-right">
                    <span class="main-list-right-span1">{{peccancy_why}}</span>
                    <span class="main-list-right-span2"></span>
                </span>
            </div>
            <div class="main-list">
                <span class="main-list-left">罚款金额</span>
                <span class="main-list-right">
                    <span class="main-list-right-span1">{{peccancy_money}}</span>
                    <span class="main-list-right-span2"></span>
                </span>
            </div>
            <div class="main-list">
                <span class="main-list-left">违章扣分</span>
                <span class="main-list-right">
                    <span class="main-list-right-span1">{{peccancy_score}}</span>
                    <span class="main-list-right-span2"></span>
                </span>
            </div>
            <div class=" main-list main-list-bottom">
                <span class="main-list-left">关联订单</span>
                <span class="main-list-right" @click="tail">
                    <span class="main-list-right-span1">{{order_num}}</span>
                    <span class="main-list-right-span2"></span>
                    <img src="../../assets/images/return.png" alt="" class="main-list-bottom-img">
                </span>
            </div>


            <div class="btn-div" @click="go" v-if="is_overdue==true">
                逾期处理
            </div>
            <div class="main-explain" @click="pushH5" v-if="is_overdue==true">
                逾期处理说明
            </div>
            <div class="main-explain" @click="pushH5" v-else>
                违章处理说明
            </div>
            <div style="height: 60px"></div>

        </div>
    </div>
</template>

<script>
    import '../../assets/common.css'
    export default {
        name: "detail",
        data() {
            //数据
            return {
                peccancy_score:null,
                peccancy_money:null,
                peccancy_why:null,
                peccancy_addr:null,
                peccancy_time:null,
                car_number:null,
                peccancy_exp_time:null,
                is_overdue:null,
                status_str:null,
                order_num:null,
                order_id:null,
            }
        },
        methods: {
            //方法
            go(){
                this.$router.push({ name: 'illegalForPay', params: { id: this.$route.params.id}})
            },
            tail(){
                this.$dsBridge.call('pushOrderInfo',{orderId:this.order_id+''})
            },
            pushH5(){
                this.$dsBridge.call('modifyNativeNavBarTitle', {title:''});
                location.href='http://manual.mydadao.com/main/regulations.html';
            }

        },
        mounted() {
            this.$store.commit('setNativeTitle','违章信息')
            //生命周期，实例化，并挂载到dom
            var req={
                peccancy_id:this.$route.params.id,
                platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                phoneSysVersion:this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
                device_brand:this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
                timestamp:this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
             };
            //违章id
            window.localStorage.peccancy_id = this.peccancy_id;
            //违章详情
            this.$http.post(this.HOST1+'/car-peccancy/info',req).then((response)=>{
                var res=response.data;
                if(res.code==200){
                        this.peccancy_score=res.data.peccancy_score;
                        this.peccancy_money=res.data.peccancy_money;
                        this.peccancy_why=res.data.peccancy_why;
                        this.peccancy_addr=res.data.peccancy_addr;
                        this.peccancy_time=res.data.peccancy_time;
                        // this.car_number=res.data.car_number;
                        this.peccancy_exp_time=res.data.peccancy_exp_time;
                        this.is_overdue=res.data.is_overdue;
                        this.status_str=res.data.status_str;
                        this.order_num=res.data.order_num;
                        window.localStorage.car_number = res.data.car_number;
                        this.car_number= res.data.car_number
                        this.order_id= res.data.order_id
                }
            },(error)=>{
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

    .main-title{
        padding: 0.05rem 0 .34rem 0;
        height: .2rem;
        line-height: .2rem;
        font-size: 0.14rem;
    }

    .main-title-span{
        font-size: 0.16rem;
    }
    .main-title-p{
        width: .1rem;
        height: .1rem;
        border-radius: 50%;
        background: #ffac0b;
        display: inline-block;
    }
    .btn-div{
        font-size: .18rem;
    }
    .main-explain{
        font-size: .18rem;
        text-align: center;
        color: #296cff;
        margin: 0.2rem auto;
    }
    .main-list-right{
        padding-left:5px;
        font-size: 0.14rem;
    }
    .main-list-right-span1{
        width: 99%;
        font-size: 0.14rem;
        display:-moz-inline-stack;
        display:inline-block;
        line-height:1.4em;
        vertical-align:middle;
    }
    .main-list-right-span2{
        width:0;
        display:-moz-inline-stack;
        display:inline-block;
        vertical-align:middle;
        font-size:0;
    }
    .main-list-bottom{
        position: relative;
        margin-bottom: 0.3rem;
    }
    .main-list-bottom-img{
        position: absolute;
        right: 0;
        top:0.2rem;
        width: .07rem;
        height: .13rem;
    }
    .main-list-left{
         width: 12%;
    }
    .main-list-left1,.main-list-left{
        font-weight: 400;
        font-size: .14rem;
        width: 12%;
        flex: auto;
    }
    .btn-div{
        width: 1.3rem;
    }

</style>
