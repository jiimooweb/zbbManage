<template>
    <div>
        <Card style="width:600px">
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="username" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>客户账号:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入客户账号" class="formInput" v-model="formInline.username"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="password" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>密码:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入密码" v-model="formInline.password" class="formInput"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="name" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>姓名:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入姓名" class="formInput" v-model="formInline.name"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="tel" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>手机号码:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入手机号码" class="formInput" v-model="formInline.tel"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="wechat" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>微信号:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入微信号" class="formInput" v-model="formInline.wechat"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="wx_commission" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>发圈赚-佣:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.wx_commission"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>抖音-佣:</span>
                        </i-col>
                        <i-col span='18'>
                            <row class="formRow">
                                <i-col span='4'>
                                    <span>关注:</span>
                                </i-col>
                                <i-col span='6'>
                                    <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.dy_subscribe"></i-input>
                                </i-col>
                                <i-col span='4' offset='4'>
                                    <span>双击:</span>
                                </i-col>
                                <i-col span='6'>
                                    <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.dy_like"></i-input>
                                </i-col>
                                <i-col span='4' style="margin-top:10px;">
                                    <span>转发:</span>
                                </i-col>
                                <i-col span='6' style="margin-top:10px;">
                                    <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.dy_share"></i-input>
                                </i-col>
                                <i-col span='4' offset='4' style="margin-top:10px;">
                                    <span>评论:</span>
                                </i-col>
                                <i-col span='6' style="margin-top:10px;">
                                    <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.dy_comment"></i-input>
                                </i-col>
                            </row>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>头条-佣:</span>
                        </i-col>
                        <i-col span='18'>
                            <row class="formRow">
                                <i-col span='4'>
                                    <span>关注:</span>
                                </i-col>
                                <i-col span='6'>
                                    <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.tt_subscribe"></i-input>
                                </i-col>
                                <i-col span='4' offset='4'>
                                    <span>双击:</span>
                                </i-col>
                                <i-col span='6'>
                                    <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.tt_like"></i-input>
                                </i-col>
                                <i-col span='4' style="margin-top:10px;">
                                    <span>转发:</span>
                                </i-col>
                                <i-col span='6' style="margin-top:10px;">
                                    <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.tt_share"></i-input>
                                </i-col>
                                <i-col span='4' offset='4' style="margin-top:10px;">
                                    <span>评论:</span>
                                </i-col>
                                <i-col span='6' style="margin-top:10px;">
                                    <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.tt_comment"></i-input>
                                </i-col>
                            </row>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="share_commission" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>分享赚-佣:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="留空为默认佣金" class="formInput" v-model="formInline.share_commission"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="recommend_type" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>推荐人类型:</span>
                        </i-col>
                        <i-col span='18'>
                            <Select v-model="formInline.recommend_type">
                                <Option value="Master">师傅</Option>
                                <Option value="Apprentice">徒弟</Option>
                            </Select>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="recommend_id" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>推荐人ID:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="可留空" class="formInput" v-model="formInline.recommend_id"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="principal" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>对接人:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="默认操作人ID" class="formInput" v-model="formInline.principal"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="custom_service" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>客服人员ID:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="客服人员ID" class="formInput" v-model="formInline.custom_service"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="remark" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span>备注:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="" class="formInput" v-model="formInline.remark"></i-input>
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
                username: "",
                password: "",
                name: "",
                tel: "",
                wechat: "",
                wx_commission: "",

                //dy
                dy_subscribe: "",
                dy_like: "",
                dy_share: "",
                dy_comment: "",

                //tt
                tt_subscribe: "",
                tt_like: "",
                tt_share: "",
                tt_comment: "",

                share_commission: "",
                principal: "",
                custom_service: "",

                remark: "",

                recommend_type:'Master',
                recommend_id:''

                
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
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    }
                ],
                wechat: [
                    {
                        required: true,
                        message: "请输入微信号",
                        trigger: "blur"
                    }
                ],
                tel: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    }
                ]
            },
            sysJson: [],
            JsonFilterArr: [
                "SHARE_MERCHANT_COST", //分享赚
                "WECHAT_MERCHANT_COST", //发圈赚
                "DY_MERCHANT_SUBSCRIBE", //抖音赚 关注
                "DY_MERCHANT_LIKE", //抖音赚 点赞
                "DY_MERCHANT_SHARE", //抖音赚 转发
                "DY_MERCHANT_COMMENT", //抖音赚 评论

                "TT_MERCHANT_SUBSCRIBE", //头条赚 关注
                "TT_MERCHANT_LIKE", //头条赚 点赞
                "TT_MERCHANT_SHARE", //头条赚 转发
                "TT_MERCHANT_COMMENT" //头条赚 评论
            ],
            SHARE_MERCHANT_COST: "", //分享赚
            WECHAT_MERCHANT_COST: "", //发圈赚

            DY_MERCHANT_SUBSCRIBE: "", //抖音赚 关注
            DY_MERCHANT_LIKE: "", //抖音赚 点赞
            DY_MERCHANT_SHARE: "", //抖音赚 转发
            DY_MERCHANT_COMMENT: "", //抖音赚 评论

            TT_MERCHANT_SUBSCRIBE: "", //头条赚 关注
            TT_MERCHANT_LIKE: "", //头条赚 点赞
            TT_MERCHANT_SHARE: "", //头条赚 转发
            TT_MERCHANT_COMMENT: "" //头条赚 评论
        };
    },
    mounted() {
        this.getJson();
    },
    methods: {
        getJson() {
            //获取系统配置
            axios
                .request({
                    url: "system/configs",
                    method: "get"
                })
                .then(res => {
                    this.sysJson = res.data.data;
                    for (let i = 0; i < this.JsonFilterArr.length; i++) {
                        for (let j = 0; j < this.sysJson.length; j++) {
                            if (
                                this.JsonFilterArr[i] === this.sysJson[j].flag
                            ) {
                                this.$data[
                                    this.JsonFilterArr[i]
                                ] = this.sysJson[j].param;
                            }
                        }
                    }
                    console.log(this.$data);
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
                            url: "merchants",
                            method: "post",
                            data: {
                                username: this.formInline.username,
                                password: this.formInline.password,
                                name: this.formInline.name,
                                tel: this.formInline.tel,
                                wechat: this.formInline.wechat,

                                wx_commission:
                                    this.formInline.wx_commission === ""
                                        ? this.WECHAT_MERCHANT_COST
                                        : this.formInline.wx_commission, //发圈赚

                                //dy
                                dy_subscribe:
                                    this.formInline.dy_subscribe === ""
                                        ? this.DY_MERCHANT_SUBSCRIBE
                                        : this.formInline.dy_subscribe,
                                dy_like:
                                    this.formInline.dy_like === ""
                                        ? this.DY_MERCHANT_LIKE
                                        : this.formInline.dy_like,
                                dy_share:
                                    this.formInline.dy_share === ""
                                        ? this.DY_MERCHANT_SHARE
                                        : this.formInline.dy_share,
                                dy_comment:
                                    this.formInline.dy_comment === ""
                                        ? this.DY_MERCHANT_COMMENT
                                        : this.formInline.dy_comment,

                                //tt
                                tt_subscribe:
                                    this.formInline.tt_subscribe === ""
                                        ? this.TT_MERCHANT_SUBSCRIBE
                                        : this.formInline.tt_subscribe,
                                tt_like:
                                    this.formInline.tt_like === ""
                                        ? this.TT_MERCHANT_LIKE
                                        : this.formInline.tt_like,
                                tt_share:
                                    this.formInline.tt_share === ""
                                        ? this.TT_MERCHANT_SHARE
                                        : this.formInline.tt_share,
                                tt_comment:
                                    this.formInline.tt_comment === ""
                                        ? this.TT_MERCHANT_COMMENT
                                        : this.formInline.tt_comment,

                                share_commission:
                                    this.formInline.share_commission === ""
                                        ? this.SHARE_MERCHANT_COST
                                        : this.formInline.share_commission, //分享赚
                                principal: this.formInline.principal,
                                custom_service: this.formInline.custom_service,

                                remark: this.formInline.remark,
                                recommend_type:this.formInline.recommend_type,
                                recommend_id:this.formInline.recommend_id,
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
