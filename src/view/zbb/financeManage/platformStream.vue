<template>
    <div class="PLATFORMSTREAM">
        <i-form ref="search" class="search" :model="searchData" >
            <row :gutter='16'>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            业务类型:
                        </i-col>
                        <i-col span='18'>
                            <FormItem>
                                <Select v-model="searchData.type">
                                    <Option :value="0">全部</Option>
                                    <Option :value="1">任务奖励</Option>
                                    <Option :value="2">下级提成</Option>
                                    <Option :value="3">推荐提成</Option>
                                    <Option :value="4">管理员后台充值</Option>
                                    <Option :value="5">提现失败回款</Option>
                                    <Option :value="6">本人提现</Option>
                                    <Option :value="7">管理员后台减额</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            账户类型:
                        </i-col>
                        <i-col span='18'>
                            <FormItem>
                                <Select v-model="searchData.man_type">
                                    <Option :value="2">全部</Option>
                                    <!-- <Option value="Admin">管理员</Option> -->
                                    <Option value="Master">师傅</Option>
                                    <Option value="Apprentice">徒弟</Option>
                                    <Option value="Merchant">客户</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            账户ID:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="man_id">
                                <Input type="text" v-model="searchData.man_id" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type2">
                                <Select v-model="searchData.type2">
                                    <Option value="time">业务时间</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="created_at">
                                <DatePicker :value="searchData.created_at" @on-change='changeDate' type="daterange"
                                    placeholder="选择日期"></DatePicker>
                                <!-- <DatePicker type='daterange' @on-change='changeActiveDate' :value='activeData.activeDate' placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker> -->
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='2'>
                    <Button type="success" @click="getList()">搜索</Button>
                </i-col>
            </row>
        </i-form>
        <Card style="width:320px;margin-bottom:10px">
            <div style="text-align:center">
                流水总金额:<span style="color:red;">{{count}}</span>元
            </div>
        </Card>
        <row style="margin-bottom:10px;">
            <i-col span='2' offset='22'>
                <Button type="error" @click="returnExcel()">导出</Button>
            </i-col>
        </row>
        <Table stripe :columns="column" border :data="list" @on-select='selectItem' @on-select-all='selectItem' @on-selection-change='selectItem'></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            count:0,
            searchData:{
                type2:'time',
                man_type:2,
                type:0,
                man_id:'',
                created_at:['','']
            },
            column: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "流水ID",
                    key: "id"
                },
                {
                    title: "用户类型",
                    // key: "man_type"
                    render:(h,params)=> {
                        return h('p',params.row.man_type==='Master'?'师傅':(params.row.man_type==='Apprentice'?'徒弟':'客户'))
                    },
                },
                {
                    title: "用户账户",
                    // key: "username"
                    render:(h,params)=> {
                        return h('p',params.row.man.username)
                    },
                },
                {
                    title: "用户ID",
                    render:(h,params)=> {
                        return h('p',params.row.man.id)
                    },
                },
                {
                    title: "收支金额",
                    key: "change_fund"
                },
                {
                    title: "业务类型",
                    render:(h,params)=> {
                        if(params.row.type === '1'){
                            return h('p','任务奖励')
                        }else if(params.row.type === '2'){
                            return h('p','下级提成')
                        }else if(params.row.type === '3'){
                            return h('p','推荐提成')
                        }else if(params.row.type === '4'){
                            return h('p','管理员后台充值')
                        }else if(params.row.type === '5'){
                            return h('p','提现失败回款')
                        }else if(params.row.type === '6'){
                            return h('p','本人提现')
                        }else if(params.row.type === '7'){
                            return h('p','管理员后台减额')
                        }
                    },  
                },
                {
                    title: "描述",
                    key: "remark"
                },
                {
                    title: "业务时间",
                    key: "created_at"
                }
            ],
            list: [],
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50],
            selectList: [],
            ids:[]
        };
    },
    methods: {
        returnExcel(){
            let token = ''
            axios.request({
                url:'https://www.iryi.cn/export-token',
                method:'get'
            }).then(res=>{
                token = res.data
                let url =
                "https://www.iryi.cn/backend/finance/recharges/export?" +
                "type=" +
                (this.searchData.type === -2 ? "" : this.searchData.type) +
                "&status=" +
                (this.searchData.status === -2 ? "" : this.searchData.status) +
                "&recharge_no=" +
                this.searchData.recharge_no +
                "&time=" +
                (this.searchData.time[0] === ""
                    ? ""
                    : this.searchData.time[0] + "," + this.searchData.time[1])+
                    "&token="+token;
            window.open(url);
            })
            // let url =
            //     "https://www.iryi.cn/backend/finance/recharges/export?" +
            //     "type=" +
            //     (this.searchData.type === -2 ? "" : this.searchData.type) +
            //     "&status=" +
            //     (this.searchData.status === -2 ? "" : this.searchData.status) +
            //     "&recharge_no=" +
            //     this.searchData.recharge_no +
            //     "&time=" +
            //     (this.searchData.time[0] === ""
            //         ? ""
            //         : this.searchData.time[0] + "," + this.searchData.time[1]);
            // window.open(url);
        },
        clearDate(){
            this.searchData.type2Text = ''
        },
        changeDate(t) {
            this.searchData.type2Text = t;
        },
        getList() {
            axios
                .request({
                    url: "finance/flowaccount?pagesize="+this.per_page+"&page="+this.currentPage+
                    "&man_type="+(this.searchData.man_type===2?'':this.searchData.man_type)+
                    "&type="+(this.searchData.type===0?'':this.searchData.type)+
                    "&man_id="+this.searchData.man_id+
                    "&created_at="+(this.searchData.created_at[0]===''?'':this.searchData.created_at),
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data.data;
                    this.count = res.data.count;
                    // console.log(res);
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.current_page;
                    this.per_page = res.data.data.per_page;
                }).catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(
                            err.response.data.msg[i][0]
                        );
                    }
                });
        },
        selectItem(selection, row) {
            this.selectList = selection;
            this.ids = [];
            for (let i = 0; i < selection.length; i++) {
                this.ids.push(selection[i]);
            }
        },
        getchangeList(index){
            this.currentPage = index
            this.getList()
        },
        changePageGetList(size){
            this.per_page = size
            this.currentPage = 1
            this.getList()
        },
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang='less'>
.PLATFORMSTREAM{
    min-width: 1100px;
    .search {
        .ivu-form-item-content {
            line-height: 1 !important;
            margin-left: 0 !important;
        }
        .ivu-form-item-label {
            text-align: center;
        }
    }
}
</style>