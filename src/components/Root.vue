<template>
    <div>
        <transition :name="transitionName">
            <router-view class="child-view"/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Root',
        data() {
            return {
                transitionName: ''
            }
        },
        beforeRouteUpdate(to, from, next) {
            let isBack = this.$router.isBack
            if (isBack) {
                this.transitionName = 'slide-right'
            } else {
                this.transitionName = 'slide-left'
            }
            this.$router.isBack = false
            next()
        },
        mounted() {
            //设置nativeTitle
            var app = document.getElementById('app')
            var flag = false; //设置标记
            app.addEventListener('scroll', (e)=> {
                if (app.scrollTop > 64) {
                    if (flag) return;
                    this.$dsBridge.call('modifyNativeNavBarTitle', {title:this.$store.state.nativeTitle});
                    flag = true;
                } else {
                    if (!flag) return;
                    this.$dsBridge.call('modifyNativeNavBarTitle', {title:''});
                    flag = false;
                }
            });
            // this.$dsBridge.call('modifyNativeNavBarTitle', {title:this.$store.state.nativeTitle});
            //有以下路由name时，点击返回按钮时native返回
            //通配页,违章列表、选择优惠券、优惠券兑换、消费明细、优惠券列表（老）、兑换优惠券（老）
            // S车计价规则、M+车计价规则、S+车计价规则、使用指南、用车条件、停车费说明、Hi欢迎页、
            //钱包、登记停车费、、polo操作指南、ev160操作指南、VIOS操作指南、SAIL操作指南、余额充值
            // 个人中心、信用认证方式、推荐有奖、设置、取消原因调研
            const lastPage = ['errorpage','illegalList','couponBuy','billDetail','couponList','couponExchange',
                'valuationS','valuationMPLUS','valuationSPLUS','handBook','condition','park','Novice','wallet',
                'parkingFee','','POLO','EV160','VIOS','balanceChargeNew','marketInvite','setting','orderFeedback',
                'authenticationList','authenticationCredit'];
            this.$dsBridge.register('DDWEBVIEW_NAV_BACK', () => {
                //注册点击返回按钮方法，返回 0 由native处理，返回  1  由h5处理
                var name = this.$route.name;
                if(lastPage.includes(name)){
                    return '0'
                }
                // 违章支付完成页面返回直接返回到列表
                if (name == 'IllegalComplete') {
                    this.$router.isBack = true;
                    this.$router.push({name: 'illegalList'})
                    return '1'
                }
                // 【提现】页面，点击芝麻认证，会到达【creditVerifyInfo】这一页面。这个页面的返回会回到主页。
                if (name == 'creditVerifyInfo'){
                    this.$router.isBack = true;
                    this.$router.push({name: 'authenticationList'});
                    return '1'
                }

                 if (name == 'creditVerifySuccess'){
                    if( !this.$route.query.fromUserCenter ){
                        this.$dsBridge.call("pushIndex");
                        return '1'
                    }
                }

                this.$router.goBack(-1);
                return '1'
            })


          //芝麻认证成功回调，通过改变store里面的变量来触发不同子路由里面的方法
          this.$dsBridge.register('DDWEBVIEW_ZM_IDENTIFICATION_FINISH',()=>{
            var name = this.$route.name;
            if(name === 'creditVerifySuccess'){
              this.$store.commit('changeZmOldUserFinish')
            }
            if(name === 'authenticationSesame' || name === 'authenticationCreditNew' || name === 'authenticationCredit' || name ==='withdrawDeposit'){
              this.$store.commit('changeZmIdCardFinish')
            }
          })

          this.$dsBridge.register('DDWEBVIEW_VIEW_REFRESH',()=>{
            this.$store.commit('triggerRefresh')
          })


        }
    }
</script>

<style scoped>
    .child-view {
        position: absolute;
        width: 100%;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(80px, 0);
        transform: translate(80px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-80px, 0);
        transform: translate(-80px, 0);
    }
</style>
