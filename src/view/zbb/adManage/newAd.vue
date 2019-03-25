<template>
    <div>
        <Card style="width:600px">
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="page" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">所属分类:</span>
                        </i-col>
                        <i-col span='18'>
                            <Select v-model="formInline.flag">
                                <Option value='Swiper' key="Swiper">首页幻灯</Option>
                                <Option value='Top' key="Top">文章顶部</Option>
                                <Option value='Bottom' key="Bottom">文章底部</Option>
                            </Select>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="title" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">标题:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入标题" v-model="formInline.title" class="formInput"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="image" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">图片：</span>
                        </i-col>
                        <i-col span='18'>
                            <Spin fix v-if="spinShow">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>上传中~~~</div>
                            </Spin>
                            <Upload style="margin-bottom:10px;" action="https://www.iryi.cn/upload"
                                :on-success='successUpload' :before-upload='beforeUpload' :show-upload-list='false'
                                :headers="headers">
                                <Button icon="ios-cloud-upload-outline">上传图片</Button>
                            </Upload>
                            <img :src="formInline.image" width="200px">
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
                <FormItem prop="sort" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">排序:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入排序(从小到大)" class="formInput" v-model="formInline.sort"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="hidden" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span class="lable">是否显示:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-switch v-model="formInline.hidden" :true-value='1' :false-value='0' />
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
            spinShow: false,
            formInline: {
                flag: "Swiper",
                title: "",
                url: "",
                sort: "",
                hidden: 1,
                image: ""
            },
            ruleInline: {
                powers: {},
                title: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: "请输入链接",
                        trigger: "blur"
                    }
                ],
                sort: [
                    {
                        required: true,
                        message: "请输入排序",
                        trigger: "blur"
                    }
                ],
                image: [
                    {
                        // required: true,
                        // message: "请上传图片",
                        // trigger: "blur"
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (value==='') {
                                callback("请上传图片");
                            }
                            callback(errors);
                        }
                    }
                    
                ]
            }
        };
    },
    methods: {
        //upload
        successUpload(file) {
            if (this.formInline.image !== "") {
                axios.request({
                    url: "https://www.iryi.cn/delete",
                    method: "post",
                    data: {
                        url: this.formInline.image
                    }
                });
            }
            this.spinShow = false;
            this.formInline.image = file.url;
        },
        beforeUpload(file) {
            this.spinShow = true;
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: "ads",
                            method: "post",
                            data: {
                                flag: this.formInline.flag,
                                title: this.formInline.title,
                                url: this.formInline.url,
                                sort: this.formInline.sort,
                                hidden: this.formInline.hidden,
                                image: this.formInline.image
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
    },
    mounted() {}
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