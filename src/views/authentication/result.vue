<template>
    <div id="result" class="result">
        <div class="pic">

            <img v-if="status" src="../../assets/images/@2xcomplete.png">
            <h3 v-if="status">授权成功</h3>
            <img v-if="state" src="../../assets/images/@3xcomplete.png">
            <h3 v-if="state">授权失败</h3>
            <p class="pic_p1">大道用车将保护您的隐私</p>
            <p class="pic_p2">此信息仅用于认证审核</p>

            <div id="bt" @click="goBack">
                <span>返回大道用车</span>
            </div>
        </div>
    </div>
</template>

<script>
    import MD5 from '../../utils/md5'
    export default {
        name: "result",
        data() {
            //数据
            return {
                status:false,
                state:false,
                stateAll:0,
            }
        },
        methods: {
            //方法
            goBack(){
                this.$dsBridge.register('sesameAuthentication',{stateAll:this.stateAll})
             }
        },
        created(){
            function getQueryString(name) {                                       //name为传入参数
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            }
            var params = getQueryString('params')
            var sign = getQueryString('sign')
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            var signs = MD5('incar'+timestamp);
            var data = {
                'params':params,
                'sign':sign,
                'signs':signs,
                'timestamp':timestamp, areaCode: this.$cookie.get("areaCode") ? this.$cookie.get("areaCode") : '',
            }
            this.$http.post(this.HOST1 +'/zhima/score-openid',data).then((response) => {
                var res = response.data;
                if (res.status = 200) {
                    this.status=true;
                    this.statu=false;
                    this.stateAll=1;
                }else{
                    this.status=false;
                    this.statu=true;
                    this.stateAll=0;
                }
            }, (error) => {

            })
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
    html,
    body{
        margin: 0;
        padding: 0;
    }
    #result{
        div {
            text-align: center;
        }
        div img {
            width: 2.03rem;
            padding-top: 1.29rem;
            background-size: cover;
            vertical-align: middle;
            display: inline-block;
        }
        h3 {
            padding-top: 0.23rem;
            font-size: 0.3rem;
            color: #0E193A;
            letter-spacing: 0.0094px;
            line-height: 0.3rem;
            font-weight: 400;
        }
        p {
            font-size: 0.16rem;
            color: #0E193A;
            line-height: 0.16rem;
            padding-top: 0.26rem;
        }
        p:last-child {
            padding-top: 0.08rem;
        }
        #bt {
            margin-top: 1.17rem;
            margin-bottom: 0.81rem;
            width: 1.5rem;
            height: 0.4rem;
            background: #296CFF;
            box-shadow: 0 0 0.06rem 0 rgba(41, 108, 255, 0.45);
            border-radius: 0.5rem;
            display: inline-block;
        }

        #bt span {
            font-size: 0.15rem;
            color: #FFFFFF;
            display: block;
            line-height: 0.4rem;
        }
    }

</style>
