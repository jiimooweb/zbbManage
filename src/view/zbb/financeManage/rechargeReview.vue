<template>
    <div class="RECHARGEREVIEW">
        <i-form ref="search" class="search" :model="searchData" >
            <row :gutter='16'>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            支付渠道:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="type" lable='支付渠道'>
                                <Select v-model="searchData.type">
                                    <Option :value="-2">所有渠道</Option>
                                    <Option :value="0">支付宝</Option>
                                    <Option :value="1">微信</Option>
                                    <Option :value="2">银行</Option>
                                    <Option :value="-1">线下渠道</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            状态:
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
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            充值编号:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="recharge_no">
                                <Input type="text" v-model="searchData.recharge_no" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type5">
                                <Select v-model="searchData.type5">
                                    <Option value="time">申请时间</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="time">
                                <DatePicker :value="searchData.time" @on-change='changeDate' type="daterange"
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
                通过总金额:<span style="color:red;">{{count}}</span>元
            </div>
        </Card>
        <row style="margin-bottom:10px;">
            <i-col span='10'>
                <Button type='success' @click="cancelAll(true,2)" style="display:block;float:left;">批量确认已充值</Button>
                <Button type='warning' @click="cancelAll(true,1)" style="display:block;float:left;margin-left:10px;">批量安排审核充值</Button>
                <Button type='error' @click="cancelAll(true,-1)" style="display:block;float:left;margin-left:10px;">批量拒绝充值</Button>
            </i-col>
            <i-col span='2' offset='12'>
                <Button type="error" @click="returnExcel()">导出</Button>
            </i-col>
        </row>
        <Table stripe :columns="column" border :data="list" @on-select='selectItem' @on-select-all='selectItem' @on-selection-change='selectItem'></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="editModal" title='审核' @on-ok="inputItem()" @on-cancel="cancelEdit(false)">
            <p v-if="status===1" style="text-align:center;font-size:16px;">是否对ID为<span style="color:red;">{{currentName}}</span>的进行安排<span
                    style="color:green">充值审核</span>?</p>
            <p v-if="status===2" style="text-align:center;font-size:16px;">是否确认ID为<span style="color:red;">{{currentName}}</span>已进行充值?</p>
            <p v-if="status===-1" style="text-align:center;font-size:16px;">是否拒绝ID为<span style="color:red;">{{currentName}}</span>的充值申请?</p>
        </Modal>
        <Modal v-model="allModal" title='审核' @on-ok="inputItem()" @on-cancel="cancelAll(false)">
            <p v-if="status===1" style="text-align:center;font-size:16px;">是否批量进行充值审核?</p>
            <p v-if="status===2" style="text-align:center;font-size:16px;">是否批量确认已充值?</p>
            <p v-if="status===-1" style="text-align:center;font-size:16px;">是否批量拒绝充值申请?</p>
        </Modal>
        <Modal v-model="showPicModal" title="大图" class="RECHARGEREVIEWModal" footer-hide>
            <img :src="bigPic" style="width:100%;height:auto;">
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            showPicModal:false,
            bigPic:'',
            editModal: false,
            allModal: false,
            status: 0,
            count: 0.0,
            searchData: {
                recharge_no: "",
                status: -2,
                type: -2,
                time: ["", ""],
                type5: "time"
            },
            column: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "充值ID",
                    align: "center",
                    width: "100px",
                    key: "id"
                },
                {
                    title: "客户ID",
                    align: "center",
                    width: "100px",
                    key: "merchant_id"
                },
                {
                    title: "客户账户",
                    align: "center",
                    width: "100px",
                    render:(h,params)=> {
                        return h('p',!params.row.merchant?'':params.row.merchant.username)
                    },
                },
                {
                    title: "客户名字",
                    align: "center",
                    width: "100px",
                    render:(h,params)=> {
                        return h('p',!params.row.merchant?'':params.row.merchant.name)
                    },
                },
                {
                    title: "充值编号",
                    align: "center",
                    width: "250px",
                    key: "recharge_no"
                },
                {
                    title: "支付渠道",
                    align: "center",
                    width: "100px",
                    // key:'type'
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.type === "Alipay"
                                ? "支付宝"
                                : params.row.type === "Wechat"
                                ? "微信支付"
                                : params.row.type === "Bank"
                                ? "银行转账"
                                : "线下支付"
                        );
                    }
                },
                {
                    title: "申请时间",
                    align: "center",
                    width: "150px",
                    key: "time"
                },
                {
                    title: "充值金额",
                    align: "center",
                    width: "100px",
                    key: "price"
                },
                {
                    title: "付款人/卡号/微信号",
                    align: "center",
                    width: "250px",
                    key: "person"
                },
                {
                    title: "付款卡号/支付宝订单号/微信单号（转账订单号）",
                    align: "center",
                    width: "270px",
                    key: "order_no"
                },
                {
                    title: "审核状态",
                    align: "center",
                    width: "100px",
                    fixed: "left",
                    // key:'status'
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "color:#" +
                                        (params.row.status === -1
                                            ? "ed4014"
                                            : params.row.status === 0
                                            ? "2d8cf0"
                                            : params.row.status === 1
                                            ? "ff9900"
                                            : "19be6b")
                                }
                            },
                            params.row.status === -1
                                ? "未通过"
                                : params.row.status === 0
                                ? "待审核"
                                : params.row.status === 1
                                ? "处理中"
                                : "审核通过"
                        );
                    }
                },
                {
                    title: "转账截图",
                    align: "center",
                    width: "150px",
                    render: (h, params) => {
                        return h("img", {
                            attrs: {
                                style: "width:100px;height:100px",
                                src: params.row.image
                            },
                            on: {
                                click: () => {
                                    this.showPicModal = true
                                    this.bigPic = params.row.image
                                }
                            }
                        });
                    }
                },
                {
                    title: "操作",
                    align: "center",
                    width: "200",
                    fixed: "right",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small",
                                        disabled: !(params.row.status === 1 || params.row.status === 0)
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName =
                                                params.row.merchant_id;
                                            this.status = 2;
                                            this.isOne = true;
                                            this.cancelEdit(true);
                                        }
                                    }
                                },
                                "通过"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small",
                                        disabled: !(params.row.status === 0)
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName =
                                                params.row.merchant_id;
                                            this.status = 1;
                                            this.isOne = true;
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
                                        disabled: !(params.row.status === 1 || params.row.status === 0)
                                    },
                                    attrs: {
                                        style: "font-size:12px"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName =
                                                params.row.merchant_id;
                                            this.status = -1;
                                            this.isOne = true;
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
            isOne: false,
            currentName: "",
            currentId: "",
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50, 200, 500],
        };
    },
    methods: {
        changeDate(date) {
            this.searchData.time = date;
        },
        getList() {
            axios
                .request({
                    url:
                        "finance/recharges?pagesize=" +
                        this.per_page +
                        "&page=" +
                        this.currentPage +
                        "&type=" +
                        (this.searchData.type === -2
                            ? ""
                            : this.searchData.type) +
                        "&status=" +
                        (this.searchData.status === -2
                            ? ""
                            : this.searchData.status) +
                        "&recharge_no=" +
                        this.searchData.recharge_no +
                        "&time=" +
                        (this.searchData.time[0] === ""
                            ? ""
                            : this.searchData.time[0] +
                              "," +
                              this.searchData.time[1]),
                    method: "get"
                })
                .then(res => {
                    this.count = res.data.count;
                    this.list = res.data.data.data;
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.current_page;
                    this.per_page = res.data.data.per_page;
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        getchangeList(index) {
            this.page = index;
            this.getList()
        },
        changePageGetList(size) {
            this.per_page = size;
            this.currentPage = 1
            this.getList()
        },
        selectItem(selection, row) {
            console.log(selection);
            
            this.selectList = selection;
            this.ids = [];
            for (let i = 0; i < selection.length; i++) {
                this.ids.push(selection[i].id);
            }
        },
        inputItem() {
            axios
                .request({
                    url:
                        "finance/recharges/" +
                        (this.status === 1
                            ? "process"
                            : this.status === 2
                            ? "adopt"
                            : "refuse"),
                    method: "post",
                    data: {
                        // status: this.status,
                        ids: this.isOne ? [this.currentId] : this.ids
                    }
                })
                .then(res => {
                    this.$Message.success("操作成功");
                    this.getList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        cancelEdit(i) {
            this.editModal = i;
        },
        cancelAll(i, status) {
            this.allModal = i;
            this.status = status;
            this.isOne = false;
        },
        returnExcel() {
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
            
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang='less'>
.RECHARGEREVIEW{
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