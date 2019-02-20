<template>
    <div>
        <Table stripe border :columns="permissColumn" :data="permissList"></Table>
        <!-- <Button type="success" style="margin:0 auto;display:block;" @click="log()">123</Button> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            permissColumn: [
                {
                    title: "模块",
                    width:150,
                    key: "moudal"
                },
                {
                    title: "权限",
                    // key:'permiss'
                    render:(h, params)=> {
                        var self = this
                        return h(
                            "div",
                            params.row.permiss.map((v,index) => {
                                return h(
                                    "Checkbox",
                                    {
                                        props:{
                                            value: v.value
                                        },
                                        on: {
                                            'on-change': (val) => {
                                                this.permissList[params.row._index].permiss[index].value = val
                                            }
                                        }
                                    },
                                    v.name
                                );
                            })
                        );
                    }
                } 
            ],
            permissList: [
                {
                    moudal: "首页",
                    permiss: [
                        {
                            name: "欢迎界面",
                            value: true
                        }
                    ]
                },{
                    moudal: "管理员管理",
                    permiss: [
                        {
                            name: "管理员管理",
                            value: true
                        },
                        {
                            name: "添加管理员",
                            value: true
                        },
                        {
                            name: "修改管理员",
                            value: true
                        },
                        {
                            name: "删除管理员",
                            value: true
                        },
                        {
                            name: "修改权限组",
                            value: true
                        }
                    ]
                },{
                    moudal: "用户组管理",
                    permiss: [
                        {
                            name: "用户组管理",
                            value: true
                        },
                        {
                            name: "添加用户组",
                            value: true
                        },
                        {
                            name: "修改用户组",
                            value: true
                        },
                        {
                            name: "删除用户组",
                            value: true
                        },
                        {
                            name: "分配权限",
                            value: true
                        }
                    ]
                },{
                    moudal: "客户管理",
                    permiss: [
                        {
                            name: "客户管理",
                            value: true
                        },
                        {
                            name: "添加客户",
                            value: true
                        },
                        {
                            name: "修改客户",
                            value: true
                        },
                        {
                            name: "删除客户",
                            value: true
                        }
                    ]
                },{
                    moudal: "任务管理",
                    permiss: [
                        {
                            name: "任务管理",
                            value: true
                        },{
                            name: "添加任务",
                            value: true
                        },{
                            name: "审核任务",
                            value: true
                        },{
                            name: "编辑任务",
                            value: true
                        },{
                            name: "删除任务",
                            value: true
                        }
                    ]
                },{
                    moudal: "师傅管理",
                    permiss: [
                        {
                            name: "师傅管理",
                            value: true
                        },{
                            name: "添加师傅",
                            value: true
                        },{
                            name: "修改师傅",
                            value: true
                        },{
                            name: "删除师傅",
                            value: true
                        },{
                            name: "批量通过",
                            value: true
                        },{
                            name: "批量拒绝",
                            value: true
                        },{
                            name: "禁用权限",
                            value: true
                        },{
                            name: "拉黑权限",
                            value: true
                        }
                    ]
                },{
                    moudal: "徒弟管理",
                    permiss: [
                        {
                            name: "徒弟管理",
                            value: true
                        },{
                            name: "添加徒弟",
                            value: true
                        },{
                            name: "修改徒弟",
                            value: true
                        },{
                            name: "删除徒弟",
                            value: true
                        },{
                            name: "批量通过",
                            value: true
                        },{
                            name: "批量拒绝",
                            value: true
                        },{
                            name: "禁用权限",
                            value: true
                        },{
                            name: "拉黑权限",
                            value: true
                        }
                    ]
                },{
                    moudal: "财务管理",
                    permiss: [
                        {
                            name: "财务管理",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----银行名称管理",
                    permiss:[
                        {
                            name: "银行名称管理",
                            value: true
                        },{
                            name: "添加银行",
                            value: true
                        },{
                            name: "修改银行",
                            value: true
                        },{
                            name: "删除银行",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----绑定银行管理",
                    permiss:[
                        {
                            name: "绑定银行管理",
                            value: true
                        },{
                            name: "添加绑定",
                            value: true
                        },{
                            name: "批量通过",
                            value: true
                        },{
                            name: "批量拒绝",
                            value: true
                        },{
                            name: "修改操作",
                            value: true
                        },{
                            name: "删除操作",
                            value: true
                        },{
                            name: "通过操作",
                            value: true
                        },{
                            name: "拒绝操作",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----师傅提现管理",
                    permiss:[
                        {
                            name: "师傅提现管理",
                            value: true
                        },{
                            name: "批量通过",
                            value: true
                        },{
                            name: "批量拒绝",
                            value: true
                        },{
                            name: "修改操作",
                            value: true
                        },{
                            name: "删除操作",
                            value: true
                        },{
                            name: "通过操作",
                            value: true
                        },{
                            name: "拒绝操作",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----徒弟提现管理",
                    permiss:[
                        {
                            name: "徒弟提现管理",
                            value: true
                        },{
                            name: "批量通过",
                            value: true
                        },{
                            name: "批量拒绝",
                            value: true
                        },{
                            name: "修改操作",
                            value: true
                        },{
                            name: "删除操作",
                            value: true
                        },{
                            name: "通过操作",
                            value: true
                        },{
                            name: "拒绝操作",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----师傅资金记录",
                    permiss:[
                        {
                            name: "师傅资金记录",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----徒弟资金记录",
                    permiss:[
                        {
                            name: "徒弟资金记录",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----充值审核",
                    permiss:[
                        {
                            name: "充值审核",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----平台总流水",
                    permiss:[
                        {
                            name: "平台总流水",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----用户金额修改",
                    permiss:[
                        {
                            name: "用户金额修改",
                            value: true
                        }
                    ]
                },{
                    moudal: "广告管理",
                    permiss:[
                        {
                            name: "广告管理",
                            value: true
                        },{
                            name: "新增广告",
                            value: true
                        },{
                            name: "编辑广告",
                            value: true
                        },{
                            name: "删除广告",
                            value: true
                        }
                    ]
                },{
                    moudal: "系统配置",
                    permiss:[
                        {
                            name: "系统配置",
                            value: true
                        },{
                            name: "系统配置编辑",
                            value: true
                        },{
                            name: "收款账号",
                            value: true
                        }
                    ]
                },{
                    moudal: "黑户管理",
                    permiss:[
                        {
                            name: "黑户管理",
                            value: true
                        },{
                            name: "添加黑号",
                            value: true
                        },{
                            name: "删除黑号",
                            value: true
                        },{
                            name: "批量移除",
                            value: true
                        }
                    ]
                },{
                    moudal: "登录记录",
                    permiss:[
                        {
                            name: "登录记录",
                            value: true
                        }
                    ]
                },{
                    moudal: "操作记录",
                    permiss:[
                        {
                            name: "操作记录",
                            value: true
                        }
                    ]
                },{
                    moudal: "发布公告",
                    permiss:[
                        {
                            name: "发布公告",
                            value: true
                        }
                    ]
                }
            ]
        };
    },
    mounted() {},
    methods: {
        log(){
            console.log(this.permissList);
        }
    }
};
</script>

<style scoped>
</style>