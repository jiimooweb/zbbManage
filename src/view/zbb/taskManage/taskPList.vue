<template>
    <div class="TASKPLIST">
        <i-form ref="search" class="search" :model="searchData">
            <row :gutter='16'>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            任务类型:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="taskType" lable='任务类型'>
                                <Select v-model="searchData.taskType">
                                    <Option :value="-1">全部</Option>
                                    <Option :value="0">发圈赚</Option>
                                    <Option :value="1">抖音赚</Option>
                                    <Option :value="2">头条赚</Option>
                                    <Option :value="3">分享赚</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            状态:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="verify" lable='状态'>
                                <Select v-model="searchData.verify">
                                    <Option :value="2">全部</Option>
                                    <Option :value="0">待审核</Option>
                                    <Option :value="1">审核通过</Option>
                                    <Option :value="-1">审核拒绝</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            标题:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="title" lable='审核状态'>
                                <Input type="text" v-model="searchData.title" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='5'>
                    <row>
                        <i-col span='6' style="line-height:33px;text-align:center;">
                            时间段:
                        </i-col>
                        <i-col span='18'>
                            <FormItem prop="start_time">
                                <DatePicker :value="searchData.start_time" @on-change='changeDate1' type="daterange"
                                    placeholder="选择日期"></DatePicker>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='1' offset='1'>
                    <Button type="success" @click="getList()">搜索</Button>
                </i-col>
            </row>
        </i-form>
        <row style="margin-bottom:10px;">
            <i-col span='2'>
                <Button @click="returnAdd()" :style='"display:" + (this.hasPower(this.$store.state.user.access,"newTask")? "inline-block;": "none;")'>添加</Button>
            </i-col>
        </row>
        <Table :max-height='this.$store.state.app.winHeight' stripe :columns="column" border :data="list" v-show="showTable"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="cancelModal" title='删除' @on-ok="deleteItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除任务----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
        <Modal v-model="returnModal" title='审核' @on-ok="returnItem(1)" @on-cancel="returncancel(false)">
            <p style="text-align:center;font-size:16px;">是否通过任务----<span style="color:red;">{{deleteName}}</span>----的审核</p>
        </Modal>
        <Modal v-model="returnModal1" title='审核' @on-ok="returnItem(-1)" :mask-closable="false" @on-cancel="returncancel1(false)">
            <p style="text-align:center;font-size:16px;">是否拒绝任务----<span style="color:red;">{{deleteName}}</span>----的审核</p>
            <i-input style="margin-top:20px;" type='textarea' :rows='5' placeholder="输入拒绝原因" v-model="reason" class="formInput"></i-input>
        </Modal>
        <Modal v-model="showModal" width='800px' class="TASKLISTModal" title='任务详情' footer-hide>
            <i-form ref="formInline" class="formPage" inline>
                <row class='listRow'>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">主任务号:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.id}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">创建时间:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.created_at}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">开始时间:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.start_time}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">开启状态:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.status === 0 ? "关" : "开"}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>

                </row>
                <!-- 右边 -->
                <row class='listRow'>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">佣金:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.total_price / showData.num}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">总名额:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.num}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">总金额:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.total_price}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">业务类型:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.type === 0
                                        ? "朋友圈"
                                        : showData.type === 1
                                        ? "抖音"
                                        : showData.type === 2
                                        ? "头条"
                                        : "分享"}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <!-- <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">已用金额:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{(showData.total_price / showData.num) *
                                        showData.record_verifys_count}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">冻结金额:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.verify_status === -1
                                        ? "0"
                                        : showData.total_price}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col> -->
                </row>
            </i-form>
            <!-- <p class="jg"></p>
            <i-form ref="formInline" class="formPage" inline>
                <row class='listRow'>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">未进行:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.num - showData.records_count}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">执行中:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.records_count - showData.record_verifys_count}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">已完成:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.record_verifys_count}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                </row>
                <row class='listRow'>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">金额:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{(showData.num - showData.records_count) * (showData.total_price /
                                        showData.num)}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">金额:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{(showData.records_count - showData.record_verifys_count) *
                                        (showData.total_price / showData.num)}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">金额:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.record_verifys_count * (showData.total_price / showData.num)}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                </row>
            </i-form> -->
            <p class="jg"></p>
            <i-form ref="formInline" class="formPage" inline>
                <row class='listRow all'>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">标题:</span>
                                </i-col>
                                <i-col span='19'>
                                    <p>{{showData.title}}</p>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem" v-if="showData.type === 0 || showData.type === 3">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">文案:</span>
                                </i-col>
                                <i-col span='19' v-if="showData.type === 0">
                                    <p>{{showData.wx_content}}</p>
                                </i-col>
                                <i-col span='19' v-if="showData.type === 3">
                                    <div v-html='showData.share_content'></div>
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">二维码图片:</span>
                                </i-col>
                                <i-col span='19' v-if="showData.type === 0">
                                    <img class="img1" :src='showData.qrcode' style="width:100px;height:100px;margin:0 auto; display:block;">
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                    <i-col class="listItem">
                        <FormItem class="formItem">
                            <row class="formRow">
                                <i-col span='5'>
                                    <span class="lable">图片:</span>
                                </i-col>
                                <i-col span='19' v-if="showData.type === 0 ||showData.type === 1||showData.type === 2">
                                    <img class="img1" v-for="(item,index) in showData.images" :key='index' :src="item"
                                        style="width:100px;height:100px;float:left;margin-right:5px;">
                                </i-col>
                                <i-col span='19' v-if="showData.type === 3">
                                    <img class="img2" :src="showData.share_thumb" style="width:100px;height:100px;float:left;margin-right:5px;">
                                </i-col>
                            </row>
                        </FormItem>
                    </i-col>
                </row>
            </i-form>
        </Modal>
        <city ref="citys"></city>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
