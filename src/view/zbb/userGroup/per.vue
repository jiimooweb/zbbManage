<template>
    <div>
        <Table stripe border :columns="permissColumn" :data="permissList"></Table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            permissColumn: [
                {
                    title: "模块",
                    width: 150,
                    key: "moudal"
                },
                {
                    title: "权限",
                    width: "600",
                    // key:'permiss'
                    render: (h, params) => {
                        var self = this;
                        return h(
                            "div",
                            params.row.permiss.map((v, index) => {
                                return h(
                                    "Checkbox",
                                    {
                                        props: {
                                            value: v.value
                                        },
                                        on: {
                                            "on-change": val => {
                                                this.permissList[
                                                    params.row._index
                                                ].permiss[index].value = val;
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
                            sign: 'home',
                            name: "欢迎界面",
                            value: true
                        }
                    ]
                },{
                    moudal: "管理员管理",
                    permiss: [
                        {
                            sign:'manageList',
                            name: "管理员管理",
                            value: true
                        },
                        {
                            sign:'manageEdit',
                            name: "添加管理员",
                            value: true
                        },
                        {
                            sign:'manageList-edit',
                            name: "修改管理员",
                            value: true
                        },
                        {
                            sign:'manageList-delete',
                            name: "删除管理员",
                            value: true
                        },
                        {
                            sign:'manageList-power',
                            name: "修改权限组",
                            value: true
                        }
                    ]
                },{
                    moudal: "用户组管理",
                    permiss: [
                        {
                            sign:'groupList',
                            name: "用户组管理",
                            value: true
                        },
                        {
                            sign:'newGroup',
                            name: "添加用户组",
                            value: true
                        },
                        {
                            sign:'groupList-edit',
                            name: "修改用户组",
                            value: true
                        },
                        {
                            sign:'groupList-delete',
                            name: "删除用户组",
                            value: true
                        },
                        {
                            sign:'groupList-powers',
                            name: "分配权限",
                            value: true
                        }
                    ]
                },{
                    moudal: "客服管理",
                    permiss: [
                        {
                            sign:'customerList',
                            name: "客服管理",
                            value: true
                        },
                        {
                            sign:'newCustomer',
                            name: "添加客服",
                            value: true
                        },
                        {
                            sign:'customerList-edit',
                            name: "修改客服",
                            value: true
                        },
                        {
                            sign:'customerList-delete',
                            name: "删除客服",
                            value: true
                        }
                    ]
                },{
                    moudal: "客户管理",
                    permiss: [
                        {
                            sign:'clientList',
                            name: "客户管理",
                            value: true
                        },
                        {
                            sign:'newClient',
                            name: "添加客户",
                            value: true
                        },
                        {
                            sign:'clientList-edit',
                            name: "修改客户",
                            value: true
                        },
                        {
                            sign:'clientList-delete',
                            name: "删除客户",
                            value: true
                        }
                    ]
                },
                {
                    moudal: "任务分类管理",
                    permiss: [
                        {
                            sign:'taskTypeManage',
                            name: "任务分类管理",
                            value: true
                        },{
                            sign:'taskTypeManage-new',
                            name: "添加任务分类",
                            value: true
                        },{
                            sign:'taskTypeManage-edit',
                            name: "编辑任务分类",
                            value: true
                        },{
                            sign:'taskTypeManage-delete',
                            name: "删除任务分类",
                            value: true
                        }
                    ]
                },{
                    moudal: "任务管理",
                    permiss: [
                        {
                            sign:'taskPList',
                            name: "母任务管理",
                            value: true
                        },{
                            sign:'taskPList-review',
                            name: "审核母任务",
                            value: true
                        }, {
                            sign:'taskCList',
                            name: "子任务管理",
                            value: true
                        },{
                            sign:'taskCList-review',
                            name: "审核子任务",
                            value: true
                        },{
                            sign:'newTask',
                            name: "添加任务",
                            value: true
                        }
                    ]
                },{
                    moudal: "师傅管理",
                    permiss: [
                        {
                            sign:'masterList',
                            name: "师傅管理",
                            value: true
                        },{
                            sign:'newMaster',
                            name: "添加师傅",
                            value: true
                        },{
                            sign:'masterList-edit',
                            name: "编辑师傅",
                            value: true
                        },{
                            sign:'masterList-delete',
                            name: "删除师傅",
                            value: true
                        },{
                            sign:'masterList-disabled',
                            name: "禁用权限",
                            value: true
                        },{
                            sign:'masterList-blacklist',
                            name: "拉黑权限",
                            value: true
                        }
                    ]
                },{
                    moudal: "徒弟管理",
                    permiss: [
                        {
                            sign:'apprenticeList',
                            name: "徒弟管理",
                            value: true
                        },{
                            sign:'apprenticeCheckList',
                            name: "徒弟审核",
                            value: true
                        },{
                            sign:'newApprentice',
                            name: "添加徒弟",
                            value: true
                        },{
                            sign:'apprenticeList-edit',
                            name: "编辑徒弟",
                            value: true
                        },{
                            sign:'apprenticeList-delete',
                            name: "删除徒弟",
                            value: true
                        },{
                            sign:'apprenticeCheckList-review',
                            name: "徒弟审核",
                            value: true
                        },{
                            sign:'apprenticeList-disabled',
                            name: "禁用权限",
                            value: true
                        },{
                            sign:'apprenticeList-blacklist',
                            name: "拉黑权限",
                            value: true
                        }
                    ]
                },{
                    moudal: "财务管理",
                    permiss: [
                        {
                            sign:'financeManage',
                            name: "财务管理",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----银行名称管理",
                    permiss:[
                        {
                            sign:'bankManage',
                            name: "银行名称管理",
                            value: true
                        },{
                            sign:'bankManage-new',
                            name: "添加银行",
                            value: true
                        },{
                            sign:'bankManage-edit',
                            name: "修改银行",
                            value: true
                        },{
                            sign:'bankManage-delete',
                            name: "删除银行",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----绑定银行管理",
                    permiss:[
                        {
                            sign:'bindingBank',
                            name: "绑定银行管理",
                            value: true
                        },{
                            sign:'bindingBank-edit',
                            name: "修改操作",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----师傅提现管理",
                    permiss:[
                        {
                            sign:'masterWithdraw',
                            name: "师傅提现管理",
                            value: true
                        },{
                            sign:'masterWithdraw-review',
                            name: "审核",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----徒弟提现管理",
                    permiss:[
                        {
                            sign:'apprenticeWithdraw',
                            name: "徒弟提现管理",
                            value: true
                        },{
                            sign:'apprenticeWithdraw-review',
                            name: "审核",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----师傅资金记录",
                    permiss:[
                        {
                            sign:'masterFunds',
                            name: "师傅资金记录",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----徒弟资金记录",
                    permiss:[
                        {
                            sign:'apprenticeFunds',
                            name: "徒弟资金记录",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----充值审核",
                    permiss:[
                        {
                            sign:'rechargeReview',
                            name: "充值审核",
                            value: true
                        },{
                            sign:'rechargeReview-review',
                            name: "审核",
                            value: true
                        }
                    ]
                },
            ],
            permissList1: [
                {
                    moudal: "首页",
                    permiss: [
                        {
                            sign: 'home',
                            name: "欢迎界面",
                            value: true
                        }
                    ]
                },{
                    moudal: "管理员管理",
                    permiss: [
                        {
                            sign:'manageList',
                            name: "管理员管理",
                            value: true
                        },
                        {
                            sign:'manageEdit',
                            name: "添加管理员",
                            value: true
                        },
                        {
                            sign:'manageList-edit',
                            name: "修改管理员",
                            value: true
                        },
                        {
                            sign:'manageList-delete',
                            name: "删除管理员",
                            value: true
                        },
                        {
                            sign:'manageList-power',
                            name: "修改权限组",
                            value: true
                        }
                    ]
                },{
                    moudal: "用户组管理",
                    permiss: [
                        {
                            sign:'groupList',
                            name: "用户组管理",
                            value: true
                        },
                        {
                            sign:'newGroup',
                            name: "添加用户组",
                            value: true
                        },
                        {
                            sign:'groupList-edit',
                            name: "修改用户组",
                            value: true
                        },
                        {
                            sign:'groupList-delete',
                            name: "删除用户组",
                            value: true
                        },
                        {
                            sign:'groupList-powers',
                            name: "分配权限",
                            value: true
                        }
                    ]
                },{
                    moudal: "客服管理",
                    permiss: [
                        {
                            sign:'customerList',
                            name: "客服管理",
                            value: true
                        },
                        {
                            sign:'newCustomer',
                            name: "添加客服",
                            value: true
                        },
                        {
                            sign:'customerList-edit',
                            name: "修改客服",
                            value: true
                        },
                        {
                            sign:'customerList-delete',
                            name: "删除客服",
                            value: true
                        }
                    ]
                },{
                    moudal: "客户管理",
                    permiss: [
                        {
                            sign:'clientList',
                            name: "客户管理",
                            value: true
                        },
                        {
                            sign:'newClient',
                            name: "添加客户",
                            value: true
                        },
                        {
                            sign:'clientList-edit',
                            name: "修改客户",
                            value: true
                        },
                        {
                            sign:'clientList-delete',
                            name: "删除客户",
                            value: true
                        }
                    ]
                },
                {
                    moudal: "任务分类管理",
                    permiss: [
                        {
                            sign:'taskTypeManage',
                            name: "任务分类管理",
                            value: true
                        },{
                            sign:'taskTypeManage-new',
                            name: "添加任务分类",
                            value: true
                        },{
                            sign:'taskTypeManage-edit',
                            name: "编辑任务分类",
                            value: true
                        },{
                            sign:'taskTypeManage-delete',
                            name: "删除任务分类",
                            value: true
                        }
                    ]
                },{
                    moudal: "任务管理",
                    permiss: [
                        {
                            sign:'taskPList',
                            name: "母任务管理",
                            value: true
                        },{
                            sign:'taskPList-review',
                            name: "审核母任务",
                            value: true
                        }, {
                            sign:'taskCList',
                            name: "子任务管理",
                            value: true
                        },{
                            sign:'taskCList-review',
                            name: "审核子任务",
                            value: true
                        },{
                            sign:'newTask',
                            name: "添加任务",
                            value: true
                        }
                    ]
                },{
                    moudal: "师傅管理",
                    permiss: [
                        {
                            sign:'masterList',
                            name: "师傅管理",
                            value: true
                        },{
                            sign:'newMaster',
                            name: "添加师傅",
                            value: true
                        },{
                            sign:'masterList-edit',
                            name: "编辑师傅",
                            value: true
                        },{
                            sign:'masterList-delete',
                            name: "删除师傅",
                            value: true
                        },{
                            sign:'masterList-disabled',
                            name: "禁用权限",
                            value: true
                        },{
                            sign:'masterList-blacklist',
                            name: "拉黑权限",
                            value: true
                        }
                    ]
                },{
                    moudal: "徒弟管理",
                    permiss: [
                        {
                            sign:'apprenticeList',
                            name: "徒弟管理",
                            value: true
                        },{
                            sign:'apprenticeCheckList',
                            name: "徒弟审核",
                            value: true
                        },,{
                            sign:'newApprentice',
                            name: "添加徒弟",
                            value: true
                        },{
                            sign:'apprenticeList-edit',
                            name: "编辑徒弟",
                            value: true
                        },{
                            sign:'apprenticeList-delete',
                            name: "删除徒弟",
                            value: true
                        },{
                            sign:'apprenticeCheckList-review',
                            name: "徒弟审核",
                            value: true
                        },{
                            sign:'apprenticeList-disabled',
                            name: "禁用权限",
                            value: true
                        },{
                            sign:'apprenticeList-blacklist',
                            name: "拉黑权限",
                            value: true
                        }
                    ]
                },{
                    moudal: "财务管理",
                    permiss: [
                        {
                            sign:'financeManage',
                            name: "财务管理",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----银行名称管理",
                    permiss:[
                        {
                            sign:'bankManage',
                            name: "银行名称管理",
                            value: true
                        },{
                            sign:'bankManage-new',
                            name: "添加银行",
                            value: true
                        },{
                            sign:'bankManage-edit',
                            name: "修改银行",
                            value: true
                        },{
                            sign:'bankManage-delete',
                            name: "删除银行",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----绑定银行管理",
                    permiss:[
                        {
                            sign:'bindingBank',
                            name: "绑定银行管理",
                            value: true
                        },{
                            sign:'bindingBank-edit',
                            name: "修改操作",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----师傅提现管理",
                    permiss:[
                        {
                            sign:'masterWithdraw',
                            name: "师傅提现管理",
                            value: true
                        },{
                            sign:'masterWithdraw-review',
                            name: "审核",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----徒弟提现管理",
                    permiss:[
                        {
                            sign:'apprenticeWithdraw',
                            name: "徒弟提现管理",
                            value: true
                        },{
                            sign:'apprenticeWithdraw-review',
                            name: "审核",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----师傅资金记录",
                    permiss:[
                        {
                            sign:'masterFunds',
                            name: "师傅资金记录",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----徒弟资金记录",
                    permiss:[
                        {
                            sign:'apprenticeFunds',
                            name: "徒弟资金记录",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----充值审核",
                    permiss:[
                        {
                            sign:'rechargeReview',
                            name: "充值审核",
                            value: true
                        },{
                            sign:'rechargeReview-review',
                            name: "审核",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----平台总流水",
                    permiss:[
                        {
                            sign:'platformStream',
                            name: "平台总流水",
                            value: true
                        }
                    ]
                },{
                    moudal: "-----用户金额修改",
                    permiss:[
                        {
                            sign:'uesrMoneyEdit',
                            name: "用户金额修改",
                            value: true
                        }
                    ]
                },{
                    moudal: "广告管理",
                    permiss:[
                        {
                            sign:'adRecommend',
                            name: "投放推荐管理",
                            value: true
                        },{
                            sign:'adRecommend-review',
                            name: "投放推荐处理",
                            value: true
                        },{
                            sign:'adList',
                            name: "广告管理",
                            value: true
                        },{
                            sign:'newAd',
                            name: "新增广告",
                            value: true
                        },{
                            sign:'adList-edit',
                            name: "编辑广告",
                            value: true
                        },{
                            sign:'adList-delete',
                            name: "删除广告",
                            value: true
                        }
                    ]
                },{
                    moudal: "系统配置",
                    permiss:[
                        {
                            sign:'systemJson',
                            name: "系统配置",
                            value: true
                        },{
                            sign:'systemJson-new',
                            name: "新增系统配置",
                            value: true
                        },{
                            sign:'systemJson-edit',
                            name: "编辑系统配置",
                            value: true
                        },{
                            sign:'collectionAccount',
                            name: "收款账号管理",
                            value: true
                        },{
                            sign:'collectionAccount-edit',
                            name: "收款账号编辑",
                            value: true
                        },{
                            sign:'collectionAccount-delete',
                            name: "收款账号删除",
                            value: true
                        }
                    ]
                },{
                    moudal: "黑户管理",
                    permiss:[
                        {
                            sign:'masterDisable',
                            name: "师傅禁用列表",
                            value: true
                        },{
                            sign:'masterDisable-delete',
                            name: "师傅禁用删除",
                            value: true
                        },{
                            sign:'masterBlack',
                            name: "师傅拉黑列表",
                            value: true
                        },{
                            sign:'masterBlack-delete',
                            name: "师傅拉黑删除",
                            value: true
                        },{
                            sign:'apprenticeDisable',
                            name: "徒弟禁用列表",
                            value: true
                        },{
                            sign:'apprenticeDisable-delete',
                            name: "徒弟禁用删除",
                            value: true
                        },{
                            sign:'apprenticeBlack',
                            name: "徒弟拉黑列表",
                            value: true
                        },{
                            sign:'apprenticeBlack-delete',
                            name: "徒弟拉黑删除",
                            value: true
                        }
                    ]
                },{
                    moudal: "登录记录",
                    permiss:[
                        {
                            sign:'loginList',
                            name: "登录记录",
                            value: true
                        }
                    ]
                },{
                    moudal: "操作记录",
                    permiss:[
                        {
                            sign:'operatingList',
                            name: "操作记录",
                            value: true
                        }
                    ]
                }
            ],
        };
    }
};
</script>

<style scoped>
</style>