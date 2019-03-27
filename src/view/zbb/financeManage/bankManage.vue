<template>
    <div>
        <Button type="primary" style='margin:10px 0;display:block;' @click="newDate()">添加银行</Button>
        <Table :columns="bankColumn" border :data="bankList"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="changeGetList" @on-page-size-change='changePageGetList' />
        <Modal v-model="deleteModal" title='删除' @on-ok="deleteItem()" @on-cancel="deletecancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除<span style="color:red;">{{deleteName}}</span></p>
        </Modal>
        <Modal v-model="EditModal" title='银行资料' footer-hide width='600px'>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="name" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">银行名称</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入银行名称" class="formInput" v-model="formInline.name"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="charge" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">手续费(%)</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入手续费" class="formInput" v-model="formInline.charge" type="number" @mousewheel.native.prevent></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="comment" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">备注</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入备注" class="formInput" v-model="formInline.comment"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="state" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">禁用</span>
                        </i-col>
                        <i-col span='18'>
                            <i-switch v-model="formInline.state" :true-value='1' :false-value='0' />
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="width:100%">
                    <Button type="primary" style="margin:10px auto;display:block" @click="handleSubmit('formInline')">提交</Button>
                    <!-- <Button style="margin-left:10px;" @click="resetData('formInline')">重置</Button> -->
                </FormItem>
            </i-form>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            EditModal: false,
            deleteModal: false,
            deleteName: "",
            total: 1,
            per_page: 20,
            defailPage: 20,
            currentPage: 1,
            pageSize: [5, 10, 20, 50, 200, 500],
            formInline: {
                name: "",
                charge: "",
                comment: "",
                state: 0
            },
            ruleInline: {
                name: [
                    {
                        required: true,
                        message: "请输入银行名称",
                        trigger: "blur"
                    }
                ],
                charge: [
                    {
                        // required: true,
                        // message: "请输入手续费",
                        // trigger: "blur"
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value && value !== 0) {
                                callback("请输入金额");
                            }
                            callback(errors);
                        }
                    }
                ],
                comment: []
            },
            currentId: "",
            bankColumn: [
                {
                    title: "银行ID",
                    align: "center",
                    key: "id"
                },
                {
                    title: "银行名称",
                    align: "center",
                    key: "name"
                },
                {
                    title: "手续费(%)",
                    align: "center",
                    // key: "charge"
                    render: (h, params) => {
                        return h("p", params.row.charge + "%");
                    }
                },
                {
                    title: "备注",
                    align: "center",
                    key: "comment"
                },
                {
                    title: "禁用",
                    align: "center",
                    // key: "state"
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "color:#" +
                                        (params.row.state === 0
                                            ? "19be6b"
                                            : "ed4014")
                                }
                            },
                            params.row.state === 0 ? "否" : "是"
                        );
                    }
                },
                {
                    title: "操作",
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
                                        style: "font-size:12px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.isNew = false;
                                            this.currentId = params.row.id;
                                            this.formInline.name =
                                                params.row.name;
                                            this.formInline.charge =
                                                params.row.charge;
                                            this.formInline.comment =
                                                params.row.comment;
                                            this.formInline.state =
                                                params.row.state;
                                            this.EditModal = true;
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
                                        style:
                                            "font-size:12px;margin-left:10px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.deleteName = params.row.name;
                                            this.deletecancel(true);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            bankList: [],
            isNew: false
        };
    },
    methods: {
        deletecancel(i) {
            this.deleteModal = i;
        },

        newDate() {
            this.EditModal = true;
            this.isNew = true;
            this.resetData("formInline");
        },
        changeGetList(index) {
            //改变页数时请求
            this.currentPage = index;
            this.getBankList();
        },

        changePageGetList(size) {
            //改变每页条数时请求
            this.per_page = size;
            this.currentPage = 1
            this.getBankList();
        },

        getBankList() {
            //打开页面请求数据
            axios
                .request({
                    url:
                        "bank/banks?page=" +
                        this.currentPage +
                        "&pagesize=" +
                        this.per_page,
                    method: "get"
                })
                .then(res => {
                    console.log(res);
                    this.bankList = res.data.data;
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
        deleteItem() {
            axios
                .request({
                    url: "bank/banks/" + this.currentId,
                    method: "delete"
                })
                .then(res => {
                    this.deletecancel(false);
                    this.$Message.success("删除成功");
                    this.getBankList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.isNew) {
                        axios
                            .request({
                                url: "bank/banks",
                                method: "post",
                                data: {
                                    name: this.formInline.name,
                                    charge: this.formInline.charge,
                                    comment: this.formInline.comment,
                                    state: this.formInline.state
                                }
                            })
                            .then(res => {
                                this.$Message.success("新建成功");
                                this.resetData("formInline");
                                this.getBankList();
                            })
                            .catch(err => {
                                for (let i in err.response.data.msg) {
                                    this.$Message.error(
                                        err.response.data.msg[i][0]
                                    );
                                }
                            });
                    } else {
                        axios
                            .request({
                                url: "bank/banks/" + this.currentId,
                                method: "put",
                                data: {
                                    name: this.formInline.name,
                                    charge: this.formInline.charge,
                                    comment: this.formInline.comment,
                                    state: this.formInline.state
                                }
                            })
                            .then(res => {
                                this.$Message.success("修改成功");
                                this.resetData("formInline");
                                this.getBankList();
                            })
                            .catch(err => {
                                for (let i in err.response.data.msg) {
                                    this.$Message.error(
                                        err.response.data.msg[i][0]
                                    );
                                }
                            });
                    }
                    this.EditModal = false;
                } else {
                    this.$Message.error("填写的资料有误!");
                }
            });
        },
        resetData(name) {
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        this.getBankList();
    }
};
</script>

<style lang='less'>
.formPage {
    .formItem {
        display: block;
        margin: 25px auto;
        .ivu-form-item-error-tip {
            padding-left: 141.5px;
        }
        .formRow {
            display: block;
            .lable {
                display: block;
            }
            .formInput {
                // margin-left: 20px;
                // width: 300px;
            }
        }
    }
}
</style>