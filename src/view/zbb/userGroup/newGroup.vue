<template>
    <div>
        <Card style="width:500px;padding:20px;">
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
                    <Button type="success" style="margin:0 auto;display:block;" @click="inputNewGroup()">添加</Button>
                </i-col>
            </Row>
        </Card>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
export default {
    data() {
        return {
            groupName: ""
        };
    },
    mounted() {},
    methods: {
        inputNewGroup() {
            if (this.groupName !== "") {
                axios
                    .request({
                        url: "power/groups",
                        method: "post",
                        data: {
                            name: this.groupName
                        }
                    })
                    .then(res => {
                        this.$Message.success("新建成功");
                        this.groupName = "";
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
</style>
