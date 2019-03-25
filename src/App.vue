<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { returnPowerStrArr } from "@/libs/util";
import { setToken, getToken } from "@/libs/util";
export default {
    name: "App",
    data() {
        return {};
    },
    mounted() {
        this.resetUserData();
    },
    watch: {
        $route(to, from) {
            this.resetUserData()
        }
    },
    methods: {
        resetUserData() {
            if (
                this.$router.history.current.name !== "login" &&
                this.$router.history.current.name !== null &&
                getToken()
            ) {
                console.log("执行");
                axios
                    .request({
                        url: "admin",
                        method: "get"
                    })
                    .then(res => {
                        let strArr = returnPowerStrArr(
                            res.data.data.group.has_powers
                        );
                        this.$store.commit("setAccess", strArr);
                        this.$store.commit(
                            "setUserName",
                            res.data.data.username
                        );
                        this.$store.commit("setUserId", res.data.data.id);
                    });
            }
        }
    }
};
</script>

<style lang="less">
.size {
    width: 100%;
    height: 100%;
}
html,
body {
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
#app {
    .size;
}
</style>
