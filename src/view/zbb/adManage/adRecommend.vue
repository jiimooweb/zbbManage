<template>
    <div>
        <Table stripe :columns="column" border :data="list"></Table>
        <Page style="margin-top:20px;" :total="total" show-total :page-size='defailPage' show-elevator show-sizer
            :page-size-opts='pageSize' @on-change="getchangeList" @on-page-size-change='changePageGetList' />
        <Modal v-model="editModal" title='处理' @on-ok="inputItem()" @on-cancel="cancelEdit(false)">
            <p style="text-align:center;font-size:16px;">是否确认<span style="color:red;">{{currentName}}</span>已处理?</p>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
    export default {
        data(){
            return{
                editModal:false,
                column:[
                    {
                        title:'推荐ID',
                        width:"100",
                        align:'center',
                        key:'id'
                    },{
                        title:'客户端类型',
                        width:"100",
                        align:'center',
                        render:(h,params)=> {
                            return h('p',params.row.type==='Master'?'师傅':'徒弟')
                        },
                    },{
                        title:'姓名',
                        width:"100",
                        align:'center',
                        key:'name'
                    },{
                        title:'手机号码',
                        width:"150",
                        align:'center',
                        key:'phone'
                    },{
                        title:'微信号',
                        width:"150",
                        align:'center',
                        key:'wx'
                    },{
                        title:'投广意向',
                        width:"200",
                        align:'center',
                        // key:'intention'
                        render:(h,params)=> {
                            return h('p',params.row.intention===0?'朋友圈':(params.row.intention===1?'文章-软文推广':(params.row.intention===2?'抖音':'今日头条')))
                        },
                    },{
                        title:'备注',
                        width:"300",
                        align:'center',
                        key:'remark'
                    },{
                        title:'状态',
                        // width:"100",
                        align:'center',
                        render:(h,params)=> {
                            return h('p',{
                                attrs:{
                                    style:'color:#'+params.row.status===0?'ff9900':'19be6b'
                                }
                            },params.row.status===0?'待处理':'已处理')
                        },
                    },{
                        title:'操作',
                        width:"150",
                        align:'center',
                        render:(h,params)=> {
                            return h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small",
                                        disabled: params.row.status !== 0
                                    },
                                    attrs: {
                                        style:
                                            "font-size:12px;"
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.currentName =
                                                params.row.name;
                                            this.cancelEdit(true);
                                        }
                                    }
                                },
                                "处理"
                            )
                        },
                    }
                ],
                list: [],
                currentName: "",
                currentId: "",
                total: 1,
                currentPage: 1,
                per_page: 20,
                defailPage: 20,
                pageSize: [5, 10, 20, 50]
            }
        },
        methods:{
            cancelEdit(i){
                this.editModal = i
            },
            inputItem(){
                axios.request({
                    url:'recommends/'+this.currentId,
                    method:'post',
                    data:{
                        status:1
                    }
                }).then(res=>{
                    this.$Message.success('处理成功')
                    this.getList()
                })
            },
            getList(){
                axios.request({
                    url:'recommends?page='+this.currentPage+'&pagesize='+this.per_page,
                    method:'get'
                }).then(res=>{
                    console.log(res);
                    this.list =  res.data.data.data
                })
            },
            changePageGetList(size){
                this.per_page = size
                this.currentPage = 1
                this.getList()
            },
            getchangeList(index){
                this.currentPage = index
                this.getList()
            }
        },
        mounted(){
            this.getList()
        }
    }
</script>

<style scoped>

</style>