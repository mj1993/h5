<template>
    <div id="couponBuy">
        <div class="tilte">
            <p class="tilte-h">选择优惠券</p>
            <p class="tilte-p" >请选择合适的优惠券</p>
        </div>
        <div>
            <input type="button" class="btn-p" value="不使用优惠券"  @click="buy(10,-1,0)">
        </div>
        <div>
            <div class="img-list" v-for="item in dataList"  @click="buy(item.status,item.couponId,item.isOrderCanUse)" :key="item.id">
                <img src="../../assets/images/back-list1.png" alt="" class="main-img" v-if="item.status==10 && item.isOrderCanUse==0">
                <img src="../../assets/images/back-list2.png" alt="" class="main-img" v-if="item.status!=10">
                <img src="../../assets/images/back-list2.png" alt="" class="main-img" v-if="item.status==10 && item.isOrderCanUse!=0">


                <ul class="main">
                    <li class="main-left " :class="item.status==10&&item.isOrderCanUse==0?'fontColor1':'fontColor2'">
                        <span class="price" v-if="item.couponStyle!=3">{{item.denomination}}</span>
                        <span class="price" v-if="item.couponStyle==3">{{item.discount}}</span>
                        <span class="pricell" v-if="item.couponStyle!=3">{{item.suffixYuan}}</span>
                        <span class="pricell" v-if="item.couponStyle==3">{{item.suffixZhe}}</span>
                    </li>
                    <li class="main-right">
                        <p class="main-type">{{item.title}}</p>
                        <p class="main-conditional">
                            {{item.content}}
                        </p>
                        <p class="main-date">
                            {{formatDate(new Date(item.startDate),'yyyy-MM-dd')}}&nbsp;至&nbsp;{{formatDate(new Date(item.endDate),'yyyy-MM-dd')}}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <!--//加载动画-->
        <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
            <span slot="no-more" class="nomore">没有更多记录了</span>
            <span slot="no-results" class="nomore">没有更多记录了</span>
        </infinite-loading>
        <div style="height: 60px"></div>
    </div>
</template>

<script>
    import '@/assets/coupon.css'
    import InfiniteLoading from 'vue-infinite-loading'
    export default {
        name: "couponBuy",
        data() {
            //数据
            return {
                pageNo:1,
                dataList:[],
                flag:true,
            }
        },
        methods: {
            //方法
            infiniteHandler($state){
                var req={
                    pageNo: this.pageNo,
                    pageSize: 5,
                    uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                    userId:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                    token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
                    orderId:this.$cookie.get('orderId'),
                    platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                    appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                }
                this.$http.post(this.HOST1+'/v/coupon/list-for-pay',req)
                    .then( (response)=> {
                        var res=response.data;
                        if(res.status ==200){
                            this.dataList = this.dataList.concat(res.attachment.models)
                            if(this.pageNo<res.attachment.pageCount){
                                this.pageNo++
                                $state.loaded()
                            }else{
                                $state.complete();
                            }
                        }else {
                            $state.complete();
                        }
                    })
                    .catch((error)=> {
                        $state.complete();
                    })
            },
            buy(s,c,i){
                if(s == 10 && i==0){
                    if(!this.flag){
                        return;
                    }
                    this.flag=false;
                    if(c==-1){
                        this.$dsBridge.call('chooseCoupons',{couponId:-1})
                    }else{
                        var req={
                            uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                            token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
                            orderId:this.$cookie.get('orderId'),
                            couponId:c,
                            platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                            appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                        }
                        this.$http.post(this.HOST1+'/v/order/findCouponDiscount',req).then((response)=>{
                            var res=response.data;
                            if(res.status==200){
                                var payPrice = res.attachment.payPrice;
                                var couponPrice = res.attachment.discountPrice;
                                this.$dsBridge.call('chooseCoupons',{couponId:c,payPrice:payPrice,couponPrice:couponPrice})
                            }
                        },(error)=>{
                        })
                    }
                }
            }
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            this.$store.commit('setNativeTitle','选择优惠券')
        },
        components: {
            //注册子组件
            InfiniteLoading,
        },
        props: {
            //接收父组件的传值
        },
        watch: {
            //监听数据的改变
        }
    }
</script>

<style>

    .btn-p{
        width: 90%;
        border-radius: 5px;
        border:1px solid #006aff;
        color: #006aff;
        height: .4rem;
        display: block;
        font-size: 0.15rem;
        margin: 0.2rem auto 0.1rem;
    }

    .tilte-p{
        color: #6e6e6e;
        font-size: 0.13rem;
        line-height: .2rem;
    }
</style>
