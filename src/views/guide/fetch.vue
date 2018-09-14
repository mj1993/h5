<template>
    <div class="fetch">
        <div class="pic">
            <h3>如何取车</h3>
            <p>1.如何取车</p>
            <p>
                预订车辆后，根据App地图提供的路线进行寻车。在靠近车身时，可以点击App上的【鸣笛】按钮来帮助确认车辆位置，以便快速寻找车辆。车辆定位受环境影响会有漂浮偏差现象，寻车时请同时观察定位点周围。
            </p>
            <p>2.定位说明</p>
            <p>如果车停在【地下】或【高楼附近】等场所，GPS信号可能会受到一些影响产生略微的偏移。</p>
            <p>（1）可以根据地图方位和停车文字描述进行寻找。 </p>
            <p>（2）为了方便他人用车，请您在还车页面的【车辆位置备注】进行精准的文字描述。（如：地下几层及停车位编号等）。</p>
        </div>
    </div>
</template>

<script>

    export default {
        name: "fetch",
        data() {
            //数据
            return {}
        },
        methods: {
            //方法
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
          this.$store.commit('setNativeTitle','如何取车')
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
    .fetch{
        p{
            margin: 0.26rem 0 !important;
        }
    }

</style>
