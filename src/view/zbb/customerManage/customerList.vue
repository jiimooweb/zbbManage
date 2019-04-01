<template>
    <div class="CUSTOMERLIST">
        <Button type="primary" :style='"margin:10px 0;display:" + (this.hasPower(this.$store.state.user.access,"newCustomer")? "inline-block;": "none;")' @click="newData()">添加客服</Button>
        <Table stripe :columns="column" border :data="list"></Table>
        <!-- <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' /> -->
        <Modal v-model="editModal" title="客服资料" :mask-closable="false" footer-hide>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="type" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">类型:</span>
                        </i-col>
                        <i-col span='18'>
                            <Select v-model="formInline.type">
                                <Option value='Merchant' key="Merchant">商户</Option>
                                <Option value='Master' key="Master">师傅</Option>
                                <Option value='Apprentice' key="Apprentice">徒弟</Option>
                            </Select>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="name" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">真实姓名:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入真实姓名" class="formInput" v-model="formInline.name"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="nickname" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">昵称:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入昵称" class="formInput" v-model="formInline.nickname"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="phone" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">手机号码:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入手机号码" class="formInput" v-model="formInline.phone"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="wx" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">微信号:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入微信号" class="formInput" v-model="formInline.wx"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="qq" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">QQ号:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入QQ" class="formInput" v-model="formInline.qq"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="remark" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">备注:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入备注" class="formInput" v-model="formInline.remark"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem class="formItem">
                    <Button type="primary" @click="handleSubmit('formInline')" style="margin:20px auto;display:block;">提交</Button>
                </FormItem>
            </i-form>
        </Modal>
        <Modal v-model="cancelModal" title='删除' @on-ok="cancelItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除客服----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { isShowColumn } from "@/libs/util";
export default {
    data() {
        return {
            deleteName:'',
            editModal: false,
            cancelModal: false,
            formInline: {
                name: "",
                nickname: "",
                phone: "",
                qq: "",
                wx: "",
                type: "Merchant",
                remark: ""
            },
            ruleInline: {
                name: [
                    {
                        required: true,
                        message: "请输入真实姓名",
                        trigger: "blur"
                    }
                ],
                // nickname: [
                //     {
                //         required: true,
                //         message: "请输入昵称",
                //         trigger: "blur"
                //     }
                // ],
                wx: [
                    {
                        required: true,
                        message: "请输入微信号",
                        trigger: "blur"
                    }
                ],
                // qq: [
                //     {
                //         required: true,
                //         message: "请输入QQ",
                //         trigger: "blur"
                //     }
                // ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    }
                ]
            },
            column: [
                // {
                //     title: "序号",
                //     align: "center",
                //     width: "70",
                //     render: (h, params) => {
                //         return h(
                //             "p",
                //             params.index +
                //                 1 +
                //                 (this.currentPage - 1) * this.per_page
                //         );
                //     }
                // },
                {
                    title: "类型",
                    // key: "type"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.type === "Merchant"
                                ? "商户"
                                : params.row.type === "Master"
                                ? "师傅"
                                : "徒弟"
                        );
                    }
                },
                {
                    title: "真实姓名",
                    // width:100,
                    key: "name"
                },
                {
                    title: "昵称",
                    // width:100,
                    key: "nickname"
                },
                {
                    title: "微信号",
                    // width:150,
                    key: "wx"
                },
                {
                    title: "QQ号",
                    // width:100,
                    key: "qq"
                },
                {
                    title: "手机号码",
                    // width:100,
                    key: "phone"
                },
                {
                    title: "备注",
                    width: 200,
                    key: "remark"
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
                                        type: "success",
                                        size: "small"
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "customerList-edit"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.editModal = true;
                                            this.formInline.name =
                                                params.row.name;
                                            this.formInline.nickname =
                                                params.row.nickname;
                                            this.formInline.wx = params.row.wx;
                                            this.formInline.qq = params.row.qq;
                                            this.formInline.phone =
                                                params.row.phone;
                                            this.formInline.type =
                                                params.row.type;
                                            this.formInline.remark =
                                                params.row.remark;
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
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "customerList-delete"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.deleteName = params.row.name;
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
            isShowColumn(a,["customerList-edit","customerList-delete"],this.column);
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        newData() {
            this.$router.push({ path: "/newCustomer" });
        },
        cancelItem() {
            axios
                .request({
                    url: "customer-services/" + this.currentId,
                    method: "delete"
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
        getList() {
            axios
                .request({
                    url: "customer-services",
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data;
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
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: "customer-services/" + this.currentId,
                            method: "put",
                            data: {
                                name: this.formInline.name,
                                nickname: this.formInline.nickname,
                                wx: this.formInline.wx,
                                qq: this.formInline.qq,
                                phone: this.formInline.phone,
                                type: this.formInline.type,
                                remark: this.formInline.remark
                            }
                        })
                        .then(res => {
                            this.$Message.success("修改成功");
                            this.resetData("formInline");
                            this.editModal = false;
                            this.getList();
                        })
                        .catch(err => {
                            for (let i in err.response.data.msg) {
                                this.$Message.error(
                                    err.response.data.msg[i][0]
                                );
                            }
                        });
                } else {
                    this.$Message.error("填写的资料有误!");
                }
            });
        },
        resetData(name) {
            this.$refs[name].resetFields();
        }
    }
};
</script>

<style lang='less'>
.CUSTOMERLIST{
    min-width: 1100px;
    .formItem {
        width: 100%;
    }
}

</style>
