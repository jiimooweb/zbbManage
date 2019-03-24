<template>
    <div class="APPRENTICEFUNDS">
        <i-form ref="search" class="search" :model="searchData">
            <row :gutter='16'>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type1">
                                <Select v-model="searchData.type1">
                                    <Option value="apprentice_username">变动人账号</Option>
                                    <Option value="apprentice_id">变动人ID</Option>
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
                        <i-col span='8' style="line-height:33px;text-align:center;">
                            变动类型:
                        </i-col>
                        <i-col span='16'>
                            <FormItem prop="type" lable='任务类型'>
                                <Select v-model="searchData.type">
                                    <Option :value="-1">全部</Option>
                                    <Option value="task">完成任务</Option>
                                    <Option value="withdraws">提现</Option>
                                    <Option value="other">其他</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='8' style="line-height:33px;text-align:center;">
                            变动金额:
                        </i-col>
                        <i-col span='8'>
                            <FormItem prop="symbol_c">
                                <Select v-model="searchData.symbol_c">
                                    <Option value="=">=</Option>
                                    <Option value=">=">≥</Option>
                                    <Option value="<=">≤</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='8'>
                            <FormItem prop="change_fund">
                                <Input type="text" v-model="searchData.change_fund" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='8' style="line-height:33px;text-align:center;">
                            变动后金额:
                        </i-col>
                        <i-col span='8'>
                            <FormItem prop="symbol_r">
                                <Select v-model="searchData.symbol_r">
                                    <Option value="=">=</Option>
                                    <Option value=">=">≥</Option>
                                    <Option value="<=">≤</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='8'>
                            <FormItem prop="change_fund">
                                <Input type="text" v-model="searchData.result_fund" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='8' style="line-height:33px;text-align:center;">
                            变动时间:
                        </i-col>
                        <i-col span='16'>
                            <FormItem prop="start_time">
                                <DatePicker :value="searchData.start_time" @on-change='changeDate' type="daterange"
                                    placeholder="选择日期"></DatePicker>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='2'>
                    <Button type="success" @click="getList()">搜索</Button>
                </i-col>
            </row>
        </i-form>
        <row>
            <i-col span='2' offset='22'>
                <Button type="error" style="float:right;margin-bottom:10px;" @click="returnExcel()">导出</Button>
            </i-col>
        </row>
        <Table stripe :columns="column" border :data="list"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50],
            searchData: {
                type1: "apprentice_username",
                type1Text: "",
                symbol_c: "=",
                change_fund: "",
                symbol_r: "=",
                result_fund: "",
                type: -1,
                created_at: ["", ""]
            },
            column: [
                {
                    title: "变动id",
                    key: "id"
                },
                {
                    title: "变动时间",
                    key: "created_at"
                },
                {
                    title: "变动类型",
                    // key: "type"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.type === "task"
                                ? "完成任务"
                                : params.row.type === "withdraws"
                                ? "提现"
                                : "其他"
                        );
                    }
                },
                {
                    title: "变动信息",
                    key: "remark"
                },
                {
                    title: "变动金额",
                    key: "change_fund"
                },
                {
                    title: "变动后金额",
                    key: "result_fund"
                },
                {
                    title: "变动人ID",
                    render: (h, params) => {
                        return h("p", params.row.apprentice.id);
                    }
                },
                {
                    title: "变动人账号",
                    render: (h, params) => {
                        return h("p", params.row.apprentice.username);
                    }
                }
            ],
            list: []
        };
    },
    methods: {
        changeDate(date){
            this.searchData.start_time = date
        },
        getList() {
            axios
                .request({
                    url:
                        "finance/apprentices/fund/show?pagesize=" +
                        this.per_page +
                        "&page=" +
                        this.currentPage,
                    method: "post",
                    data: {
                        apprentice_username:
                            this.searchData.type1 === "apprentices_username"
                                ? this.searchData.type1Text
                                : "",
                        apprentice_id:
                            this.searchData.type1 === "apprentices_id"
                                ? this.searchData.type1Text
                                : "",
                        type:
                            this.searchData.type === -1
                                ? ""
                                : this.searchData.type,
                        change_fund: this.searchData.change_fund,
                        symbol_c: this.searchData.symbol_c,
                        result_fund: this.searchData.result_fund,
                        symbol_r: this.searchData.symbol_r,
                        created_at:
                            this.searchData.created_at[0] === ""
                                ? ""
                                : this.searchData.created_at
                    }
                })
                .then(res => {
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
            this.currentPage = index;
            this.getList();
        },
        changePageGetList(size) {
            this.currentPage = 1;
            this.per_page = size;
            this.getList();
        },
        returnExcel() {
            let token = ''
            axios.request({
                url:'http://120.79.203.214/zbb/public/export-token',
                method:'get'
            }).then(res=>{
                token = res.data
                let url =
                "http://120.79.203.214/zbb/public/backend/finance/apprentices/fund/export?" +
                "apprentice_username=" +
                (this.searchData.type1 === "apprentice_username"
                    ? this.searchData.type1Text
                    : "") +
                "&apprentice_id=" +
                (this.searchData.type1 === "apprentice_id"
                    ? this.searchData.type1Text
                    : "") +
                "&type=" +
                (this.searchData.type === -1 ? "" : this.searchData.type) +
                "&change_fund=" +
                this.searchData.change_fund +
                "&symbol_c=" +
                this.searchData.symbol_c +
                "&result_fund=" +
                this.searchData.result_fund +
                "&symbol_r=" +
                this.searchData.symbol_r +
                "&created_at=" +
                (this.searchData.created_at[0] === ""
                    ? ""
                    : this.searchData.created_at) + 
                    "&token="+token
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
.APPRENTICEFUNDS {
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
    .formItem {
        width: 100%;
    }
    .formPage {
        .formItem {
            display: block;
            margin: 25px auto;
            .ivu-form-item-error-tip {
                padding-left: 141.5px;
            }
            // .formRow.textarea{
            //     height: 94px;
            // }
            .formRow {
                display: block;
                // height: 33px;
                .lable {
                    display: block;
                    // line-height: 33px;
                }
                .formInput {
                    // margin-left: 20px;
                    // width: 300px;
                }
            }
        }
    }
}
</style>