<template>
    <div id="list">
        <div class="title">
            违章查询
        </div>
        <div class="illegal-list">
            <div class="illegal-cell" v-for="item in list" @click="push(item.peccancy_id,item.status_str)">
            <div>
                <div class="illegal-time" >{{formatDate(new Date(item.peccancy_time*1000),'yyyy年MM月dd日 hh:mm')}}</div>
                <div class="illegal-carnum" >{{item.car_number}}</div>
                <div class="illegal-city" >{{item.city_name}}</div>
            </div>
            <div>
                <div class="illegal-state">{{item.status_str}}</div>
                <div class="next-page">   <img src="../../assets/images/return.png" alt="" class="main-list-bottom-img"></div>
            </div>
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
    import '../../assets/common.css'
    import InfiniteLoading from 'vue-infinite-loading'
    export default {
        name: "list",
        data(){
          return{
              list:[],
              tag:1,
              page:1,
          }
        },
        methods: {
            //方法
            infiniteHandler($state) {
                var req={
                    page: this.page,
                    platform:this.$cookie.get("platform") ? this.$cookie.get("platform") : '',
                    appVersion:this.$cookie.get("appVersion") ? this.$cookie.get("appVersion") : '',
                    phoneSysVersion:this.$cookie.get("phoneSysVersion") ? this.$cookie.get("phoneSysVersion") : '',
                    device_brand:this.$cookie.get("device_brand") ? this.$cookie.get("device_brand") : '',
                    timestamp:this.$cookie.get("timestamp") ? this.$cookie.get("timestamp") : '', areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
                }

                this.$http.get(this.HOST1+'/car-peccancy/get-list',{params:req}).then((response)=>{
                    var res=response.data;
                    if(res.code==200){
                        this.list=this.list.concat(res.data.list)
                        if(this.page<res.data.pageCount){
                            this.page++;
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
            push(id,str){
                if(str=='已处理'){
                    this.$router.push({ name: 'IllegalComplete', params: { id: id }})
                }else {
                    this.$router.push({ name: 'illegalDetail', params: { id: id }})
                }

            }
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            this.$store.commit('setNativeTitle','违章查询')
        },
        components: {
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

<style scoped>
    .illegal-cell{
        height: 1rem;
        font-size: .1rem;
    }
    .illegal-cell>div:first-child{
        width: 2.65rem;
        float: left;
        height: .9rem;
        border-bottom: .01rem solid #EBEBEB;
        margin-left: .15rem;
    }
    .illegal-cell>div:last-child{
        width: .8rem;
        float: left;
        height: .9rem;
        border-bottom: .01rem solid #EBEBEB;
    }
    .illegal-time{
        font-size: .16rem;
        height: .45rem;
        line-height: .55rem;
    }
    .illegal-carnum{
        font-size: .14rem;
        color: #999999;
        height: .40rem;
        display:inline-block;
    }
    .illegal-city{
      font-size: .14rem;
      color: #999999;
      height: .40rem;
      margin-left: .3rem;
      display: inline-block;
    }
    .illegal-state{
        height: .45rem;
        font-size: .16rem;
        display: inline-block;
        line-height: .55rem;
        vertical-align: middle;
    }
    .next-page{
        height: .45rem;
        line-height: .45rem;
        display: inline-block;
        vertical-align: middle;
        padding-left: .1rem;
        padding-top: .04rem;
    }
    .next-page img{
        width:0.07rem ;
        height: .13rem;
    }
    .nomore{
        font-size: .12rem;
    }
</style>
