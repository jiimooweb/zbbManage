<template>
    <div class="APPRENTICEWITHDRAW">
        <i-form ref="search" class="search" :model="searchData">
            <row :gutter='16'>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type1">
                                <Select v-model="searchData.type1">
                                    <Option value="username">用户名称</Option>
                                    <Option value="apprentice_id">用户ID</Option>
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
                <i-col span='5'>
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
                <i-col span='5'>
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
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            审核状态:
                        </i-col>
                        <i-col span='18'>
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
                <i-col span='5'>
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
                        <i-col span='10'>
                            <FormItem prop="type5">
                                <Select v-model="searchData.type5">
                                    <Option value="created_at">申请时间</Option>
                                    <Option value="status_time">状态时间</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
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
        <row :style='"width:100%;margin-bottom:10px;display:" + (this.hasPower(this.$store.state.user.access,"apprenticeWithdraw-review")? "inline-block;": "none;")'>
            <i-col span='10'>
                <Button type='success' @click="cancelAll(true,2)" style="display:block;float:left;margin-left:10px;">批量确认打款</Button>
                <Button type='warning' @click="cancelAll(true,1)" style="display:block;float:left;margin-left:10px;">批量安排打款</Button>
                <Button type='error' @click="cancelAll(true,-1)" style="display:block;float:left;margin-left:10px;">批量拒绝</Button>
            </i-col>
            <i-col span='2' offset='12'>
                <Button type="error" @click="returnExcel()">导出</Button>
            </i-col>
        </row>
        <Table :max-height='this.$store.state.app.winHeight' stripe :columns="column" border :data="list" @on-select='selectItem' @on-select-all='selectItem' @on-selection-change='selectItem'></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="editModal" title='审核' @on-ok="inputItem()" @on-cancel="cancelEdit(false)">
            <p v-if="status===1" style="text-align:center;font-size:16px;">是否对<span style="color:red;">{{currentName}}</span>的提现申请安排<span
                    style="color:green">打款</span></p>
            <p v-if="status===2" style="text-align:center;font-size:16px;">是否确认已对<span style="color:red;">{{currentName}}</span>进行打款</p>
            <p v-if="status===-1" style="text-align:center;font-size:16px;">是否拒绝<span style="color:red;">{{currentName}}</span>的提现申请</p>
        </Modal>
        <Modal v-model="allModal" title='审核' @on-ok="allInput()" @on-cancel="cancelAll(false)">
            <p v-if="status===1" style="text-align:center;font-size:16px;">是否批量进行提现申请安排<span style="color:green">打款</span></p>
            <p v-if="status===2" style="text-align:center;font-size:16px;">是否批量确认打款</p>
            <p v-if="status===-1" style="text-align:center;font-size:16px;">是否批量拒绝提现申请</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { returnHasPower, isShowColumn } from "@/libs/util";
