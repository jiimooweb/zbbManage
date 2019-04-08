<template>
    <div class="APPRENTICECHECKLIST">
        <i-form ref="search" class="search" :model="searchData">
            <row :gutter='16'>
                <i-col span='6'>
                    <row>
                        <i-col span='10' style="line-height:33px;text-align:center;">
                            <FormItem prop="type1">
                                <Select v-model="searchData.type1">
                                    <Option value="username">徒弟名称</Option>
                                    <Option value="apprentice_id">徒弟ID</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type1Text">
                                <Input type="text" v-model="searchData.type1Text" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='6'>
                    <row>
                        <i-col span='10' style="line-height:33px;text-align:center;">
                            <FormItem prop="type2">
                                <Select v-model="searchData.type2">
                                    <Option value="name">真实姓名</Option>
                                    <Option value="phone">手机号</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type2Text">
                                <Input type="text" v-model="searchData.type2Text" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='6'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            <span class="lable">账号：</span>
                        </i-col>
                        <i-col span='18'>
                            <FormItem>
                                <Input type="text" v-model="searchData.account" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='6'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            <span class="lable">审核类型：</span>
                        </i-col>
                        <i-col span='18'>
                            <FormItem>
                                <Select v-model="searchData.type" style="display:block;">
                                    <Option :value="2">全部</Option>
                                    <Option value="wx">微信</Option>
                                    <Option value="dy">抖音号</Option>
                                    <Option value="tt">头条号</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='6'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            <span class="lable">审核状态：</span>
                        </i-col>
                        <i-col span='18'>
                            <FormItem>
                                <Select v-model="searchData.status" style="display:block;">
                                    <Option :value="2">全部</Option>
                                    <Option :value="0">待审核</Option>
                                    <Option :value="1">已通过</Option>
                                    <Option :value="-1">拒绝</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='6'>
                    <row>
                        <i-col span='10' style="line-height:33px;text-align:center;">
                            <FormItem prop="type3">
                                <Select v-model="searchData.type3">
                                    <Option value="created_at">创建时间</Option>
                                    <!-- <Option value="updated_at">更新时间</Option>
                                    <Option value="login_time">最后登录时间</Option> -->
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type3Text">
                                <DatePicker :value="searchData.type3Text" @on-change='changeDate' type="daterange"
                                    placeholder="选择日期"></DatePicker>
                                <!-- <DatePicker type='daterange' @on-change='changeActiveDate' :value='activeData.activeDate' placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker> -->
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='2'>
                    <Button type="success" @click="searchList()">搜索</Button>
                </i-col>
            </row>
        </i-form>
        <row style="margin-bottom:10px;">
            <i-col span='10' :style='"display:" + (this.hasPower(this.$store.state.user.access,"apprenticeCheckList-review")? "inline-block;": "none;")'>
                <!-- <Button @click="returnAdd()" style="display:block;float:left;">添加</Button> -->
                <Button type='success' @click="cancelpass(true)" style="display:block;float:left;">批量通过</Button>
                <Button type='error' @click="cancelFail(true)" style="display:block;float:left;margin-left:10px;">批量拒绝</Button>
            </i-col>
            <i-col span='2' offset='12'>
                <!-- <Button type="error" @click="returnExcel()">导出</Button> -->
            </i-col>
        </row>
        <Table stripe :columns="masterColumn" border :data="masterList" @on-select='selectItem' @on-select-all='selectItem'
            @on-selection-change='selectItem'></Table>

        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getMasterList" @on-page-size-change='changePageGetList' />
        <Modal v-model="cancelModal" title='删除' @on-ok="cancelItem(1)" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除徒弟账号----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
        <Modal v-model="oneModal" title='审核' @on-ok="onePassOrFail()" @on-cancel="cancelone(false)">
            <p v-if="isPass" style="text-align:center;font-size:16px;">是否通过<span style='color:red;'>{{currentName}}</span>的审核</p>
            <p v-else style="text-align:center;font-size:16px;">是否拒绝<span style='color:red;'>{{currentName}}</span>的审核</p>
        </Modal>
        <Modal v-model="passModal" title='批量通过' @on-ok="allPass()" @on-cancel="cancelpass(false)">
            <p style="text-align:center;font-size:16px;">是否使用批量通过功能</p>
        </Modal>
        <Modal v-model="failModal" title='批量拒绝' @on-ok="allFail()" @on-cancel="cancelFail(false)">
            <p style="text-align:center;font-size:16px;">是否使用批量拒绝功能</p>
        </Modal>
        <Modal v-model="editModal" title="修改" class="APPRENTICECHECKLISTModal" @on-ok="okEdit" @on-cancel="cancelEdit"
            :mask-closable="false" footer-hide>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="username" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">徒弟账号:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入账号" class="formInput" v-model="formInline.username"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="password" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">密码:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="密码留空则不修改" v-model="formInline.password" class="formInput"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="sex" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">性别:</span>
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
                            <span class="lable">真实姓名:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入姓名" class="formInput" v-model="formInline.name"></i-input>
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
                <!-- <FormItem prop="email" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">邮箱:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入邮箱" class="formInput" v-model="formInline.email"></i-input>
                        </i-col>
                    </row>
                </FormItem> -->
                <FormItem prop="referral_id" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">师傅ID:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入师傅ID" class="formInput" v-model="formInline.referral_id"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <!-- <FormItem prop="apprentice_limit" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">徒弟数量限制:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入徒弟数量限制" class="formInput" type='number' v-model="formInline.apprentice_limit"></i-input>
                        </i-col>
                    </row>
                </FormItem> -->
                <FormItem prop="remark" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">备注:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="备注" class="formInput" v-model="formInline.remark"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <!-- <FormItem prop="blacklist" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">拉黑:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-switch v-model="formInline.blacklist" :true-value='1' :false-value='0' />
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="disable" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">禁用:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-switch v-model="formInline.disable" :true-value='1' :false-value='0' />
                        </i-col>
                    </row>
                </FormItem> -->
                <FormItem style="width:100%;" class="formItem">
                    <Button type="primary" style='margin:0 auto;display:block;' @click="handleSubmit('formInline')">提交</Button>
                    <!-- <Button style="margin-left:10px;" @click="resetData('formInline')">重置</Button> -->
                </FormItem>
            </i-form>
        </Modal>
        <Modal v-model="showPicModal" title="大图" class="APPRENTICECHECKLISTModal" footer-hide>
            <img :src="bigPic" style="width:100%;height:auto;">
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { returnHasPower, isShowColumn } from "@/libs/util";
export default {
    data() {
        return {
            showPicModal:false,
            bigPic:'',
            currentId: "",
            editModal: false,
            deleteName: "",
            searchData: {
                type1: "username",
                type1Text: "",
                type2: "name",
                type2Text: "",
                type: 2,
                status: 2,
                account: "",
                type3: "created_at",
                type3Text: ""
            },
            formInline: {
                blacklist: 0,
                disable: 0,
                username: "",
                password: "",
                sex: 1,
                name: "",
                phone: "",
                wx: "",
                // email: "",
                //referral_id: "", //推荐人ID
                apprentice_limit: "", //徒弟数量限制
                remark: ""
            },
            oneData: "",
            ruleInline: {
                username: [
                    {
                        required: true,
                        message: "请输入账号",
                        trigger: "blur"
                    }
                ],
                password: [
                    // {
                    //     required: true,
                    //     message: "请输入密码",
                    //     trigger: "blur"
                    // },
                    // {
                    //     type: "string",
                    //     min: 6,
                    //     message: "密码最少6个字符",
                    //     trigger: "blur"
                    // }
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
                // email: [
                //     {
                //         required: true,
                //         message: "请输入邮箱",
                //         trigger: "blur"
                //     },
                //     {
                //         type: "email",
                //         message: "邮箱格式不正确",
                //         trigger: "blur"
                //     }
                // ],
                apprentice_limit: [
                    // {
                    //     required: true,
                    //     message: "请输入徒弟数量限制",
                    //     trigger: "blur"
                    // },
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
            },
            masterColumn: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
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
                    title: "ID",
                    align: "center",
                    width: "100",
                    // key: "id"
                    render(h, params) {
                        return h("p", params.row.id);
                    }
                },
                {
                    title: "徒弟ID",
                    align: "center",
                    width: "100",
                    // key: "id"
                    render(h, params) {
                        return h("p", params.row.apprentice?params.row.apprentice.id:'无');
                    }
                },
                {
                    title: "徒弟名称",
                    align: "center",
                    width: "200",
                    // key: "username"
                    render(h, params) {
                        return h("p", params.row.apprentice?params.row.apprentice.username:'无');
                    }
                },
                {
                    title: "审核状态",
                    align: "center",
                    width: "100",
                    fixed: "left",
                    // key:'status'
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "color:#" +
                                        (params.row.status === 0
                                            ? "ff9900"
                                            : params.row.status === 1
                                            ? "19be6b"
                                            : params.row.status === -1
                                            ? "ed4014"
                                            : "999")
                                }
                            },
                            params.row.status === 0
                                ? "待审核"
                                : params.row.status === 1
                                ? "已通过"
                                : params.row.status === -1
                                ? "已拒绝"
                                : "已失效"
                        );
                    }
                },
                {
                    title: "真实姓名",
                    align: "center",
                    width: "100",
                    // key: "name"
                    render(h, params) {
                        return h("p", params.row.apprentice?params.row.apprentice.name:'无');
                    }
                },
                {
                    title: "手机号",
                    align: "center",
                    width: "150",
                    // key: "phone"
                    render(h, params) {
                        return h("p", params.row.apprentice?params.row.apprentice.phone:'无');
                    }
                },
                {
                    title: "审核类型",
                    align: "center",
                    width: "100",
                    fixed: "left",
                    // key: "wx"
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "color:#" +
                                        (params.row.type === "wx"
                                            ? "2f9833"
                                            : params.row.type === "dy"
                                            ? "161823"
                                            : "ed4040")
                                }
                            },
                            params.row.type === "wx"
                                ? "微信"
                                : params.row.type === "dy"
                                ? "抖音"
                                : "头条"
                        );
                    }
                },
                {
                    title: "账号",
                    align: "center",
                    width: "200",
                    // key: "wx"
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "color:#" +
                                        (params.row.account !== ""
                                            ? "19be6b"
                                            : "ed4014")
                                }
                            },
                            params.row.account === ""
                                ? "无"
                                : params.row.account
                        );
                    }
                },
                {
                    title: "审核图片",
                    align: "center",
                    width: "300",
                    render:(h,params)=> {
                        return h('div',[
                            h('img',{
                                attrs:{
                                    style:'width:50px;',
                                    src:(params.row.type === "wx"? params.row.wx_qr_img: (params.row.type === "dy"? params.row.dy_home_img: params.row.tt_home_img))
                                },
                                on: {
                                    click: () => {
                                        this.showPicModal = true
                                        this.bigPic = (params.row.type === "wx"? params.row.wx_qr_img: (params.row.type === "dy"? params.row.dy_home_img: params.row.tt_home_img))
                                    }
                                }
                            }),
                            h('img',{
                                attrs:{
                                    style:'width:50px;',
                                    disabled: params.row.type === "wx"?true:false,
                                    src:(params.row.type === "wx"? params.row.wx_friends_img:'')
                                },
                                on: {
                                    click: () => {
                                        this.showPicModal = true
                                        this.bigPic = (params.row.type === "wx"? params.row.wx_friends_img:'')
                                    }
                                }
                            })
                        ])
                    },
                },
                {
                    title: "创建日期",
                    align: "center",
                    width: "200",
                    key: "created_at"
                },
                {
                    title: "操作",
                    align: "center",
                    width: "250",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small",
                                        disabled: params.row.status !== 0
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "apprenticeCheckList-review"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.isPass = true;
                                            this.currentId = params.row.id;
                                            this.currentName = params.row.name;
                                            this.cancelone(true);
                                        }
                                    }
                                },
                                "通过"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small",
                                        disabled: params.row.status !== 0
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "apprenticeCheckList-review"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.isPass = false;
                                            this.currentId = params.row.id;
                                            this.currentName = params.row.name;
                                            this.cancelone(true);
                                        }
                                    }
                                },
                                "拒绝"
                            )
                        ]);
                    }
                }
            ],
            masterList: [],
            cancelModal: false,
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50, 200, 500],
            selectList: [],
            ids: [],
            passModal: false,
            failModal: false,
            oneModal: false,
            isPass: false,
            currentName: ""
        };
    },
    computed: {
        getAccess() {
            return this.$store.state.user.access;
        }
    },
    watch: {
        getAccess: function(a, b) {
            isShowColumn(a, ["apprenticeCheckList-review"], this.masterColumn);
        }
    },
    methods: {
        cancelone(i) {
            this.oneModal = i;
        },
        cancelpass(i) {
            if (this.ids.length === 0) {
                this.$Message.error("没有选择，无法使用批量通过功能");
                return;
            }
            this.passModal = i;
        },
        cancelFail(i) {
            if (this.ids.length === 0) {
                this.$Message.error("没有选择，无法使用批量拒绝功能");
                return;
            }
            this.failModal = i;
        },
        onePassOrFail() {
            axios
                .request({
                    url: "apprentices/checks/" + this.currentId,
                    method: "put",
                    data: {
                        status: this.isPass ? "1" : "-1"
                    }
                })
                .then(res => {
                    this.$Message.success(
                        "审核成功!" + (this.isPass ? "已通过" : "已拒绝")
                    );
                    this.cancelone(false);
                    this.searchList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        allPass() {
            if (this.ids.length === 0) {
                this.$Message.error("没有选择，无法使用批量功能");
                return;
            }
            axios
                .request({
                    url: "apprentices/bathchecks",
                    method: "post",
                    data: {
                        ids: this.ids,
                        status: 1
                    }
                })
                .then(res => {
                    this.$Message.success("批量通过成功");
                    this.searchList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        allFail() {
            if (this.ids.length === 0) {
                this.$Message.error("没有选择，无法使用批量功能");
                return;
            }
            axios
                .request({
                    url: "apprentices/bathchecks",
                    method: "post",
                    data: {
                        ids: this.ids,
                        status: -1
                    }
                })
                .then(res => {
                    this.$Message.success("批量拒绝成功");
                    this.searchList();
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
        cancelItem() {
            axios
                .request({
                    url: "apprentices/" + this.currentId,
                    method: "delete"
                })
                .then(res => {
                    this.$Message.success("删除成功");
                    this.cancelcancel(false);
                    this.searchList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        returnExcel() {
            //导出excel
            let token = ''
            axios.request({
                url:'https://www.iryi.cn/',
                method:'get'
            }).then(res=>{
                token = res.data
            })
        },
        returnAdd() {
            this.$router.push({ path: "/newApprentice" });
        },
        selectItem(selection, row) {
            this.selectList = selection;
            this.ids = [];
            for (let i = 0; i < selection.length; i++) {
                this.ids.push(selection[i].id);
            }
            console.log(this.ids.length);
        },
        changeDate(t) {
            this.searchData.type3Text = t;
        },
        showEdit(i) {
            this.editModal = i;
        },
        okEdit() {},
        cancelEdit() {},
        getOneMaster() {
            axios
                .request({
                    url: "apprentices/checks/" + this.currentId,
                    method: "get"
                })
                .then(res => {
                    // console.log(res);
                    this.oneData = res.data.data;
                    this.formInline.referral_id = this.oneData.referral_id;
                    this.formInline.blacklist = this.oneData.blacklist;
                    this.formInline.disable = this.oneData.disable;
                    this.formInline.sex = this.oneData.sex;
                    this.formInline.username = this.oneData.username;
                    this.formInline.password = this.oneData.password;
                    this.formInline.name = this.oneData.name;
                    this.formInline.phone = this.oneData.phone;
                    this.formInline.wx = this.oneData.wx;
                    // this.formInline.email = this.oneData.email;
                    this.formInline.apprentice_limit = this.oneData.apprentice_limit;
                    this.formInline.remark = this.oneData.remark;
                    this.showEdit(true);
                    // this.masterList = res.data.data.data;
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        searchList() {
            axios
                .request({
                    url:
                        "apprentices/checks?pagesize=" +
                        this.per_page +
                        "&page=" +
                        this.currentPage +
                        "&" +
                        this.searchData.type1 +
                        "=" +
                        this.searchData.type1Text +
                        "&" +
                        this.searchData.type2 +
                        "=" +
                        this.searchData.type2Text +
                        "&" +
                        this.searchData.type3 +
                        "=" +
                        (this.searchData.type3Text === ""
                            ? ""
                            : this.searchData.type3Text[0] === ""
                            ? ""
                            : JSON.stringify(this.searchData.type3Text)) +
                        "&type=" +
                        (this.searchData.type === 2
                            ? ""
                            : this.searchData.type) +
                        "&status=" +
                        (this.searchData.status === 2
                            ? ""
                            : this.searchData.status) +
                        "&account=" +
                        this.searchData.account,
                    method: "get"
                })
                .then(res => {
                    this.masterList = res.data.data.data;
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.current_page;
                    this.per_page = res.data.data.per_page;
                    // this.$Message.success("搜索成功");
                    for(let i=0;i<this.masterList.length;i++){
                        console.log(this.masterList[i].apprentice.wx_qr_img);
                        
                    }
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        changePageGetList(size) {
            this.currentPage = 1;
            this.per_page = size;
            this.searchList();
        },
        getMasterList(index) {
            this.currentPage = index;
            this.searchList();
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: "apprentices/" + this.currentId,
                            method: "put",
                            data: {
                                referral_id: this.formInline.referral_id,
                                // blacklist: this.formInline.blacklist,
                                // disable: this.formInline.disable,
                                sex: this.formInline.sex,
                                username: this.formInline.username,
                                password: this.formInline.password,
                                name: this.formInline.name,
                                phone: this.formInline.phone,
                                wx: this.formInline.wx,
                                // email: this.formInline.email,
                                apprentice_limit: this.formInline
                                    .apprentice_limit,
                                remark: this.formInline.remark
                            }
                        })
                        .then(res => {
                            this.$Message.success("修改成功");
                            this.resetData("formInline");
                            this.showEdit(false);
                            this.getMasterList();
                            
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
    },
    mounted() {
        this.searchList();
    }
};
</script>

<style lang='less'>
.APPRENTICECHECKLIST {
    min-width: 1100px;
    .search {
        margin-bottom: 15px;
        .ivu-form-item-content {
            line-height: 1 !important;
            margin-left: 0 !important;
        }
        .ivu-form-item-label {
            text-align: center;
        }
    }
    .formItem {
        width: 100%;
    }
}
.APPRENTICECHECKLISTModal {
    .formPage {
        .formItem {
            width: 100%;
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
}
</style>