import cityArr from "../../../assets/city.js";
// import VueUeditorWrap from "vue-ueditor-wrap";
// import bigdataTable from '../../components/vue-bigdata-table';
// import indexRender from './index-render.js';
import { returnHasPower, isShowColumn } from "@/libs/util";
import city from "../../components/cityShow/cityShow.vue"
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
            // console.log(this.formInline.share_price * this.formInline.num);

            return this.total_price;
        }
    },
    components: {city},
    data() {
        return {
            cityList:[],
            showTable:true,
            showData: {
                id: "",
                area:[],
                created_at: "",
                start_time: "",
                status: "",
                type: 0,
                total_price: "",
                num: "",
                qrcode:''
            },
            showModal: false,
            reason: "",
            searchData: {
                taskType: -1,
                verify: 2,
                title: "",
                start_time: ["", ""]
            },
            meerchatList: [],

            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: "100%",
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                // serverUrl: "http://35.201.165.105:8000/controller.php",
                serverUrl: "https://www.iryi.cn/get-edit",

                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: "/UEditor/"
            },

            spinShow: false,
            spinShow2: false,
            disabledGroup: [],
            total_price: 0,
            // picHead:'',
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
                tt_request: "", //头条要求

                //软文推广
                share_price: 0.0, //赏金
                share_thumb: "" //分享封面
                //share_content: '' //分享文章内容(废弃,编辑器无法识别)
            },
            msg: "", //分享文章内容
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

            //上为新建页面参数
            currentId: "",
            column: [
                {
                    title: "主任务号",
                    width:'100',
                    align: "center",
                    key: "id"
                },
                {
                    title: "标题",
                    width:'300',
                    align: "center",
                    key: "title"
                },
                // {
                //     title: "分类",
                //     align: "center",
                //     render(h, params) {
                //         return h("p", !params.row.cate?"无":params.row.cate.name);
                //     }
                // },
                {
                    title:'客户ID',
                    width:'100',
                    align: "center",
                    render(h, params) {
                        return h("p", !params.row.merchant?"无":params.row.merchant.id);
                    }
                },{
                    title:'客户账户',
                    width:'100',
                    align: "center",
                    render(h, params) {
                        return h("p", !params.row.merchant?"无":params.row.merchant.username);
                    }
                },{
                    title:'客户电话',
                    width:'150',
                    align: "center",
                    render(h, params) {
                        return h("p", !params.row.merchant?"无":params.row.merchant.tel);
                    }
                },
                {
                    title: "任务类型",
                    align: "center",
                    width:'100',
                    render(h, params) {
                        return h(
                            "p",
                            params.row.type === 0
                                ? "朋友圈"
                                : params.row.type === 1
                                ? "抖音"
                                : params.row.type === 2
                                ? "头条"
                                : "分享"
                        );
                    }
                },
                {
                    title: "已领/名额",
                    align: "center",
                    width:'100',
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.records_count + " / " + params.row.num
                        );
                    }
                },
                {
                    title: "待审核数量",
                    align: "center",
                    width:'100',
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.record_wait_verifys_count
                        );
                    }
                },
                {
                    title: "已完成数量",
                    align: "center",
                    width:'100',
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.record_finishs_count
                        );
                    }
                },
                {
                    title: "已返款数量",
                    align: "center",
                    width:'100',
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.record_verifys_count
                        );
                    }
                },
                {
                    title: "审核状态",
                    align: "center",
                    width:'100',
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs:{
                                    style:'color:#'+(params.row.verify_status === -1
                                ? "ed4014"
                                : params.row.verify_status === 0
                                ? "ff9900"
                                : "19be6b")
                                }
                            },
                            params.row.verify_status === -1
                                ? "未通过"
                                : params.row.verify_status === 0
                                ? "待审核"
                                : "审核通过"
                        );
                    }
                },
                // {
                //     title: "文案",
                //     align: "center",
                //     render: (h, params) => {
                //         return h("pre",{
                            
                //         }, !params.row.wx_content?"":params.row.wx_content);
                //     }
                // },
                {
                    title: "任务开始时间",
                    align: "center",
                    width:'150',
                    // key: "start_time"
                    render(h,params) {
                        return h('p',!params.row.start_time?'无':params.row.start_time)
                    },
                },
                {
                    title: "创建日期",
                    width:'150',
                    align: "center",
                    // key: "created_at"
                    render(h,params) {
                        return h('p',!params.row.created_at?'无':params.row.created_at)
                    },
                },
                {
                    title: "任务开关",
                    width:'100',
                    align: "center",
                    render: (h, params) => {
                        return (!returnHasPower(this.$store.state.user.access,"taskPList-open")
                            ? h("p",{attrs:{style:'color:#'+(params.row.status === 0 ? "ed4014" : "19be6b")}}, params.row.status === 0 ? "关" : "开")
                            : h(
                            "i-switch",
                            {
                                props: {
                                    trueValue: 1,
                                    falseValue: 0,
                                    disabled: params.row.merchant_status === 1?true:false,
                                    value: params.row.status
                                },
                                nativeOn: {
                                    click: () => {
                                        if (params.row.merchant_status === 1) {
                                            this.$Message.error(
                                                "该任务已由客户关闭，无法进行操作"
                                            );
                                            return
                                        }
                                        axios
                                            .request({
                                                url:
                                                    "task/tasks/" +
                                                    params.row.id +
                                                    "/change",
                                                method: "post"
                                            })
                                            .then(res => {
                                                this.$Message.success(
                                                    "状态修改成功"
                                                );
                                                this.getList();
                                            });
                                    }
                                }
                            },
                            0
                        ));
                    }
                },
                {
                    title: "操作",
                    align: "center",
                    width: "300",
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
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.cityList = params.row.area;
                                            this.$refs.citys.initData(this.cityList)
                                        }
                                    }
                                },
                                "查看投放"
                            ),h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.showData.id = params.row.id;
                                            this.showData.area = params.row.area;
                                            this.showData.created_at =
                                                params.row.created_at;
                                            this.showData.start_time =
                                                params.row.start_time;
                                            this.showData.status =
                                                params.row.status;
                                            this.showData.type =
                                                params.row.type;

                                            this.showData.total_price =
                                                params.row.total_price;
                                            this.showData.num = params.row.num;
                                            this.showData.record_verifys_count =
                                                params.row.record_verifys_count;
                                            this.showData.verify_status =
                                                params.row.verify_status;
                                            this.showData.records_count =
                                                params.row.records_count;
                                            this.showData.title =
                                                params.row.title;
                                            this.showData.wx_content =
                                                params.row.wx_content;
                                            this.showData.share_content =
                                                params.row.share_content;
                                            this.showData.images =
                                                params.row.images;
                                            this.showData.share_thumb =
                                                params.row.share_thumb;
                                            this.showData.qrcode = params.row.qrcode
                                            this.showModal = true;
                                        }
                                    }
                                },
                                "查看"
                            ),
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
                                                "taskPList-review"
                                            )
                                                ? "inline-block;"
                                                : "none;"),
                                            disabled:params.row.verify_status!==0
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.deleteName = params.row.title;
                                            this.returncancel(true);
                                        }
                                    }
                                },
                                "通过"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small"
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "taskPList-review"
                                            )
                                                ? "inline-block;"
                                                : "none;"),
                                            disabled:params.row.verify_status!==0
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.deleteName = params.row.title;
                                            this.returncancel1(true);
                                        }
                                    }
                                },
                                "拒绝"
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
                            //                 this.currentId = params.row.id;
                            //                 this.deleteName = params.row.title;
                            //                 this.cancelcancel(true);
                            //             }
                            //         }
                            //     },
                            //     "删除"
                            // )
                        ]);
                    }
                }
            ],
            list: [],
            deleteName: "",
            cancelModal: false,

            returnModal: false,
            returnModal1: false,
            editModal: false,
            total: 1,
            currentPage: 1,
            per_page: 10,
            defailPage: 10,
            pageSize: [5, 10, 20, 50, 200, 500],

            typeList: []
        };
    },
    mounted() {
        this.getList();
        this.getJson();
        // this.getMerchatList();
        this.getTypeList();
    },
    methods: {
        //整理选择城市
        returnAdd() {
            this.$router.push({ path: "/newTask" });
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
        returnItem(i) {
            axios
                .request({
                    url: "task/tasks/" + this.currentId + "/verify",
                    method: "post",
                    data: {
                        verify_status: i,
                        reason: this.reason
                    }
                })
                .then(res => {
                    if (i === 1) {
                        this.$Message.success("通过成功");
                    } else {
                        this.$Message.success("拒绝成功");
                    }
                    this.getList();
                    this.reason = "";
                })
                .catch(err => {
                    if (i === 1) {
                        this.$Message.error("通过失败");
                    } else {
                        this.$Message.error("拒绝失败");
                    }
                    this.getList();
                    this.reason = "";
                });
        },
        returncancel(i) {
            this.returnModal = i;
        },
        returncancel1(i) {
            this.returnModal1 = i;
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
                    url: "https://www.iryi.cn/delete",
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
        ready(editorInstance) {
            this.editorInstance = editorInstance;
        },
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
            // this.deletePic()
            // this.resetData1(type);
            // this.resetData("formInline");
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
        changeDate1(date1, date2) {
            this.searchData.start_time = date1;
        },
        //上传朋友圈图片
        successUpload(file) {
            this.spinShow = false;
            this.formInline.images.push(file.url);
            this.deletePicArr.push(file.url);
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
                        url: "https://www.iryi.cn/delete",
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
                        url: "https://www.iryi.cn/delete",
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
                console.log(valid);

                if (valid) {
                    for (let i = 0; i < this.formInline.images.length; i++) {
                        this.formInline.images[i] = this.filterUrl(
                            this.formInline.images[i]
                        );
                    }
                    axios
                        .request({
                            // url: "https://www.iryi.cn/total",
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
        },

        //上为新建method
        cancelcancel(i) {
            this.cancelModal = i;
        },
        
        getList() {
            //获取列表
            axios
                .request({
                    url:
                        "task/tasks?pagesize=" +
                        this.per_page +
                        "&page=" +
                        this.currentPage +
                        "&type=" +
                        (this.searchData.taskType === -1
                            ? ""
                            : this.searchData.taskType) +
                        "&verify=" +
                        (this.searchData.verify === 2
                            ? ""
                            : this.searchData.verify) +
                        "&title=" +
                        this.searchData.title +
                        "&start_time=" +
                        (this.searchData.start_time[0] === ""
                            ? ""
                            : this.searchData.start_time[0] +
                              "," +
                              this.searchData.start_time[1]),
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data.data;
                    // this.list = []
                    // let i = 0
                    // setInterval(()=>{
                    //     this.list.push(res.data.data.data[i])
                    //     i++
                    // },1000)
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
        //删除列表项
        deleteItem() {
            axios
                .request({
                    url: "task/tasks/" + this.currentId,
                    method: "delete"
                })
                .then(res => {
                    this.$Message.success("删除成功");
                    this.getList();
                })
                .catch(err => {
                    this.$Message.error("删除失败");
                    this.getList();
                });
            this.cancelcancel(false);
        },
        //
        getchangeList(index) {
            this.currentPage = index;
            this.getList();
        },
        changePageGetList(size) {
            this.per_page = size;
            this.currentPage = 1;
            this.getList();
        }
    }
};
</script>

<style lang='less'>
.TASKPLIST {
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
.TASKLISTModal {
    .formPage {
        margin-bottom: 20px;
        overflow: hidden;
        .listRow {
            width: 49%;
            float: left;
            .listItem:last-child .formItem .formRow {
                border-bottom: 1px solid #ddd;
            }
        }
        .listRow.all {
            width: 100%;
        }
        .listRow + .listRow {
            margin-left: 2%;
        }
        .formItem {
            display: block;
            margin: 0px auto;
            .ivu-form-item-error-tip {
                padding-left: 141.5px;
            }
            // .formRow.textarea{
            //     height: 94px;
            // }

            .formRow {
                display: block;
                border-top: 1px solid #ddd;
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                // padding: 5px 10px;
                .ivu-col:last-child {
                    border-left: 1px solid #ddd;
                }
                p {
                    text-align: center;
                }
                // 
                .lable {
                    display: block;
                    padding-right: 10px;
                    text-align: center;
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
