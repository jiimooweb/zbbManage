<template>
    <div class='NOTICESLIST'>
        <Button type="primary" :style='"margin:10px 0;display:" + (this.hasPower(this.$store.state.user.access,"noticesList-new")? "inline-block;": "none;")' @click="newData()">添加</Button>
        <Table stripe :columns="column" border :data="list"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="editModal" width='800px' class="NOTICESLISTModal" title="公告参数" :mask-closable="false" footer-hide>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="title" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">标题:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入标题" class="formInput" v-model="formInline.title"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="url" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">链接:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入链接" class="formInput" v-model="formInline.url"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="content" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">内容:</span>
                        </i-col>
                        <i-col span='18'>
                            <textarea class="formInput" style="width:100%;display:block;" v-model="formInline.content"></textarea>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="width:100%;">
                    <Button type="primary" style="margin:20px auto;display:block;" @click="handleSubmit('formInline')">提交</Button>
                </FormItem>
            </i-form>
        </Modal>
        <Modal v-model="cancelModal" title='删除' @on-ok="deleteItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除公告----<span style="color:red;">{{deleteName}}</span>----</p>
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
            cancelModal:false,
            isNew:false,
            editModal:false,
            formInline: {
                title: "",
                url: "",
                content: ""
            },
            ruleInline: {
                title: {
                    required: true,
                    message: "请输入标题",
                    trigger: "blur"
                },
                url: {
                    required: true,
                    message: "请输入链接",
                    trigger: "blur"
                },
                content: {
                    required: true,
                    message: "请输入内容",
                    trigger: "blur"
                }
            },
            column: [
                {
                    title: "ID",
                    width:'100',
                    key: "id"
                },
                {
                    title: "标题",
                    width:'200',
                    key: "title"
                },
                {
                    title: "内容",
                    key: "content"
                },
                {
                    title: "链接",
                    width:'100',
                    key: "url"
                },
                {
                    title: "新建时间",
                    width:'200',
                    key: "created_at"
                },{
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
                                                "noticesList-edit"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.formInline.title = params.row.title,
                                            this.formInline.content = params.row.content,
                                            this.formInline.url = params.row.url,
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
                                                "noticesList-delete"
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
            list: [],
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50, 200, 500]
        };
    },
    computed: {
        getAccess() {
            return this.$store.state.user.access;
        }
    },
    watch: {
        getAccess: function(a, b) {
            isShowColumn(a, ["noticesList-edit","noticesList-delete"], this.column);
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        cancelcancel(i){
            this.cancelModal = i
        },
        deleteItem(){
            axios.request({
                url:'notices/'+this.currentId,
                method:'delete'
            }).then(res=>{
                this.$Message.success('删除成功')
                this.getList()
            })
        },
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
                    url:
                        "notices?page=" +
                        this.currentPage +
                        "&pagesize=" +
                        this.per_page,
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data.data;
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.current_page;
                    this.per_page = res.data.data.per_page;
                });
        },
        getchangeList(index) {
            this.currentPage = index;
            this.searchList();
        },
        changePageGetList(size) {
            this.per_page = size;
            this.currentPage = 1;
            this.searchList();
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: "notices" + (this.isNew === true
                                    ? ""
                                    : "/" + this.currentId),
                            method: this.isNew === true ? "post" : "put",
                            data: {
                                title: this.formInline.title,
                                url: this.formInline.url,
                                content: this.formInline.content
                            }
                        })
                        .then(res => {
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
    }
};
</script>

<style lang='less'>
.NOTICESLIST {
    min-width: 1100px;
}
.NOTICESLISTModal{
    .formPage {
        .formItem {
            display: block;
            margin: 25px auto;
            .ivu-form-item-error-tip {
                padding-left: 191.5px;
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