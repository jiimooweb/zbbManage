<template>
    <div class="TASKTYPEMANAGE">
        <row style="margin-bottom:10px;">
            <i-col span='2'>
                <Button @click="returnAdd()" :style='"display:" + (this.hasPower(this.$store.state.user.access,"taskTypeManage-new")? "inline-block;": "none;")'>添加</Button>
            </i-col>
        </row>
        <Table :max-height='this.$store.state.app.winHeight' stripe :columns="column" border :data="list" class="TASKTYPELIST"></Table>
        <!-- <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' /> -->
        <Modal v-model="editModal" width='400px' title="任务类型" :mask-closable="false" footer-hide>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="name" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">分类名称:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入分类名称" v-model="formInline.name" class="formInput"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <div id="qrcode" ref="qrcode"></div>
                <FormItem style="width:100%;">
                    <Button style="margin:10px auto;display:block;" type="primary" @click="handleSubmit('formInline')">提交</Button>
                </FormItem>
            </i-form>
        </Modal>
        <Modal v-model="cancelModal" title='删除' @on-ok="deleteItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除分类----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { returnHasPower, isShowColumn } from "@/libs/util";
export default {
    data() {
        return {
            isNew:false,
            cancelModal:false,
            editModal: false,
            deleteName:'',
            currentId:'',
            column: [
                {
                    title: "分类id",
                    key: "id"
                },
                {
                    title: "分类名称",
                    key: "name"
                },
                {
                    title: "创建时间",
                    key: "created_at"
                },{
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
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "taskTypeManage-edit"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.formInline.name = params.row.name
                                            this.editModal = true
                                            this.isNew = false
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
                                                "taskTypeManage-delete"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.cancelcancel(true);
                                            this.currentId = params.row.id;
                                            this.deleteName =
                                                params.row.name;
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
                name: ""
            },
            ruleInline: {
                name: [
                    {
                        required: true,
                        message: "请输入分类名称",
                        trigger: "blur"
                    }
                ]
            },
            list: [],
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50, 200, 500],
        };
    },
    computed: {
        getAccess() {
            return this.$store.state.user.access;
        }
    },
    watch: {
        getAccess: function(a, b) {
            isShowColumn(a, ["taskTypeManage-edit","taskTypeManage-delete"], this.column);
        }
    },
    methods: {
        cancelcancel(i){
            this.cancelModal = i
        },
        returnAdd(){
            this.isNew = true
            this.editModal = true
        },
        getList() {
            axios
                .request({
                    url: "task/cates",
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data;
                });
        },
        getchangeList(index) {
            this.currentPage = index;
            this.getList();
        },
        changePageGetList(size) {
            this.per_page = size;
            this.currentPage = 1
            this.getList();
        },
        deleteItem(){
            axios.request({
                url:'task/cates/'+this.currentId+"/delete",
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
                            url: (this.isNew===true?"task/cates/store":("task/cates/"+this.currentId+"/update")),
                            method: (this.isNew===true?"post":"put"),
                            data: {
                                //通用
                                name: this.formInline.name,
                            }
                        })
                        .then(res => {
                            if(this.isNew){
                                this.$Message.success("新建成功");
                            }else{
                                this.$Message.success("修改成功");
                            }
                            this.resetData("formInline");
                            this.editModal = false
                            this.getList()
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
        },
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang='less'>
.TASKTYPEMANAGE .TASKTYPELIST .ivu-table-body{
    // max-height: inherit !important;
}
.TASKTYPEMANAGE {
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
}
</style>
