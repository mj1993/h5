<template>
    <div>
        <div class="title">
            违章查询
        </div>
        <div class="illegal-qs">
            <!--<img src="../../assets/images/pic_wz_qs.png" alt="">-->
            <!--<div>正在建设中</div>-->
            <div>
              没有更多记录了
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "default",
        data() {
            return {}
        },
        methods: {},
        mounted() {

        },
        components: {},
        props: {},
        watch: {}
    }
</script>

<style scoped>
    *{
        font-size: 0.2rem;
    }
    .title{
        height: .9rem;
        line-height: .9rem;
        font-size: .32rem;
        font-weight: bold;
        padding-left: .15rem;
    }
    .illegal-qs{
        width: 3.2rem;
        margin: 0 auto ;
    }
    .illegal-qs>img{
        width: 100%;
    }
    .illegal-qs>div{
        font-size: .16rem;
        color: #999999;
        text-align: center;
        margin-top: .19rem;
    }
</style>
