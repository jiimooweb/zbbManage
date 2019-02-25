<template>
    <div>
        <Card style="width:800px">
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
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
                <FormItem prop="type" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">任务类型:</span>
                        </i-col>
                        <i-col span='18'>
                            <RadioGroup v-model="formInline.type" @on-change='changeType'>
                                <Radio :value='0' :label="0">朋友圈</Radio>
                                <Radio :value='1' :label="1">抖音</Radio>
                                <Radio :value='2' :label="2">头条</Radio>
                                <Radio :value='3' :label="3">软文推广</Radio>
                            </RadioGroup>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="share_price" class="formItem" v-if="formInline.type===3">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">悬赏金额:</span>
                        </i-col>
                        <i-col span='18'>
                            <InputNumber :min="0" :active-change='false' :value="formInline.share_price" style="width: 200px"
                                :precision='2' placeholder='输入名额'></InputNumber>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="num" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">领取名额:</span>
                        </i-col>
                        <i-col span='18'>
                            <InputNumber :min="1" :value="formInline.num" style="width: 200px" :precision='0'
                                placeholder='输入名额'></InputNumber>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="start_time" class="formItem">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">任务时间:</span>
                        </i-col>
                        <i-col span='18'>
                            <DatePicker type="datetime" placeholder="选择开始时间" @on-change='changeDate' :value="formInline.start_time"
                                style="width: 200px"></DatePicker>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="start_time" class="formItem" v-if="formInline.type===0">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">文案:</span>
                        </i-col>
                        <i-col span='18'>
                            <Input v-model="formInline.wx_content" type="textarea" :rows="4" placeholder="输入文案" />
                        </i-col>
                    </row>
                </FormItem>
                <!-- 朋友圈 -->
                <FormItem prop="images" class="formItem" v-if="formInline.type===0">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">图片信息：</span>
                        </i-col>
                        <i-col span='18'>
                            <Spin fix v-if="spinShow">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>上传中~~~</div>
                            </Spin>
                            <Upload style="margin-bottom:10px;" action="http://120.79.203.214/zbb/public/upload"
                                :on-success='successUpload' :before-upload='beforeUpload' :show-upload-list='false'
                                :headers="headers" multiple>
                                <Button icon="ios-cloud-upload-outline">上传图片(最多9张)</Button>
                            </Upload>
                            <img v-for="(item,index) in formInline.images" :key="index" :src="formInline.images[index]"
                                width="150px" style="float:left;margin-right:10px;margin-bottom:10px;">
                        </i-col>
                    </row>
                </FormItem>
                <!-- 抖音 头条 -->
                <FormItem class="formItem" v-if="formInline.type===1 || formInline.type===2">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">要求:</span>
                        </i-col>
                        <i-col span='18'>
                            <Checkbox label="香蕉" :value='true' disabled v-if="formInline.type===1">必须观看(播放)完1次以上</Checkbox>
                            <Checkbox label="香蕉" :value='true' disabled v-if="formInline.type===2">浏览5分钟以上，并浏览到底部</Checkbox>
                            <CheckboxGroup v-model="disabledGroup" @on-change='changeCheck'>
                                <Checkbox label="SUBSCRBE">关注</Checkbox>
                                <Checkbox label="LIKE">点赞</Checkbox>
                                <Checkbox label="SHARE" v-if="formInline.type===1">转发到抖音</Checkbox>
                                <Checkbox label="SHARE" v-if="formInline.type===2">转发到头条</Checkbox>
                                <Checkbox label="COMMENT">评论</Checkbox>
                            </CheckboxGroup>
                            <i-input placeholder="输入评论:如不填，则默认显示：“评论随意填即可”" v-model="formInline.comment" class="formInput"></i-input>
                            <p style="color:#aaa;">注：每个项都有不同的收费，多项费用叠加</p>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="images" class="formItem" v-if="formInline.type===1 || formInline.type===2">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">图片信息：</span>
                        </i-col>
                        <i-col span='18'>
                            <Spin fix v-if="spinShow">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>上传中~~~</div>
                            </Spin>
                            <Upload style="margin-bottom:10px;" action="http://120.79.203.214/zbb/public/upload"
                                :on-success='successUpload1' :before-upload='beforeUpload1' :show-upload-list='false'
                                :headers="headers">
                                <Button icon="md-add" class="btnUp">
                                    <span v-if="formInline.type===1">上传抖音作品二位码</span>
                                    <span v-else>上传今日头条作品截图</span>
                                </Button>
                            </Upload>
                            <img v-for="(item,index) in formInline.images" :key="index" :src="formInline.images[index]"
                                width="150px" style="float:left;margin-right:10px;margin-bottom:10px;">
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="url" class="formItem" v-if="formInline.type===1 || formInline.type===2">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable" v-if="formInline.type===1">抖音作品链接:</span>
                            <span style="lable" v-if="formInline.type===2">今日头条作品链接:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="抖音作品的复制链接直接张贴即可" v-model="formInline.url" class="formInput" v-if="formInline.type===1"></i-input>
                            <i-input placeholder="今日头条作品的复制链接直接张贴即可" v-model="formInline.url" class="formInput" v-if="formInline.type===2"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="share_thumb" class="formItem" v-if="formInline.type===3">
                    <row class="formRow">
                        <i-col span='6'>
                            <span style="lable">标题图片：</span>
                        </i-col>
                        <i-col span='18'>
                            <Spin fix v-if="spinShow">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>上传中~~~</div>
                            </Spin>
                            <Upload style="margin-bottom:10px;" action="http://120.79.203.214/zbb/public/upload"
                                :on-success='successUpload2' :before-upload='beforeUpload2' :show-upload-list='false'
                                :headers="headers">
                                <Button icon="md-add" class="btnUp">
                                    上传图片
                                </Button>
                            </Upload>
                            <img :src="formInline.share_thumb" width="150px" style="float:left;margin-right:10px;margin-bottom:10px;">
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="margin:20px 0px 20px 400px">
                    <Button type="primary" @click="handleSubmit('formInline')">新增</Button>
                    <Button style="margin-left:10px;" @click="resetData('formInline')">重置</Button>
                </FormItem>
            </i-form>
        </Card>
        <VueUEditor></VueUEditor>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
