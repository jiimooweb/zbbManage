<template>
    <div>
        <Button type="primary" :style='"margin:10px 0;display:" + (this.hasPower(this.$store.state.user.access,"collectionAccount-new")? "inline-block;": "none;")' @click="newData()">添加</Button>
        <Table stripe :columns="column" border :data="list"></Table>
        <Modal v-model="editModal" title="收款资料" :mask-closable="false" footer-hide>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="flag" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">收款配置（标识）:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入收款配置" class="formInput" v-model="formInline.flag"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="way" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">收款商:</span>
                        </i-col>
                        <i-col span='18'>
                            <Select v-model="formInline.way">
                                <Option value="Bank">银行</Option>
                                <Option value="Wechat">微信</Option>
                                <Option value="Alipay">支付宝</Option>
                            </Select>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="title" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">收款商名称:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入收款商名称" class="formInput" v-model="formInline.title"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="name" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">收款人名称:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入收款人名称" class="formInput" v-model="formInline.name"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="card" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">收款账号</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="收款账号" class="formInput" v-model="formInline.card"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="subbranch" class="formItem" v-if="formInline.way==='Bank'">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">支行</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="支行" class="formInput" v-model="formInline.subbranch"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="qrcode" class="formItem" v-if="formInline.way==='Wechat'">
                    <row class="formRow">
                        <i-col span='18' offset='6'>
                            <Upload style="margin-bottom:10px;" action="https://www.iryi.cn/upload"
                                :on-success='successUpload' :before-upload='beforeUpload' :show-upload-list='false'
                                :headers="headers">
                                <Button icon="md-add" class="btnUp">
                                    <span>上传微信二维码</span>
                                </Button>
                            </Upload>
                            <img :src="formInline.qrcode" width="150px" style="float:left;margin-right:10px;margin-bottom:10px;">
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="remark" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">备注:</span>
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
        <Modal v-model="cancelModal" title='删除' @on-ok="deleteItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除收款配置----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { returnHasPower, isShowColumn } from "@/libs/util";
export default {
    data() {
        return {
            deleteName:'',
            editModal: false,
            cancelModal:false,
            isNew: false,
            column: [
                {
                    title: "收款配置(标识)",
                    align: "center",
                    key: "flag"
                },
                {
                    title: "收款商",
                    align: "center",
                    // key: "way"
                    render(h,params) {
                        return h('p',params.row.way==='Bank'?'银行':(params.row.way==='Wechat'?'微信':'支付宝'))
                    },
                },
                {
                    title: "收款商名称",
                    align: "center",
                    key: "title"
                },
                {
                    title: "收款人姓名",
                    align: "center",
                    key: "name"
                },
                {
                    title: "收款账号",
                    align: "center",
                    key: "card"
                },
                {
                    title: "微信二维码",
                    width:'100',
                    align: "center",
                    // key: "qrcode"
                    render:(h,params)=> {
                        if(params.row.qrcode === null){
                            return h('p','无')
                        }else{
                            return h('img',{
                                attrs:{
                                    style:'width:70px;height:70px;',
                                    src:params.row.qrcode
                                }   
                            })
                        }
                        
                    },
                },
                {
                    title: "备注",
                    width:'200',
                    align: "center",
                    key: "remark"
                },
                {
                    title: "操作",
                    width:'150',
                    align: "center",
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
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "collectionAccount-edit"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.formInline.flag = params.row.flag,
                                            this.formInline.way = params.row.way,
                                            this.formInline.title = params.row.title,
                                            this.formInline.name = params.row.name,
                                            this.formInline.card = params.row.card,
                                            this.formInline.subbranch = params.row.subbranch,
                                            this.formInline.qrcode = params.row.qrcode,
                                            this.formInline.remark = params.row.remark
                                            this.showEdit(true);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "collectionAccount-delete"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.deleteName = params.row.title
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
            formInline: {
                flag: "",
                way: "Bank",
                title: "",
                name: "",
                card: "",
                subbranch: "",
                qrcode: "",
                remark: ""
            },
            list: [],
            ruleInline: {
                flag:{
                    required: true,
                    message: "请输入标识",
                    trigger: "blur"
                },
                title:{
                    required: true,
                    message: "请输入收款商名称",
                    trigger: "blur"
                },
                name:{
                    required: true,
                    message: "请输入收款人姓名",
                    trigger: "blur"
                },
                card:{
                    required: true,
                    message: "请输入收款账号",
                    trigger: "blur"
                },
                subbranch:{
                    // required: true,
                    // message: "请输入支行",
                    // trigger: "blur"
                    validator:(rule, value, callback, source, options)=> {
                            var errors = [];
                            if (!value && value !== 0 && this.formInline.way==='Bank') {
                                callback("请输入支行");
                            }
                            callback(errors);
                        }
                },
                qrcode:{
                    validator:(rule, value, callback, source, options)=> {
                            var errors = [];
                            if (!value && value !== 0 && this.formInline.way==='Wechat') {
                                callback("请上传二维码");
                            }
                            callback(errors);
                        }
                }
            }
        };
    },
    computed: {
        getAccess() {
            return this.$store.state.user.access;
        }
    },
    watch: {
        getAccess: function(a, b) {
            isShowColumn(a, ["collectionAccount-edit","collectionAccount-delete"], this.column);
        }
    },
    methods: {
        cancelcancel(i){
            this.cancelModal = i
        },
        deleteItem(){
            axios.request({
                url:'system/receipts/'+this.currentId,
                method:'delete'
            }).then(res=>{
                this.$Message.success('删除成功')
                this.getList()
            })
        },
        successUpload(file) {
            if (this.formInline.qrcode !== "") {
                axios
                    .request({
                        url: "https://www.iryi.cn/delete",
                        method: "post",
                        data: {
                            url: this.formInline.qrcode
                        }
                    })
                    .catch(err => {
                        for (let i in err.response.data.msg) {
                            this.$Message.error(err.response.data.msg[i][0]);
                        }
                    });
            }
            this.formInline.qrcode = file.url;
        },
        beforeUpload(file) {},
        newData() {
            this.isNew = true;
            this.resetData("formInline");
            this.showEdit(true);
        },
        showEdit(i) {
            this.editModal = i;
        },
        getList() {
            axios
                .request({
                    url: "system/receipts",
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data.data;
                });
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url:
                                "system/receipts" +
                                (this.isNew === true
                                    ? ""
                                    : "/" + this.currentId),
                            method: this.isNew === true ? "post" : "put",
                            data: {
                                flag: this.formInline.flag,
                                way: this.formInline.way,
                                title: this.formInline.title,
                                name: this.formInline.name,
                                card: this.formInline.card,
                                subbranch: this.formInline.subbranch,
                                qrcode: this.formInline.qrcode,
                                remark: this.formInline.remark
                            }
                        })
                        .then(res => {
                            if (this.formInline.qrcode !== "" && this.formInline.way !== 'Wechat') {
                                axios
                                    .request({
                                        url: "https://www.iryi.cn/delete",
                                        method: "post",
                                        data: {
                                            url: this.formInline.qrcode
                                        }
                                    })
                                    .catch(err => {
                                        for (let i in err.response.data.msg) {
                                            this.$Message.error(err.response.data.msg[i][0]);
                                        }
                                    });
                            }
                            this.$Message.success("提交成功");
                            this.resetData("formInline");
                            this.showEdit(false);
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
    },
    mounted() {
        this.getList();
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
</style>