<template>
    <div class="MASTERLIST">
        <i-form ref="search" class="search" :model="searchData" >
            <row :gutter='16'>
                <i-col span='5'>
                    <row>
                        <i-col span='10'>
                            <FormItem prop="type1">
                                <Select v-model="searchData.type1">
                                    <Option value="username">师傅名称</Option>
                                    <Option value="id">师傅ID</Option>
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
                        <i-col span='10'>
                            <FormItem prop="type2">
                                <Select v-model="searchData.type2">
                                    <Option value="name">真实姓名</Option>
                                    <Option value="phone">手机号</Option>
                                    <Option value="wx">微信号</Option>
                                    <Option value="referral_id">推荐人</Option>
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
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            禁用状态:
                        </i-col>
                        <i-col span='18'>
                            <FormItem>
                                <Select v-model="searchData.disable">
                                    <Option :value="2">无</Option>
                                    <Option :value="1">是</Option>
                                    <Option :value="0">否</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            拉黑状态:
                        </i-col>
                        <i-col span='18'>
                            <FormItem>
                                <Select v-model="searchData.blacklist">
                                    <Option :value="2">无</Option>
                                    <Option :value="1">是</Option>
                                    <Option :value="0">否</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            性 别:
                        </i-col>
                        <i-col span='18'>
                            <FormItem>
                                <Select v-model="searchData.sex">
                                    <Option :value="2">无</Option>
                                    <Option :value="1">男</Option>
                                    <Option :value="0">女</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='8'>
                            <FormItem prop="type3">
                                <Select v-model="searchData.type3">
                                    <Option value="created_at">创建时间</Option>
                                    <Option value="updated_at">更新时间</Option>
                                    <Option value="login_time">最后登录时间</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span='16'>
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
            <i-col span='2'>
                <Button @click="returnAdd()" :style='"display:" + (this.hasPower(this.$store.state.user.access,"newMaster")? "inline-block;": "none;")'>添加</Button>
            </i-col>
            <!-- <i-col span='2'>
                <Button type='success' @click="returnAdd()">批量通过</Button>
            </i-col>
            <i-col span='2'>
                <Button type='error' @click="returnAdd()">批量拒绝</Button>
            </i-col> -->
            <i-col span='2' offset='20'>
                <Button type="error" style="float:right;margin-bottom:10px;" @click="returnExcel()">导出</Button>
            </i-col>
        </row>
        <Table stripe :columns="masterColumn" border :data="masterList" @on-select='selectItem'></Table>

        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getMasterList" @on-page-size-change='changePageGetList' />
        <Modal v-model="cancelModal" title='删除' @on-ok="cancelItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除师傅账号----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
        <Modal v-model="editModal" class="MASTERLISTModal" title="修改"
            :mask-closable="false" footer-hide>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="username" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">师傅账号:</span>
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
                <FormItem prop="email" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">邮箱:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入邮箱" class="formInput" v-model="formInline.email"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="referral_id" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">推荐人ID:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入推荐人ID" class="formInput" v-model="formInline.referral_id"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="apprentice_limit" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">徒弟数量限制:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入徒弟数量限制" class="formInput" type='number' v-model="formInline.apprentice_limit" @mousewheel.native.prevent></i-input>
                            <!-- <InputNumber placeholder="输入徒弟数量限制" :min='0' style="width:100%;" v-model="formInline.apprentice_limit"></InputNumber> -->
                        </i-col>
                    </row>
                </FormItem>
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
                <FormItem style="width:100%;">
                    <Button type="primary" style='margin:0 auto;display:block;' @click="handleSubmit('formInline')">提交</Button>
                    <!-- <Button style="margin-left:10px;" @click="resetData('formInline')">重置</Button> -->
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
            currentId: "",
            editModal: false,
            deleteName: "",
            searchData: {
                type1: "username",
                type1Text: "",
                type2: "name",
                type2Text: "",
                disable: 2,
                blacklist: 2,
                sex: 2,
                type3: "created_at",
                type3Text: ""
            },
            formInline: {
                blacklist: "",
                disable: "",
                username: "",
                password: "",
                sex: "1",
                name: "",
                phone: "",
                wx: "",
                email: "",
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
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "邮箱格式不正确",
                        trigger: "blur"
                    }
                ],
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
                    title: "师傅ID",
                    align: "center",
                    width: "100",
                    key: "id"
                },
                {
                    title: "师傅名称",
                    align: "center",
                    width: "200",
                    key: "username"
                },
                {
                    title: "拉黑",
                    align: "center",
                    width: "100",
                    // key:'blacklist'
                    render: (h, params) => {
                        return (!returnHasPower(this.$store.state.user.access,"masterList-blacklist")
                            ? h("p",{attrs:{style:'color:#'+(params.row.blacklist === 0 ? "ed4014" : "19be6b")}}, params.row.blacklist === 0 ? "否" : "是")
                            : h(
                                  "i-switch",
                                  {
                                      props: {
                                          trueValue: 1,
                                          falseValue: 0,
                                          value: params.row.blacklist
                                      },
                                      on: {
                                          "on-change": val => {
                                              axios
                                                  .request({
                                                      url:
                                                          "masters/blacklist/" +
                                                          params.row.id +
                                                          "?blacklist=" +
                                                          val,
                                                      method: "get"
                                                  })
                                                  .then(res => {
                                                      this.$Message.success(
                                                          "修改成功"
                                                      );
                                                      this.searchList();
                                                  })
                                                  .catch(err => {
                                                      for (let i in err.response
                                                          .data.msg) {
                                                          this.$Message.error(
                                                              err.response.data
                                                                  .msg[i][0]
                                                          );
                                                      }
                                                  });
                                          }
                                      }
                                  },
                                  0
                              ));
                    }
                },
                {
                    title: "禁用",
                    align: "center",
                    width: "100",
                    // key:'disable'
                    render: (h, params) => {
                        return (!returnHasPower(this.$store.state.user.access,"masterList-disabled")
                            ? h("p",{attrs:{style:'color:#'+(params.row.disable === 0 ? "ed4014" : "19be6b")}}, params.row.disable === 0 ? "否" : "是")
                            : h(
                                  "i-switch",
                                  {
                                      props: {
                                          trueValue: 1,
                                          falseValue: 0,
                                          value: params.row.disable
                                      },
                                      on: {
                                          "on-change": val => {
                                              axios
                                                  .request({
                                                      url:
                                                          "masters/disable/" +
                                                          params.row.id +
                                                          "?disable=" +
                                                          val,
                                                      method: "get"
                                                  })
                                                  .then(res => {
                                                      this.$Message.success(
                                                          "修改成功"
                                                      );
                                                      this.searchList();
                                                  })
                                                  .catch(err => {
                                                      for (let i in err.response
                                                          .data.msg) {
                                                          this.$Message.error(
                                                              err.response.data
                                                                  .msg[i][0]
                                                          );
                                                      }
                                                  });
                                          }
                                      }
                                  },
                                  0
                              ));
                    }
                },
                // {
                //     title: "审核状态",
                //     align: "center",
                //     width: "100",
                //     // key:'status'
                //     render: (h, params) => {
                //         return h(
                //             "p",
                //             {
                //                 attrs: {
                //                     style:
                //                         "color:#" + params.row.status === 0
                //                             ? "#999"
                //                             : "19be6b"
                //                 }
                //             },
                //             params.row.status === 0 ? "待审核" : "已审核"
                //         );
                //     }
                // },
                {
                    title: "真实姓名",
                    align: "center",
                    width: "100",
                    key: "name"
                },
                {
                    title: "手机号",
                    align: "center",
                    width: "150",
                    key: "phone"
                },
                {
                    title: "性别",
                    align: "center",
                    width: "70",
                    key: "sex"
                },
                {
                    title: "微信号",
                    align: "center",
                    width: "200",
                    key: "wx"
                },
                {
                    title: "邮箱",
                    align: "center",
                    width: "200",
                    // key: "email"
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "color:#" +
                                        (params.row.email !== ""
                                            ? "19be6b"
                                            : "ed4014")
                                }
                            },
                            params.row.email === "" ? "无" : params.row.email
                        );
                    }
                },
                {
                    title: "备注",
                    align: "center",
                    width: "200",
                    key: "remark"
                },
                {
                    title: "徒弟总数",
                    align: "center",
                    width: "90",
                    key: "apprentices_count"
                },
                {
                    title: "徒弟上限数量",
                    align: "center",
                    width: "150",
                    key: "apprentice_limit"
                },
                {
                    title: "邀请码",
                    align: "center",
                    width: "200",
                    key: "invitation_code"
                },
                {
                    title: "余额",
                    align: "center",
                    width: "100",
                    key: "balance"
                },
                // {
                //     title: "推荐人",
                //     align: "center",
                //     width: "100",
                //     key: "referral_id"
                // },
                {
                    title: "最后登录IP",
                    align: "center",
                    width: "200",
                    // key: "ip"
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.login_records.length === 0
                                ? "无"
                                : params.row.login_records[0].ip
                        );
                    }
                },
                {
                    title: "最后登录时间",
                    align: "center",
                    width: "200",
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.login_records.length === 0
                                ? "无"
                                : params.row.login_records[0].time
                        );
                    }
                },
                {
                    title: "创建日期",
                    align: "center",
                    width: "200",
                    key: "created_at"
                },
                {
                    title: "更新日期",
                    align: "center",
                    width: "200",
                    key: "updated_at"
                },
                {
                    title: "操作",
                    align: "center",
                    width: "200",
                    render: (h, params) => {
                        return h("div", [
                            // h(
                            //     "Button",
                            //     {
                            //         props: {
                            //             type: "primary",
                            //             size: "small",
                            //             disabled: params.row.status === 1
                            //         },
                            //         attrs: {
                            //             style:
                            //                 "font-size:12px;margin-right:15px;"
                            //         },
                            //         nativeOn: {
                            //             click: () => {}
                            //         }
                            //     },
                            //     "审核"
                            // ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "masterList-edit"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.getOneMaster();
                                        }
                                    }
                                },
                                "修改"
                            ),
                            // h(
                            //     "Button",
                            //     {
                            //         props: {
                            //             type: "error",
                            //             size: "small"
                            //         },
                            //         attrs: {
                            //             style: "font-size:12px"
                            //         },
                            //         nativeOn: {
                            //             click: () => {
                            //                 this.cancelcancel(true);
                            //                 this.currentId = params.row.id;
                            //                 this.deleteName =
                            //                     params.row.username;
                            //             }
                            //         }
                            //     },
                            //     "删除"
                            // )
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
            selectList: []
        };
    },
    computed: {
        getAccess() {
            return this.$store.state.user.access;
        }
    },
    watch: {
        getAccess: function(a, b) {
            isShowColumn(a, ["masterList-edit"], this.masterColumn);
        }
    },
    methods: {
        //导出
        returnExcel() {
            let token = ''
            axios.request({
                url:'https://www.iryi.cn/export-token',
                method:'get'
            }).then(res=>{
                token = res.data
                let url =
                "https://www.iryi.cn/backend/masters/export?" +
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
                    : JSON.stringify(
                          this.searchData.type3Text[0] === ""
                              ? ""
                              : this.searchData.type3Text
                      )) +
                "&disable=" +
                (this.searchData.disable === 2 ? "" : this.searchData.disable) +
                "&blacklist=" +
                (this.searchData.blacklist === 2
                    ? ""
                    : this.searchData.blacklist) +
                "&sex=" +
                (this.searchData.sex === 2 ? "" : this.searchData.sex)+
                "&token="+token;

            window.open(url);
            })
            
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
        },
        changeDate(t) {
            this.searchData.type3Text = t;
        },
        showEdit(i) {
            this.editModal = i;
        },
        getOneMaster() {
            axios
                .request({
                    url: "masters/" + this.currentId + "/show",
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
                        "masters/search?pagesize=" +
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
                            : JSON.stringify(
                                  this.searchData.type3Text[0] === ""
                                      ? ""
                                      : this.searchData.type3Text
                              )) +
                        "&disable=" +
                        (this.searchData.disable === 2
                            ? ""
                            : this.searchData.disable) +
                        "&blacklist=" +
                        (this.searchData.blacklist === 2
                            ? ""
                            : this.searchData.blacklist) +
                        "&sex=" +
                        (this.searchData.sex === 2 ? "" : this.searchData.sex),
                    method: "get"
                })
                .then(res => {
                    this.masterList = res.data.data.data;
                    this.total = res.data.data.total;

                    this.currentPage = res.data.data.current_page;
                    this.per_page = res.data.data.per_page;
                    // this.$Message.success("搜索成功");
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
                        "masters/search?pagesize=" +
                        size +
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
                            : JSON.stringify(
                                  this.searchData.type3Text[0] === ""
                                      ? ""
                                      : this.searchData.type3Text
                              )) +
                        "&disable=" +
                        (this.searchData.disable === 2
                            ? ""
                            : this.searchData.disable) +
                        "&blacklist=" +
                        (this.searchData.blacklist === 2
                            ? ""
                            : this.searchData.blacklist) +
                        "&sex=" +
                        (this.searchData.sex === 2 ? "" : this.searchData.sex),
                    method: "get"
                })
                .then(res => {
                    this.masterList = res.data.data.data;
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
        getMasterList(index) {
            this.currentPage = index;
            axios
                .request({
                    url:
                        "masters/search?pagesize=" +
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
                            : JSON.stringify(
                                  this.searchData.type3Text[0] === ""
                                      ? ""
                                      : this.searchData.type3Text
                              )) +
                        "&disable=" +
                        (this.searchData.disable === 2
                            ? ""
                            : this.searchData.disable) +
                        "&blacklist=" +
                        (this.searchData.blacklist === 2
                            ? ""
                            : this.searchData.blacklist) +
                        "&sex=" +
                        (this.searchData.sex === 2 ? "" : this.searchData.sex),
                    method: "get"
                })
                .then(res => {
                    this.masterList = res.data.data.data;
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
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: "masters/" + this.currentId,
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
                                email: this.formInline.email,
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
        this.getMasterList();
    }
};
</script>

<style lang='less'>
.MASTERLIST {
    min-width: 1100px;
    .search {
        .ivu-form-item-content {
            line-height: 1 !important;
            margin-left: 0 !important;
        }
        .ivu-form-item-label {
            text-align: center;
        }
    }
}
.MASTERLISTModal {
    .formPage {
        .formItem {
            display: block;
            margin: 25px auto;
            width: 100%;
            .ivu-form-item-error-tip {
                padding-left: 141.5px;
            }
            // .formRow.textarea{
            //     height: 94px;
            // }
            .formRow {
                display: block;
                // 
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