const authenticationList =()=>import('../../views/authentication/list.vue')
const authenticationCredit =()=>import('../../views/authentication/credit.vue')
const authenticationSesame =()=>import('../../views/authentication/sesame.vue')
const authenticationResult =()=>import('../../views/authentication/result.vue')
const authenticationNick =()=>import('../../views/authentication/nick.vue')
const payDeposit = () => import("../../views/authentication/payDeposit.vue");
const addDeposit = () => import("../../views/authentication/addDeposit.vue");
const withdrawDeposit = () => import("../../views/authentication/withdrawDeposit.vue");
const creditVerifySuccess = () => import("../../views/authentication/creditVerifySuccess.vue");
const creditVerifyInfo = () => import("../../views/authentication/creditVerifyInfo.vue");

export default [
    {
        path: '/authenticationList',
        name: 'authenticationList',
        component: authenticationList
    },
    {
        path: '/authenticationCreditNew',
        name: 'authenticationCreditNew',
        component: authenticationCredit
    },
    {
        path: '/authenticationCredit',
        name: 'authenticationCredit',
        component: authenticationCredit
    },
    {
        path: '/authenticationSesame',
        name: 'authenticationSesame',
        component: authenticationSesame
    },
    {
        path: '/authenticationResult',
        name: 'authenticationResult',
        component: authenticationResult
    },
    {
        path: '/authenticationNick',
        name: 'authenticationNick',
        component: authenticationNick
    },
    {
      path:"/payDeposit",
      name: "payDeposit",
      component: payDeposit
    },
    {
      path:"/addDeposit",
      name: "addDeposit",
      component: addDeposit
    },
    {
      path:"/withdrawDeposit",
      name: "withdrawDeposit",
      component: withdrawDeposit
    },
    {
      path:"/creditVerifySuccess",
      name: "creditVerifySuccess",
      component: creditVerifySuccess
    },
    {
      path:"/creditVerifyInfo",
      name: "creditVerifyInfo",
      component: creditVerifyInfo
    },
]
