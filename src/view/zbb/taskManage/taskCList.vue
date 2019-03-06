<template>
    <div>
        <i-form ref="search" class="search" :model="searchData" :label-width="80">
            <row>
                <i-col span='4'>
                    <row>
                        <i-col span='8' style="line-height:33px;text-align:center;">
                            任务类型:
                        </i-col>
                        <i-col span='12'>
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
                <i-col span='4'>
                    <row>
                        <i-col span='8' style="line-height:33px;text-align:center;">
                            状态:
                        </i-col>
                        <i-col span='12'>
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
                <i-col span='4'>
                    <row>
                        <i-col span='8' style="line-height:33px;text-align:center;">
                            标题:
                        </i-col>
                        <i-col span='12'>
                            <FormItem prop="title" lable='审核状态'>
                                <Input type="text" v-model="searchData.title" />
                            </FormItem>
                        </i-col>
                    </row>
                </i-col>
                <i-col span='4'>
                    <row>
                        <i-col span='8' style="line-height:33px;text-align:center;">
                            时间段:
                        </i-col>
                        <i-col span='16'>
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
        <Table stripe :columns="column" border :data="list"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            searchData: {
                taskType: -1,
                verify: 2,
                title: "",
                start_time: ["", ""]
            },
            column: [
                {
                    title: "任务ID",
                    key: "task_id"
                },
                {
                    title: "任务完成时间",
                    key: "task_time"
                },
                {
                    title: "数量",
                    key: "num"
                },
                {
                    title: "徒弟ID",
                    key: "apprentice_id"
                },
                {
                    title: "任务状态",
                    key: "status"
                },
                {
                    title: "审核状态",
                    key: "verify_status"
                },
                {
                    title: "完成截图",
                    key: "success_url"
                },
                {
                    title: "确认时间",
                    key: "confirm_time"
                },
                {
                    title: "确认人",
                    key: "confirmor"
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        return h();
                    }
                }
            ],
            list: [],
            currentId: "",
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
        getList() {
            axios
                .request({
                    url:
                        "task/records?pagesize=" +
                        this.per_page +
                        "&page=" +
                        this.currentPage +
                        "&taskType=" +
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
                            : JSON.stringify(this.searchData.start_time)),
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
</style>
