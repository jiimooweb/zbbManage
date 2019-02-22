<template>
    <div>
        <Button type="primary" style='margin:10px 0;display:block;' @click="newData()">添加客服</Button>
        <Table stripe :columns="column" border :data="list" @on-select='selectItem' @on-select-all='selectItem'></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="editModal" title="客服资料" :mask-closable="false" footer-hide>
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="name" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">真实姓名:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入真实姓名" class="formInput" v-model="formInline.name"></i-input>
                        </i-col>
                    </row>
                </FormItem>
				<FormItem prop="nickname" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">昵称:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入昵称" class="formInput" v-model="formInline.nickname"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="phone" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">手机号码:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入手机号码" class="formInput" v-model="formInline.phone"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="wx" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">微信号:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入微信号" class="formInput" v-model="formInline.wx"></i-input>
                        </i-col>
                    </row>
                </FormItem>
				<FormItem prop="qq" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">QQ号:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入QQ" class="formInput" v-model="formInline.qq"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem class="formItem">
                    <Button type="primary" @click="handleSubmit('formInline')" style="margin:20px auto;display:block;">提交</Button>
                </FormItem>
            </i-form>
        </Modal>
        <Modal v-model="cancelModal" title='删除' @on-ok="cancelItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除客服----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            editModal: false,
            cancelModal:false,
            formInline:{
				name:'',
				nickname:'',
				phone:'',
				qq:'',
				wx:''
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
                    title: "真实姓名",
                    key: "name"
                },
                {
                    title: "昵称",
                    key: "nickname"
                },
                {
                    title: "微信号",
                    key: "wx"
                },
                {
                    title: "QQ号",
                    key: "qq"
                },
                {
                    title: "手机号码",
                    key: "phone"
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
                                            this.editModal = true
                                            this.formInline.name = params.row.name
                                            this.formInline.nickname = params.row.nickname
                                            this.formInline.wx = params.row.wx
                                            this.formInline.qq = params.row.qq
                                            this.formInline.phone = params.row.phone
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
                                            this.deleteName =
                                                params.row.name;
                                                this.cancelcancel(true)
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
            currentId:'',
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [2, 20, 50, 100, 200]
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        newData(){
            this.$router.push({ path: "/newCustomer" });
        },
        cancelItem(){
            axios.request({
                url: "customer-services/"+this.currentId,
                method:'delete'
            }).then(res=>{
                this.$Message.success("删除成功");
                this.getList()
            })
        },
        cancelcancel(i){
            this.cancelModal = i
        },
        getList() {
            axios
                .request({
                    url: "customer-services",
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data;
                });
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                        axios
                        .request({
                            url: "customer-services/"+this.currentId,
                            method: "put",
                            data: {
                                name: this.formInline.name,
                                nickname: this.formInline.nickname,
                                wx: this.formInline.wx,
                                qq: this.formInline.qq,
                                phone: this.formInline.phone,
                            }
                        })
                        .then(res => {
                            this.$Message.success("修改成功");
                            this.resetData("formInline");
                            this.editModal = false
                            this.getList()
                        })
                        .catch(err => {
                            for(let i in err.response.data.errors){
                                this.$Message.error(err.response.data.errors[i][0]);
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
.formItem{
    width: 100%;
}
</style>
