<template>
    <div id="handbook" class="handbook">
        <div class="by">
            <h3>使用指南</h3>
            <ul>
                <li>
                    <div>
                        <span class="mark_l"></span>
                        <a class="headline" >如何用车</a>
                    </div>
                </li>

                <li>
                    <div class="main"  @click="condition">
                        <a>用车条件</a>
                        <span class="mark_r"></span>
                    </div>
                </li>
                <li>
                    <div class="main" @click="fetch">
                        <a >如何取车</a>
                        <span class="mark_r"></span>
                    </div>
                </li>

                <li>
                    <div class="main" @click="midway">
                        <a >中途停车</a>
                        <span class="mark_r"></span>
                    </div>
                </li>

                <li>
                    <div class="main" @click="repay">
                        <a >还车须知</a>
                        <span class="mark_r"></span>
                    </div>
                </li>

                <li>
                    <div>
                        <span class="mark_l"></span>
                        <a class="headline">费用说明</a>
                    </div>
                </li>


                <li >
                    <div class="main" @click="valuationCAR(valuation)" >
                        <a  >计价规则</a>
                        <span class="mark_r"></span>
                    </div>
                </li>

                <li>
                    <div class="main" @click="park">
                        <a  >停车费说明</a>
                        <span class="mark_r"></span>
                    </div>
                </li>
                <div v-if="valuation">
                    <li >
                        <div>
                            <span class="mark_l"></span>
                            <a class="headline" href="">车辆操控</a>
                        </div>
                    </li>

                    <li  v-for="item in  dataList">
                      <div class="main" @click="operation(item.name)">
                        <a  >{{item.brand}}{{item.name}}</a>
                        <span class="mark_r"></span>
                      </div>
                    </li>


                    <!--<li  v-if="baseDataList.vehicle.EV160">-->
                        <!--<div class="main" @click="EV160">-->
                            <!--<a  >北汽EV160</a>-->
                            <!--<span class="mark_r"></span>-->
                        <!--</div>-->
                    <!--</li>-->
                    <!--<li v-if="baseDataList.vehicle.POLO">-->
                        <!--<div class="main" @click="POLO" >-->
                            <!--<a  >大众POLO</a>-->
                            <!--<span class="mark_r"></span>-->
                        <!--</div>-->
                    <!--</li>-->
                </div>
                <li>
                    <div>
                        <span class="mark_l"></span>
                        <a class="headline">事故与违章</a>

                    </div>
                </li>
                <li>
                    <div class="main" @click="regulations">
                        <a  >违章处理</a>
                        <span class="mark_r"></span>
                    </div>
                </li>
                <li>
                    <div class="main" @click="accident">
                        <a  >事故处理</a>
                        <span class="mark_r"></span>
                    </div>
                </li>
            </ul>
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
    import IncarDialog from "@/components/IncarDialog";
    import baseData from '../../assets/control'
    export default {
        name: 'handbook',
        data(){
            return{
                baseDataList:null,
                valuation:true,
                dataList:[],
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
        components: { IncarDialog },
        methods:{
            checkStatusSubmit(){

            },
            checkStatusGoback(d){
                this.dialogInfo.dialogShow =false;
            },
            condition(){
              this.$router.push({name:'conditionNew'})
            },
            fetch(){
                this.$router.push({name:'fetch'})
            },
            midway(){
                this.$router.push({name:'midway'})
            },
            repay(){
                this.$router.push({name:'repay'})
            },
            valuationCAR(d){
                if(d){
                    this.$router.push({name:'valuationCAR'})
                }else{
                    this.dialogInfo.type = "alert";
                    this.dialogInfo.dialogShow =true;
                    this.dialogInfo.title = '当前城市暂未开通';
                }
            },
            park(){
                this.$router.push({name:'parkNew'})
            },
            operation(url){
              this.$router.push({name:url+'New'})
            },
            regulations(){
                this.$router.push({name:'regulations'})
            },
            accident(){
                this.$router.push({name:'accident'})
            },

        },
        created() {
            this.$store.commit('setNativeTitle','使用指南')
            const data=parseInt(this.$cookie.get('areaCode'));
            if(baseData[data]){
                this.baseDataList = baseData[data];
                this.dataList = this.dataList.concat(baseData[data].vehicle)
                this.valuation=true;
            }else{
                this.valuation=false
            }
        },
    }


</script>

<style scoped lang="scss">
    @import '../../assets/style.css';
    .handbook{
        .by {
            width: 100%;
            padding: 0.16rem;
        }
        h3{
            font-size: 0.32rem;
            margin: 0;
            padding: 0;
            line-height: 0.32rem;
            color: #0E193A;
            font-weight: bold;
        }
        .by ul{
            margin-bottom: 0.25rem;
        }
        .by ul li {
            border-bottom: 1px solid #EBEBEB;
        }
        .by ul li div {
            margin-top: 0.27rem;
            margin-bottom: 0.15rem;

        }
        .by ul li div .mark_l {
            width: 0.06rem;
            height: 0.18rem;
            margin: 0 0.1rem;
            display: inline-block;
            background: url(../../assets/images/Rectangle.png);
            background-size: cover;
            vertical-align: bottom;
        }
        .by ul li div .mark_r {
            width: 0.07rem;
            height: 0.14rem;
            margin-top: 0.05rem;
            display: block;
            background: url(../../assets/images/xhdpi.png);
            background-size: cover;
            vertical-align: middle;
        }
        .by ul li div .headline {
            font-weight: 500;
            font-size: 0.14rem;
            color: #0E193A;
            letter-spacing: 0;
        }
        .by ul li .main {
            margin: 0.19rem 0;
            margin-left: 0.04rem;
            display: flex;
            justify-content: space-between;
        }
        .by ul li .main a {
            text-decoration:none;
            font-size: 0.16rem;
            line-height: 0.22rem;
            color: #0E193A;
            letter-spacing: 0;
            width: 100%;
        }
    }
</style>
