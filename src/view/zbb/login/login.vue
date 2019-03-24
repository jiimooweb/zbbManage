<template>
    <div class="page">

        <Card class="card">
            <div class="logo"></div>
            <i-form ref="formInline" class="loginPage" :model="formInline" :rules="ruleInline" inline  @keydown.enter.native="handleSubmit('formInline')">
                <FormItem prop="username" class="loginItem">
                    <row class="loginRow">
                        <i-col span='24'>
                            <i-input placeholder="请输入用户名" v-model="formInline.username">
                                <Icon type="ios-contact" slot="prefix" />
                            </i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="password" class="loginItem">
                    <row class="loginRow">
                        <i-col span='24'>
                            <i-input placeholder="请输入密码" type='password' v-model="formInline.password">
                                <Icon type="md-lock" slot="prefix" />
                            </i-input>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem prop="remenberPW" class="loginItem">
                    <row class="loginRow">
                        <i-col span='6'>
                            <span>记住密码</span>
                        </i-col>
                        <i-col span='18'>
                            <i-switch v-model="formInline.remenberPW"/>
                        </i-col>
                    </row>
                </FormItem>
                <FormItem style="width:100%;">
                    <Button type="error" class='btn' long @click="handleSubmit('formInline')">登录</Button>
                </FormItem>
            </i-form>
        </Card>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import { setToken, getToken } from "@/libs/util";
export default {
    data() {
        return {
            formInline: {
                username: "",
                password: "",
                remenberPW: false
            },
            ruleInline: {
                username: [
                    {
                        required: true,
                        message: "请输入账号",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    axios
                        .request({
                            url: "login",
                            method: "post",
                            data: {
                                username: this.formInline.username,
                                password: this.formInline.password
                            }
                        })
                        .then(res => {
                            if (this.formInline.remenberPW) {
                                //记住密码
                                localStorage.setItem('saveUsername',this.formInline.username)
                                localStorage.setItem('savePassword',this.formInline.password)
                            }else{
                                localStorage.setItem('saveUsername','')
                                localStorage.setItem('savePassword','')
                            }
                            this.$Message.success("登录成功");
                            // this.resetData("formInline");
                            setToken(res.data.token);
                            this.$store.commit('setUserName',res.data.user.username)
                            this.$store.commit('setUserId',res.data.user.id)
                            this.$router.push({ name: "home" });
                        })
                        .catch(err => {
                            for (let i in err.response.data.msg) {
                                this.$Message.error(
                                    err.response.data.msg[i][0]
                                );
                            }
                        });
                } else {
                    this.$Message.error("账号密码不能为空");
                }
            });
        },
        resetData(name) {
            this.$refs[name].resetFields();
        },
    },
    mounted() {
        if(localStorage.getItem('saveUsername')){
            this.formInline.remenberPW = true
            this.formInline.username = localStorage.getItem('saveUsername')
            this.formInline.password = localStorage.getItem('savePassword')
        }else{
            this.formInline.remenberPW = false
        }
    }
};
</script>

<style lang='less'>
.page {
    width: 100%;
    height: 100%;
    position: relative;
    .loginItem {
        width: 60%;
        display: block;
        margin: 20px auto;
    }
    .card {
        .loginPage {
            margin: 20px 0 0 0;
        }
        .logo {
            width: 180px;
            height: 180px;
            position: absolute;
            margin-top: -180px;
            margin-left: 110px;
            background: url(../../../assets/images/loginLogo.png) no-repeat
                center;
        }
        width: 440px;
        height: 250px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .btn {
        display: block;
        width: 60%;
        margin: 0px auto 0;
    }
}
</style>
