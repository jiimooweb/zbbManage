<template>
    <div>
        <Table stripe :columns="masterColumn" border :data="masterList"></Table>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            masterColumn: [
                {
                    title: "序号",
                    align: "center",
                    width: "70",
                    render: (h, params) => {
                        return h(
                            "p",
                            params.index +
                                1 +
                                (this.currentPage - 1) * this.per_page
                        );
                    }
                },
                {
                    title: "师傅ID",
                    align: "center",
                    width: "100",
                    key: "id"
                },
                {
                    title: "师傅名称",
                    align: "center",
                    width: "200",
                    key: "username"
                },
                {
                    title: "拉黑",
                    align: "center",
                    width: "70",
                    // key:'blacklist'
                    render: (h, params) => {
                        return h("p", params.row.blacklist === 0 ? "否" : "是");
                    }
                },
                {
                    title: "禁用",
                    align: "center",
                    width: "70",
                    // key:'disable'
                    render: (h, params) => {
                        return h("p", params.row.disable === 0 ? "否" : "是");
                    }
                },
                {
                    title: "审核状态",
                    align: "center",
                    width: "100",
                    // key:'status'
                    render: (h, params) => {
                        return h(
                            "p",{
                                attrs: {
                                        style: "color:#"+params.row.status === 0?'#999':'19be6b'
                                    },
                            },
                            params.row.status === 0 ? "待审核" : "已审核"
                        );
                    }
                },
                {
                    title: "真实姓名",
                    align: "center",
                    width: "100",
                    key: "name"
                },
                {
                    title: "手机号",
                    align: "center",
                    width: "150",
                    key: "phone"
                },
                {
                    title: "性别",
                    align: "center",
                    width: "70",
                    key: "sex"
                },
                {
                    title: "微信号",
                    align: "center",
                    width: "200",
                    key: "wx"
                },
                {
                    title: "备注",
                    align: "center",
                    width: "200",
                    key: "remark"
                },
                {
                    title: "徒弟总数",
                    align: "center",
                    width: "90",
                    key: "apprentices_count"
                },
                {
                    title: "徒弟上限数量",
                    align: "center",
                    width: "150",
                    key: "apprentice_limit"
                },
                {
                    title: "邀请码",
                    align: "center",
                    width: "200",
                    key: "invitation_code"
                },
                {
                    title: "余额",
                    align: "center",
                    width: "100",
                    key: "a"
                },
                {
                    title: "推荐人",
                    align: "center",
                    width: "100",
                    key: "referral_id"
                },
                {
                    title: "最后登录IP",
                    align: "center",
                    width: "200",
                    key: "ip"
                },
                {
                    title: "最后登录时间",
                    align: "center",
                    width: "200",
                    key: "login_time"
                },
                {
                    title: "创建日期",
                    align: "center",
                    width: "200",
                    key: "created_at"
                },
                {
                    title: "更新日期",
                    align: "center",
                    width: "200",
                    key: "updated_at"
                },
                {
                    title: "操作",
                    align: "center",
                    width: "200",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    attrs: {
                                        style: "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            
                                        }
                                    }
                                },
                                "审核"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    attrs: {
                                        style: "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            
                                        }
                                    }
                                },
                                "修改"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    attrs: {
                                        style: "font-size:12px"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            masterList: [],
            total: 1,
            currentPage: 1,
            per_page: 1
        };
    },
    methods: {
        getMasterList() {
            axios
                .request({
                    url: "masters",
                    method: "get"
                })
                .then(res => {
                    this.masterList = res.data.data.data;
                    this.total = res.data.data.total;

                    this.currentPage = res.data.data.current_page;
                    this.per_page = res.data.data.per_page;
                });
        }
    },
    mounted() {
        this.getMasterList();
    }
};
</script>

<style scoped>
</style>