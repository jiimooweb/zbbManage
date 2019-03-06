<template>
    <div>
        <Card style="width:600px">
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="tableText" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <Select v-model="formInline.table">
                                <Option value="masters">师傅ID</Option>
                                <Option value="apprentices">徒弟ID</Option>
                                <Option value="merchants">客户ID</Option>
                            </Select>
                        </i-col>
                        <i-col span='18' offset='2'>
                            <i-input placeholder="请输入搜索值" class="formInput" type='number' v-model="formInline.tableText"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="change_fund" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <Select v-model="formInline.from">
                                <Option :value="1">金额增加</Option>
                                <Option :value="-1">金额减少</Option>
                            </Select>
                        </i-col>
                        <i-col span='18' offset='2'>
                            <i-input placeholder="请输入数值" class="formInput" type='number' v-model="formInline.change_fund"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="remark" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <span style="lable">备注:</span>
                        </i-col>
                        <i-col span='18' offset='2'>
                            <i-input placeholder="输入金额变动原因" class="formInput" v-model="formInline.remark"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="width:100%;">
                    <div style="margin:10px auto 0;width:122px;">
                        <Button type="primary" @click="handleSubmit('formInline')">提交</Button>
                        <!-- <Button style="margin-left:10px;" @click="resetData('formInline')">重置</Button> -->
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
            formInline: {
                table: "masters",
                tableText: "",
                from: 1,
                change_fund: 0,
                remark: ""
            },
            ruleInline: {
                tableText: [
                    {
                        required: true,
                        message: "请输入对象资料",
                        trigger: "blur"
                    }
                ],
                change_fund: [
                    {
                        required: true,
                        message: "请输入数值且不为0",
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
                            url: "finance/funds/update",
                            method: "post",
                            data: {
                                table: this.formInline.table,
                                man_id: this.formInline.tableText,
                                change_fund:
                                    this.formInline.from *
                                    this.formInline.change_fund,
                                remark: this.formInline.remark
                            }
                        })
                        .then(res => {
                            this.$Message.success("修改成功");
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
