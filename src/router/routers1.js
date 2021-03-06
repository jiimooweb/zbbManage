import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录',
        hideInMenu: true
    },
    component: () => import('@/view/zbb/login/login')
},
{
    path: '/zbbManage',
    name: '_home',
    redirect: '/zbbManage/home',
    component: Main,
    meta: {
        //   hideInMenu: true,
        notCache: true
    },
    children: [{
        path: '/zbbManage',
        name: 'home',
        meta: {
            title: '首页',
            icon: 'md-home'
        },
        component: () => import('@/view/zbb/home/home')
    }]
}, {
    path: '/zbbManage/manage',
    name: '管理员管理',
    component: Main,
    meta: {
        title: '管理员管理',
        icon: 'ios-contact'
    },
    children: [{
        path: '/zbbManage/manageList',
        name: '管理员列表',
        meta: {
            title: '管理员列表',
            icon: 'md-list'
        },
        component: () => import('@/view/zbb/manage/manageList')
    }, {
        path: '/zbbManage/manageEdit',
        name: '管理员(新增or编辑)',
        meta: {
            title: '管理员管理',
            icon: 'md-create'
        },
        component: () => import('@/view/zbb/manage/newManage')
    }]
}, {
    path: '/zbbManage/userGroup',
    name: '用户组管理',
    component: Main,
    meta: {
        title: '用户组管理',
        icon: 'ios-people'
    },
    children: [{
        path: '/zbbManage/groupList',
        name: '用户组列表',
        meta: {
            title: '用户组列表',
            icon: 'md-list'
        },
        component: () => import('@/view/zbb/userGroup/groupList')
    }, {
        path: '/zbbManage/newGroup',
        name: '添加用户组',
        meta: {
            title: '添加用户组',
            icon: 'md-add'
        },
        component: () => import('@/view/zbb/userGroup/newGroup')
    }, 
    {
        path: '/zbbManage/permissionManage',
        name: '权限管理',
        meta: {
            hideInMenu: true,
            title: '权限管理',
            icon: 'md-add'
        },
        component: () => import('@/view/zbb/userGroup/permissionManage')
    }
]
}, {
    path: '/zbbManage/customerManage',
    name: '客服管理',
    component: Main,
    meta: {
        title: '客服管理',
        icon: 'md-headset'
    },
    children: [{
        path: '/zbbManage/customerList',
        name: '客服列表',
        meta: {
            title: '客服列表',
            icon: 'md-list'
        },
        component: () => import('@/view/zbb/customerManage/customerList')
    }, {
        path: '/zbbManage/newCustomer',
        name: '添加客服',
        meta: {
            title: '添加客服',
            icon: 'md-add'
        },
        component: () => import('@/view/zbb/customerManage/newCustomer')
    }]
}, {
    path: '/zbbManage/clientManage',
    name: '客户管理',
    component: Main,
    meta: {
        title: '客户管理',
        icon: 'ios-man'
    },
    children: [{
        path: '/zbbManage/clientList',
        name: '客户列表',
        meta: {
            title: '客户列表',
            icon: 'md-list'
        },
        component: () => import('@/view/zbb/clientManage/clientList')
    }, {
        path: '/zbbManage/newClient',
        name: '添加客户',
        meta: {
            title: '添加客户',
            icon: 'md-add'
        },
        component: () => import('@/view/zbb/clientManage/newClient')
    }]
}, {
    path: '/zbbManage/taskManage',
    name: '任务管理',
    component: Main,
    meta: {
        title: '任务管理',
        icon: 'ios-albums'
    },
    children: [{
        path: '/zbbManage/taskTypeManage',
        name: '任务分类管理',
        meta: {
            title: '任务分类管理',
            icon: 'md-list'
        },
        component: () => import('@/view/zbb/taskManage/taskTypeManage')
    },{
        path: '/zbbManage/taskPList',
        name: '母任务列表',
        meta: {
            title: '母任务列表',
            icon: 'md-list'
        },
        component: () => import('@/view/zbb/taskManage/taskPList')
    }, {
        path: '/zbbManage/taskCList',
        name: '子任务列表',
        meta: {
            title: '子任务列表',
            icon: 'md-list'
        },
        component: () => import('@/view/zbb/taskManage/taskCList')
    }, {
        path: '/zbbManage/newTask',
        name: '添加任务',
        meta: {
            title: '添加任务',
            icon: 'md-add'
        },
        component: () => import('@/view/zbb/taskManage/newTask')
    }]
}, {
    path: '/zbbManage/masterManage',
    name: '师傅管理',
    component: Main,
    meta: {
        title: '师傅管理',
        icon: 'ios-contacts'
    },
    children: [
        {
            path: '/zbbManage/masterList',
            name: '师傅列表',
            meta: {
                title: '师傅列表',
                icon: 'md-list'
            },
            component: () => import('@/view/zbb/masterManage/masterList')
        }, {
            path: '/zbbManage/newMaster',
            name: '新增师傅',
            meta: {
                title: '新增师傅',
                icon: 'md-add'
            },
            component: () => import('@/view/zbb/masterManage/newMaster')
        }]
}, {
    path: '/zbbManage/apprenticeManage',
    name: '徒弟管理',
    component: Main,
    meta: {
        title: '徒弟管理',
        icon: 'md-contacts'
    },
    children: [
        {
            path: '/zbbManage/apprenticeList',
            name: '徒弟列表',
            meta: {
                title: '徒弟列表',
                icon: 'md-list'
            },
            component: () => import('@/view/zbb/apprenticeManage/apprenticeList')
        }, {
            path: '/zbbManage/apprenticeCheckList',
            name: '徒弟审核列表',
            meta: {
                title: '徒弟审核列表',
                icon: 'md-list'
            },
            component: () => import('@/view/zbb/apprenticeManage/apprenticeCheckList')
        }, {
            path: '/zbbManage/newApprentice',
            name: '新增徒弟',
            meta: {
                title: '新增徒弟',
                icon: 'md-add'
            },
            component: () => import('@/view/zbb/apprenticeManage/newApprentice')
        }]
}, {
    path: '/zbbManage/financeManage',
    name: '财务管理',
    component: Main,
    meta: {
        title: '财务管理',
        icon: 'logo-yen'
    },
    children: [
        {
            path: '/zbbManage/bankManage',
            name: '银行名称管理',
            meta: {
                title: '银行名称管理',
                icon: 'md-list'
            },
            component: () => import('@/view/zbb/financeManage/bankManage')
        }, {
            path: '/zbbManage/bindingBank',
            name: '绑定银行管理',
            meta: {
                title: '绑定银行管理',
                icon: 'md-list'
            },
            component: () => import('@/view/zbb/financeManage/bindingBank')
        },
        // {
        //     path: '/bindingCheckBank',
        //     name: '审核绑定银行管理',
        //     meta: {
        //         title: '审核绑定银行管理',
        //         icon: 'md-list'
        //     },
        //     component: () => import('@/view/zbb/financeManage/bindingCheckBank')
        // }, 
        {
            path: '/zbbManage/masterWithdraw',
            name: '[师傅] 提现管理',
            meta: {
                title: '[师傅] 提现管理',
                icon: 'md-list'
            },
            component: () => import('@/view/zbb/financeManage/masterWithdraw')
        }, {
            path: '/zbbManage/apprenticeWithdraw',
            name: '[徒弟] 提现管理',
            meta: {
                title: '[徒弟] 提现管理',
                icon: 'md-list'
            },
            component: () => import('@/view/zbb/financeManage/apprenticeWithdraw')
        }, {
            path: '/zbbManage/masterFunds',
            name: '[师傅] 资金记录',
            meta: {
                title: '[师傅] 资金记录',
                icon: 'md-funnel'
            },
            component: () => import('@/view/zbb/financeManage/masterFunds')
        }, {
            path: '/zbbManage/apprenticeFunds',
            name: '[徒弟] 资金记录',
            meta: {
                title: '[徒弟] 资金记录',
                icon: 'md-funnel'
            },
            component: () => import('@/view/zbb/financeManage/apprenticeFunds')
        }, {
            path: '/zbbManage/rechargeReview',
            name: '充值审核',
            meta: {
                title: '充值审核',
                icon: 'ios-card'
            },
            component: () => import('@/view/zbb/financeManage/rechargeReview')
        }, {
            path: '/zbbManage/platformStream',
            name: '平台总流水',
            meta: {
                title: '平台总流水',
                icon: 'ios-infinite'
            },
            component: () => import('@/view/zbb/financeManage/platformStream')
        }, {
            path: '/zbbManage/uesrMoneyEdit',
            name: '用户金额修改',
            meta: {
                title: '用户金额修改',
                icon: 'ios-document'
            },
            component: () => import('@/view/zbb/financeManage/uesrMoneyEdit')
        }]
}, {
    path: '/zbbManage/adManage',
    name: '广告管理',
    component: Main,
    meta: {
        title: '广告管理',
        icon: 'md-albums'
    },
    children: [
        {
            path: '/zbbManage/adRecommend',
            name: '投放推荐管理',
            meta: {
                title: '投放推荐管理',
                icon: 'md-list'
            },
            component: () => import('@/view/zbb/adManage/adRecommend')
        },{
            path: '/zbbManage/adList',
            name: '广告列表',
            meta: {
                title: '广告列表',
                icon: 'md-list'
            },
            component: () => import('@/view/zbb/adManage/adList')
        }, {
            path: '/zbbManage/newAd',
            name: '添加广告',
            meta: {
                title: '添加广告',
                icon: 'md-add'
            },
            component: () => import('@/view/zbb/adManage/newAd')
        }]
}, {
    path: '/zbbManage/system',
    name: '系统配置',
    component: Main,
    meta: {
        title: '系统配置',
        icon: 'ios-build'
    },
    children: [
        {
            path: '/zbbManage/systemJson',
            name: '系统配置',
            meta: {
                title: '系统配置',
                icon: 'ios-build'
            },
            component: () => import('@/view/zbb/systemJson/systemJson')
        }, {
            path: '/zbbManage/collectionAccount',
            name: '收款账户',
            meta: {
                title: '收款账户',
                icon: 'ios-card-outline'
            },
            component: () => import('@/view/zbb/systemJson/collectionAccount')
        }]
}, {
    path: '/zbbManage/black',
    name: '黑户管理',
    component: Main,
    meta: {
        title: '黑户管理',
        icon: 'ios-build'
    },
    children: [
        {
            path: '/zbbManage/masterDisable',
            name: '师傅禁用列表',
            meta: {
                title: '师傅禁用列表',
                icon: 'ios-man'
            },
            component: () => import('@/view/zbb/blackManage/masterDisable')
        }, {
            path: '/zbbManage/masterBlack',
            name: '师傅拉黑列表',
            meta: {
                title: '师傅拉黑列表',
                icon: 'ios-man'
            },
            component: () => import('@/view/zbb/blackManage/masterBlack')
        }, {
            path: '/zbbManage/apprenticeDisable',
            name: '徒弟禁用列表',
            meta: {
                title: '徒弟禁用列表',
                icon: 'ios-man'
            },
            component: () => import('@/view/zbb/blackManage/apprenticeDisable')
        }, {
            path: '/zbbManage/apprenticeBlack',
            name: '徒弟拉黑列表',
            meta: {
                title: '徒弟拉黑列表',
                icon: 'ios-man'
            },
            component: () => import('@/view/zbb/blackManage/apprenticeBlack')
        }]
}, {
    path: '/zbbManage/loginManage',
    name: '登录管理',
    component: Main,
    meta: {
        title: '登录管理',
        icon: 'ios-albums-outline'
    },
    children: [
        {
            path: '/zbbManage/loginList',
            name: '登录记录',
            meta: {
                title: '登录记录',
                icon: 'ios-list'
            },
            component: () => import('@/view/zbb/loginManage/loginList')
        }]
}, {
    path: '/zbbManage/operatingManage',
    name: '操作管理',
    component: Main,
    meta: {
        title: '操作管理',
        icon: 'ios-albums-outline'
    },
    children: [
        {
            path: '/zbbManage/operatingList',
            name: '操作记录',
            meta: {
                title: '操作记录',
                icon: 'ios-list'
            },
            component: () => import('@/view/zbb/operatingManage/operatingList')
        }]
},
{
    path: '/zbbManage/401',
    name: 'error_401',
    meta: {
        hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
},
{
    path: '/zbbManage/500',
    name: 'error_500',
    meta: {
        hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
},
{
    path: '*',
    name: 'error_404',
    meta: {
        hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
}, {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
        hideInBread: true,
        hideInMenu: true
    },
    children: [{
        path: 'message_page',
        name: 'message_page',
        meta: {
            icon: 'md-notifications',
            title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
    }]
},
{
    path: '/zbbManage/articleManage',
    name: '文章管理',
    component: Main,
    meta: {
        // access:['loginList'],
        title: '文章管理',
        icon: 'ios-albums-outline'
    },
    children: [
        {
            path: '/zbbManage/articleList',
            name: '文章列表',
            meta: {
                // access:['loginList'],
                title: '文章列表',
                icon: 'ios-list'
            },
            component: () => import('@/view/zbb/articleManage/articleList')
        }]
},
]
