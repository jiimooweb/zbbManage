<template>
    <div class="ARTICLELIST">
        <row style="margin-bottom:10px;">
            <i-col span='2'>
                <Button @click="newData()" :style='"display:" + (this.hasPower(this.$store.state.user.access,"articleList-new")? "inline-block;": "none;")'>添加</Button>
            </i-col>
        </row>
        <Table stripe :columns="column" border :data="list"></Table>
        <Modal v-model="EditModal" title='文章信息' width='800' class="ARTICLELISTModal" footer-hide :mask-closable="false">
            <!-- <Card style="width:400px"> -->
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="title" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">标题</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入标题" class="formInput" v-model="formInline.title"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="flag" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">标识</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="请输入标识" class="formInput" v-model="formInline.flag"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="content" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">内容</span>
                        </i-col>
                        <i-col span='18'>
                            <VueUeditorWrap ref="ueditor" v-model="formInline.content" :destroy="false" @ready="ready"
                                :config="myConfig" style="line-height:20px;z-index:100;position: relative;z-index:10000;"></VueUeditorWrap>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="width:100%;">
                    <Button type="primary" style="margin:0 auto;display:block;" @click="handleSubmit('formInline')">提交</Button>
                </FormItem>
            </i-form>
            <!-- </Card> -->
        </Modal>
        <Modal v-model="cancelModal" title='删除' @on-ok="deleteData()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除文章----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import VueUeditorWrap from "vue-ueditor-wrap";
import { returnHasPower, isShowColumn } from "@/libs/util";
export default {
    components: { VueUeditorWrap },
    data() {
        return {
            deleteName:'',
            cancelModal:false,
            isNew: false,
            currentId: "",
            EditModal: false,
            myConfig: {
                zIndex: 10000,
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: "100%",
                serverUrl: "https://www.iryi.cn/get-edit",
                UEDITOR_HOME_URL: "/UEditor/"
            },
            formInline: {
                title: "",
                flag: "",
                content: ""
            },
            ruleInline: {
                title: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }
                ],
                flag: [
                    {
                        required: true,
                        message: "请输入标识",
                        trigger: "blur"
                    }
                ]
            },
            list: [],
            column: [
                {
                    title: "id",
                    key: "id"
                },
                {
                    title: "标题",
                    key: "title"
                },
                {
                    title: "标识",
                    key: "flag"
                },
                {
                    title: "操作",
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
                                                "articleList-edit"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.formInline.title =
                                                params.row.title;
                                            this.formInline.flag =
                                                params.row.flag;
                                            this.formInline.content =
                                                params.row.content;
                                            this.currentId = params.row.id;
                                            this.isNew = false;
                                            this.EditModal = true;
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
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "articleList-delete"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id
                                            this.cancelcancel(true)
                                            this.deleteName = params.row.title
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ]
        };
    },
    computed: {
        getAccess() {
            return this.$store.state.user.access;
        }
    },
    watch: {
        getAccess: function(a, b) {
            isShowColumn(a, ["articleList-edit","articleList-delete"], this.column);
        }
    },
    methods: {
        ready(editorInstance) {
            this.editorInstance = editorInstance;
            console.log(`实例${editorInstance.key}已经初始化:`, editorInstance);
        },
        getList() {
            axios
                .request({
                    url: "articles",
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data;
                });
        },
        newData() {
            this.isNew = true
            this.EditModal = true
            this.formInline = {
                title: "",
                flag: "",
                content: ""
            }
        },
        cancelcancel(i){
            this.cancelModal = i
        },
        deleteData(){
            axios.request({
                url:'articles/'+this.currentId,
                method:'delete'
            }).then(res=>{
                this.$Message.success('删除成功')
                this.getList()
            })
        },  
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: this.isNew
                                ? "articles"
                                : "articles/" + this.currentId,
                            method: this.isNew ? "post" : "put",
                            data: {
                                title: this.formInline.title,
                                flag: this.formInline.flag,
                                content: this.formInline.content
                            }
                        })
                        .then(res => {
                            this.$Message.success("提交成功");
                            this.resetData("formInline");
                            this.EditModal = false;
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
.ARTICLELISTModal {
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
