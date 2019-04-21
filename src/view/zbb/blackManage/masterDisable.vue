<template>
    <div>
        <row>
            <i-col span='2' offset='22'>
                <Button type="error" style="float:right;margin-bottom:10px;" @click="returnExcel()">导出</Button>
            </i-col>
        </row>
        <Table :max-height='this.$store.state.app.winHeight' stripe :columns="column" border :data="list" @on-select='selectItem' @on-select-all='selectItem' @on-selection-change='selectItem'></Table>
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
            currentId:'',
            deleteName:'',
            cancelModal:false,
            column: [
                {
                    title: "师傅ID",
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
                    render: (h, params) => {
                        return h("p", params.row.wx===''?'无':params.row.wx);
                    }
                },
                {
                    title: "银行卡号",
                    align: "center",
                    render: (h, params) => {
                        return h("p", !params.row.bind_bank?'无':params.row.bind_bank.bank_number);
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
                                            this.deleteName = params.row.username
                                            this.cancelcancel(true)
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
            pageSize: [5, 10, 20, 50, 200, 500],
            selectList: []
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
                let url = "https://www.iryi.cn/backend/masters/disable/export" + "?token="+token
                window.open(url);
            })
            
        },
        getList() {
            axios
                .request({
                    url: "masters/disable?page=" + this.currentPage,
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data.data;
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
        selectItem(all, last) {},
        cancelItem(){
            axios
                .request({
                    url: "masters/disable/" + this.currentId+"?disable=0",
                    method: "get"
                })
                .then(res => {
                    this.$Message.success('删除成功')
                    this.getList()
                }).catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(
                            err.response.data.msg[i][0]
                        );
                    }
                });
        },
        cancelcancel(i){
            this.cancelModal = i
        },
        changePageGetList(size) {
            this.currentPage = 1;
            this.defailPage = size;
            axios
                .request({
                    url:
                        "masters/disable?pagesize=" +
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
                }).catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(
                            err.response.data.msg[i][0]
                        );
                    }
                });
        },
        getMasterList(index) {
            axios
                .request({
                    url:
                        "masters/disable?pagesize=" +
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
                }).catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(
                            err.response.data.msg[i][0]
                        );
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
