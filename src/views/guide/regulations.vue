<template>
    <div class="regulations">
        <div class="pic">
            <h3>违章处理</h3>
            <p>如在您用车过程中出现了交通违章记录，大道用车工作人员会第一时间电话通知到您，并与您预约处理交通违章的时间和地点。</p>
            <p>处理违章所需证件：</p>
            <p>1.您本人的身份证
            </p>
            <p>2.您本人的驾驶证</p>
            <p>3.车辆行驶证（大道用车提供）</p>
            <p>大道用车工作人员携带【车辆行驶证】原件协助您现场处理违章记录。</p>
            <p class="c">注意:如出现违章，账户将暂时被冻结，待违章消除后账户自动解冻。</p>
        </div>
    </div>
</template>

<script>

    export default {
        name: "regulations",
        data() {
            //数据
            return {}
        },
        methods: {
            //方法
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
          this.$store.commit('setNativeTitle','违章处理')
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
    .regulations{
        p{
            margin: 0.26rem 0 !important;
        }
    }

</style>
