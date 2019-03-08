<template>
    <div v-if="hasData">
        <p class="countTitle">仪表版</p>
        <Row :gutter="20">
            <i-col v-for="(infor, i) in inforCardData" :xs="12" :md="12" :lg="6" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
                <infor-card :color="infor.color" :icon="infor.icon" :icon-size="30" shadow @click="returnIndex(i)">
                    <count-to :end="infor.count" count-class="count-style" />
                    <p class="count-p">{{ infor.title }}</p>
                </infor-card>
            </i-col>
        </Row>
        <p class="countTitle">统计数据</p>
        <Row :gutter="20">
            <i-col :md="12" :lg="15">
                <row>
                    <i-col v-for="(infor, i) in moneyData" offset='1' :xs="24" :md="24" :lg="7" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
                        <infor-card :color="infor.color" :icon="infor.icon" :icon-size="30" shadow @click="returnIndex(i)">
                            <count-to :end="infor.count" count-class="count-style" />
                            <p class="count-p">{{ infor.title }}</p>
                        </infor-card>
                    </i-col>
                </row>
            </i-col>
            <i-col :md="12" :lg="9" style="margin-bottom: 20px;">
                <Card shadow>
                    <chart-pie :value="pieData" style="height: 400px;" text="用户类型占比" />
                </Card>
            </i-col>
        </Row>
        <p class="countTitle">近期收入</p>
        <Row :gutter="20" style="margin-top: 10px;">
            <!-- <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
                <Card shadow>
                    <chart-pie :value="pieData" style="height: 400px;" text="用户类型占比" />
                </Card>
            </i-col> -->
            <!-- <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
                <Card shadow>
                    <chart-bar :value="barData" style="height: 400px;" text="每周用户活跃量" />
                </Card>
            </i-col> -->
        </Row>
        <!-- <Row>
            <Card shadow>
                <example style="height: 310px;" />
            </Card>
        </Row> -->
    </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar } from "_c/charts";
import Example from "./example.vue";
import axios from "@/libs/api.request";
export default {
    //   name: 'home',
    components: {
        InforCard,
        CountTo,
        ChartPie,
        ChartBar,
        Example
    },
    data() {
        return {
            inforCardData: [
                {
                    title: "任务待审核",
                    icon: "ios-browsers",
                    count: 0,
                    color: "#2d8cf0"
                },
                {
                    title: "师傅提现待审核",
                    icon: "ios-create",
                    count: 0,
                    color: "#19be6b"
                },
                {
                    title: "徒弟提现待审核",
                    icon: "ios-create",
                    count: 0,
                    color: "#ff9900"
                },
                // {
                //     title: "师傅申请待审核",
                //     icon: "ios-contact",
                //     count: 657,
                //     color: "#ed3f14"
                // },
                {
                    title: "徒弟申请待审核",
                    icon: "ios-contact-outline",
                    count: 0,
                    color: "#E46CBB"
                }
            ],
            moneyData:[
                {
                    title: "平台充值总额",
                    icon: "logo-yen",
                    count: 0,
                    color: "#ed3f14"
                },{
                    title: "已返佣金",
                    icon: "logo-yen",
                    count: 0,
                    color: "#ed3f14"
                },{
                    title: "用户账户总额",
                    icon: "logo-yen",
                    count: 0,
                    color: "#ed3f14"
                },{
                    title: "整站任务数",
                    icon: "logo-yen",
                    count: 0,
                    color: "#ed3f14"
                },{
                    title: "完成任务人/次",
                    icon: "logo-yen",
                    count: 0,
                    color: "#ed3f14"
                },{
                    title: "昨日完成任务数",
                    icon: "logo-yen",
                    count: 0,
                    color: "#ed3f14"
                },{
                    title: "7日完成任务数",
                    icon: "logo-yen",
                    count: 0,
                    color: "#ed3f14"
                },{
                    title: "30日完成任务数",
                    icon: "logo-yen",
                    count: 0,
                    color: "#ed3f14"
                },
            ],
            hasData:false,
            pieData: [
                { value: 1, name: "客户" },
                { value: 1, name: "师傅" },
                { value: 1, name: "徒弟" }
            ],
            barData: {
                Mon: 13253,
                Tue: 34235,
                Wed: 26321,
                Thu: 12340,
                Fri: 24643,
                Sat: 1322,
                Sun: 1324
            }
        };
    },
    mounted() {
        //
        this.getData()
    },
    methods: {
        returnIndex(index){
            if(index === 0){
                this.$router.push({name:'taskPList'})
            }else if(index === 1){
                this.$router.push({name:'masterWithdraw'})
            }else if(index === 2){
                this.$router.push({name:'apprenticeWithdraw'})
            }else if(index === 3){
                this.$router.push({name:'apprenticeList'})
            }
        },
        getData() {
            axios.request({
                url:'index',
                method:'get'
            }).then(res=>{
                this.inforCardData[0].count = res.data.taskCount //任务待审核
                this.inforCardData[1].count = res.data.masterWithdrawCount //师傅提现待审核
                this.inforCardData[2].count = res.data.apprenticeWithdrawCount //徒弟提现待审核
                this.inforCardData[3].count = res.data.apprenticeCount //徒弟申请待审核

                this.moneyData[0].count = res.data.rechargeMoney //平台充值总额
                this.moneyData[1].count = res.data.rechargeMoney //已返佣金
                this.moneyData[2].count = res.data.rechargeMoney //平台充值总额
                this.moneyData[3].count = res.data.tasks //整站任务数
                this.moneyData[4].count = res.data.completeCount //完成任务人/次
                this.moneyData[5].count = res.data.completeYesterDayCount //完成任务人/次
                this.moneyData[6].count = res.data.completeLastWeekCount //完成任务人/次
                this.moneyData[7].count = res.data.completeLastMonthCount //完成任务人/次

                this.$set(this.pieData[0],'value',res.data.merchantsCount)
                this.$set(this.pieData[1],'value',res.data.maters)
                this.$set(this.pieData[2],'value',res.data.apprentices)
                this.hasData = true
                
            })
        }
    }
};
</script>

<style lang="less">
.count-style {
    font-size: 50px;
}
.count-p{
    font-size: 20px;
}
.countTitle{
    border-bottom: 1px solid #aaa;
    margin-top: 15px;
    margin-bottom: 15px;
    line-height: 35px;
    font-size: 20px;
}
</style>
