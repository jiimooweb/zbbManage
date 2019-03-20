<template>
    <div class="BINDINGBANK">
        <i-form ref="search" class="search" :model="searchData" >
            <row :gutter='16'>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type1">
                                <Select v-model="searchData.type1" @on-change="changeType1">
                                    <Option value="man_id">用户ID</Option>
                                    <Option value="username">用户账户</Option>
                                    <Option value="check_">审核ID</Option>
                                    <Option value="man_name">真实姓名</Option>
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
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:right;">
                            用户类型:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="type2" lable='用户类型'>
                                <Select v-model="searchData.manType">
                                    <Option :value="2">全部</Option>
                                    <Option value="Master">师傅</Option>
                                    <Option value="Apprentice">徒弟</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type3">
                                <Select v-model="searchData.type3">
                                    <Option value="bank_name">银行名称</Option>
                                    <Option value="bank_id">银行ID</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type3Text">
                                <Input type="text" v-model="searchData.type3Text" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type4">
                                <Select v-model="searchData.type4">
                                    <Option value="bank_man">持卡人姓名</Option>
                                    <Option value="bank_number">卡号</Option>
                                    <!-- <Option value="bank_deposit">支行</Option> -->
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type4Text">
                                <Input type="text" v-model="searchData.type4Text" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:right;">
                            审核状态:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="state" lable='审核状态'>
                                <Select v-model="searchData.state">
                                    <Option :value="2">全部</Option>
                                    <Option :value="0">待审核</Option>
                                    <Option :value="1">已通过</Option>
                                    <Option :value="-1">未通过</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type5">
                                <Select v-model="searchData.type5">
                                    <Option value="created_at">创建时间</Option>
                                    <Option value="updated_at">更新时间</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='14'>
                            <FormItem prop="type5Text">
                                <DatePicker :value="searchData.type5Text" @on-change='changeDate' type="daterange"
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
            <i-col span='2' offset='22'>
                <Button type='error' @click="returnExcel()">导出</Button>
            </i-col>
            <!-- <i-col span='10'>
                <Button type='success' @click="cancelpass(true)" style="display:block;float:left;margin-left:10px;">批量通过</Button>
                <Button type='error' @click="cancelFail(true)" style="display:block;float:left;margin-left:10px;">批量拒绝</Button>
            </i-col> -->
        </row>
        <Table stripe :columns="column" border :data="list" @on-select='selectItem'></Table>

        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getList" @on-page-size-change='changePageGetList' />
        <!-- <Modal v-model="cancelModal" title='删除' @on-ok="cancelItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除师傅账号----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal> -->
        <!-- <Modal v-model="passModal" title='批量通过' @on-ok="allPass()" @on-cancel="cancelpass(false)">
            <p style="text-align:center;font-size:16px;">是否使用批量通过功能</p>
        </Modal>
        <Modal v-model="failModal" title='批量拒绝' @on-ok="allFail()" @on-cancel="cancelFail(false)">
            <p style="text-align:center;font-size:16px;">是否使用批量拒绝功能</p>
        </Modal>
        <Modal v-model="onepassModal" title='批量通过' @on-ok="pass()" @on-cancel="cancelonepass(false)">
            <p style="text-align:center;font-size:16px;">是否通过---<span style="color:red;">{{currentName}}</span>---的绑定请求</p>
        </Modal>
        <Modal v-model="onefailModal" title='批量拒绝' @on-ok="fail()" @on-cancel="canceloneFail(false)">
            <p style="text-align:center;font-size:16px;">是否拒绝---<span style="color:red;">{{currentName}}</span>---的绑定请求</p>
        </Modal> -->
        <Modal v-model="editModal" title='资料详情' footer-hide width='600px'>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="bank_id" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">银行ID</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入银行ID" class="formInput" v-model="formInline.bank_id"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="bank_man" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">持卡人姓名</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入持卡人姓名" class="formInput" v-model="formInline.bank_man"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="bank_number" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">卡号</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入卡号" type='number' class="formInput" v-model="formInline.bank_number" @mousewheel.native.prevent></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="alipay" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">支付宝号</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入支付宝号" class="formInput" v-model="formInline.alipay"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="id_card" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">身份证正面照片</span>
                        </i-col>
                        <i-col span='18'>
                            <Upload style="margin-bottom:10px;" action="http://120.79.203.214/zbb/public/upload"
                                :on-success='successUpload' :before-upload='beforeUpload' :show-upload-list='false'
                                :headers="headers">
                                <Button icon="md-add" class="btnUp">
                                    <span>上传身份证正面照片</span>
                                </Button>
                            </Upload>
                            <img :src="formInline.id_card" width="150px" style="float:left;margin-right:10px;margin-bottom:10px;">
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="width:100%">
                    <Button type="primary" style="margin:10px auto;display:block" @click="handleSubmit('formInline')">提交</Button>
                    <!-- <Button style="margin-left:10px;" @click="resetData('formInline')">重置</Button> -->
                </FormItem>
            </i-form>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
