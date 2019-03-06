<template>
    <div>
        <Card style="width:600px">
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="powers" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">用户组</span>
                        </i-col>
                        <i-col span='18'>
                            <Select v-model="formInline.page">
                                <Option v-for="(item,index) in groupsList" :value="item.id" :key="index">{{ item.name
                                    }}</Option>
                            </Select>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="username" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">用户名</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入用户名" class="formInput" v-model="formInline.username"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="password" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">密码</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入密码" class="formInput" v-model="formInline.password"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="phone" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">手机</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入手机" class="formInput" v-model="formInline.phone"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="email" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">邮箱</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入邮箱" class="formInput" v-model="formInline.email"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="state" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">状态</span>
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
                    <div style="margin:10px auto 0;width:122px;">
                        <Button type="primary" @click="handleSubmit('formInline')">新增</Button>
                        <Button style="margin-left:10px;" @click="resetData('formInline')">重置</Button>
                    </div>

                </FormItem>
            </i-form>
        </Card>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            groupsList: [],
            formInline: {
                powers: "",
                username: "",
                password: "",
                phone: "",
                email: "",
                // wx:'',
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
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        message: "密码最少6个字符",
                        trigger: "blur"
                    }
                ],
                // wx:[
                //     {
                //         required: true,
                //         message: "请输入微信号",
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
            }
        };
    },
    mounted() {
        this.getGroupsList();
    },
    methods: {
        getGroupsList() {
            axios
                .request({
                    url: "power/groups",
                    method: "get"
                })
                .then(res => {
                    console.log(res.data.data);

                    this.groupsList = res.data.data;
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
                            url: "admin/admins",
                            method: "post",
                            data: {
                                username: this.formInline.username,
                                password: this.formInline.password,
                                powers: this.formInline.powers,
                                // wx: this.formInline.wx,
                                phone: this.formInline.phone,
                                email: this.formInline.email,
                                state: this.formInline.state
                            }
                        })
                        .then(res => {
                            this.$Message.success("新建成功");
                            this.resetData("formInline");
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
</style>
