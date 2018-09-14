<template>
    <div class="volkswagen">
        <div class="operation">
            <h3>大众POLO</h3>
            <div>
                <span class="mark_l"></span>
                <span class="headline">操作指南</span>
            </div>
            <ul>
                <li>
                    <img src="../../assets/images/polo-(1).png">
                </li>
                <li>
                    <img src="../../assets/images/polo-(4).png">
                </li>
                <li>
                    <img src="../../assets/images/polo-(6).png">
                    <img src="../../assets/images/polo-(7).png">
                </li>
                <li>
                    <img src="../../assets/images/polo-(5).png">
                </li>

                <li>
                    <img src="../../assets/images/polo-(8).png">
                </li>
                <li>
                    <img src="../../assets/images/polo-(2).png">
                </li>
                <li>
                    <img src="../../assets/images/polo-(3).png">
                </li>


            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "volkswagen",
        data() {
            //数据
            return {}
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
    .volkswagen{
        html,
        body,
        div {
            padding: 0;
            margin: 0;
        }

        .operation {
            padding-top: 0.27rem;
            padding-left: 0.2rem;
            padding-right: 0.19rem;
        }

        h3 {
            padding-bottom: 0.25rem;
            font-size: 0.32rem;
            margin: 0;
            line-height: 0.32rem;

            color: #0E193A;
            font-weight: bold;
        }

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


        ul {
            list-style: none;
            margin-top:0.25rem;
            margin-bottom: 0.3rem;

        }
        .operation ul li{
            text-align: center;
            padding: 0.245rem 0rem;
            border-bottom: 1px solid #EBEBEB;
        }
        ul li:first-child{
            padding-top: 0;
        }
        ul li img{
            width: 3.2rem;
        }
    }


</style>
