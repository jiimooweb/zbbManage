<template>
    <div>
        <Card style="width:600px">
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="page" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">所属分类:</span>
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
                            <span style="lable">标题:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入标题" v-model="formInline.title" class="formInput"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="image" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">图片：</span>
                        </i-col>
                        <i-col span='18'>
                            <Spin fix v-if="spinShow">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>上传中~~~</div>
                            </Spin>
                            <Upload style="margin-bottom:10px;" action="http://120.79.203.214/zbb/public/upload"
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
                            <span style="lable">链接:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入链接" class="formInput" v-model="formInline.url"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="sort" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">排序:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入排序(从小到大)" class="formInput" v-model="formInline.sort"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="hidden" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">是否显示:</span>
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
                title: {},
                url: {},
                sort: {},
                hidden: {}
            }
        };
    },
    methods: {
        //upload
        successUpload(file) {
            // if (this.picData.cover !== "") {
            //     axios.request({
            //         url: "qiniu/delete",
            //         method: "post",
            //         data: {
            //             url: this.picData.cover
            //         }
            //     });
            // }
            // this.isUpload = true
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
                            for (let i in err.response.data.errors) {
                                this.$Message.error(
                                    err.response.data.errors[i][0]
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