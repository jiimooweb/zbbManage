<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login">
        <div class="login-con">
            <!-- <Card style="width:320px">
                <div style="text-align:center">
                    <h3>A high quality UI Toolkit based on Vue.js</h3>
                </div>
            </Card> -->
            <Card style="width:320px">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
export default {
    components: {
        LoginForm
    },
    methods: {
        ...mapActions(["handleLogin", "getUserInfo"]),
        
        handleSubmit({ userName, password }) {
            this.handleLogin({ userName, password }).then(res => {
                this.getUserInfo().then(res => {
                    this.$router.push({
                        name: this.$config.homeName
                    });
                });
            });
        }
    }
};
</script>

<style>
</style>
