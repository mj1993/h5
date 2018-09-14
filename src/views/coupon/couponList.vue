<template>
    <div id="couponList">
        <div class="tilte">
            <p class="tilte-h">优惠券</p>
        </div>
        <div>
            <div class="img-list" v-for="item in dataList">
                <img src="../../assets/images/back-list1.png" alt="" class="main-img" v-if="item.status==10">
                <img src="../../assets/images/back-list2.png" alt="" class="main-img" v-if="item.status!=10">

                <img src="../../assets/images/yiguoqi@2x.png" alt="" class="main-img-type" v-if="item.status==18">
                <img src="../../assets/images/yishiyong@2x.png" alt="" class="main-img-type" v-if="item.status==30">
                <ul class="main">
                    <li class="main-left" :class="item.status==10?'fontColor1':'fontColor2'">
                        <span class="price" v-if="item.couponStyle!=3">{{item.denomination}}</span>
                        <span class="price" v-if="item.couponStyle==3">{{item.discount}}</span>
                        <span class="pricell" v-if="item.couponStyle!=3">{{item.suffixYuan}}</span>
                        <span class="pricell" v-if="item.couponStyle==3">{{item.suffixZhe}}</span>
                    </li>
                    <li class="main-right">
                        <p class="main-type">{{item.title}}</p>
                        <p class="main-conditional" :style="item.content.length>40?'font-size:0.12rem':''">
                            {{item.content}}
                        </p>
                        <p class="main-date">
                            {{formatDate(new Date(item.startDate),'yyyy-MM-dd')}}&nbsp;至&nbsp;{{formatDate(new Date(item.endDate),'yyyy-MM-dd')}}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
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
        name: "couponList",
        data() {
            //数据
            return {
                pageNo:1,
                dataList:[],
            }
        },
        methods: {
            infiniteHandler($state) {
                var req={
                    pageNo: this.pageNo,
                    pageSize: 5,
                    uid:this.$cookie.get("uid") ? this.$cookie.get("uid") : '',
                    token:this.$cookie.get("token") ? this.$cookie.get("token") : '',
                    platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                    appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                }
                this.$http.post(this.HOST1+'/v/coupon/list-v3.json',req).then((response)=>{
                    var res=response.data;
                    if(res.status==200){
                        this.dataList=this.dataList.concat(res.attachment.models)
                        if(this.pageNo<res.attachment.pageCount){
                            this.pageNo++;
                            $state.loaded();
                        }else {
                            $state.complete();
                        }
                    }else {
                        $state.complete();
                    }


                },(error)=>{
                    $state.complete();
                })
            },
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            this.$store.commit('setNativeTitle','优惠券')
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