export default {
    data() {
        return {
            editModal: false,
            allModal: false,
            status: 0,
            searchData: {
                type1: "username", //用户名称  用户ID  提现ID
                type1Text: "",
                type2: "bank_name", //银行名称  银行ID
                type2Text: "",
                type3: "bank_man", //持卡人姓名  真实姓名
                type3Text: "",
                type4: "reviewer_user", //审核人名称  审核人ID
                type4Text: "",
                type5: "created_at", //申请时间  状态时间
                type5Text: ["", ""],
                status: -2
            },

            column: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
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
                            "p",{
                                attrs:{
                                    style:'color:'+(params.row.type === 0 ? "#439057" : "#00a3ee")
                                }
                            },
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
                    key: "apprentice_id"
                },
                {
                    title: "用户名称",
                    align: "center",
                    width: "100",
                    // key:"apprentice_id"
                    render: (h, params) => {
                        return h("p", params.row.apprentice.username);
                    }
                },
                {
                    title: "支付宝账号",
                    align: "center",
                    width: "200",
                    render(h,params) {
                        return h('p',{
                            attrs:{
                                    style:'color:'+(params.row.type === 0 ? "#439057" : "#00a3ee")
                                }
                        },params.row.type!==0?params.row.alipay:'')
                    },
                },
                {
                    title: "绑定银行ID",
                    align: "center",
                    width: "100",
                    // key:"bank_id"
                    render: (h, params) => {
                        return h(
                            "p",{
                            attrs:{
                                    style:'color:'+(params.row.type === 0 ? "#439057" : "#00a3ee")
                                }
                        },
                            params.row.bank === null||params.row.type!==0 ? "" : params.row.bank.id
                        );
                    }
                },
                {
                    title: "绑定银行名称",
                    align: "center",
                    width: "200",
                    // key:"name"
                    render: (h, params) => {
                        return h(
                            "p",{
                            attrs:{
                                    style:'color:'+(params.row.type === 0 ? "#439057" : "#00a3ee")
                                }
                        },
                            params.row.bank === null||params.row.type!==0 ? "" : params.row.bank.name
                        );
                    }
                },
                {
                    title: "持卡人姓名",
                    align: "center",
                    width: "100",
                    // key: "bank_man"
                    render: (h, params) => {
                        return h(
                            "p",{
                            attrs:{
                                    style:'color:'+(params.row.type === 0 ? "#439057" : "#00a3ee")
                                }
                        },
                            params.row.bank === null||params.row.type!==0 ? "" : params.row.bank_man
                        );
                    }
                },
                {
                    title: "卡号",
                    align: "center",
                    width: "250",
                    // key: "bank_number"
                    render: (h, params) => {
                        return h(
                            "p",{
                            attrs:{
                                    style:'color:'+(params.row.type === 0 ? "#439057" : "#00a3ee")
                                }
                        },
                            params.row.bank === null||params.row.type!==0 ? "" : params.row.bank_number
                        );
                    }
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
                    fixed: "left",
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "color:#" +
                                        (params.row.status === 0
                                            ? "ff9900"
                                            : params.row.status === 1
                                            ? "2d8cf0"
                                            : params.row.status === 2
                                            ? "19be6b"
                                            : "ed4014")
                                }
                            },
                            params.row.status === 0
                                ? "待审核"
                                : params.row.status === 1
                                ? "处理中"
                                : params.row.status === 2
                                ? "已打款"
                                : "拒绝"
                        );
                    }
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
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.admin === null ? "" : params.row.admin.id
                        );
                    }
                },
                {
                    title: "审核用户名",
                    align: "center",
                    width: "100",
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.admin === null
                                ? ""
                                : params.row.admin.username
                        );
                    }
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
                                        disabled: params.row.status === 2 || params.row.status === -1
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "apprenticeWithdraw-review"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName =
                                                params.row.apprentice.username;
                                            this.status = 2;
                                            this.cancelEdit(true);
                                        }
                                    }
                                },
                                "确认打款"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small",
                                        disabled: params.row.status === 2 || params.row.status === -1 || params.row.status === 1
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "apprenticeWithdraw-review"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName =
                                                params.row.apprentice.username;
                                            this.status = 1;
                                            this.cancelEdit(true);
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
                                        disabled: params.row.status === 2 || params.row.status === -1
                                    },
                                    attrs: {
                                        style: "font-size:12px"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName =
                                                params.row.apprentice.username;
                                            this.status = -1;
                                            this.cancelEdit(true);
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
            ids: [],
            currentName: "",
            currentId: "",
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50, 200, 500],
        };
    },
    computed: {
        getAccess() {
            return this.$store.state.user.access;
        }
    },
    watch: {
        getAccess: function(a, b) {
            isShowColumn(a, ["apprenticeWithdraw-review"], this.column);
        }
    },
    methods: {
        returnExcel(){
            let token = ''
            axios.request({
                url:'https://www.iryi.cn/export-token',
                method:'get'
            }).then(res=>{
                token = res.data
                let url = 'https://www.iryi.cn/backend/finance/apprentices/export?' + ("&username=" +
                        (this.searchData.type1 === "username"
                            ? this.searchData.type1Text
                            : "") +
                        "&apprentice_id=" +
                        (this.searchData.type1 === "apprentice_id"
                            ? this.searchData.type1Text
                            : "") +
                        "&id=" +
                        (this.searchData.type1 === "id"
                            ? this.searchData.type1Text
                            : "") +
                        "&bank_name=" +
                        (this.searchData.type2 === "bank_name"
                            ? this.searchData.type2Text
                            : "") +
                        "&bank_id=" +
                        (this.searchData.type2 === "bank_id"
                            ? this.searchData.type2Text
                            : "") +
                        "&bank_man=" +
                        (this.searchData.type3 === "bank_man"
                            ? this.searchData.type3Text
                            : "") +
                        "&bank_number=" +
                        (this.searchData.type3 === "bank_number"
                            ? this.searchData.type3Text
                            : "") +
                        "&reviewer_user=" +
                        (this.searchData.type4 === "reviewer_user"
                            ? this.searchData.type4Text
                            : "") +
                        "&reviewer_id=" +
                        (this.searchData.type4 === "reviewer_id"
                            ? this.searchData.type4Text
                            : "") +
                        "&created_at=" +
                        (this.searchData.type5 === "created_at"
                            ? this.searchData.type5Text[0] === ""
                                ? ""
                                : JSON.stringify(this.searchData.type5Text)
                            : "") +
                        "&status_time=" +
                        (this.searchData.type5 === "status_time"
                            ? this.searchData.type5Text[0] === ""
                                ? ""
                                : JSON.stringify(this.searchData.type5Text)
                            : "") +
                        "&status=" +
                        (this.searchData.status === -2
                            ? ""
                            : this.searchData.status)) + 
                            "&token="+token
            window.open(url);
            })
            
        },
        selectItem(selection, row) {
            this.selectList = selection;
            this.ids = [];
            for (let i = 0; i < selection.length; i++) {
                this.ids.push(selection[i].id);
            }
        },
        cancelEdit(i) {
            this.editModal = i;
        },
        cancelAll(i, status) {
            this.allModal = i;
            this.status = status;
        },
        changeDate(date) {
            this.searchData.type5Text = date;
        },
        inputItem() {
            axios
                .request({
                    url: "finance/apprentices/withdraw/" + this.currentId,
                    method: "put",
                    data: {
                        status: this.status
                    }
                })
                .then(res => {
                    this.$Message.success("操作成功");
                    this.getList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(
                            err.response.data.msg[i][0]
                        );
                    }
                });
        },
        allInput() {
            axios
                .request({
                    url: "finance/apprentices/review",
                    method: "post",
                    data: {
                        ids: this.ids,
                        status: this.status
                    }
                })
                .then(res => {
                    this.$Message.success("批量操作成功");
                    this.getList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(
                            err.response.data.msg[i][0]
                        );
                    }
                });
        },
        getList() {
            axios
                .request({
                    url:
                        "finance/apprentices/withdraw?pagesize=" +
                        this.per_page +
                        "&page=" +
                        this.currentPage +
                        "&username=" +
                        (this.searchData.type1 === "username"
                            ? this.searchData.type1Text
                            : "") +
                        "&apprentice_id=" +
                        (this.searchData.type1 === "apprentice_id"
                            ? this.searchData.type1Text
                            : "") +
                        "&id=" +
                        (this.searchData.type1 === "id"
                            ? this.searchData.type1Text
                            : "") +
                        "&bank_name=" +
                        (this.searchData.type2 === "bank_name"
                            ? this.searchData.type2Text
                            : "") +
                        "&bank_id=" +
                        (this.searchData.type2 === "bank_id"
                            ? this.searchData.type2Text
                            : "") +
                        "&bank_man=" +
                        (this.searchData.type3 === "bank_man"
                            ? this.searchData.type3Text
                            : "") +
                        "&bank_number=" +
                        (this.searchData.type3 === "bank_number"
                            ? this.searchData.type3Text
                            : "") +
                        "&reviewer_user=" +
                        (this.searchData.type4 === "reviewer_user"
                            ? this.searchData.type4Text
                            : "") +
                        "&reviewer_id=" +
                        (this.searchData.type4 === "reviewer_id"
                            ? this.searchData.type4Text
                            : "") +
                        "&created_at=" +
                        (this.searchData.type5 === "created_at"
                            ? this.searchData.type5Text[0] === ""
                                ? ""
                                : JSON.stringify(this.searchData.type5Text)
                            : "") +
                        "&status_time=" +
                        (this.searchData.type5 === "status_time"
                            ? this.searchData.type5Text[0] === ""
                                ? ""
                                : JSON.stringify(this.searchData.type5Text)
                            : "") +
                        "&status=" +
                        (this.searchData.status === -2
                            ? ""
                            : this.searchData.status),
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data.data;
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.current_page;
                    this.per_page = res.data.data.per_page;
                }).catch(err=>{
                    for (let i in err.response.data.msg) {
                        this.$Message.error(
                            err.response.data.msg[i][0]
                        );
                    }
                })
        },
        getchangeList(index) {
            this.currentPage = index;
            this.getList();
        },
        changePageGetList(size) {
            this.per_page = size;
            this.currentPage = 1;
            this.getList();
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang='less'>
.APPRENTICEWITHDRAW{
    min-width: 1100px;
    .search {
        .ivu-form-item-content {
            line-height: 1 !important;
            margin-left: 0 !important;
        }
        .ivu-form-item-label{
            text-align: center;
        }
    }
}
</style>