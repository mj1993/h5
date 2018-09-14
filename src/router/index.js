import Vue from 'vue'
import Router from 'vue-router'

const Root = () => import('../components/Root.vue')
const Home = () => import('../components/Home.vue')
const Test = () => import('../components/test.vue')
// const IllegalList = () => import('../views/illegal/List.vue')
const IllegalList = () => import('../views/illegal/Default.vue')
const IllegalDetail = () => import('../views/Illegal/Detail.vue')
const IllegalForPay = () => import('../views/illegal/ForPay.vue')
const IllegalComplete = () => import('../views/illegal/Complete.vue')
const wallet = () => import('../views/coupon/wallet.vue')
const couponList = () => import('../views/coupon/couponList.vue')
const couponBuy = () => import('../views/coupon/couponBuy.vue')
const couponExchange = () => import("../views/coupon/couponExchange.vue");
const balanceCharge = () => import("../views/coupon/balanceCharge.vue");
const balanceChargeSuccess = () => import("../views/coupon/balanceChargeSuccess.vue");
const billDetail = () => import("../views/bill/billDetail.vue");
const parkingFee = () => import("../views/bill/parkingFee.vue");

const setting = () => import("../views/setting.vue");
const orderFeedback = () => import("../views/orderFeedback.vue");
const marketInvite = () => import("../views/marketInvite.vue");



import guide from './guide'
import authentication from './authentication'

Vue.use(Router)

Router.prototype.goBack = function (num) {
    if(!num){
        num=-1;
    }
    this.isBack = true;
    this.go(num)
}

const router=new Router({
    routes: [
        {
            path: '/',
            name: 'Root',
            component: Root,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/illegalList',
                    name: 'illegalList',
                    component: IllegalList
                },
                {
                    path: '/illegalDetail/:id',
                    name: 'illegalDetail',
                    component: IllegalDetail
                },
                {
                    path: '/illegalForPay/:id',
                    name: 'illegalForPay',
                    component: IllegalForPay
                },
                {
                    path: '/IllegalComplete/:id',
                    name: 'IllegalComplete',
                    component: IllegalComplete
                },
                {
                    path: '/wallet',
                    name: 'wallet',
                    component: wallet
                },
                {
                    path: '/couponList',
                    name: 'couponList',
                    component: couponList
                },
                {
                    path: '/couponListNew',
                    name: 'couponListNew',
                    component: couponList
                },
                {
                    path: '/couponBuy',
                    name: 'couponBuy',
                    component: couponBuy
                },
                {   //iOS1.2.11 紧急修复，切勿删除
                    path: '/couponBuy.html',
                    name: 'couponBuy',
                    component: couponBuy
                },
                {
                    path:"/couponExchange",
                    name: "couponExchange",
                    component: couponExchange
                },
                {
                    path:"/couponExchangeNew",
                    name: "couponExchangeNew",
                    component: couponExchange
                  },
                    {
                    path:"/balanceCharge",
                    name: "balanceCharge",
                    component: balanceCharge
                },
                {
                    path:"/balanceChargeNew",
                    name: "balanceChargeNew",
                    component: balanceCharge
                },
                {
                    path:"/balanceChargeSuccess",
                    name: "balanceChargeSuccess",
                    component: balanceChargeSuccess
                },
                {
                    path:"/parkingFee",
                    name: "parkingFee",
                    component: parkingFee
                },
                {
                    path:"/billDetail",
                    name: "billDetail",
                    component: billDetail
                },
                {
                    path:"/setting",
                    name: "setting",
                    component: setting
                },
                {
                    path:"/orderFeedback",
                    name: "orderFeedback",
                    component: orderFeedback
                },
                {
                    path:"/marketInvite",
                    name: "marketInvite",
                    component: marketInvite
                },
                ].concat(guide).concat(authentication).concat([{
                path: '*',
                name: 'errorpage',
                component: Home
            }])
        }
    ]

})


export default router
