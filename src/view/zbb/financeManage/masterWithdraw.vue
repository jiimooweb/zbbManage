<template>
    <div>
        <i-form ref="search" class="search" :model="searchData" :label-width="80">
            <row>
                <i-col span='4'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type1">
                                <Select v-model="searchData.type1">
                                    <Option value="username">用户名称</Option>
                                    <Option value="master_id">用户ID</Option>
                                    <Option value="id">提现ID</Option>
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
                <i-col span='4'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type2">
                                <Select v-model="searchData.type2">
                                    <Option value="bank_name">银行名称</Option>
                                    <Option value="bank_id">银行ID</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type2Text">
                                <Input type="text" v-model="searchData.type2Text" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='4'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type3">
                                <Select v-model="searchData.type3">
                                    <Option value="bank_man">持卡人姓名</Option>
                                    <Option value="bank_number">卡号</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type3Text">
                                <Input type="text" v-model="searchData.type3Text" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='4'>
                    <row>
                        <i-col span='8' style="line-height:33px;text-align:center;">
                            审核状态:
                        </i-col>
                        <i-col span='12'>
                            <FormItem prop="status" lable='状态'>
                                <Select v-model="searchData.status">
                                    <Option :value="-2">全部</Option>
                                    <Option :value="0">待审核</Option>
                                    <Option :value="1">处理中</Option>
                                    <Option :value="2">已打款</Option>
                                    <Option :value="-1">拒绝</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='4'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type4">
                                <Select v-model="searchData.type4">
                                    <Option value="reviewer_user">审核人姓名</Option>
                                    <Option value="reviewer_id">审核人ID</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type4Text">
                                <Input type="text" v-model="searchData.type4Text" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='8'>
                            <FormItem prop="type5">
                                <Select v-model="searchData.type5">
                                    <Option value="created_at">申请时间</Option>
                                    <Option value="status_time">状态时间</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='16'>
                            <FormItem prop="type5Text">
                                <DatePicker :value="searchData.type5Text" @on-change='changeDate' type="daterange"
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
        <Table stripe :columns="column" border :data="list" @on-select='selectItem' @on-select-all='selectItem'></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="editModal" title='审核' @on-ok="inputItem()" @on-cancel="cancelEdit(false)">
            <p v-if="status===1" style="text-align:center;font-size:16px;">是否对<span style="color:red;">{{currentName}}</span>的提现申请安排<span style="color:green">打款</span></p>
            <p v-if="status===2" style="text-align:center;font-size:16px;">是否确认已对<span style="color:red;">{{currentName}}</span>进行打款</p>
            <p v-if="status===-1" style="text-align:center;font-size:16px;">是否拒绝<span style="color:red;">{{currentName}}</span>的提现申请</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            editModal:false,
            status:0,
            searchData:{
                type1:'username',//用户名称  用户ID  提现ID
                type1Text:'',
                type2:'bank_name',//银行名称  银行ID
                type2Text:'',
                type3:'bank_name',//持卡人姓名  真实姓名
                type3Text:'',
                type4:'reviewer_user',//审核人名称  审核人ID
                type4Text:'',
                type5:'created_at',//申请时间  状态时间
                type5Text:['',''],
                status:-2,
            },
            
            column: [
                {
                    title: "提现ID",
                    align: "center",
                    width: "100",
                    key: "id"
                },
                {
                    title: "提现类型",
                    align: "center",
                    width: "100",
                    // key:"type"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.type === 0 ? "银行卡" : "支付宝"
                        );
                    }
                },
                {
                    title: "申请时间",
                    align: "center",
                    width: "200",
                    key: "created_at"
                },
                {
                    title: "用户ID",
                    align: "center",
                    width: "100",
                    key: "master_id"
                },
                {
                    title: "用户名称",
                    align: "center",
                    width: "100",
                    // key:"master_id"
                    render: (h, params) => {
                        return h("p", params.row.master.username);
                    }
                },
                {
                    title: "支付宝账号",
                    align: "center",
                    width: "200",
                    key: "alipay"
                },
                {
                    title: "绑定银行ID",
                    align: "center",
                    width: "100",
                    // key:"bank_id"
                    render: (h, params) => {
                        return h("p",  params.row.bank===null?'':params.row.bank.id);
                    }
                },
                {
                    title: "绑定银行名称",
                    align: "center",
                    width: "200",
                    // key:"name"
                    render: (h, params) => {
                        return h("p", params.row.bank===null?'':params.row.bank.name);
                    }
                },
                {
                    title: "持卡人姓名",
                    align: "center",
                    width: "100",
                    key: "bank_man"
                },
                {
                    title: "卡号",
                    align: "center",
                    width: "250",
                    key: "bank_number"
                },
                {
                    title: "提现金额",
                    align: "center",
                    width: "100",
                    key: "withdrawal_amount"
                },
                {
                    title: "到账金额",
                    align: "center",
                    width: "100",
                    key: "arrival_amount"
                },
                {
                    title: "手续费",
                    align: "center",
                    width: "100",
                    key: "poundage"
                },
                {
                    title: "审核状态",
                    align: "center",
                    width: "100",
                    // key: "status"
                    render:(h,params)=> {
                        return h('p',params.row.status===0?'待审核':(params.row.status===1?'处理中':params.row.status===2?'已打款':'拒绝'))
                    },
                },
                {
                    title: "状态时间",
                    align: "center",
                    width: "200",
                    key: "status_time"
                },
                {
                    title: "审核人ID",
                    align: "center",
                    width: "100",
                    // key: "admin.id"
                    render:(h,params)=> {
                        return h('p',params.row.admin===null?'':params.row.admin.id)
                    },
                },
                {
                    title: "审核用户名",
                    align: "center",
                    width: "100",
                    render:(h,params)=> {
                        return h('p',params.row.admin===null?'':params.row.admin.username)
                    },
                },
                // {
                //     title: "备注",
                //     align: "center",
                //     width: "250",
                //     key: "remark"
                // },
                {
                    title: "操作",
                    align: "center",
                    width: "250",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small",
                                        disabled: params.row.status !== 1
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName = params.row.master.username;
                                            this.status = 2
                                            this.cancelEdit(true)
                                        }
                                    }
                                },
                                "已打款"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small",
                                        disabled: params.row.status !== 0
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName = params.row.master.username;
                                            this.status = 1
                                            this.cancelEdit(true)
                                        }
                                    }
                                },
                                "处理中"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small",
                                        disabled: params.row.status !== 0
                                    },
                                    attrs: {
                                        style: "font-size:12px"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName = params.row.master.username;
                                            this.status = -1
                                            this.cancelEdit(true)
                                        }
                                    }
                                },
                                "拒绝"
                            )
                        ]);
                    }
                }
            ],
            list: [],
            currentName:'',
            currentId: "",
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [2, 20, 50, 100, 200]
        };
    },
    methods: {
        selectItem() {},
        cancelEdit(i){
            this.editModal = i
        },
        changeDate(date){
            this.searchData.type5Text = date
        },
        inputItem(i){
            axios.request({
                url:'finance/masters/withdraw/'+this.currentId,
                method:'put',
                data:{
                    status:this.status
                }
            })
        },
        getList() {
            axios
                .request({
                    url: "finance/masters/withdraw?pagesize="+this.per_page+"&page="+this.currentPage+
                    "&username="+(this.searchData.type1==='username'?this.searchData.type1Text:'') +
                    "&master_id="+(this.searchData.type1==='master_id'?this.searchData.type1Text:'') +
                    "&id="+(this.searchData.type1==='id'?this.searchData.type1Text:'') +
                    "&bank_name="+(this.searchData.type2==='bank_name'?this.searchData.type2Text:'') +
                    "&bank_id="+(this.searchData.type2==='bank_id'?this.searchData.type2Text:'') +
                    "&bank_man="+(this.searchData.type3==='bank_man'?this.searchData.type3Text:'') +
                    "&bank_number="+(this.searchData.type3==='bank_number'?this.searchData.type3Text:'') +
                    "&reviewer_user="+(this.searchData.type4==='reviewer_user'?this.searchData.type4Text:'') +
                    "&reviewer_id="+(this.searchData.type4==='reviewer_id'?this.searchData.type4Text:'') +
                    "&created_at="+(this.searchData.type5==='created_at'?(this.searchData.type5Text[0]===''?'':JSON.stringify(this.searchData.type5Text)):'') +
                    "&status_time="+(this.searchData.type5==='status_time'?(this.searchData.type5Text[0]===''?'':JSON.stringify(this.searchData.type5Text)):'') +
                    "&status="+(this.searchData.status===-2?'':this.searchData.status),
                    method: "get"
                })
                .then(res => {
                    console.log(res);
                    this.list = res.data.data.data;
                });
        },
        getchangeList(index) {
            this.currentPage = index
            this.getList()
        },
        changePageGetList(size) {
            this.per_page = size
            this.currentPage = 1
            this.getList()
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang='less'>
.search {
    .ivu-form-item-content {
        margin-left: 0 !important;
    }
    .ivu-select-dropdown {
        // width: 100px;
    }
}
</style>