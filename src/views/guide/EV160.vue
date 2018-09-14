<template>
    <div id="EV160" class="EV160">
        <div class="operation">
            <h3>北汽EV160</h3>
            <div style="padding: 0;margin: 0">
                <span class="mark_l"></span>
                <span class="headline">操作指南</span>
            </div>
            <ul>
                <li>
                    <img src="../../assets/images/EV1.png" >
                </li>
                <li>
                    <img src="../../assets/images/EV2.png" >
                </li>
                <li>
                    <img src="../../assets/images/EV3.png" >
                </li>
                <li>
                    <img src="../../assets/images/EV4.png" >
                </li>
                <li>
                    <img src="../../assets/images/EV5.png" >
                </li>
                <li>
                    <img src="../../assets/images/EV6.png" >
                </li>
                <li>
                    <img src="../../assets/images/EV7.png" >
                </li>
            </ul>


        </div>
    </div>
</template>

<script>
    export default {
        name: "EV160",
        data() {
            //数据
            return {
            }
        },
        methods: {
            //方法
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
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
    .EV160{
    .mark_l {
        width: 0.062rem;
        height: 0.18rem;
        margin-right: 0.07rem;
        display: inline-block;
        background: url(../../assets/images/Rectangle.png);
        background-size: cover;
        vertical-align: bottom;
    }
    .headline {
        font-weight: 500;
        font-size: 0.14rem;
        color: #0E193A;
        letter-spacing: 0;
        line-height: 0.2rem;
    }

    html,body{
        padding: 0;
        margin: 0;
    }
    .operation{
        padding-top: 0.27rem;
        padding-left: 0.2rem;
        padding-right: 0.19rem;
    }
    ul {
        list-style: none;
        margin: 0;

    }


    ul>li {
        width: 100%;
        margin-top: 0.14rem;

        border-bottom: solid 0.5px #D8D8D8;
    }





    ul>li>img{
        width: 100%;

    }
    h3 {
        padding-bottom: 0.25rem;
        font-size: 0.32rem;
        margin: 0;
        line-height: 0.32rem;

        color: #0E193A;
        font-weight: bold;
    }

    }

</style>
