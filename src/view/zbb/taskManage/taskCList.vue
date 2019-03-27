<template>
    <div class="TASKCLIST">
        <i-form ref="search" class="search" :model="searchData" >
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
                                <DatePicker :value="searchData.start_time" @on-change='changeDate' type="daterange"
                                    placeholder="选择日期"></DatePicker>
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='2'>
                    <Button type="success" @click="getList()">搜索</Button>
                </i-col>
            </row>
        </i-form>
        <Table stripe :columns="column" border :data="list"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="returnModal" title='审核' @on-ok="returnItem(1)" @on-cancel="returncancel(false)">
            <p style="text-align:center;font-size:16px;">是否通过----<span style="color:red;">{{deleteName}}</span>----的审核</p>
        </Modal>
        <Modal v-model="returnModal1" title='审核' @on-ok="returnItem(-1)" :mask-closable="false" @on-cancel="returncancel1(false)">
            <p style="text-align:center;font-size:16px;">是否拒绝----<span style="color:red;">{{deleteName}}</span>----的审核</p>
        </Modal>
        <div v-if='showPic' @click="hidePic" style="background:rgba(0,0,0,0.8);">
            <img :src="bigPic" style="width:50%;margin:0 auto;display:block;">
        </div>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            showPic: false,
            bigPic: "",
            searchData: {
                taskType: -1,
                verify: 2,
                title: "",
                start_time: ["", ""]
            },
            column: [
                {
                    title: "母任务ID",
                    align: "center",
                    width: "100",
                    key: "task_id"
                },{
                    title: "母任务状态",
                    align: "center",
                    width: "100",
                    render(h, params) {
                        return h(
                            "p",{
                                style:'color:#'+(params.row.task.type === 0
                                ? "ed4014":'19be6b')
                            },
                            params.row.task.type === 0
                                ? "关闭":'开启'
                        );
                    }
                },{
                    title: "子任务ID",
                    align: "center",
                    width: "100",
                    key: "id"
                },{
                    title: "任务类型",
                    align: "center",
                    width: "100",
                    render(h, params) {
                        return h(
                            "p",
                            params.row.task.type === 0
                                ? "朋友圈"
                                : params.row.task.type === 1
                                ? "抖音"
                                : params.row.task.type === 2
                                ? "头条"
                                : "分享"
                        );
                    }
                },{
                    title: "数量",
                    align: "center",
                    width: "70",
                    key: "num"
                },
                {
                    title: "子任务创建时间",
                    align: "center",
                    width: "200",
                    key: "created_at"
                },{
                    title: "作品链接",
                    align: "center",
                    width: "200",
                    // key: "task_time"
                    render(h,params) {
                        return h('p',(params.row.task.type===1 || params.row.task.type===2)?params.row.url:'无')
                    },
                },
                {
                    title: "任务完成时间",
                    align: "center",
                    width: "200",
                    // key: "task_time"
                    render(h,params) {
                        return h('p',params.row.task_time?params.row.task_time:'无')
                    },
                },
                // {
                //     title: "数量",
                //     width:'100',
                //     align:'center',
                //     key: "num"
                // },
                {
                    title: "徒弟ID",
                    width: "100",
                    align: "center",
                    key: "apprentice_id"
                },{
                    title: "徒弟名称",
                    width: "100",
                    align: "center",
                    render:(h,params)=> {
                        return h('p',params.row.apprentice?params.row.apprentice.name:'无')
                    },
                },
                {
                    title: "任务状态",
                    width: "100",
                    align: "center",
                    // key: "status"
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "color:#" +
                                        (params.row.status === 0
                                            ? "ff9900"
                                            : params.row.status === 1
                                            ? "19be6b"
                                            : "ed4014")
                                }
                            },
                            params.row.status === 0
                                ? "执行中"
                                : params.row.status === 1
                                ? "已完成"
                                : "已取消"
                        );
                    }
                },
                {
                    title: "审核状态",
                    width: "100",
                    align: "center",
                    // key: "verify_status"
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                attrs: {
                                    style:
                                        "color:#" +
                                        (params.row.verify_status === 0
                                            ? "ff9900"
                                            : params.row.verify_status === 1
                                            ? "19be6b"
                                            : "ed4014")
                                }
                            },
                            params.row.verify_status === 0
                                ? "待处理"
                                : params.row.verify_status === 1
                                ? "已通过"
                                : "未通过"
                        );
                    }
                },
                {
                    title: "完成截图",
                    align: "center",
                    width: "100",
                    // key: "success_url"
                    render: (h, params) => {
                        if (params.row.success_url === "") {
                            return h("p", "无");
                        } else {
                            return h("img", {
                                attrs: {
                                    style: "width:70px;height:70px;",
                                    src: params.row.success_url
                                },
                                nativeOn: {
                                    click: () => {
                                        this.showPic = true;
                                        this.bigPic = params.row.success_url;
                                    }
                                }
                            });
                        }
                    }
                },
                {
                    title: "确认时间",
                    width: "200",
                    align: "center",
                    render(h,params) {
                        return h('p',params.row.confirm_time?params.row.confirm_time:'无')
                    },
                },
                {
                    title: "确认人",
                    width: "150",
                    align: "center",
                    // key: "confirmor"
                    render(h,params) {
                        return h('p',params.row.confirmor?params.row.confirmor:'无')
                    },
                },
                {
                    title: "操作",
                    width: "200",
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small",
                                        disabled: params.row.verify_status !== 0 || params.row.status !== 1
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.deleteName =
                                                params.row.apprentice.username;
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
                                        type: "error",
                                        size: "small",
                                        disabled: params.row.verify_status !== 0 || params.row.status !== 1
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.deleteName =
                                                params.row.apprentice.username;
                                            this.returncancel1(true);
                                        }
                                    }
                                },
                                "拒绝"
                            )
                        ]);
                    }
                }
            ],
            list: [],
            currentId: "",
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [5, 10, 20, 50, 200, 500],

            deleteName: "",
            returnModal: false,
            returnModal1: false
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        changeDate(date){
            this.searchData.start_time = date
        },
        hidePic() {
            this.showPic = false;
        },
        returnItem(i) {
            axios
                .request({
                    url: "task/records/" + this.currentId + "/verify",
                    method: "post",
                    data: {
                        verify_status: i
                    }
                })
                .then(res => {
                    if (i === 1) {
                        this.$Message.success("通过成功");
                    } else {
                        this.$Message.success("拒绝成功");
                    }
                    this.getList();
                })
                .catch(err => {
                    if (i === 1) {
                        this.$Message.error("通过失败");
                    } else {
                        this.$Message.error("拒绝失败");
                    }
                    this.getList();
                });
        },
        returncancel(i) {
            this.returnModal = i;
        },
        returncancel1(i) {
            this.returnModal1 = i;
        },
        changePageGetList(size) {
            this.per_page = size;
            this.currentPage = 1;
            this.getList();
        },
        getchangeList(index) {
            this.currentPage = index;
            this.getList();
        },
        getList() {
            axios
                .request({
                    url:
                        "task/records?pagesize=" +
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
                        "&create_time=" +
                        (this.searchData.start_time[0] === ""
                            ? ""
                            : this.searchData.start_time[0]+','+this.searchData.start_time[1]),
                    method: "get"
                })
                .then(res => {
                    console.log(res);
                    this.list = res.data.data.data;
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        }
    }
};
</script>

<style lang='less'>
.TASKCLIST {
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
}
</style>
