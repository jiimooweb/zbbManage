<template>
    <div>
        <Card style="width:600px">
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="username" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">师傅账号:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入账号" class="formInput" v-model="formInline.username"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="password" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">密码:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入密码" v-model="formInline.password" class="formInput"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="sex" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">性别:</span>
                        </i-col>
                        <i-col span='18'>
                            <RadioGroup v-model="formInline.sex">
                                <Radio :label="1" style="width:50px;">男</Radio>
                                <Radio :label="0">女</Radio>
                            </RadioGroup>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="name" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">真实姓名:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入姓名" class="formInput" v-model="formInline.name"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="phone" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">手机号码:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入手机号码" class="formInput" v-model="formInline.phone"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="wx" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">微信号:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入微信号" class="formInput" v-model="formInline.wx"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="email" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">邮箱:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入邮箱" class="formInput" v-model="formInline.email"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <!-- <FormItem prop="referral_id" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">推荐人ID:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入推荐人ID" class="formInput" v-model="formInline.referral_id"></i-input>
                        </i-col>
                    </row>
                </FormItem> -->
                <FormItem prop="apprentice_limit" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">徒弟数量限制:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入徒弟数量限制" class="formInput" type='number' v-model="formInline.apprentice_limit"></i-input>
                            <!-- <InputNumber placeholder="输入徒弟数量限制" :min='0' style="width:100%;" v-model="formInline.apprentice_limit"></InputNumber> -->
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="remark" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">备注:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="备注" class="formInput" v-model="formInline.remark"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="margin:20px auto">
                    <Button type="primary" @click="handleSubmit('formInline')">新增</Button>
                    <Button style="margin-left:10px;" @click="resetData('formInline')">重置</Button>
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
            formInline: {
                username: "",
                password: "",
                sex: 1,
                name: "",
                phone: "",
                wx: "",
                email: "",
                //referral_id: "", //推荐人ID
                apprentice_limit: "", //徒弟数量限制
                remark: ""
            },
            ruleInline: {
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
                name: [
                    {
                        required: true,
                        message: "请输入真实姓名",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    }
                ],
                wx: [
                    {
                        required: true,
                        message: "请输入微信号",
                        trigger: "blur"
                    }
                ],
                email: [
                    // {
                    //     required: true,
                    //     message: "请输入邮箱",
                    //     trigger: "blur"
                    // },
                    // {
                    //     type: "email",
                    //     message: "邮箱格式不正确",
                    //     trigger: "blur"
                    // }
                ],
                apprentice_limit: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请输入徒弟数量限制");
                            }
                            callback(errors);
                        }
                    }
                ]
            }
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: "masters",
                            method: "post",
                            data: {
                                username: this.formInline.username,
                                password: this.formInline.password,
                                sex: this.formInline.sex,
                                name: this.formInline.name,
                                phone: this.formInline.phone,
                                wx: this.formInline.wx,
                                email: this.formInline.email,
                                //referral_id: this.formInline.referral_id, //推荐人ID
                                apprentice_limit: this.formInline
                                    .apprentice_limit, //徒弟数量限制
                                remark: this.formInline.remark
                            }
                        })
                        .then(res => {
                            this.$Message.success("新建成功");
                            this.resetData("formInline");
                        })
                        .catch(err => {
                            for (let i in err.response.data.errors) {
                                this.$Message.error(
                                    err.response.data.errors[i][0]
                                );
                            }
                        });
                } else {
                    this.$Message.error("填写的资料有误!");
                }
            });
        },
        resetData(name) {
            console.log(typeof this.formInline.apprentice_limit);
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
        // .formRow.textarea{
        //     height: 94px;
        // }
        .formRow {
            display: block;
            // height: 33px;
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