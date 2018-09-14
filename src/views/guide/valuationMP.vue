<template>
    <div class="valuation-MP">
        <div class="Price " id="Price">
            <p class="content ">计价规则</p>
            <p class="ms">
                M+：{{this.car}}等
            </p>
            <div class="dvm">
                <img src="../../assets/images/M+@2x.png">
            </div>
            <ul >
                <li>
                    <div style="display: -webkit-box;justify-content: space-between;">
                        <p>里程费</p>
                        <p><span class="line-through">{{this.delDataList.delMileage}}</span>{{this.dataList.mileage}}<span style="color:#999">（5月31日起回恢复原价）</span></p>
                    </div>
                    <p>每0.10公里结算</p>
                </li>
                <li>
                    <div style="display: -webkit-box;justify-content: space-between;">
                        <p>时长费</p>
                        <p><span class="line-through">{{this.delDataList.delLengthT}}</span>{{this.dataList.LengthT}}<span style="color:#999">（5月31日起回恢复原价）</span></p>
                    </div>
                    <p>每1分钟结算</p>
                </li>
                <li>
                    <div>
                        <p>最低消费</p>
                        <p><span class="line-through">{{this.delDataList.delMinimum}}</span>{{this.dataList.minimum}}<span style="color:#999"></span></p>
                    </div>
                    <p>里程费+时长费不足</p>
                    <p>最低消费额时，收取最低消费</p>
                </li>
                <li>
                    <div>
                        <p>超区还车费</p>
                        <p><span class="line-through">{{this.delDataList.delAdditional}}</span>{{this.dataList.additional}}<span style="color:#999"></span></p>
                    </div>
                    <p>仅在核心服务区外还车时收取</p>
                    <p style="text-align: left">超区距离取终点到核心服务区的最短直线距离（若起点也在区外，则取终点超区距离多于起点的部分），每0.10公里结算
                        <a @click="repay">详细示例></a>
                    </p>
                    <!--<p>仅在围栏外还车时收取</p>-->
                    <!--<p>取终点至起点的直线距离，每0.10公里结算</p>-->
                </li>
                <li>
                    <div>
                        <p>不计免赔</p>
                        <p><span class="line-through">{{this.delDataList.delNodeductibles}}</span>{{this.dataList.Nodeductibles}}<span style="color:#999"></span></p>
                    </div>
                    <p>自由选择</p>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import baseData from '../../assets/control'
    export default {
        name: "valuationMP",
        data() {
            //数据
            return {
                car:null,
                dataList:[],
                delDataList:[],
            }
        },
        methods: {
            //方法
            repay(){
                this.$router.push({name:'repay'})
            }
        },
        mounted() {
            //生命周期，实例化，并挂载到dom
            const data=parseInt(this.$cookie.get('areaCode'));
            if(baseData[data]){
                this.car = baseData[data].carMP.car;
                this.delDataList=baseData[data].delPriceMP;
                this.dataList=baseData[data].priceMP;
            }else{
              this.car = baseData['default'].carMP.car;
              this.delDataList=baseData['default'].delPriceMP;
              this.dataList=baseData['default'].priceMP;
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
    .valuation-MP{
        *{
            font-size: .14rem;
        }
      .line-through {
        text-decoration: line-through;
        text-decoration-color: red;
        margin-right: .12rem;
      }

      p{
            margin: 0;
        }
        #Price{
            width: 100%;
        }
        .Price {
            padding-top:.22rem;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            width: 100%;
        }
        .content {
            font-size: .32rem;
            margin: 0;
            line-height: .32rem;
            color: #0E193A;
            font-weight: bold;
        }
        .Price ul li {
            border-bottom: solid #EBEBEB 1px;
            padding-top: 0.14rem;
            padding-bottom: 0.14rem;
            font-size: 0.155rem;
            color: #0E193A;
            font-family: PingFangSC-Regular;
        }
        .Price ul li:nth-child(1){
            padding-top: .52rem;
        }
        .Price ul li p {
            text-align: right;
            color: #A8A8A8;
            margin-top: 0.05rem !important;
        }
        .Price ul li div {
            display: flex;
            justify-content: space-between; }
        .Price ul li div p {
            color: #101938; }

        del {
            text-decoration: line-through;
        }


        .ms {
            font-size: 0.155rem;
            color: #999999;
            letter-spacing: 0;
            line-height: 0.36rem;
        }

        .dvm {
            display: flex;
            justify-content: center
        }

        .dvm img {
            width: 1.21rem;
            height: 1.1rem;

        }

        .Price ul li:nth-child(1) {
            padding-top: 0.2rem;
        }
        a{
            font-size: .14rem;
            color: #296cff;
            text-decoration:none;
            text-align: right;
        }
    }


</style>
