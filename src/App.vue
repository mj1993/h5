<template>
    <div id="app">
      <!-- 添加前端开发工具栏 -->
      <!--<dev-navbar v-if="$env=='dev'"/>-->
      <router-view/>
    </div>
</template>

<script>
    // import devNavbar from "./components/devNavbar.vue"
    export default {
        name: 'App',
        // components:{ devNavbar },
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        /* 添加 文字不可选中 的效果 */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
        -webkit-touch-callout: none;
    }
    input, textarea {
      -webkit-user-select: auto!important;
      -khtml-user-select: auto!important;
      -moz-user-select: auto!important;
      -ms-user-select: auto!important;
      -o-user-select: auto!important;
      user-select: auto!important;
    }

    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        position: relative;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #0E193A;
        width: 100%;
        height: 100%;
        background: #fff;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        left:0;
        top:0;
    }

    * {
        margin: 0;
        padding: 0;
        list-style: none;
        box-sizing: border-box;
    }


    /* 默认样式 */
    html{overflow-y:scroll;}
    body,div,ul,li,span,img,input,form{ margin:0; padding:0;}
    body,p,h1,h2,h3,h4,h5,h6,ul,ol,dl,li,dd{ margin:0;}
    ul,ol{padding:0;}
    ul{
        list-style: none;
    }
    body{ font-size:12px;font-family:"冬青黑体简体中文","微软雅黑","宋体",Arial,sans-serif;}
    a{ text-decoration:none; color:#666666; }
    li{ list-style:none; }
    img{ border:none 0;}
    input{ outline:none; border:none; background:none;}
    input,textarea,select{ margin:0; }
    input,textarea{ padding:0;}
    input::-ms-clear{display:none;}

    .incar-mob-btn {
        display: inline-block;
        height: .44rem;
        padding: 0 .4rem;
        line-height: .44rem;
        text-align: center;
        /* background-color:#296cff; */
        border-radius: .22rem;
        font-size: .18rem;
        color: #fff;
        background: #296cff;
        box-shadow: 0 0 0.06rem 0 rgba(41, 108, 255, 0.45);
    }

    .incar-mob-title {
        font-size: 0.32rem;
        font-family: PingFangSC-Medium;
        margin: 0.16rem 0;
        font-weight: bold;
    }


    .incar-mob-subtitle {
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        color: #999999;
        letter-spacing: 0;
        line-height: 0.12rem;
        margin-left: 0.05rem;
        /* margin-bottom: 0.2rem; */
    }

</style>
