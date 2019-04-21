<template>
    <div v-if="showData" class="PERMISSION">
        <p style="margin:10px 0;font-size:16px;">当前管理用户组 : <span style="color:red;">{{this.$store.state.currentPowerName}}</span></p>
        <Table :max-height='this.$store.state.app.winHeight' class="PERMISSIONLIST" stripe border :columns="permissColumn" :data="permissList"></Table>
        <Button type="success" style="margin:10px auto;display:block;" @click="inputData()">提交</Button>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import {permissList} from "@/config/permissJSON";
export default {
    data() {
        return {
            showData:false,
            permissList,
            permissColumn: [
                {
                    title: "模块",
                    width: 150,
                    key: "moudal"
                },
                {
                    title: "权限",
                    // width: "600",
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
            
            currentPermiss: [],
            currentName: ""
        };
    },
    mounted() {
        this.hasPowerIntoPower();
        this.getCurrent();
    },
    methods: {
        //是否有进入权限
        hasPowerIntoPower() {
            if (this.$store.state.currentPowerId !== "") {
                localStorage.setItem('PERMISSIONDATA',this.$store.state.currentPowerId)
                return
            }
            if (this.$store.state.currentPowerId === "") {
                if(localStorage.getItem('PERMISSIONDATA') === ''){
                    this.$router.push({ path: "/home" });
                }else{
                    this.$store.commit('setPowerId',localStorage.getItem('PERMISSIONDATA'))
                }
            }
        },
        //存储后台使用值
        inputData() {
            //处理数据
            let powersArr = [];
            for (let i = 0; i < this.permissList.length; i++) {
                for (let j = 0; j < this.permissList[i].permiss.length; j++) {
                    if (this.permissList[i].permiss[j].value) {
                        powersArr.push(this.permissList[i].permiss[j].key);
                    }
                }
            }
            axios
                .request({
                    url: "power/groups/" + this.$store.state.currentPowerId,
                    method: "put",
                    data: {
                        name: this.currentName,
                        has_powers: powersArr
                    }
                })
                .then(res => {
                    //提交成功
                    localStorage.setItem('PERMISSIONDATA','')
                    this.$Message.success("提交成功");
                    this.$router.push({path:'/groupList'})
                    this.$store.commit('setPowerId','')
                });
        },
        getCurrent() {
            axios
                .request({
                    url: "power/groups/" + this.$store.state.currentPowerId + "/show",
                    method: "get"
                })
                .then(res => {
                    this.currentName = res.data.data.name;
                    if(res.data.data.has_powers === null){
                        this.currentPermiss = []
                    }else{
                        this.currentPermiss = JSON.parse(res.data.data.has_powers);
                    }
                    for (let i = 0; i < this.permissList.length; i++) {
                        for (let j = 0;j < this.permissList[i].permiss.length;j++) {
                            this.permissList[i].permiss[j].value = false
                        }
                    }
                    for(let z=0;z<this.currentPermiss.length;z++){
                        for (let i = 0; i < this.permissList.length; i++) {
                            for (let j = 0;j < this.permissList[i].permiss.length;j++) {
                                if (this.permissList[i].permiss[j].key === this.currentPermiss[z]) {
                                    this.permissList[i].permiss[j].value = true
                                }
                            }
                        }
                    }
                    this.showData = true
                });
        }
    }
};
</script>

<style lang='less'>
.PERMISSION .PERMISSIONLIST .ivu-table-body{
    // max-height: inherit !important;
}
</style>