<template>
    <div class="CLIENTLIST">
        <Button type="primary" style='margin:10px 0;display:block;' @click="newData()">添加客户</Button>
        <Table stripe :columns="column" border :data="list"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="editModal" title="客户资料" :mask-closable="false" footer-hide>
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
                            <i-input placeholder="输入密码" type='password' v-model="formInline.password" class="formInput"></i-input>
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
                <FormItem style="width:100%;">
                    <Button type="primary" style="margin:20px auto;display:block;" @click="handleSubmit('formInline')">提交</Button>
                </FormItem>
            </i-form>
        </Modal>
        <Modal v-model="cancelModal" title='删除' @on-ok="cancelItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除客户----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            editModal: false,
            cancelModal: false,
            deleteName: "",
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
            column: [
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
                    title: "客户ID",
                    width: "100",
                    align: "center",
                    key: "id"
                },
                {
                    title: "客户账户",
                    width: "100",
                    fixed:'left',
                    align: "center",
                    key: "username"
                },
                {
                    title: "微信号",
                    width: "200",
                    align: "center",
                    key: "wechat"
                },
                {
                    title: "姓名",
                    width: "100",
                    align: "center",
                    key: "name"
                },
                {
                    title: "联系方式",
                    width: "150",
                    align: "center",
                    key: "tel"
                },
                {
                    title: "推荐人类型",
                    width: "100",
                    align: "center",
                    // key: "recommend_type"
                    render:(h,params)=> {
                        return h('p',params.row.recommend_type==='Master'?'师傅':'徒弟')
                    },
                },
                {
                    title: "推荐人ID",
                    width: "100",
                    align: "center",
                    key: "recommend_id"
                },
                // {
                //     title: "对接人",
                //     width: "100",
                //     align: "center",
                //     key: "principal"
                // },
                {
                    title: "余额",
                    width: "100",
                    align: "center",
                    key: "money"
                },
                {
                    title: "发圈-佣",
                    width: "100",
                    align: "center",
                    key: "wx_commission"
                },
                {
                    title: "抖音关注",
                    width: "100",
                    align: "center",
                    key: "dy_subscribe"
                },
                {
                    title: "抖音点赞",
                    width: "100",
                    align: "center",
                    key: "dy_like"
                },
                {
                    title: "抖音转发",
                    width: "100",
                    align: "center",
                    key: "dy_share"
                },
                {
                    title: "抖音评论",
                    width: "100",
                    align: "center",
                    key: "dy_comment"
                },

                {
                    title: "头条关注",
                    width: "100",
                    align: "center",
                    key: "tt_subscribe"
                },
                {
                    title: "头条点赞",
                    width: "100",
                    align: "center",
                    key: "tt_like"
                },
                {
                    title: "头条转发",
                    width: "100",
                    align: "center",
                    key: "tt_share"
                },
                {
                    title: "头条评论",
                    width: "100",
                    align: "center",
                    key: "tt_comment"
                },

                {
                    title: "分享-佣",
                    width: "100",
                    align: "center",
                    key: "share_commission"
                },
                {
                    title: "备注",
                    // key: "remark"
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                                }
                            },
                            params.row.ramark
                        );
                    }
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
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.editModal = true;
                                            this.formInline = {
                                                username: params.row.username,
                                                name: params.row.name,
                                                tel: params.row.tel,
                                                wechat: params.row.wechat,
                                                wx_commission:
                                                    params.row.wx_commission,

                                                //dy
                                                dy_subscribe:
                                                    params.row.dy_subscribe,
                                                dy_like: params.row.dy_like,
                                                dy_share: params.row.dy_share,
                                                dy_comment:
                                                    params.row.dy_comment,

                                                //tt
                                                tt_subscribe:
                                                    params.row.tt_subscribe,
                                                tt_like: params.row.tt_like,
                                                tt_share: params.row.tt_share,
                                                tt_comment:
                                                    params.row.tt_comment,

                                                share_commission:
                                                    params.row.share_commission,
                                                principal: params.row.principal,
                                                custom_service:
                                                    params.row.custom_service,

                                                remark: params.row.remark
                                            };
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
            TT_MERCHANT_COMMENT: "", //头条赚 评论
            currentId: "",
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50, 200, 500],
        };
    },
    mounted() {
        this.getList();
        this.getJson();
    },
    methods: {
        newData() {
            this.$router.push({ path: "/newClient" });
        },
        cancelItem() {
            axios
                .request({
                    url: "merchants/" + this.currentId,
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
                    url:
                        "merchants?page=" +
                        this.currentPage +
                        "&pagesize=" +
                        this.per_page,
                    method: "get"
                })
                .then(res => {
                    console.log(123);

                    this.list = res.data.data.data;
                    console.log(this.list);
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        getchangeList(index) {
            this.currentPage = index;
            this.getList();
        },
        changePageGetList(size) {
            this.currentPage = 1;
            this.per_page = size;
            this.getList();
        },
        getJson() {
            //获取系统配置
            axios
                .request({
                    url:
                        "system/configs?page=" +
                        this.currentPage +
                        "&pagesize=" +
                        this.defailPage,
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
                            url: "merchants/" + this.currentId,
                            method: "put",
                            data: {
                                username: this.formInline.username,
                                password:
                                    this.formInline.password === ""
                                        ? ""
                                        : this.formInline.password,
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
.formItem {
    width: 100%;
}
</style>
