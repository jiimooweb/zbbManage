/**
 * 权限配置
 *  */
const permissList = [{
    moudal: "首页",
    permiss: [{
        key: 0,
        sign: "home",
        name: "欢迎界面",
        value: false
    }]
},
{
    moudal: "管理员管理",
    permiss: [{
        key: 1,
        sign: "manageList",
        name: "管理员管理",
        value: false
    },
    {
        key: 2,
        sign: "manageEdit",
        name: "添加管理员",
        value: false
    },
    {
        key: 3,
        sign: "manageList-edit",
        name: "修改管理员",
        value: false
    },
    {
        key: 4,
        sign: "manageList-delete",
        name: "删除管理员",
        value: false
    },
    {
        key: 5,
        sign: "manageList-power",
        name: "修改权限组",
        value: false
    }
    ]
},
{
    moudal: "用户组管理",
    permiss: [{
        key: 6,
        sign: "groupList",
        name: "用户组管理",
        value: false
    },
    {
        key: 7,
        sign: "newGroup",
        name: "添加用户组",
        value: false
    },
    {
        key: 8,
        sign: "groupList-edit",
        name: "修改用户组",
        value: false
    },
    {
        key: 9,
        sign: "groupList-delete",
        name: "删除用户组",
        value: false
    },
    // {
    //     key: 10,
    //     sign: "groupList-powers",
    //     name: "分配权限",
    //     value: false
    // }
    ]
},
{
    moudal: "客服管理",
    permiss: [{
        key: 11,
        sign: "customerList",
        name: "客服管理",
        value: false
    },
    {
        key: 12,
        sign: "newCustomer",
        name: "添加客服",
        value: false
    },
    {
        key: 13,
        sign: "customerList-edit",
        name: "修改客服",
        value: false
    },
    {
        key: 14,
        sign: "customerList-delete",
        name: "删除客服",
        value: false
    }
    ]
},
{
    moudal: "客户管理",
    permiss: [{
        key: 15,
        sign: "clientList",
        name: "客户管理",
        value: false
    },
    {
        key: 16,
        sign: "newClient",
        name: "添加客户",
        value: false
    },
    {
        key: 17,
        sign: "clientList-edit",
        name: "修改客户",
        value: false
    },
    {
        key: 18,
        sign: "clientList-delete",
        name: "删除客户",
        value: false
    }
    ]
},
{
    moudal: "任务分类管理",
    permiss: [{
        key: 19,
        sign: "taskTypeManage",
        name: "任务分类管理",
        value: false
    },
    {
        key: 20,
        sign: "taskTypeManage-new",
        name: "添加任务分类",
        value: false
    },
    {
        key: 21,
        sign: "taskTypeManage-edit",
        name: "编辑任务分类",
        value: false
    },
    {
        key: 22,
        sign: "taskTypeManage-delete",
        name: "删除任务分类",
        value: false
    }
    ]
},
{
    moudal: "任务管理",
    permiss: [{
        key: 23,
        sign: "taskPList",
        name: "母任务管理",
        value: false
    },
    {
        key: 24,
        sign: "taskPList-review",
        name: "审核母任务",
        value: false
    },
    {
        key: 25,
        sign: "taskCList",
        name: "子任务管理",
        value: false
    },
    {
        key: 26,
        sign: "taskCList-review",
        name: "审核子任务",
        value: false
    },
    {
        key: 27,
        sign: "newTask",
        name: "添加任务",
        value: false
    }
    ]
},
{
    moudal: "师傅管理",
    permiss: [{
        key: 28,
        sign: "masterList",
        name: "师傅管理",
        value: false
    },
    {
        key: 29,
        sign: "newMaster",
        name: "添加师傅",
        value: false
    },
    {
        key: 30,
        sign: "masterList-edit",
        name: "编辑师傅",
        value: false
    },
    {
        key: 31,
        sign: "masterList-delete",
        name: "删除师傅",
        value: false
    },
    {
        key: 32,
        sign: "masterList-disabled",
        name: "禁用权限",
        value: false
    },
    {
        key: 33,
        sign: "masterList-blacklist",
        name: "拉黑权限",
        value: false
    }
    ]
},
{
    moudal: "徒弟管理",
    permiss: [{
        key: 34,
        sign: "apprenticeList",
        name: "徒弟管理",
        value: false
    },
    {
        key: 35,
        sign: "apprenticeCheckList",
        name: "徒弟审核列表",
        value: false
    },
    {
        key: 36,
        sign: "newApprentice",
        name: "添加徒弟",
        value: false
    },
    {
        key: 37,
        sign: "apprenticeList-edit",
        name: "编辑徒弟",
        value: false
    },
    {
        key: 38,
        sign: "apprenticeList-delete",
        name: "删除徒弟",
        value: false
    },
    {
        key: 39,
        sign: "apprenticeCheckList-review",
        name: "徒弟审核",
        value: false
    },
    {
        key: 40,
        sign: "apprenticeList-disabled",
        name: "禁用权限",
        value: false
    },
    {
        key: 41,
        sign: "apprenticeList-blacklist",
        name: "拉黑权限",
        value: false
    }
    ]
},
{
    moudal: "财务管理",
    permiss: [
        // {
        //     key: 42,
        //     sign: "financeManage",
        //     name: "财务管理",
        //     value: false
        // }
    ]
},
{
    moudal: "-----银行名称管理",
    permiss: [{
        key: 43,
        sign: "bankManage",
        name: "银行名称管理",
        value: false
    },
    {
        key: 44,
        sign: "bankManage-new",
        name: "添加银行",
        value: false
    },
    {
        key: 45,
        sign: "bankManage-edit",
        name: "修改银行",
        value: false
    },
    {
        key: 46,
        sign: "bankManage-delete",
        name: "删除银行",
        value: false
    }
    ]
},
{
    moudal: "-----绑定银行管理",
    permiss: [{
        key: 47,
        sign: "bindingBank",
        name: "绑定银行管理",
        value: false
    },
    {
        key: 48,
        sign: "bindingBank-edit",
        name: "修改操作",
        value: false
    }
    ]
},
{
    moudal: "-----师傅提现管理",
    permiss: [{
        key: 49,
        sign: "masterWithdraw",
        name: "师傅提现管理",
        value: false
    },
    {
        key: 50,
        sign: "masterWithdraw-review",
        name: "审核",
        value: false
    }
    ]
},
{
    moudal: "-----徒弟提现管理",
    permiss: [{
        key: 51,
        sign: "apprenticeWithdraw",
        name: "徒弟提现管理",
        value: false
    },
    {
        key: 52,
        sign: "apprenticeWithdraw-review",
        name: "审核",
        value: false
    }
    ]
},
{
    moudal: "-----师傅资金记录",
    permiss: [{
        key: 53,
        sign: "masterFunds",
        name: "师傅资金记录",
        value: false
    }]
},
{
    moudal: "-----徒弟资金记录",
    permiss: [{
        key: 54,
        sign: "apprenticeFunds",
        name: "徒弟资金记录",
        value: false
    }]
},
{
    moudal: "-----充值审核",
    permiss: [{
        key: 55,
        sign: "rechargeReview",
        name: "充值审核",
        value: false
    },
    {
        key: 56,
        sign: "rechargeReview-review",
        name: "审核",
        value: false
    }
    ]
},
{
    moudal: "-----平台总流水",
    permiss: [{
        key: 57,
        sign: "platformStream",
        name: "平台总流水",
        value: false
    }]
},
{
    moudal: "-----用户金额修改",
    permiss: [{
        key: 58,
        sign: "uesrMoneyEdit",
        name: "用户金额修改",
        value: false
    }]
},
{
    moudal: "广告管理",
    permiss: [{
        key: 59,
        sign: "adRecommend",
        name: "投放推荐管理",
        value: false
    },
    {
        key: 60,
        sign: "adRecommend-review",
        name: "投放推荐处理",
        value: false
    },
    {
        key: 61,
        sign: "adList",
        name: "广告管理",
        value: false
    },
    {
        key: 62,
        sign: "newAd",
        name: "新增广告",
        value: false
    },
    {
        key: 63,
        sign: "adList-edit",
        name: "编辑广告",
        value: false
    },
    {
        key: 64,
        sign: "adList-delete",
        name: "删除广告",
        value: false
    }
    ]
},
{
    moudal: "系统配置",
    permiss: [{
        key: 65,
        sign: "systemJson",
        name: "系统配置",
        value: false
    },
    {
        key: 66,
        sign: "systemJson-new",
        name: "新增系统配置",
        value: false
    },
    {
        key: 67,
        sign: "systemJson-edit",
        name: "编辑系统配置",
        value: false
    },
    {
        key: 68,
        sign: "collectionAccount",
        name: "收款账号管理",
        value: false
    },
    {
        key: 69,
        sign: "collectionAccount-edit",
        name: "收款账号编辑",
        value: false
    },
    {
        key: 70,
        sign: "collectionAccount-delete",
        name: "收款账号删除",
        value: false
    }
    ]
},
{
    moudal: "黑户管理",
    permiss: [{
        key: 71,
        sign: "masterDisable",
        name: "师傅禁用列表",
        value: false
    },
    {
        key: 72,
        sign: "masterDisable-delete",
        name: "师傅禁用删除",
        value: false
    },
    {
        key: 73,
        sign: "masterBlack",
        name: "师傅拉黑列表",
        value: false
    },
    {
        key: 74,
        sign: "masterBlack-delete",
        name: "师傅拉黑删除",
        value: false
    },
    {
        key: 75,
        sign: "apprenticeDisable",
        name: "徒弟禁用列表",
        value: false
    },
    {
        key: 76,
        sign: "apprenticeDisable-delete",
        name: "徒弟禁用删除",
        value: false
    },
    {
        key: 77,
        sign: "apprenticeBlack",
        name: "徒弟拉黑列表",
        value: false
    },
    {
        key: 78,
        sign: "apprenticeBlack-delete",
        name: "徒弟拉黑删除",
        value: false
    }
    ]
},
{
    moudal: "登录记录",
    permiss: [{
        key: 79,
        sign: "loginList",
        name: "登录记录",
        value: false
    }]
},
{
    moudal: "操作记录",
    permiss: [{
        key: 80,
        sign: "operatingList",
        name: "操作记录",
        value: false
    }]
},
{
    moudal: "文章管理",
    permiss: [{
        key: 81,
        sign: "articleList",
        name: "文章管理",
        value: false
    },{
        key: 82,
        sign: "articleList-new",
        name: "新增文章",
        value: false
    },{
        key: 83,
        sign: "articleList-edit",
        name: "编辑文章",
        value: false
    },{
        key: 84,
        sign: "articleList-delete",
        name: "删除文章",
        value: false
    }]
},
// {
//     moudal: "消息通知",
//     permiss: [{
//         key: 85,
//         sign: "noticesList",
//         name: "消息通知",
//         value: false
//     },{
//         key: 86,
//         sign: "noticesList-new",
//         name: "发送消息",
//         value: false
//     },{
//         key: 87,
//         sign: "noticesList-edit",
//         name: "编辑消息",
//         value: false
//     },{
//         key: 88,
//         sign: "noticesList-delete",
//         name: "删除消息",
//         value: false
//     }]
// }
]
export { permissList }
