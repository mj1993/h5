<template>
    <div class="about">
        <div class="pic">
            <h3>关于大道</h3>
            <p>大道用车是汽车共享出行服务平台，为用户提供城市内的即时、优质出行服务。</p>
            <p>我们将大道共享车密布在城市的大街小巷。需要用时直接用手机下单开门，自驾出行。用完停放在任意合法的停车位即可结束行程。没错，甚至不用还回网点，彻底的随驾随还。</p>
            <p>无论是上下班，还是聚会购物，您都可以选择大道用车自驾出行，不用雇司机，省钱又安心。</p>
            <p>大道用车 至简不凡!</p>

            <p class="mtop" >商务合作:
                <span>pr@mydadao.com</span>
            </p>
            <p>客服电话：400-616-6161</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "about",
        data() {
            //数据
            return {}
        },
        methods: {
            //方法
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            this.$store.commit('setNativeTitle','关于大道')
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

<style scoped  lang="scss">
    .about{
            html,
            body {
            padding: 0;
            margin: 0;
        }

            .pic {
                padding-top: 0.27rem;
                padding-right: 0.2rem;
                padding-left: 0.19rem;
        }

            h3 {
                font-size: 0.32rem;
                line-height: 0.32rem;
                color: #0E193A;
                margin: 0;
                font-weight: bold;
        }

            p {
                margin: 0.26rem 0 !important;
                font-size: 0.14rem;
                line-height: 0.2rem;
                letter-spacing: 0.3px;
                color: #0E193A;
        }
            .mtop {
                margin-top: 1rem;
        }
            span {
                color: rgb(91, 149, 250)
        }
    }


</style>
