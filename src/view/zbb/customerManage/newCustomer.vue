<template>
    <div>
        <Card style="width:600px">
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
                <FormItem style="margin:20px 0px 20px 400px">
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
            }
        };
    },
    mounted() {},
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: "customer-services",
                            method: "post",
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
