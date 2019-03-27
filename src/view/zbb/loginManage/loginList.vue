<template>
    <div class="LOGINLIST">
        <i-form ref="search" class="search" :model="searchData">
            <row :gutter='16'>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            账户类型:
                        </i-col>
                        <i-col span='18'>
                            <FormItem>
                                <Select v-model="searchData.user_type">
                                    <Option :value="2">全部</Option>
                                    <Option value="Admin">管理员</Option>
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
                        <i-col span='10'>
                            <FormItem prop="type1">
                                <Select v-model="searchData.type1">
                                    <Option value="username">用户账户</Option>
                                    <Option value="user_id">用户ID</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type1Text">
                                <Input type="text" v-model="searchData.type1Text" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            IP地址:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="type1Text">
                                <Input type="text" v-model="searchData.ip" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type2">
                                <Select v-model="searchData.type2">
                                    <Option value="time">登录时间</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type2Text">
                                <DatePicker :value="searchData.type2Text" @on-change='changeDate' @on-clear='clearDate' type="daterange"
                                    placeholder="选择日期"></DatePicker>
                                <!-- <DatePicker type='daterange' @on-change='changeActiveDate' :value='activeData.activeDate' placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker> -->
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='2'>
                    <Button type="success" @click="searchList()">搜索</Button>
                </i-col>
            </row>
        </i-form>
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
            searchData:{
                type1:'username',
                type1Text:'',
                type2:'time',
                type2Text:'',
                user_type:'',
                ip:'',
                time:''
            },
            column: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "登录记录ID",
                    key: "id"
                },
                {
                    title: "用户账户",
                    key: "username"
                },
                {
                    title: "用户ID",
                    key: "user_id"
                },
                {
                    title: "账户类型",
                    // key: "user_type"
                    render:(h,params)=> {
                        return h('p',params.row.user_type==='Admin'?'管理员':(params.row.user_type==='Apprentice'?'徒弟':(params.row.user_type==='Master'?'师傅':'商户')))
                        // return h('p',user_type)
                    },  
                },
                {
                    title: "登录IP",
                    key: "ip"
                },
                {
                    title: "登录时间",
                    key: "time"
                }
            ],
            list: [],
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50, 200, 500],
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
            })
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
                    url: "login-records",
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data.data;
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
        searchList(){
            axios
                .request({
                    url: "login-records/search?page="+this.currentPage+"&pagesize="+this.per_page,
                    method: "post",
                    data:{
                        username:(this.searchData.type1==='username'?this.searchData.type1Text:''),
                        user_id:(this.searchData.type1==='user_id'?this.searchData.type1Text:''),
                        user_type:this.searchData.user_type===2?'':this.searchData.user_type,
                        ip:this.searchData.ip,
                        time:this.searchData.type2Text[0]===''?'':this.searchData.type2Text
                    }
                })
                .then(res => {
                    this.list = res.data.data.data;
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
        getchangeList(index){
            this.currentPage = index
            axios
                .request({
                    url: "login-records/search?page="+this.currentPage+"&pagesize="+this.per_page,
                    method: "post",
                    data:{
                        username:(this.searchData.type1==='username'?this.searchData.type1Text:''),
                        user_id:(this.searchData.type1==='user_id'?this.searchData.type1Text:''),
                        user_type:this.searchData.user_type===2?'':this.searchData.user_type,
                        ip:this.searchData.ip,
                        time:this.searchData.type2Text[0]===''?'':this.searchData.type2Text
                    }
                })
                .then(res => {
                    this.list = res.data.data.data;
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
        changePageGetList(size){
            console.log(size);
            
            this.currentPage = 1
            axios
                .request({
                    url: "login-records/search?page="+this.currentPage+"&pagesize="+size,
                    method: "post",
                    data:{
                        username:(this.searchData.type1==='username'?this.searchData.type1Text:''),
                        user_id:(this.searchData.type1==='user_id'?this.searchData.type1Text:''),
                        user_type:this.searchData.user_type===2?'':this.searchData.user_type,
                        ip:this.searchData.ip,
                        time:this.searchData.type2Text[0]===''?'':this.searchData.type2Text
                    }
                })
                .then(res => {
                    this.list = res.data.data.data;
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
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang='less'>
.LOGINLIST{
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