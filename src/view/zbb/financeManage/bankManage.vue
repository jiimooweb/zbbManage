<template>
    <div>
        <Button type="primary" style='margin:10px 0;display:block;' @click="newDate()">添加银行</Button>
        <Table :columns="bankColumn" :data="bankList"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="changeGetList" @on-page-size-change='changePageGetList' />
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            total:1,
            per_page: 20,
            defailPage:20,
            currentPage:1,
            pageSize: [2, 20, 50, 100, 200],
            bankColumn: [
                {
                    title: "银行ID",
                    key: ""
                },
                {
                    title: "银行名称",
                    key: "name"
                },
                {
                    title: "手续费",
                    key: "poundage"
                },
                {
                    title: "备注",
                    key: "remark"
                },
                {
                    title: "禁用",
                    key: "state"
                },
                {
                    title: "操作",
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
                                        style: "font-size:12px"
                                    },
                                    nativeOn: {
                                        click: () => {}
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
                                        click: () => {}
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            bankList: []
        };
    },
    methods: {
        newDate(){

        },
        changeGetList(index){
            //改变页数时请求
        },

        changePageGetList(size){
            //改变每页条数时请求
            this.currentPage = 1
        },

        getBankList(){
            //打开页面请求数据
            axios.request({
                url:"bank/banks",
                method:'get'
            }).then(res=>{
                console.log(res);
                
            })
        }
    },
    mounted() {
        this.getBankList()
    }
};
</script>

<style scoped>
</style>