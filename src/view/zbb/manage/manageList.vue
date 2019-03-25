<template>
    <div>
        <Table stripe :columns="manageColumn" border :data="manageList"></Table>
        <Modal v-model="EditModal" title='编辑' footer-hide>
            <!-- <Card style="width:400px"> -->
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>

                <FormItem prop="username" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">用户名</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入用户名" class="formInput" v-model="formInline.username"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="password" class="formItem">
                        <row class="formRow">
                            <i-col span='6'>
                                <span class="lable">密码</span>
                            </i-col>
                            <i-col span='18'>
                                <i-input placeholder="请输入密码，留空则不修改" type='password' class="formInput" v-model="formInline.password"></i-input>
                            </i-col>
                        </row>
                    </FormItem>
                <FormItem prop="phone" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">手机</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入手机" class="formInput" v-model="formInline.phone"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="email" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">邮箱</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入邮箱" class="formInput" v-model="formInline.email"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="state" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">状态</span>
                        </i-col>
                        <i-col span='18'>
                            <RadioGroup v-model="formInline.state">
                                <Radio :label="1">允许登录</Radio>
                                <Radio :label="0">禁止登录</Radio>
                            </RadioGroup>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="width:100%;">
                    <Button type="primary" style="margin:0 auto;display:block;" @click="handleSubmit('formInline')">提交</Button>
                </FormItem>
            </i-form>
            <!-- </Card> -->
        </Modal>
        <Modal v-model="powerModal" title='权限' footer-hide>
            <i-form ref="formInline" class="formPage" inline>
                <FormItem prop="powers" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">权限组</span>
                        </i-col>
                        <i-col span='18'>
                            <Select v-model="formInline.powers">
                                <Option v-for="(item,index) in groupsList" :value="item.id" :key="index">{{
                                    item.name }}</Option>
                            </Select>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="width:100%;">
                    <Button type="primary" style="margin:0 auto;display:block;" @click="inputPower()">提交</Button>
                </FormItem>
            </i-form>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { returnPowerStrArr } from '@/libs/util'
export default {
    data() {
        return {
            EditModal: false,
            powerModal: false,
            formInline: {
                powers: "",
                username: "",
                password:"",
                phone: "",
                email: "",
                state: 1
            },
            ruleInline: {
                powers: [
                    // {
                    //     required: true,
                    //     message: "请选择用户组",
                    //     trigger: "blur"
                    // }
                ],
                username: [
                    {
                        required: true,
                        message: "请输入账号",
                        trigger: "blur"
                    }
                ],
                // password: [
                //     {
                //         required: true,
                //         message: "请输入密码",
                //         trigger: "blur"
                //     },
                //     {
                //         type: "string",
                //         min: 6,
                //         message: "密码最少6个字符",
                //         trigger: "blur"
                //     }
                // ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机",
                        trigger: "blur"
                    }
                ]
            },
            currentId: "",
            manageColumn: [
                {
                    title: "用户名",
                    key: "username"
                },
                {
                    title: "用户组",
                    // key: "powers"
                    render(h, params) {
                        return h("p", params.row.group.name);
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
                                        type: "success",
                                        size: "small"
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.EditModal = true;
                                            this.currentId = params.row.id;
                                            (this.formInline.powers =
                                                params.row.powers),
                                                (this.formInline.username =
                                                    params.row.username),
                                                (this.formInline.password =
                                                    params.row.password),
                                                (this.formInline.phone =
                                                    params.row.phone),
                                                (this.formInline.email =
                                                    params.row.email),
                                                (this.formInline.state =
                                                    params.row.state);
                                        }
                                    }
                                },
                                "修改"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.powerModal = true;
                                            this.currentId = params.row.id;
                                            this.formInline.powers =
                                                params.row.powers;
                                        }
                                    }
                                },
                                "权限"
                            )
                        ]);
                    }
                }
            ],
            manageList: [],
            groupsList: []
        };
    },
    mounted() {
        this.getList();
        this.getGroup();
    },
    methods: {
        inputPower() {
            if (!this.formInline.powers) {
                this.$Message.error("请选择权限组");
                return false;
            }
            axios
                .request({
                    url: "admin/assign",
                    method: "put",
                    data: {
                        admin: this.currentId,
                        powers: this.formInline.powers
                    }
                })
                .then(res => {
                    this.$Message.success("权限赋予成功");
                    this.getList();
                    this.getGroup();
                    this.powerModal = false;
                    this.formInline.powers = "";
                    axios
                        .request({
                            url: "admin",
                            method: "get"
                        })
                        .then(res => {
                            let strArr = returnPowerStrArr(res.data.data.group.has_powers)
                            this.$store.commit("setAccess",strArr);
                            this.$store.commit("setUserName",res.data.data.username);
                            this.$store.commit("setUserId", res.data.data.id);
                        });
                });
        },
        getGroup() {
            axios
                .request({
                    url: "power/groups",
                    method: "get"
                })
                .then(res => {
                    this.groupsList = res.data.data;
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        getList() {
            axios
                .request({
                    url: "admin/admins",
                    method: "get"
                })
                .then(res => {
                    this.manageList = res.data.data;
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
                            url: "admin/admins/" + this.currentId,
                            method: "put",
                            data: {
                                username: this.formInline.username,
                                password: this.formInline.password,
                                // powers: this.formInline.powers,
                                phone: this.formInline.phone,
                                email: this.formInline.email,
                                state: this.formInline.state
                            }
                        })
                        .then(res => {
                            this.EditModal = false;
                            this.$Message.success("修改成功");
                            this.resetData("formInline");
                            this.getList();
                            this.getGroup();
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
.formPage {
    .formItem {
        display: block;
        margin: 25px auto;
        .ivu-form-item-error-tip {
            padding-left: 141.5px;
        }
        .formRow {
            display: block;
            height: 33px;
            .lable {
                display: block;
                line-height: 33px;
            }
            .formInput {
                // margin-left: 20px;
                // width: 300px;
            }
        }
    }
}
</style>
