<template>
    <div>
        <Table stripe :columns="column" border :data="list"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="cancelModal" title='删除' @on-ok="cancelItem()" @on-cancel="cancelcancel(false)">
            <p style="text-align:center;font-size:16px;">是否删除广告----<span style="color:red;">{{deleteName}}</span>----</p>
        </Modal>
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
                    align:'center',
                    key: "sort"
                },
                {
                    title: "标题",
                    align:'center',
                    key: "title"
                },
                {
                    title: "图片",
                    align:'center',
                    // key: "image"
                    render:(h,params)=> {
                        return h('img',{
                            attrs:{
                                style:'width:100px;height:100px;',
                                src: params.row.image
                            }
                        })
                    },
                },
                {
                    title: "链接",
                    align:'center',
                    key: "url"
                },
                {
                    title: "所属分类",
                    align:'center',
                    // key: "flag"
                    render:(h,params)=> {
                        return h('p',params.row.flag==='Swiper'?'首页幻灯':(params.row.flag==='Top'?'文章顶部':'文章底部'))
                    },
                },
                {
                    title: "操作",
                    align:'center',
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
                                        type: "error",
                                        size: "small"
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;margin-right:15px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id
                                            this.deleteName = params.row.title
                                            this.cancelcancel(true)
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            list: [],

            cancelModal:false,
            deleteName:'',

            currentId: "",
            total: 1,
            currentPage: 1,
            per_page: 20,
            defailPage: 20,
            pageSize: [2, 20, 50, 100, 200]
        };
    },
    methods:{
        cancelItem(){
            axios.request({
                url:'ads/'+this.currentId,
                method:'delete'
            }).then(res=>{
                this.$Message.success('删除成功')
                this.cancelcancel(false)
            })
        },
        cancelcancel(i){
            this.cancelModal = i
        },
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