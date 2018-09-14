<template>
    <div id="test">
        <div>phoneSysVersion:{{$cookie.get('phoneSysVersion')}}</div>
        <div>appVersion:{{$cookie.get('appVersion')}}</div>
        <div>device_brand:{{$cookie.get('device_brand')}}</div>
        <div>uid:{{$cookie.get('uid')}}</div>
        <div>token:{{$cookie.get('token')}}</div>
        <div>platform:{{$cookie.get('platform')}}</div>
        <div>userId:{{$cookie.get('userId')}}</div>
        <div>phoneModel:{{$cookie.get('phoneModel')}}</div>
        <div>timestamp:{{$cookie.get('timestamp')}}</div>
        <div>sign:{{$cookie.get('sign')}}</div>
        <div>adCode:{{$cookie.get('adCode')}}</div>
        <div>x-incar-token:{{$cookie.get('x-incar-token')}}</div>
        <div>x-incar-app-id:{{$cookie.get('x-incar-app-id')}}</div>
        <div class="btn" @click="pushindex">index</div>
    </div>
</template>

<script>
    import '../assets/common.css'
    export default {
        name: "test",
        data(){
            return{
                str:'test'
            }
        },
        methods:{
            pushindex(){
                this.$dsBridge.call("pushIndex")
            }
        }
    }
</script>

<style scoped>
    .btn{
        width: 100px;
        height: 40px;
        background: #296cff;
        margin-top: 20px;
    }
    #test{
        font-size: 18px;
    }
</style>
