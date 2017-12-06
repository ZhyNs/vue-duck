<template>
  <div class="login-bg">
    <div class="login-div">
      <el-form ref="accountForm" :model="account" :rules="rules" label-width="0" style="margin: 30px auto; width: 80%;">
          <el-form-item class="login-center">
            <el-input placeholder="请输入用户名" v-model="account.userName">
              <template slot="prepend">账号</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入密码" type="password" v-model="account.password">
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;"  @click.native.prevent="login" :loading="loading">登录</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import API from '../api/api_login'

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      account: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login() {
      let that = this;
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let params = {userName: this.account.userName, password: this.account.password};
          API.login(params).then((res) => {
            console.log(res);
            that.loading = false;
            if (res) {
              // localStorage.setItem('access-user', JSON.stringify(result));
//                that.$store.commit('SET_ROUTERS', user.permissions)
//                that.$router.addRoutes(that.$store.getters.addRouters);
//                that.$router.options.routes = that.$store.getters.routers;
              that.$router.push({path: '/back/home'});
            }
          }, (err) => {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          })
        }
      })
    }
  }
}
</script>

<style scope>
.login-bg {
  height: 100vh;
  width: 100vm;
  background-color: rgba(0, 0, 0, 0.6);
}

.login-div {
  position: fixed;
  height: 28%;
  width: 36%;
  top: 25%;
  left: 32%;
  background-color: #fff;
  border-radius: 4px;
}

@media screen and (max-width:992px){
    .login-div{
      height: 28%;
      width: 48%;
      top: 25%;
      left: 26%;
    }
}

@media screen and (max-width:768px){
    .login-div{
      height: 30%;
      width: 80%;
      top: 25%;
      left: 10%;
    }
}
</style>
