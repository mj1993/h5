// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App'
import router from './router'
import dsBridge from 'dsBridge'
import './utils/rem'
import axios from 'axios'
import toast from './components/toast'
import common from './utils/common'
import store from './store'


//TODO 环境变量切换
// const flag = 'dev';
// const flag = 'test';
const flag = 'prod';

if (flag == 'dev') {
    //dev环境
    Vue.prototype.HOST1 = 'https://api-v1-dev.mydadao.com';
} else if (flag == 'test') {
    //test环境
    Vue.prototype.HOST1 = 'https://api-v1-test.mydadao.com';
} else {
    //prod环境
    Vue.prototype.HOST1 = 'https://api-v1.mydadao.com';
}


Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(common)

//axios,请求全局拦截器。post全局方法改变为formdata
function transformRequest(data) {
    let ret = ''
    for (let it in data) {
        if ((typeof data[it]) == 'string') {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        } else {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(JSON.parse(data[it])) + '&'
        }
    }
    return ret
}

axios.interceptors.request.use(function (config) {
    //axios,请求全局拦截器。post全局方法改变为formdata
    if (config.type != 'payload') {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        config.data = transformRequest(config.data);
    }
    config.headers['x-incar-token'] = VueCookie.get('x-incar-token');
    config.headers['x-incar-app-id'] = VueCookie.get('x-incar-app-id');


    // config.headers['x-incar-token']='Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE1MjE0NTUyMTMsImV4cCI6MTUyNDA0NzIxMywidXNlcklkIjo5MjM1NjcsInRva2VuIjoiTmdwWER4RVQ3Q1dqNUtkUy0xNTIxNDU1MjEzNjcxIn0.cDfmo9M7CfrK4KDrGXK810Hug2ohAtd2fgzfYtF_mKE';
    // config.headers['x-incar-app-id']='3b916ca720074fb5b7bc9a2bfa3c9ac1';

    return config;
}, function (err) {
    return Promise.reject(err);
});


//axios,相应全局拦截器，处理数据接口没有权限
axios.interceptors.response.use(function (response) {
    // token 已过期，给出提示
    if (response.data.status == '20') {
        toast.error(response.data.message);
        setTimeout(()=>{
          dsBridge.call('pushIndex')
        },1000)
    }
    return response
}, function (error) {
})


Vue.prototype.$http = axios
Vue.prototype.$dsBridge = dsBridge
Vue.prototype.$toast = toast
Vue.prototype.$env=flag

router.afterEach((to,from,next) => {
    document.getElementById('app').scrollTop = 0;
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
