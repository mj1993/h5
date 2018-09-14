<template>
    <div class="repay">
        <div class="pic">
            <h3>还车须知</h3>
            <p>1.还车时需要注意的事项：</p>
            <p>（1）将车辆开至全时段合法停车场还车。还车时间以确认还车成功的时间为准，请及时还车。</p>
            <p>（2）还车需确认车辆熄火，检查随身物品，关闭车窗、车门、后备箱，并在车门外进行还车。</p>
            <p>（3）图示区域为核心服务区示意，超出核心服务区还车将根据超区距离收取超区还车费，如下图示例：</p>
            <!--<p>（3）超出围栏还车将收取还车附加费，具体计费标准请查看<a style="font-size: .14rem" @click="car()">计价规则</a>。</p>-->
            <img src="../../assets/images/repay_bo.png" alt="">
            <p>示例一：取车点在核心服务区内，还车点在区外，以图中蓝色线段长度的实际直线距离收取超区还车费：</p>
            <img src="../../assets/images/1.png" alt="">
            <p>示例二：取车点和还车点都在核心服务区外，蓝色线段比绿色线段长，则以图中蓝色线段与绿色线段长度之差收取超区还车费：</p>
            <img src="../../assets/images/2.png" alt="">
            <p>示例三：取车点和还车点都在核心服务区外，蓝色线段比绿色线段短，则不收取超区还车费：</p>
            <img src="../../assets/images/3.png" alt="">
            <span class="p-remarks">注：图示围栏范围仅为示意。</span>
            <p>（4）在城市行政区域范围外不能还车。为保证畅爽的用车体验，请您务必在行政区域范围内用车、还车。</p>
        </div>
        <incar-dialog
            :type="dialogInfo.type"
            :title="dialogInfo.title"
            :isVisible="dialogInfo.dialogShow"
            :content="dialogInfo.content"
            :confirmText="dialogInfo.confirmText"
            :cancelText="dialogInfo.cancelText"
            :isCenter="true"
            @enterAction="checkStatusSubmit"
            @close="checkStatusGoback"
        ></incar-dialog>
    </div>
</template>

<script>
    import baseData from '../../assets/control'
    import IncarDialog from "@/components/IncarDialog";
    export default {
        name: "repay",
        data() {
            //数据
            return {
                dialogInfo: {
                    type: "confirm",
                    dialogShow: false,
                    content: "",
                    title: "",
                    confirmText: "确定",
                    cancelText: "取消"
                },
            }
        },
        methods: {
            checkStatusSubmit(){

            },
            checkStatusGoback(){
                this.dialogInfo.dialogShow =false;
            },
            //方法
            car(){
                const data=parseInt(this.$cookie.get('areaCode'));
                if(baseData[data]){
                    this.$router.push({name:'valuationCAR'})
                }else{
                    this.dialogInfo.type = "alert";
                    this.dialogInfo.dialogShow =true;
                    this.dialogInfo.title = '当前城市暂未开通';
                }
            }
        },
        components: { IncarDialog },
        mounted() {
            //生命周期，实例化，并挂载到dom
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
    .repay{
        img{
            width:auto;
            height:auto;
            max-width:100%;
            max-height:100%;
        }
        a{
            color: #296cff;
            text-decoration:none;

        }
        p{
            margin: 0.26rem 0 !important;
        }
        .p-remarks{
            display: block;
            font-size: 0.14rem;
            color:#0E193A;
        }
    }

</style>