export default {
    computed: {
        headers() {
            return {
                token: Cookies.get("token")
                // token: localStorage.getItem('')
            };
        }
    },
    data() {
        return {
            formInline:{
                bank_id:'',
                bank_man:'',
                bank_number:'',
                alipay:'',
                id_card:''
            },  
            ruleInline:{
                bank_id: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value && value !== 0) {
                                callback("请输入银行ID");
                            }
                            callback(errors);
                        }
                    }
                ],
                bank_man: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请输入持卡人姓名");
                            }
                            callback(errors);
                        }
                    }
                ],
                bank_number: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请输入持卡号");
                            }
                            callback(errors);
                        }
                    }
                ],
                alipay: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请输入支付宝账号");
                            }
                            callback(errors);
                        }
                    }
                ],
                id_card: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (value === "" || !value) {
                                callback("请上传身份证截图");
                            }
                            callback(errors);
                        }
                    }
                ]
            },
            EditModal:false,
            currentName: "",
            onepassModal: false,
            onefailModal: false,
            failModal: false,
            passModal: false,
            currentId: "",
            editModal: false,
            deleteName: "",
            searchData: {
                type1: "man_id",
                type1Text: "",
                manType: 2,
                type3: "bank_name",
                type3Text: "",
                type4: "bank_man",
                type4Text: "",
                type5: "created_at",
                type5Text: "",
                //
                username: "",
                man_name: "",
                man_id: "",
                check_id: "",
                man_type: "",
                bank_name: "",
                bank_id: "",
                bank_man: "",
                bank_number: "",
                // bank_deposit:'',
                state: 2
            },
            oneData: "",
            column: [
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
                    title: "审核ID",
                    align: "center",
                    width: "100",
                    key: "id"
                },
                {
                    title: "用户类型",
                    align: "center",
                    width: "200",
                    // key: "man_type"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.man_type === "Master" ? "师傅" : "徒弟"
                        );
                    }
                },
                {
                    title: "用户ID",
                    align: "center",
                    width: "200",
                    render: (h, params) => {
                        return h("p", params.row.man.id);
                    }
                },
                {
                    title: "用户账号",
                    align: "center",
                    width: "200",
                    // key: "username",
                    render: (h, params) => {
                        return h("p", params.row.man.username);
                    }
                },
                {
                    title: "银行ID",
                    align: "center",
                    width: "200",
                    // key: "bank_id"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.bank === null ? "无" : params.row.bank.id
                        );
                    }
                },
                {
                    title: "银行名称",
                    align: "center",
                    width: "200",
                    // key: "bank_name"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.bank === null
                                ? "无"
                                : params.row.bank.name
                        );
                    }
                },
                {
                    title: "持卡人姓名",
                    align: "center",
                    width: "200",
                    // key: "bank_man"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.bank_man === null
                                ? "无"
                                : params.row.bank_man
                        );
                    }
                },
                {
                    title: "卡号",
                    align: "center",
                    width: "200",
                    // key: "bank_number"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.bank_number === null
                                ? "无"
                                : params.row.bank_number
                        );
                    }
                },
                {
                    title: "支付宝号",
                    align: "center",
                    width: "200",
                    // key: "alipay"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.alipay === null
                                ? "无"
                                : params.row.alipay
                        );
                    }
                },
                {
                    title: "真实姓名",
                    align: "center",
                    width: "200",
                    // key: "man_name"
                    render: (h, params) => {
                        return h("p", params.row.man.name);
                    }
                },
                // {
                //     title: "审核状态",
                //     align: "center",
                //     width: "100",
                //     fixed: "right",
                //     render: (h, params) => {
                //         return h(
                //             "p",
                //             {
                //                 attrs: {
                //                     style:
                //                         "color:" +
                //                         (params.row.state === 0
                //                             ? "#999"
                //                             : params.row.state === 1
                //                             ? "#19be6b"
                //                             : "red")
                //                 }
                //             },
                //             params.row.state === 0
                //                 ? "待审核"
                //                 : params.row.state === 1
                //                 ? "已通过"
                //                 : "不通过"
                //         );
                //     }
                // },
                {
                    title: "身份证正面照片",
                    align: "center",
                    width: "200",
                    // key: "id_card"
                    render: (h, params) => {
                        if (params.row.id_card) {
                            return h("img", {
                                attrs: {
                                    style:
                                        "width:70px;height:70px;display:block;margin:0 auto;",
                                    src: params.row.id_card
                                }
                            });
                        } else {
                            return h("p", "无");
                        }
                    }
                },{
                    title: "操作",
                    align: "center",
                    width:'100',
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    attrs: {
                                        style: "font-size:12px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.formInline.bank_id = params.row.bank_id
                                            this.formInline.bank_man = params.row.bank_man
                                            this.formInline.bank_number = params.row.bank_number
                                            this.formInline.alipay = params.row.alipay,
                                            this.formInline.id_card = params.row.id_card
                                            this.showEdit(true)
                                        }
                                    }
                                },
                                "修改"
                            )
                        ]);
                    }
                }
            ],
            list: [],
            ids: [],
            cancelModal: false,
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 20, 50, 100, 200],
            selectList: []
        };
    },
    methods: {
        successUpload(file){
            if(this.formInline.id_card !== ''){
                axios
                .request({
                    url: "http://120.79.203.214/zbb/public/delete",
                    method: "post",
                    data: {
                        url: this.formInline.id_card
                    }
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
            }
            this.formInline.id_card = file.url
        },
        beforeUpload(){

        },
        returnExcel(){
            let token = ''
            axios.request({
                url:'http://120.79.203.214/zbb/public/export-token',
                method:'get'
            }).then(res=>{
                token = res.data
                let url = 'http://120.79.203.214/zbb/public/backend/bank/bind/export?username='+ (this.searchData.type1 === "username" ? this.searchData.type1Text : "") +
            "&man_name="+(this.searchData.type1 === "man_name"? this.searchData.type1Text: "") +
            "&man_id="+(this.searchData.type1 === "man_id"? this.searchData.type1Text: "") +
            "&check_id="+(this.searchData.type1 === "check_id" ? this.searchData.type1Text: "") +
            "&man_type="+(this.searchData.manType === 2? "": this.searchData.manType) +
            "&bank_name="+(this.searchData.type3 === "bank_name"? this.searchData.type3Text: "") +
            "&bank_id="+(this.searchData.type3 === "bank_id"? this.searchData.type3Text: "") +
            "&bank_man="+(this.searchData.type4 === "bank_man"? this.searchData.type4Text: "") +
            "&bank_number="+(this.searchData.type4 === "bank_number"? this.searchData.type4Text: "") +
            "&created_at="+(this.searchData.type5 === "created_at"? this.searchData.type5Text[0] === ""? "": this.searchData.type5Text: "") +
            "&updated_at="+(this.searchData.type5 === "updated_at"? this.searchData.type5Text[0] === ""? "": this.searchData.type5Text: "") +
            "&state="+(this.searchData.state === 2? "": this.searchData.state) +
            "&token="+token
            
                window.open(url);
            })
            
        },
        changeType1(i) {
            if (
                (i === "username" || i === "man_name") &&
                this.searchData.manType === 2
            ) {
                this.searchData.manType = "Master";
            }
        },
        cancelcancel(i) {
            this.cancelModal = i;
        },
        cancelItem() {
            axios
                .request({
                    url: "masters/" + this.currentId,
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
        returnAdd() {
            this.$router.push({ path: "/newMaster" });
        },
        selectItem(selection, row) {
            this.selectList = selection;
            this.ids = [];
            for (let i = 0; i < selection.length; i++) {
                this.ids.push(selection[i].id);
            }
        },
        changeDate(t) {
            this.searchData.type5Text = t;
        },
        showEdit(i) {
            this.editModal = i;
        },
        getOneMaster() {
            axios
                .request({
                    url: "masters/" + this.currentId,
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
                    this.formInline.email = this.oneData.email;
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
                        "bank/bind/show?page=" +
                        this.currentPage +
                        "&pagesize=" +
                        this.per_page,
                    method: "post",
                    data: {
                        //type1
                        username:
                            this.searchData.type1 === "username"
                                ? this.searchData.type1Text
                                : "", //用户账户
                        man_name:
                            this.searchData.type1 === "man_name"
                                ? this.searchData.type1Text
                                : "", //真实姓名
                        man_id:
                            this.searchData.type1 === "man_id"
                                ? this.searchData.type1Text
                                : "", //用户id
                        check_id:
                            this.searchData.type1 === "check_id"
                                ? this.searchData.type1Text
                                : "", //审核id

                        man_type:
                            this.searchData.manType === 2
                                ? ""
                                : this.searchData.manType, //用户类型

                        //type3
                        bank_name:
                            this.searchData.type3 === "bank_name"
                                ? this.searchData.type3Text
                                : "", //银行名称
                        bank_id:
                            this.searchData.type3 === "bank_id"
                                ? this.searchData.type3Text
                                : "", //银行id

                        //type4
                        bank_man:
                            this.searchData.type4 === "bank_man"
                                ? this.searchData.type4Text
                                : "", //持卡人姓名
                        bank_number:
                            this.searchData.type4 === "bank_number"
                                ? this.searchData.type4Text
                                : "", //卡号

                        //type5
                        created_at:
                            this.searchData.type5 === "created_at"
                                ? this.searchData.type5Text[0] === ""
                                    ? ""
                                    : this.searchData.type5Text
                                : "",
                        updated_at:
                            this.searchData.type5 === "updated_at"
                                ? this.searchData.type5Text[0] === ""
                                    ? ""
                                    : this.searchData.type5Text
                                : "",

                        // bank_deposit:'',
                        state:
                            this.searchData.state === 2
                                ? ""
                                : this.searchData.state //审核状态
                    }
                })
                .then(res => {
                    this.list = res.data.data.data;
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
        changePageGetList(size) {
            this.currentPage = 1;
            axios
                .request({
                    url:
                        "bank/bind/show?page=" +
                        this.currentPage +
                        "&pagesize=" +
                        size,
                    method: "post",
                    data: {
                        //type1
                        username:
                            this.searchData.type1 === "username"
                                ? this.searchData.type1Text
                                : "", //用户账户
                        man_name:
                            this.searchData.type1 === "man_name"
                                ? this.searchData.type1Text
                                : "", //真实姓名
                        man_id:
                            this.searchData.type1 === "man_id"
                                ? this.searchData.type1Text
                                : "", //用户id
                        check_id:
                            this.searchData.type1 === "check_id"
                                ? this.searchData.type1Text
                                : "", //审核id

                        man_type:
                            this.searchData.manType === 2
                                ? ""
                                : this.searchData.manType, //用户类型

                        //type3
                        bank_name:
                            this.searchData.type3 === "bank_name"
                                ? this.searchData.type3Text
                                : "", //银行名称
                        bank_id:
                            this.searchData.type3 === "bank_id"
                                ? this.searchData.type3Text
                                : "", //银行id

                        //type4
                        bank_man:
                            this.searchData.type4 === "bank_man"
                                ? this.searchData.type4Text
                                : "", //持卡人姓名
                        bank_number:
                            this.searchData.type4 === "bank_number"
                                ? this.searchData.type4Text
                                : "", //卡号

                        //type5
                        created_at:
                            this.searchData.type5 === "created_at"
                                ? this.searchData.type5Text[0] === ""
                                    ? ""
                                    : this.searchData.type5Text
                                : "",
                        updated_at:
                            this.searchData.type5 === "updated_at"
                                ? this.searchData.type5Text[0] === ""
                                    ? ""
                                    : this.searchData.type5Text
                                : "",

                        // bank_deposit:'',
                        state:
                            this.searchData.state === 2
                                ? ""
                                : this.searchData.state //审核状态
                    }
                })
                .then(res => {
                    this.list = res.data.data.data;
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
        getList(index) {
            this.currentPage = index;
            axios
                .request({
                    url:
                        "bank/bind/show?page=" +
                        this.currentPage +
                        "&pagesize=" +
                        this.per_page,
                    method: "post",
                    data: {
                        //type1
                        username:
                            this.searchData.type1 === "username"
                                ? this.searchData.type1Text
                                : "", //用户账户
                        man_name:
                            this.searchData.type1 === "man_name"
                                ? this.searchData.type1Text
                                : "", //真实姓名
                        man_id:
                            this.searchData.type1 === "man_id"
                                ? this.searchData.type1Text
                                : "", //用户id
                        check_id:
                            this.searchData.type1 === "check_id"
                                ? this.searchData.type1Text
                                : "", //审核id

                        man_type:
                            this.searchData.manType === 2
                                ? ""
                                : this.searchData.manType, //用户类型

                        //type3
                        bank_name:
                            this.searchData.type3 === "bank_name"
                                ? this.searchData.type3Text
                                : "", //银行名称
                        bank_id:
                            this.searchData.type3 === "bank_id"
                                ? this.searchData.type3Text
                                : "", //银行id

                        //type4
                        bank_man:
                            this.searchData.type4 === "bank_man"
                                ? this.searchData.type4Text
                                : "", //持卡人姓名
                        bank_number:
                            this.searchData.type4 === "bank_number"
                                ? this.searchData.type4Text
                                : "", //卡号

                        //type5
                        created_at:
                            this.searchData.type5 === "created_at"
                                ? this.searchData.type5Text[0] === ""
                                    ? ""
                                    : this.searchData.type5Text
                                : "",
                        updated_at:
                            this.searchData.type5 === "updated_at"
                                ? this.searchData.type5Text[0] === ""
                                    ? ""
                                    : this.searchData.type5Text
                                : "",

                        // bank_deposit:'',
                        state:
                            this.searchData.state === 2
                                ? ""
                                : this.searchData.state //审核状态
                    }
                })
                .then(res => {
                    this.list = res.data.data.data;
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
        cancelonepass(i) {
            this.onepassModal = i;
        },
        canceloneFail(i) {
            this.onefailModal = i;
        },
        pass() {
            axios
                .request({
                    url: "bank/bind/adopt",
                    method: "post",
                    data: {
                        bind: this.currentId
                    }
                })
                .then(res => {
                    this.$Message.success("通过成功");
                    this.searchList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        fail() {
            axios
                .request({
                    url: "bank/bind/refuse",
                    method: "post",
                    data: {
                        bind: this.currentId
                    }
                })
                .then(res => {
                    this.$Message.success("拒绝成功");
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
                    url: "bank/bind/all/adopt",
                    method: "post",
                    data: {
                        checks: this.ids
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
                    url: "bank/bind/all/refuse",
                    method: "post",
                    data: {
                        checks: this.ids
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
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: "bank/bind/" + this.currentId + '/update',
                            method: "put",
                            data: {
                                bank_id: this.formInline.bank_id,
                                bank_man: this.formInline.bank_man,
                                bank_number: this.formInline.bank_number,
                                alipay: this.formInline.alipay,
                                id_card: this.formInline.id_card,
                            }
                        })
                        .then(res => {
                            this.$Message.success("修改成功");
                            this.resetData("formInline");
                            this.showEdit(false);
                            this.searchList();
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
        this.getList();
    }
};
</script>

<style lang='less'>
.BINDINGBANK{
    min-width: 1100px;
    .search {
        .ivu-form-item-content {
            line-height: 1 !important;
            margin-left: 0 !important;
        }
        .ivu-form-item-label{
            text-align: center;
        }
    }
}
</style>