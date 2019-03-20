<template>
    <div>
        <Card style="width:900px">
            <i-form ref="formInline" class="formPage" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="merchant_id" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">客户:</span>
                        </i-col>
                        <i-col span='18'>
                            <Select v-model="formInline.merchant_id" @on-change='getSelectData'>
                                <Option :value='item.id' v-for="(item, index) in meerchatList" :key="index">{{item.name}}</Option>
                            </Select>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="title" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">标题:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入标题" v-model="formInline.title" class="formInput"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="type" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">任务类型:</span>
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
                <FormItem prop="share_price" class="formItem" v-show="formInline.type===3">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">悬赏金额:</span>
                        </i-col>
                        <i-col span='18'>
                            <!-- <InputNumber :min="0" :active-change='false' :value="formInline.share_price" style="width: 200px"
                                :precision='2' placeholder='输入金额'></InputNumber> -->
                            <i-input placeholder="输入金额" class="formInput" v-model.number="formInline.share_price" type="number" @mousewheel.native.prevent></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="num" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">领取名额:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入名额" class="formInput" v-model.number="formInline.num" type="number" @mousewheel.native.prevent></i-input>
                            <!-- <InputNumber :min="1" :value="formInline.num" style="width: 200px" :precision='0'
                                placeholder='输入名额'></InputNumber> -->
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="start_time" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">任务时间:</span>
                        </i-col>
                        <i-col span='18'>
                            <DatePicker type="datetime" placeholder="选择开始时间" @on-change='changeDate' :value="formInline.start_time"
                                style="z-index:100000;width: 200px"></DatePicker>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="time_limit" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">时间限制（分钟）:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="输入时间限制" class="formInput" v-model.number="formInline.time_limit" type="number" @mousewheel.native.prevent></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="wx_content" class="formItem textarea" v-show="formInline.type===0">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">文案:</span>
                        </i-col>
                        <i-col span='18'>
                            <Input v-model="formInline.wx_content" type="textarea" :rows="4" placeholder="输入文案" />
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="qrcode_url" class="formItem" v-show="formInline.type===0">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">二维码图片：</span>
                        </i-col>
                        <i-col span='18'>
                            <Spin fix v-show="spinShow2">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>上传中~~~</div>
                            </Spin>
                            <Upload style="margin-bottom:10px;" action="http://120.79.203.214/zbb/public/qrcode-reader"
                                :on-success='successUpload3' :before-upload='beforeUpload3' :show-upload-list='false'
                                :headers="headers">
                                <Button icon="md-add" class="btnUp">
                                    上传图片
                                </Button>
                            </Upload>
                            <!-- <img :src="formInline.qrcode_url" width="150px" style="float:left;margin-right:10px;margin-bottom:10px;"> -->
                            <p>{{formInline.qrcode_url}}</p>
                        </i-col>
                    </row>
                </FormItem>
                <!-- 朋友圈 -->
                <FormItem prop="images" class="formItem" v-show="formInline.type===0">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">图片信息：</span>
                        </i-col>
                        <i-col span='18'>
                            <Spin fix v-show="spinShow">
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
                <FormItem prop="dy_request" class="formItem" v-show="formInline.type===1">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">要求:</span>
                        </i-col>
                        <i-col span='18'>
                            <Checkbox label="香蕉" :value='true' disabled v-show="formInline.type===1">必须观看(播放)完1次以上</Checkbox>
                            <CheckboxGroup v-model="disabledGroup" @on-change='changeCheck'>
                                <Checkbox label="SUBSCRIBE">关注</Checkbox>
                                <Checkbox label="LIKE">点赞</Checkbox>
                                <Checkbox label="SHARE" v-show="formInline.type===1">转发到抖音</Checkbox>
                                <Checkbox label="COMMENT">评论</Checkbox>
                            </CheckboxGroup>
                            <i-input placeholder="输入评论:如不填，则默认显示：“评论随意填即可”" v-model="formInline.comment" class="formInput"></i-input>
                            <p style="color:#aaa;">注：每个项都有不同的收费，多项费用叠加</p>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="tt_request" class="formItem" v-show="formInline.type===2">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">要求:</span>
                        </i-col>
                        <i-col span='18'>
                            <Checkbox label="香蕉" :value='true' disabled v-show="formInline.type===2">浏览5分钟以上，并浏览到底部</Checkbox>
                            <CheckboxGroup v-model="disabledGroup" @on-change='changeCheck'>
                                <Checkbox label="SUBSCRIBE">关注</Checkbox>
                                <Checkbox label="LIKE">点赞</Checkbox>
                                <Checkbox label="SHARE" v-show="formInline.type===2">转发到头条</Checkbox>
                                <Checkbox label="COMMENT">评论</Checkbox>
                            </CheckboxGroup>
                            <i-input placeholder="输入评论:如不填，则默认显示：“评论随意填即可”" v-model="formInline.comment" class="formInput"></i-input>
                            <p style="color:#aaa;">注：每个项都有不同的收费，多项费用叠加</p>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="images" class="formItem" v-show="formInline.type===1 || formInline.type===2">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">图片信息：</span>
                        </i-col>
                        <i-col span='18'>
                            <Spin fix v-show="spinShow">
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
                <FormItem prop="url" class="formItem" v-show="formInline.type===1 || formInline.type===2">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable" v-show="formInline.type===1">抖音作品链接:</span>
                            <span class="lable" v-show="formInline.type===2">今日头条作品链接:</span>
                        </i-col>
                        <i-col span='18'>
                            <i-input placeholder="抖音作品的复制链接直接粘贴即可" v-model="formInline.url" class="formInput" v-show="formInline.type===1"></i-input>
                            <i-input placeholder="今日头条作品的复制链接直接粘贴即可" v-model="formInline.url" class="formInput" v-show="formInline.type===2"></i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="share_thumb" class="formItem" v-show="formInline.type===3">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">标题图片：</span>
                        </i-col>
                        <i-col span='18'>
                            <Spin fix v-show="spinShow">
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
                            <img :src="formInline.share_thumb===''?'':formInline.share_thumb" width="150px" style="float:left;margin-right:10px;margin-bottom:10px;">
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="share_content" class="formItem f1" v-show='formInline.type===3'>
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">文章信息：</span>
                        </i-col>
                        <i-col span='18'>
                            <VueUeditorWrap ref="ueditor" v-model="msg" :destroy="false" @ready="ready" :config="myConfig" style="line-height:20px;z-index:100;position: relative;"></VueUeditorWrap>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="cate_id" class="formItem" v-show='formInline.type===3'>
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">分类:</span>
                        </i-col>
                        <i-col span='18'>
                            <Select v-model="formInline.cate_id" filterable>
                                <Option v-for="(item,index) in typeList" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem class="formItem" v-show='formInline.type===3'>
                    <row class="formRow">
                        <i-col span='4' offset='4'>
                            <Input v-model="newType" />
                        </i-col>
                        <i-col span='13' offset='1'>
                            <i-button type="primary" @click='oNewtype(true)'>新建分类</i-button>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="total_price" class="formItem">
                    <row class="formRow">
                        <i-col span='4'>
                            <span class="lable">预计金额:</span>
                        </i-col>
                        <i-col span='18'>
                            <p>{{price}}元</p>
                        </i-col>
                    </row>
                </FormItem>
                <div id="qrcode" ref="qrcode"></div>
                <FormItem style="margin:20px 0px 20px 400px">
                    <Button type="primary" @click="handleSubmit('formInline')">新增</Button>
                    <!-- <Button type="primary" @click="clicka()">新增</Button> -->
                    <Button style="margin-left:10px;" @click="resetData('formInline')">重置</Button>
                </FormItem>
            </i-form>
        </Card>
        <Modal v-model="TypeModal" title="新建分类" @on-ok="inputNewType()" @on-cancel="oNewType(false)">
            <row>
                <i-col style="margin:0 auto;">
                    <p style="font-size:25px;text-align:center;">是否添加分类---<span style="color:red"> {{newType}} </span>---</p>
                </i-col>
            </row>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
