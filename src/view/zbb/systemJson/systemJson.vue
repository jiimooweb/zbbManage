<template>
    <div class="SYSTEMJSON">
        <Button type="primary" :style='"margin:10px 0;display:" + (this.hasPower(this.$store.state.user.access,"systemJson-new")? "inline-block;": "none;")' @click="newData()">新增</Button>
        <Table :max-height='this.$store.state.app.winHeight' class="SystemList" stripe :columns="column" border :data="list"></Table>
        <Modal v-model="EditModal" title='配置' :mask-closable="false" footer-hide>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="flag" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">配置标识</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入配置标识" class="formInput" :disabled='!isNew' v-model="formInline.flag"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="text" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">配置信息</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入配置信息" class="formInput" v-model="formInline.text"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="param" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">配置值</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入配置值" class="formInput" v-model="formInline.param"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="group" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">配置组</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入配置组" class="formInput" v-model="formInline.group"></i-input>
                        </i-col>
                    </row>
                </FormItem>

                <FormItem prop="remark" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">备注</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入备注" class="formInput" v-model="formInline.remark"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="width:100%;">
                    <Button type="primary" style="margin:20px auto;display:block;" @click="handleSubmit('formInline')">修改</Button>
                </FormItem>
            </i-form>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { returnHasPower, isShowColumn } from "@/libs/util";
export default {
    data() {
        return {
            EditModal: false,
            column: [
                {
                    title: "配置ID",
                    align: "center",
                    key: "id"
                },
                {
                    title: "配置标题",
                    align: "center",
                    key: "flag"
                },
                {
                    title: "配置值",
                    align: "center",
                    key: "text"
                },
                {
                    title: "配置组",
                    align: "center",
                    key: "group"
                },
                {
                    title: "备注",
                    align: "center",
                    key: "remark"
                },
                {
                    title: "编辑",
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "Button",
                            {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                attrs: {
                                    style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "systemJson-edit"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                },
                                nativeOn: {
                                    click: () => {
                                        this.isNew = false;
                                        this.currentId = params.row.id;
                                        this.formInline.flag = params.row.flag;
                                        this.formInline.param =
                                            params.row.param;
                                        this.formInline.text = params.row.text;
                                        this.formInline.group =
                                            params.row.group;
                                        this.formInline.remark =
                                            params.row.remark;
                                        this.EditModal = true;
                                    }
                                }
                            },
                            "编辑"
                        );
                    }
                }
            ],
            ruleInline: {
                flag: [
                    {
                        required: true,
                        message: "请输入配置标识",
                        trigger: "blur"
                    }
                ],
                // param: [
                //     {
                //         required: true,
                //         message: "请输入配置信息",
                //         trigger: "blur"
                //     }
                // ],
                group: [
                    {
                        required: true,
                        message: "请输入配置组",
                        trigger: "blur"
                    }
                ],
                remark: [
                    {
                        required: true,
                        message: "请输入配置组",
                        trigger: "blur"
                    }
                ]
            },
            list: [],
            formInline: {
                flag: "",
                param: "",
                text: "",
                group: "",
                remark: ""
            },
            isNew: false,
            currentId: ""
        };
    },
    computed: {
        getAccess() {
            return this.$store.state.user.access;
        }
    },
    watch: {
        getAccess: function(a, b) {
            isShowColumn(a, ["systemJson-edit"], this.column);
        }
    },
    methods: {
        getList() {
            axios
                .request({
                    url: "system/configs",
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data;
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        newData() {
            this.formInline.flag = "";
            this.formInline.param = "";
            this.formInline.text = "";
            this.formInline.group = "";
            this.formInline.remark = "";
            this.EditModal = true;
            this.isNew = true;
        },
        inputData() {
            if (this.isNew) {
                axios
                    .request({
                        url: "system/cofigs",
                        method: "post",
                        data: {}
                    })
                    .catch(err => {
                        for (let i in err.response.data.msg) {
                            this.$Message.error(err.response.data.msg[i][0]);
                        }
                    });
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.isNew) {
                        axios
                            .request({
                                url: "system/configs",
                                method: "post",
                                data: {
                                    flag: this.formInline.flag,
                                    text: this.formInline.text,
                                    param: this.formInline.param,
                                    group: this.formInline.group,
                                    remark: this.formInline.remark
                                }
                            })
                            .then(res => {
                                this.$Message.success("新增成功");
                                this.resetData("formInline");
                                this.EditModal = false;
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
                        axios
                            .request({
                                url: "system/configs/" + this.currentId,
                                method: "put",
                                data: {
                                    flag: this.formInline.flag,
                                    text: this.formInline.text,
                                    param: this.formInline.param,
                                    group: this.formInline.group,
                                    remark: this.formInline.remark
                                }
                            })
                            .then(res => {
                                this.$Message.success("修改成功");
                                this.resetData("formInline");
                                this.EditModal = false;
                                this.getList();
                            })
                            .catch(err => {
                                for (let i in err.response.data.msg) {
                                    this.$Message.error(
                                        err.response.data.msg[i][0]
                                    );
                                }
                            });
                    }
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
        this.getList();
    }
};
</script>

<style lang='less'>
// .SYSTEMJSON .SystemList .ivu-table-body{
//     // max-height: inherit !important;
// }
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