<template>
    <div class="valuationl">
        <div class="operation">
            <h3>计价说明</h3>
            <ul >
                <li v-for="item in Grade">
                    <div class="main" @click="ev(item.go)">
                        <a >{{item.car}}</a>
                        <span class="mark_r"></span>
                    </div>
                </li>

                <!--<li v-if="Grade3">-->
                    <!--<div class="main" @click="polo()">-->
                        <!--<a >{{Grade3}}</a>-->
                        <!--<span class="mark_r"></span>-->
                    <!--</div>-->
                <!--</li>-->
            </ul>
        </div>
    </div>
</template>

<script>

    import  baseData from '../../assets/control'
    export default {
        name: "valuation-c-a-r",
        data() {
            //数据
            return {
                Grade:null,

            }
        },
        methods: {
            //方法
            ev(url){
                this.$router.push({name:url})
            },

        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            const data=parseInt(this.$cookie.get('areaCode'));
            if(baseData[data]){
                this.Grade=baseData[data].Grade;
            }
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
.valuationl{
    .operation {
        padding-top: 0.27rem;
        padding-left: 0.2rem;
        padding-right: 0.19rem;
    }

    .operation h3 {
        color: #0E193A;
        font-size: 0.32rem;
        line-height: 0.32rem;
        font-weight: bold;
    }

    .operation ul {
        margin-top: 0.46rem;
    }

    .operation ul li {
        padding-bottom: 0.19rem;
        border-bottom: 1px solid #EBEBEB;
        display: flex;
        justify-content: space-between
    }

    .operation ul li{
        padding-top: 0.2rem;
    }

    .operation ul li a {
        color: #0E193A;
        font-size: 0.16rem;
        line-height: 0.22rem;
        width: 100%;
    }

    .operation ul li .mark_r {
        height: 0.14rem;
        width: 0.07rem;
        margin-top: 0.04rem;
        display: block;
        background: url('../../assets/images/go@2x.png');
        background-size: cover;
        vertical-align: middle;
    }
    .operation ul li .main {
        width: 100%;
        margin-left: 0.08rem;
        display: flex;
        justify-content: space-between;
    }

    .operationul li .main a {
        text-decoration:none;
        font-size: 0.32rem;
        line-height: 0.44rem;
        color: #0E193A;
        letter-spacing: 0;
        width: 100%;
    }
    p{
        margin: 0.26rem 0 !important;
    }
}

</style>