// import tools from "@/libs/tools";
import Cookies from "js-cookie";
import VueUeditorWrap from "vue-ueditor-wrap";
import QRCode from "qrcodejs2";
export default {
    computed: {
        headers() {
            return {
                token: Cookies.get("token")
                // token: localStorage.getItem('')
            };
        },
        price() {
            // let a = 0
            if (this.formInline.type === 0) {
                //朋友圈
                this.total_price =
                    this.WECHAT_MERCHANT_COST * this.formInline.num;
            } else if (this.formInline.type === 1) {
                //抖音
                this.total_price =
                    (parseFloat(
                        this.formInline.dy_request.indexOf("SUBSCRIBE") > -1
                            ? this.DY_MERCHANT_SUBSCRIBE
                            : 0
                    ) +
                        parseFloat(
                            this.formInline.dy_request.indexOf("LIKE") > -1
                                ? this.DY_MERCHANT_LIKE
                                : 0
                        ) +
                        parseFloat(
                            this.formInline.dy_request.indexOf("SHARE") > -1
                                ? this.DY_MERCHANT_SHARE
                                : 0
                        ) +
                        parseFloat(
                            this.formInline.dy_request.indexOf("COMMENT") > -1
                                ? this.DY_MERCHANT_COMMENT
                                : 0
                        )) *
                    10;

                this.total_price = this.total_price * this.formInline.num;
                this.total_price = this.total_price / 10;
            } else if (this.formInline.type === 2) {
                //头条
                this.total_price =
                    (parseFloat(
                        this.formInline.tt_request.indexOf("SUBSCRIBE") > -1
                            ? this.TT_MERCHANT_SUBSCRIBE
                            : 0
                    ) +
                        parseFloat(
                            this.formInline.tt_request.indexOf("LIKE") > -1
                                ? this.TT_MERCHANT_LIKE
                                : 0
                        ) +
                        parseFloat(
                            this.formInline.tt_request.indexOf("SHARE") > -1
                                ? this.TT_MERCHANT_SHARE
                                : 0
                        ) +
                        parseFloat(
                            this.formInline.tt_request.indexOf("COMMENT") > -1
                                ? this.TT_MERCHANT_COMMENT
                                : 0
                        )) *
                    10;

                this.total_price = this.total_price * this.formInline.num;
                this.total_price = this.total_price / 10;
            } else if (this.formInline.type === 3) {
                this.total_price = this.formInline.share_price * 10;
                this.total_price = this.total_price * this.formInline.num;
                this.total_price = this.total_price / 10;
            }
            console.log(this.formInline.share_price * this.formInline.num);

            return this.total_price;
        }
    },
    components: { VueUeditorWrap, QRCode },
    data() {
        return {
            meerchatList: [],

            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: "100%",
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                // serverUrl: "http://120.79.203.214/zbb/public/controller.php",
                serverUrl: "http://120.79.203.214/zbb/public/get-edit",
                // serverUrl: "http://120.79.203.214/zbb/public/ueditor/server",

                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                // UEDITOR_HOME_URL: "http://120.79.203.214/zbb/"
                UEDITOR_HOME_URL: "/zbbManage/UEditor/"
            },

            spinShow: false,
            spinShow2: false,
            disabledGroup: [],
            total_price: 0,
            picHead: "",
            formInline: {
                merchant_id: "",
                //通用
                title: "",
                type: 0,
                num: 10, //领取名额
                start_time: "", //任务时间
                time_limit: "",
                images: [
                    // "http://img2.imgtn.bdimg.com/it/u=3496345838,732839400&fm=26&gp=0.jpg"
                ], //图片信息
                //朋友圈
                qrcode_url: "", //二维码
                wx_content: "", //微信文案

                //抖音
                dy_request: [], //抖音要求
                url: "", //抖音或头条的连接

                comment: "",

                //头条
                tt_request: [], //头条要求

                //软文推广
                share_price: 0.0, //赏金
                share_thumb: "", //分享封面
                //share_content: '' //分享文章内容(废弃,编辑器无法识别)

                cate_id: ""
            },
            msg: "", //分享文章内容
            ruleInline: {
                merchant_id: [
                    {
                        // required: true,
                        // message: "请选择发布客户",
                        // trigger: "blur"
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value && value !== 0) {
                                callback("请选择发布客户");
                            }
                            callback(errors);
                        }
                    }
                ],
                title: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }
                ],
                share_price: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value && value !== 0) {
                                callback("请输入金额");
                            }
                            callback(errors);
                        }
                    }
                ],
                dy_request: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (value.length === 0) {
                                callback("请至少选择一项任务要求");
                            }
                            callback(errors);
                        }
                    }
                ],
                tt_request: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (value.length === 0) {
                                callback("请至少选择一项任务要求");
                            }
                            callback(errors);
                        }
                    }
                ],
                num: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请输入名额");
                            }
                            callback(errors);
                        }
                    }
                ],
                start_time: [
                    {
                        required: true,
                        message: "请输入任务时间",
                        trigger: "blur"
                    }
                ],
                time_limit: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请输入时间限制");
                            }
                            callback(errors);
                        }
                    }
                ],
                images: [
                    {
                        validator: (rule, value, callback, source, options) => {
                            var errors = [];
                            if (
                                (this.formInline.type === 1 ||
                                    this.formInline.type === 2) &&
                                value.length === 0
                            ) {
                                callback("请选择图片");
                            }
                            callback(errors);
                        }
                    }
                ],
                url: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请输入链接");
                            }
                            callback(errors);
                        }
                    }
                ],
                share_thumb: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请选择标题图片");
                            }
                            callback(errors);
                        }
                    }
                ]
            },
            editorInstance: "", //ueditor实例对象
            JsonFilterArr: [
                "SHARE_MERCHANT_COST", //分享赚
                "WECHAT_MERCHANT_COST", //发圈赚
                "DY_MERCHANT_SUBSCRIBE", //抖音赚 关注
                "DY_MERCHANT_LIKE", //抖音赚 点赞
                "DY_MERCHANT_SHARE", //抖音赚 转发
                "DY_MERCHANT_COMMENT", //抖音赚 评论

                "TT_MERCHANT_SUBSCRIBE", //头条赚 关注
                "TT_MERCHANT_LIKE", //头条赚 点赞
                "TT_MERCHANT_SHARE", //头条赚 转发
                "TT_MERCHANT_COMMENT" //头条赚 评论
            ],
            SHARE_MERCHANT_COST: "", //分享赚
            WECHAT_MERCHANT_COST: "", //发圈赚

            DY_MERCHANT_SUBSCRIBE: "", //抖音赚 关注
            DY_MERCHANT_LIKE: "", //抖音赚 点赞
            DY_MERCHANT_SHARE: "", //抖音赚 转发
            DY_MERCHANT_COMMENT: "", //抖音赚 评论

            TT_MERCHANT_SUBSCRIBE: "", //头条赚 关注
            TT_MERCHANT_LIKE: "", //头条赚 点赞
            TT_MERCHANT_SHARE: "", //头条赚 转发
            TT_MERCHANT_COMMENT: "", //头条赚 评论

            deletePicArr: [], //暂存需要删除的图片路径

            newType: "",
            TypeModal: false,
            typeList: []
        };
    },
    mounted() {
        // this.qrcode()
        this.getJson();
        this.getMerchatList();
        this.getTypeList();
    },
    methods: {
        inputNewType() {
            axios
                .request({
                    url: "task/cates/store",
                    method: "post",
                    data: {
                        //通用
                        name: this.newType
                    }
                })
                .then(res => {
                    this.newType = "";
                    this.$Message.success("新建成功");
                    this.oNewtype(false);
                    this.getTypeList();
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        oNewtype(i) {
            if (this.newType === "") {
                this.$Message.error("分类名不能为空");
                return;
            }
            this.TypeModal = i;
        },
        getTypeList() {
            axios
                .request({
                    url: "task/cates",
                    method: "get"
                })
                .then(res => {
                    this.typeList = res.data.data;
                });
        },
        //清空资料时删除图片
        deletePic() {
            for (let i = 0; i < this.deletePicArr.length; i++) {
                this.deletePicArr[i] = this.filterUrl(this.deletePicArr[i]);
            }
            if (this.deletePicArr.length === 0) {
                return;
            }
            axios
                .request({
                    url: "http://120.79.203.214/zbb/public/delete",
                    method: "post",
                    data: {
                        url: this.deletePicArr
                    }
                })
                .then(res => {
                    this.deletePicArr = [];
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        qrcode() {
            this.$nextTick(() => {
                let qrcode = new QRCode("qrcode", {
                    width: 232, // 设置宽度
                    height: 232, // 设置高度
                    text: "https://zhlsqj.com/#/destroyTicket?id="
                });
            });
        },
        ready(editorInstance) {
            this.editorInstance = editorInstance;
            console.log(`实例${editorInstance.key}已经初始化:`, editorInstance);
            // editorInstance.setContent('ueditor', { zIndex: 100});
            // UE.getEditor('ueditor');
        },
        // clicka(){
        //     let a = this.editorInstance.getContentTxt()
        //     console.log(this.msg);
        // },
        getSelectData(id) {
            //获取单一客户资料
            for (let i = 0; i < this.meerchatList.length; i++) {
                if (this.meerchatList[i].id === this.formInline.merchant_id) {
                    this.SHARE_MERCHANT_COST = this.meerchatList[
                        i
                    ].share_commission; //分享赚
                    this.WECHAT_MERCHANT_COST = this.meerchatList[
                        i
                    ].wx_commission; //发圈赚

                    this.DY_MERCHANT_SUBSCRIBE = this.meerchatList[
                        i
                    ].dy_subscribe; //抖音赚 关注
                    this.DY_MERCHANT_LIKE = this.meerchatList[i].dy_like; //抖音赚 点赞
                    this.DY_MERCHANT_SHARE = this.meerchatList[i].dy_share; //抖音赚 转发
                    this.DY_MERCHANT_COMMENT = this.meerchatList[i].dy_comment; //抖音赚 评论

                    this.TT_MERCHANT_SUBSCRIBE = this.meerchatList[
                        i
                    ].tt_subscribe; //头条赚 关注
                    this.TT_MERCHANT_LIKE = this.meerchatList[i].tt_like; //头条赚 点赞
                    this.TT_MERCHANT_SHARE = this.meerchatList[i].tt_share; //头条赚 转发
                    this.TT_MERCHANT_COMMENT = this.meerchatList[i].tt_comment; //头条赚 评论
                }
            }
        },
        changeType(type) {
            //一下是删除操作
            this.deletePic();
            this.resetData1(type);
            this.resetData("formInline");
        },
        changeCheck(arr) {
            if (this.formInline.type === 1) {
                this.formInline.dy_request = arr;
            } else {
                this.formInline.tt_request = arr;
            }
            console.log(this.formInline.dy_request);
            // console.log(this.formInline.tt_request);
        },
        changeDate(date1, date2) {
            this.formInline.start_time = date1;
        },
        //上传朋友圈图片
        successUpload(file) {
            this.spinShow = false;
            this.formInline.images.push(file.url);
            this.deletePicArr.push(file.url);
            console.log(this.formInline.images);
        },
        beforeUpload(file) {
            if (
                this.formInline.images.length +
                    (this.formInline.qrcode_url === "" ? 0 : 1) >=
                9
            ) {
                this.$Message.error("上传数量不能大于9张");
                return false;
            }
            this.spinShow = true;
        },
        //2
        successUpload1(file) {
            if (this.formInline.images.length > 0) {
                axios
                    .request({
                        url: "http://120.79.203.214/zbb/public/delete",
                        method: "post",
                        data: {
                            url: this.formInline.images[0]
                        }
                    })
                    .catch(err => {
                        for (let i in err.response.data.msg) {
                            this.$Message.error(err.response.data.msg[i][0]);
                        }
                    });
            }
            this.spinShow = false;
            this.formInline.images = [];
            this.deletePicArr = [];
            this.formInline.images.push(file.url);
            this.deletePicArr.push(file.url);
        },
        beforeUpload1(file) {
            this.spinShow = true;
        },

        //3
        successUpload2(file) {
            if (this.formInline.share_thumb !== "") {
                axios
                    .request({
                        url: "http://120.79.203.214/zbb/public/delete",
                        method: "post",
                        data: {
                            url: this.formInline.share_thumb
                        }
                    })
                    .catch(err => {
                        for (let i in err.response.data.msg) {
                            this.$Message.error(err.response.data.msg[i][0]);
                        }
                    });
            }
            this.deletePicArr = [];
            this.spinShow = false;
            this.formInline.share_thumb = file.url;
            this.deletePicArr.push(file.url);
        },
        beforeUpload2(file) {
            this.spinShow = true;
        },
        //3
        successUpload3(file) {
            // console.log(file);
            this.spinShow = false;
            if (file.msg) {
                this.$Message.error(file.msg);
                return;
            }
            this.formInline.qrcode_url = file;
        },
        beforeUpload3(file) {
            this.spinShow = true;
        },

        getMerchatList() {
            //获取所有客户
            axios
                .request({
                    url: "merchants/all",
                    method: "get"
                })
                .then(res => {
                    // console.log(res);

                    this.meerchatList = res.data.data;
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        getJson() {
            //获取系统配置
            axios
                .request({
                    url: "system/configs",
                    method: "get"
                })
                .then(res => {
                    this.sysJson = res.data.data;
                    for (let i = 0; i < this.JsonFilterArr.length; i++) {
                        for (let j = 0; j < this.sysJson.length; j++) {
                            if (
                                this.JsonFilterArr[i] === this.sysJson[j].flag
                            ) {
                                this.$data[
                                    this.JsonFilterArr[i]
                                ] = this.sysJson[j].param;
                            }
                        }
                    }
                    // console.log(this.sysJson);
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
                    for (let i = 0; i < this.formInline.images.length; i++) {
                        this.formInline.images[i] = this.filterUrl(
                            this.formInline.images[i]
                        );
                    }
                    axios
                        .request({
                            // url: "http://120.79.203.214/zbb/public/total",
                            url: "task/tasks",
                            method: "post",
                            data: {
                                //通用
                                cate_id: this.formInline.cate_id,
                                total_price: this.total_price,
                                merchant_id: this.formInline.merchant_id,
                                // merchant_id: this.meerchatList[this.formInline.merchant_id].id,
                                title: this.formInline.title,
                                type: this.formInline.type,
                                num: this.formInline.num, //领取名额
                                start_time: this.formInline.start_time, //任务时间
                                time_limit: this.formInline.time_limit,
                                images: this.formInline.images, //图片信息
                                //朋友圈
                                qrcode_url: this.formInline.qrcode_url, //二维码
                                wx_content: this.formInline.wx_content, //微信文案

                                //抖音
                                dy_request: this.formInline.dy_request, //抖音要求
                                url: this.formInline.url, //抖音或头条的连接

                                comment: this.formInline.comment,

                                //头条
                                tt_request: this.formInline.tt_request, //头条要求

                                //软文推广
                                share_price: this.formInline.share_price, //赏金
                                share_thumb: this.filterUrl(
                                    this.formInline.share_thumb
                                ), //分享封面
                                share_content: this.msg //分享文章内容
                            }
                        })
                        .then(res => {
                            // console.log(res);

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
        //图片路径拼接/去除
        filterUrl(url) {
            url = url.substring(url.indexOf("public/") + 7);
            return url;
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
                time_limit: "",
                qrcode_url: "",
                images: [
                    // "http://img2.imgtn.bdimg.com/it/u=3496345838,732839400&fm=26&gp=0.jpg"
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
        }

        ///编辑器
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
        // .formRow.textarea{
        //     height: 94px;
        // }
        .formRow {
            display: block;
            // height: 33px;
            .lable {
                display: block;
                // line-height: 33px;
            }
            .formInput {
                // margin-left: 20px;
                // width: 300px;
            }
        }
    }
}
</style>
