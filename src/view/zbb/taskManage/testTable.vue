<template>
    <div id="app">
        <div class="wraper">
            123
            <bigdata-table ref="table" v-model="list" :columns="column"></bigdata-table>
        </div>
        <p style="padding-left: 100px;">你可以点击序列号试试</p>
        <div style="padding-left: 100px">
            <button @click="scrollRowTo(2)">跳转到第3行</button>
            <button @click="scrollRowTo(8978)">跳转到第8979行</button>
            <button @click="scrollRowTo(299)">跳转到第300行</button>
            <button @click="scrollRowTo(8997)">跳转到第8998行</button>
            <button @click="scrollRowTo(scrollIndex)">跳转到第{{ scrollIndex + 1 }}行</button>
            <button @click="editCell">编辑第{{ editRow }}行第{{ editCol }}列</button>
            <button @click="changeData(100)">change data</button>
            <button @click="changeDefaultSort">change default sort</button>
        </div>
    </div>
</template>
<script>
// let wordsArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
import bigdataTable from "../../components/vue-bigdata-table";
import indexRender from "./index-render.js";
import axios from "@/libs/api.request";
export default {
    name: "app",
    components: {
        bigdataTable
    },
    data() {
        return {
            tableData: [],
            columns: [],
            tableDataHandled: [], // 带有数据的表格数据
            emptyData: [], // 空的表格数据
            scrollIndex: 1,
            canEdit: true,
            editRow: 1,
            editCol: 1,
            defaultSort: { 1: "down" },
            indexRender,
            indexRenderParams: {
                index: -1
            },
            list: [],
            column1:[

            ],

            column: [
                {
                    title: "主任务号",
                    align: "center",
                    // key: "id"
                    render:(h,params)=> {
                        return h('p',params.row.id)
                    },
                },
                {
                    title: "标题",
                    align: "center",
                    // key: "title"
                    render:(h,params)=> {
                        return h('p',params.row.center)
                    },
                    
                },
                // {
                //     title: "分类",
                //     align: "center",
                //     render(h, params) {
                //         return h("p", !params.row.cate?"无":params.row.cate.name);
                //     }
                // },
                {
                    title: "任务类型",
                    align: "center",
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
                    render: (h, params) => {
                        return h(
                            "p",
                            params.row.records_count + " / " + params.row.num
                        );
                    }
                },
                {
                    title: "审核状态",
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "p",
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
                    // key: "start_time"
                    render:(h,params)=> {
                        return h('p',params.row.start_time)
                    },
                },
                {
                    title: "创建日期",
                    align: "center",
                    // key: "created_at"
                    render:(h,params)=> {
                        return h('p',params.row.created_at)
                    },
                },
                {
                    title: "任务开关",
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "i-switch",
                            {
                                props: {
                                    trueValue: 1,
                                    falseValue: 0,
                                    value: params.row.status
                                },
                                nativeOn: {
                                    click: () => {
                                        if (params.row.merchant_status === 1) {
                                            this.$Message.error(
                                                "该任务已由客户关闭，无法进行操作"
                                            );
                                            params.row.status = !params.row
                                                .status;
                                            return false;
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
                        );
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
                                            this.showData.id = params.row.id;
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
                                            "font-size:12px;margin-right:15px;"
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
                                            "font-size:12px;margin-right:15px;"
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
                                            this.deleteName = params.row.title;
                                            this.cancelcancel(true);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
        };
    },
    watch: {
        tableDataHandled(res) {
            // console.log(res)
        }
    },
    methods: {
        getList() {
            //获取列表
            axios
                .request({
                    url:
                        "task/tasks?pagesize=100&page=1",
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
                    // this.total = res.data.data.total;
                    // this.currentPage = res.data.data.current_page;
                    // this.per_page = res.data.data.per_page;
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        changeData(rowLen) {
            let dataArr = [];
            for (let i = 0; i < rowLen; i++) {
                let arr = [
                    i + "00",
                    "count" + i,
                    "23.4534534345",
                    "0023" + i,
                    "123.234534534534",
                    "namenasdfsdfsdfsdfssdfsdfsdsdfsdfsf" + i,
                    "2014年1月1日"
                ];
                dataArr.push(arr);
            }
            this.tableDataHandled = dataArr;
        }
    },
    mounted() {
        this.getList()
        this.changeData(10000);
        let headers = [
            "这是数字",
            "这是字符1列",
            "这是纬度",
            "这是数字",
            "这是经度",
            "这是字符2列",
            "这是时间"
        ];
        let columns = headers.map((title, col) => {
            return {
                title: title,
                // render: (h, col) => {
                // 	return h('div', {
                // 		'class': [
                // 			'header-title-wraper'
                // 		],
                // 		on: {
                // 			click: () => {
                // 				console.log(col)
                // 			}
                // 		}
                // 	}, [
                // 		h('div', {
                // 			'class': [
                // 				'mark-con'
                // 			]
                // 		}, wordsArr[col]),
                // 		h('div', {
                // 			'class': [
                // 				'title-con'
                // 			]
                // 		}, [])
                // 	]);
                // },
                align: "center"
            };
        });
        // console.timeEnd('getColumns');
        this.columns = columns;
        console.log(this.columns);
        console.log(this.tableDataHandled);
        
    }
};
</script>

<style lang="less">
.wraper {
    margin: 0px auto;
    padding: 40px;
    width: 1000px;
    height: 500px;
    overflow: auto;
}
.header-title-wraper {
    height: 100%;
    width: 100%;
    .mark-con {
        height: ~"calc(40% - 1px)";
        width: 100%;
        border-bottom: 1px solid #e9eaec;
        text-align: center;
        line-height: 27px;
    }
    .title-con {
        height: 60%;
        width: 100%;
        text-align: center;
        line-height: 41px;
    }
}
.unormal-value {
    background: #ffa3a1 !important;
}
.unormal-row {
    background: #ffd8d3 !important;
}
.unormal-index {
    background: #ff4c5e !important;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 100%;
    line-height: 48px;
}
.index-render-item-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    .index-slide-wrapper {
        width: 200%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        transform: translateX(0);
        transition: all 0.2s ease;
        &.slide-to-left {
            transform: translateX(-50%);
            transition: all 0.2s ease;
        }
        div {
            float: left;
            width: 50%;
            height: 100%;
        }
        .index-render-tip-con {
            background: #ffd0d0;
            line-height: 46px;
            .is-paintting-tip {
                padding: 4px 10px;
            }
        }
        .index-render-num-con {
            & > span {
                display: inline-block;
                height: 100%;
                line-height: 46px;
            }
        }
    }
}
</style>