import VueUEditor from 'vue-ueditor'
export default {
    computed: {
        headers() {
            return {
                token: Cookies.get("token")
                // token: localStorage.getItem('')
            };
        }
    },
    components: { VueUEditor },
    data() {
        return {
            defaultMsg: "这里是UE测试",
            content1: "这里是UE",
            ue1: "ue1",
            config: {
                initialFrameWidth: 800,
                initialFrameHeight: 350
            },

            spinShow: false,
            disabledGroup: [],
            formInline: {
                //通用
                title: "",
                type: 0,
                num: 10, //领取名额
                start_time: "", //任务时间
                images: [
                    "http://img2.imgtn.bdimg.com/it/u=3496345838,732839400&fm=26&gp=0.jpg"
                ], //图片信息
                //朋友圈
                wx_content: "", //微信文案

                //抖音
                dy_request: [], //抖音要求
                url: "", //抖音或头条的连接

                comment: "",

                //头条
                tt_request: "", //头条要求

                //软文推广
                share_price: 0.0, //赏金
                share_thumb: "", //分享封面
                share_content: "" //分享文章内容
            },
            ruleInline: {}
        };
    },
    mounted() {},
    methods: {
        changeType(type) {
            // console.log(type);
            // this.resetData("formInline");
            this.resetData1(type);

            //一下是删除操作
        },
        changeCheck(arr) {
            if (this.formInline.type === 1) {
                this.formInline.dy_request = arr;
            } else {
                this.formInline.tt_request = arr;
            }
            console.log(this.formInline.dy_request);
            console.log(this.formInline.tt_request);
        },
        changeDate(date1, date2) {
            this.formInline.start_time = date1;
        },
        //upload
        successUpload(file) {
            this.spinShow = false;
            this.formInline.images.push(file.url);
        },
        beforeUpload(file) {
            if (this.formInline.images.length >= 9) {
                this.$Message.error("上传数量不能大于9张");
                return false;
            }
            this.spinShow = true;
        },
        //2
        successUpload1(file) {
            if (this.formInline.images.length > 0) {
                axios.request({
                    url: "http://120.79.203.214/zbb/public/delete",
                    method: "post",
                    data: {
                        url: this.formInline.images[0]
                    }
                });
            }
            this.spinShow = false;
            this.formInline.images = [];
            this.formInline.images.push(file.url);
        },
        beforeUpload1(file) {
            this.spinShow = true;
        },

        //3
        successUpload2(file) {
            if (this.formInline.share_thumb !== "") {
                axios.request({
                    url: "http://120.79.203.214/zbb/public/delete",
                    method: "post",
                    data: {
                        url: this.formInline.share_thumb
                    }
                });
            }
            this.spinShow = false;
            this.formInline.share_thumb = file.url;
        },
        beforeUpload2(file) {
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
                                page: this.formInline.page,
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
        },
        resetData1(index) {
            this.formInline = {
                //通用
                title: "",
                type: index,
                num: 10, //领取名额
                start_time: "", //任务时间
                images: [
                    "http://img2.imgtn.bdimg.com/it/u=3496345838,732839400&fm=26&gp=0.jpg"
                ], //图片信息
                //朋友圈
                wx_content: "", //微信文案

                //抖音
                dy_request: [], //抖音要求
                url: "", //抖音或头条的连接

                comment: "",

                //头条
                tt_request: "", //头条要求

                //软文推广
                share_price: 0.0, //赏金
                share_thumb: "", //分享封面
                share_content: "" //分享文章内容
            };
        },
        ///编辑器

        getUEContent() {
            // 获取ueditor值
            let content1 = UE.getEditor(this.ue1).getContentTxt();
            console.log(content1);
        },
        editorReady(editorInstance) {
            editorInstance.setContent("哈哈哈");
        }
    }
};
</script>

<style lang='less'>
.btnUp {
    // width: 100px;
    // height: 100px;
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
