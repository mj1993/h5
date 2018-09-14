<template>
    <div class="condition">
        <div class="pic">
            <h3 >用车条件</h3>
            <p>为了保障您和他人的生命财产安全，对于用车资质有如下要求：</p>
            <p>1.身份认证</p>
            <p>（1）持有真实、合法、有效的中华人民共和国居民身份证和机动车驾驶证；</p>
            <p>（2）上传本人身份证正反面；</p>
            <p>（3）上传本人近期头像照片；</p>
            <p>（4）上传本人驾照正副本； </p>
            <p>注意：所上传的照片必须为您本人的真实信息，并且证件信息和上传照片保持一致，大道会保护您信息隐私，仅作为审核认证用途。</p>
            <p>2.信用认证</p>
            <p>大道用车为您提供不同的认证方式，您可任意选择</p>
            <p>（1）保证金认证</p>
            <p>说明：保证金{{this.bail.A}}元 (信用等级A)</p>
            <p style="text-indent: 3em">保证金{{this.bail.AA}}元 (信用等级AA)</p>
            <p>(2）芝麻信用认证</p>
            <p>说明：芝麻信用分值≥{{this.zhima.A}}（信用等级A）</p>
            <p style="text-indent: 3em">芝麻信用分值≥{{this.zhima.AA}}（信用等级AA）</p>
            <p>3.用车权限</p>
            <p>信用等级A=用车权限{{this.creditA.grade}}（{{this.creditA.car}}等）</p>
            <p>信用等级AA=用车权限{{this.creditAA.grade}}（{{this.creditAA.car}}等）</p>
        </div>
    </div>
</template>

<script>
  import baseData from '../../assets/control'
    export default {
        name: "condition",
        data() {
            //数据
            return {
              bail:null,
              zhima:null,
              creditA:null,
              creditAA:null,
            }
        },
        methods: {
            //方法
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            this.$store.commit('setNativeTitle','用车条件')
            const data=parseInt(this.$cookie.get('areaCode'));
            if(baseData[data]){
              this.bail=baseData[data].bail;
              this.zhima=baseData[data].zhima;
              this.creditA=baseData[data].creditA;
              this.creditAA=baseData[data].creditAA;
            }else{
              this.bail=baseData['default'].bail;
              this.zhima=baseData['default'].zhima;
              this.creditA=baseData['default'].creditA;
              this.creditAA=baseData['default'].creditAA;
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
    .condition{
        p{
            margin: 0.26rem 0 !important;
        }
    }

</style>
