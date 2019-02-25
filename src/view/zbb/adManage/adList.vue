<template>
    <div>
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
            column: [
                {
                    title: "排序",
                    key: "sort"
                },
                {
                    title: "标题",
                    key: "title"
                },
                {
                    title: "图片",
                    key: "image"
                },
                {
                    title: "链接",
                    key: "url"
                },
                {
                    title: "所属分类",
                    key: "page"
                },
                {
                    title: "操作",
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
                                        click: () => {}
                                    }
                                },
                                "修改"
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
                                        click: () => {}
                                    }
                                },
                                "修改"
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
            pageSize: [2, 20, 50, 100, 200]
        };
    },
    methods:{
        getList() {
            axios
                .request({
                    url: "ads?page="+this.currentPage+"&pagesize="+this.per_page,
                    method: "get"
                })
                .then(res => {
                    this.list = res.data.data.data;
                    console.log(this.list);
                    
                });
        },
        getchangeList(index){
            this.currentPage = index
            this.getList()
        },
        changePageGetList(size){
            this.per_page = size
            this.getList()
        }
    },  
    mounted(){
        this.getList()
    }
};
</script>

<style scoped>
</style>