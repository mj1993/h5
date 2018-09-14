<template>
    <div class="midway-page">
        <div class="pic">
            <h3>中途停车</h3>
            <p>您在用车过程中可能会出现中途临时停靠办事的情况，在这种情况下可以这样操作：</p>
            <p>方法：中途临时停靠，无需还车。停车熄火，关闭好车门、车窗后，
                打开App，在订单进行页面中点击【锁车】按钮，车辆会为您
                保留，随时可以【开锁】并继续用车。</p>
            <p> 注意：在订单内的停车费用需要您自行承担。</p>
        </div>
    </div>
</template>

<script >
    export default {
        name: "midway",
        data() {
            //数据
            return {}
        },
        methods: {
            //方法
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            this.$store.commit('setNativeTitle','中途停车')
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
    .midway-page {
        & > p {
            margin: 0.26rem 0 !important;
        }
    }
</style>
