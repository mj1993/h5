<template>
    <div class="novice">
        <div class="Novice">
            <p class="title">Hi,</p>
            <p class="content">我是大道，咱们花1分钟互相认识一下吧。</p>
            <p class="content">我愿意做您的贴心座驾，无论上下班，还是聚会购物，您都可以开着我自由出行。不用雇司机，省钱又安心。</p>
            <p class="content other">您会经常在大街小巷看到我，需要时就用手机选我、开门用车，用完将我停放在任意合法的停车位就好了。<br>随驾随还，至简不凡。</p>
            <p class="content">我会将自己打扮的干干净净，也希望您能爱惜我，遵守交通法规，出现人为损坏和违章可得您按规处理了。</p>
            <p class="content">为了尽量消除您的后顾之忧，也更好的保护自己，我给自己上了多种保险(具体险种可到使用指南了解)。</p>
            <p class="content">最后祝您用车愉快，有任何问题可以到客服中心找我。</p>
            <div class="main-btn">

                <div class="begin main-btn-left" @click="Novice">
                    <a >使用指南</a>
                </div>
                <div class="begin main-btn-right" @click="fromNewUser">
                    <a>前往体验</a>
                </div>
                <!--<div class="begin main-btn-right" onclick="javascript:window.open('incarcar://newUserBtn')">-->
                <!--<a>前往体验</a>-->
                <!--</div>-->

            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "novice",
        data() {
            //数据
            return {}
        },
        methods: {
            //方法
            Novice(){
                this.$router.push({name:'handBookNew'})
            },
            fromNewUser(){
                let v = this.$cookie.get("appVersion").toString()
                let c = v.split('.')
                var app=c[0]+c[1]+c[2]
                if(app > 134){
                  this.$router.push({name:'authenticationCreditNew', query: { NewUser: 'true' }})
                }else{
                  window.location.href='incarcar://newUserBtn'
                }

            },
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            this.$dsBridge.call('nativeHideNavRightItem')
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
    @import '../../assets/style.css';
 .novice{
     * {
         margin: 0;
         padding: 0; }

     .Novice {
         font-size: 0.35rem;
         /*padding: 1.1rem  0.15rem 0;*/
         text-align: justify;
         font-family: PingFangSC-Light;
         letter-spacing: -0.3px;
         padding-top: .11rem ;
         padding-left: 0.1rem;
         padding-right:  0.1rem;
     }
     .Novice .title {
         color: #296cff;
         font-size: .2rem;
         font-family: regular;
     }
     .Novice .content {
         font-size: 0.15rem;
         color: #2D2D2D;
         margin: 0.15rem 0;
     }
     .Novice .other {
         margin: .25rem 0; }
     .main-btn{
         width: 90%;
         margin:1rem auto 0;
         position: relative;
     }
     .main-btn-left{
         border: 1px solid #296CFF;
         position: absolute;
         left: 0;
         top: 0;
     }
     .main-btn-right{
         box-shadow: 0.2px 0.2px 6px #296CFF;
         background: #296cff;
         position: absolute;
         right: 0;
         top: 0;
     }
     .Novice .begin {
         display: flex;
         text-align: center;
         width: 1.3rem;
         height: .44rem;
         border-radius: 1.5rem;
         line-height: .5rem;
     }
     .main-btn-left a{
         color: #296CFF;
     }
     .main-btn-right a{
         color: #FFFFFF;
     }
     .Novice .begin a {
         margin: auto;
         display: inline-block;
         line-height: .4rem;
         height: .4rem;
         border-radius: 2.5rem;
         font-size: 0.2rem;
         letter-spacing: 1px;
     }
 }
</style>
