<template>
    <div class="GROUP">
        <Table :max-height='this.$store.state.app.winHeight' class="GROUPLIST" style="width:500px" :columns="groupsColumn" :data="groupsList"></Table>
        <Modal v-model="editModal" title="修改" @on-ok="okInput()" @on-cancel="cancelInput()">
            <Row>
                <i-col style="display:block;margin:0 auto;">
                    用户组名:
                    <i-input placeholder="输入名称" v-model="groupName" style="margin-left:20px;width: 300px;">
                        <Icon type="ios-contact" slot="prefix" />
                    </i-input>
                </i-col>
            </Row>
            <Row>
                <i-col style="margin-top:20px;">
                    <!-- <Button type="success" style="margin:0 auto;display:block;" @click="inputNewGroup()">添加</Button> -->
                </i-col>
            </Row>
        </Modal>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { isShowColumn } from "@/libs/util";
export default {
    data() {
        return {
            editModal: false,
            groupName: "",
            currentId: "",
            groupsColumn: [
                {
                    title: "用户组名",
                    key: "name"
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
                                        style:
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "groupList-edit"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.currentId = params.row.id;
                                            this.groupName = params.row.name;
                                            this.showModal(true);
                                        }
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
                                            "font-size:12px;margin-right:15px;display:" +
                                            (this.hasPower(
                                                this.$store.state.user.access,
                                                "groupList-edit"
                                            )
                                                ? "inline-block;"
                                                : "none;")
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.$store.commit('setPowerId',params.row.id)
                                            this.$store.commit('setPowerName',params.row.name)
                                            
                                            this.$router.push({path:'/permissionManage'})
                                        }
                                    }
                                },
                                "权限"
                            )
                        ]);
                    }
                }
            ],
            groupsList: []
        };
    },
    computed: {
        getAccess() {
            return this.$store.state.user.access;
        }
    },
    watch: {
        getAccess: function(a, b) {
            // isShowColumn(a,["groupList-edit"],this.groupsColumn);
        }
    },
    mounted() {
        this.getGroupsList();
    },
    methods: {
        showModal(i) {
            this.editModal = i;
        },
        okInput() {
            //提交修改
        },
        cancelInput() {
            //取消显示
            this.editModal = false;
        },
        getGroupsList() {
            axios
                .request({
                    url: "power/groups",
                    method: "get"
                })
                .then(res => {
                    this.groupsList = res.data.data;
                })
                .catch(err => {
                    for (let i in err.response.data.msg) {
                        this.$Message.error(err.response.data.msg[i][0]);
                    }
                });
        },
        okInput() {
            //提交用户组修改
            if (this.groupName !== "") {
                axios
                    .request({
                        url: "power/groups/" + this.currentId,
                        method: "put",
                        data: {
                            name: this.groupName
                        }
                    })
                    .then(res => {
                        this.$Message.success("新建成功");
                        this.groupName = "";
                        this.getGroupsList();
                    })
                    .catch(err => {
                        for (let i in err.response.data.msg) {
                            this.$Message.error(err.response.data.msg[i][0]);
                        }
                    });
            } else {
                this.$Message.error("用户组名不能为空");
            }
        }
    }
};
</script>

<style lang='less'>
.GROUP .GROUPLIST .ivu-table-body{
    // max-height: inherit !important;
}
</style>
