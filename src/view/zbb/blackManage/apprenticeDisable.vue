<template>
    <div>
        <row>
            <i-col span='2' offset='22'>
                <Button type="error" style="float:right;margin-bottom:10px;" @click="returnExcel()">导出</Button>
            </i-col>
        </row>
        <Table stripe :columns="column" border :data="list" @on-select='selectItem' @on-select-all='selectItem' @on-selection-change='selectItem'></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getMasterList" @on-page-size-change='changePageGetList' />
        <Modal v-model="cancelModal" title='删除' @on-ok="cancelItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除----<span style="color:red;">{{deleteName}}</span>----的禁用记录</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            currentId: "",
            deleteName: "",
            cancelModal: false,
            column: [
                {
                    title: "徒弟ID",
                    align: "center",
                    key: "id"
                },
                {
                    title: "账号",
                    align: "center",
                    key: "username"
                },
                {
                    title: "手机号",
                    align: "center",
                    key: "phone"
                },
                {
                    title: "微信号",
                    align: "center",
                    key: "wx"
                },
                {
                    title: "抖音号",
                    align: "center",
                    key: "dy"
                },
                {
                    title: "头条号",
                    align: "center",
                    key: "tt"
                },
                {
                    title: "银行卡号",
                    align: "center",
                    render: (h, params) => {
                        return h("p", params.row.bindBank.bank_number);
                    }
                },
                {
                    title: "添加时间",
                    align: "center",
                    key: "disable_time"
                },
                {
                    title: "备注",
                    align: "center",
                    key: "remark"
                },
                {
                    title: "操作",
                    align: "center",
                    width: 100,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.deleteName =
                                                params.row.username;
                                            this.cancelcancel(true);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            list: [],
            total: 1,
            per_page: 1,
            currentPage: 1,
            defailPage: 20,
            pageSize: [2, 20, 50, 100, 200],
            selectList: []
        };
    },
    methods: {
        returnExcel() {
            let url =
                "http://120.79.203.214/zbb/public/backend/apprentices/disable/export";
            window.open(url);
        },
        getList() {
            axios
                .request({
                    url: "apprentices/disable?page=" + this.currentPage,
                    method: "get"
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
        selectItem(all, last) {},
        cancelItem() {
            axios
                .request({
                    url: "apprentices/disable/" + this.currentId + "?disable=0",
                    method: "get"
                })
                .then(res => {
                    this.$Message.success("删除成功");
                    this.getList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        cancelcancel(i) {
            this.cancelModal = i;
        },
        changePageGetList(size) {
            this.currentPage = 1;
            this.defailPage = size;
            axios
                .request({
                    url:
                        "apprentices/disable?pagesize=" +
                        size +
                        "&page=" +
                        this.currentPage,
                    method: "get"
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
        getMasterList(index) {
            axios
                .request({
                    url:
                        "apprentices/disable?pagesize=" +
                        this.defailPage +
                        "&page=" +
                        index,
                    method: "get"
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
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang='less'>
</style>
