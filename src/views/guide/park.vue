<template>
    <div class="park">
        <div class="pic">
            <h3>停车费说明</h3>
            <p> 为了更贴近用户的出行场景，我们从开始就坚持随意还车的开放理念。在停车场信息化尚未全面普及的今天，您可能避免不了取到车辆需要人工交纳停车费，给您造成的不便我们深表歉意。</p>
            <p> 若你在取车后代为交纳了停车费，请在应用内如实提交停车费金额。大道风控系统实时审核通过，会实时将同等金额补偿进您的余额账户。您可以在行程结束后，支付订单时直接使用。</p>
            <p>如图：</p>
            <img src="../../assets/images/stopCar1.png" >
            <img src="../../assets/images/stopCar2.png" >

        </div>
    </div>
</template>

<script>

    export default {
        name: "park",
        data() {
            //数据
            return {}
        },
        methods: {
            //方法
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            this.$store.commit('setNativeTitle','停车费说明')
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

<style scoped lang="scss">
    @import '../../assets/wenan.css';
    .park{
        p{
            margin: 0.26rem 0 !important;
        }
    }

</style>
