<template>
	<div class="login_container">
		<div class="login_box">
			<!--
            	作者：offline
            	时间：2020-05-02
            	描述：头像区域
            -->
			<div class="avatar_box">
				<img src="../assets/logo.png" />
			</div>
			<!--
            	作者：offline
            	时间：2020-05-02
            	描述：登录表单区域
            -->
            <el-form :model="loginForm" label-width="0px" class="login_form">
            	<!-- 描述：用户名 -->
            	<el-form-item>
    				<el-input v-model="loginForm.loginName" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
  				</el-form-item>
  				<!-- 描述：密码 -->
  				<el-form-item>
    				<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"></el-input>
  				</el-form-item>

  				<!-- 描述：按钮区域 -->
  				<el-form-item class="btns">
	                <el-button type="primary" v-on:click="login()">登录</el-button>
	                <el-button type="info">注册</el-button>
                </el-form-item>
            </el-form>
		</div>
	</div>
</template>

<script>
  export default {
		data(){
			return{
				//这是登录表单的数据绑定对象
				loginForm: {
          loginName:'',
					password:''
				}
			}
		},
		methods:{
			login(){
			  let _this = this;
        api.userLogin(this.loginForm)
						.then(function (response) {
                if (response.data.code == 200){
                  _this.$message.success(response.data.message);
                  //1将 登录成功之后的用户信息存到sessionStorage中
                  window.sessionStorage.setItem('userInfo',JSON.stringify(response.data.data))
                  //2通过编程式导航跳转到后台主页
                  var data={
                    token:response.data.data.token,
                    userId:response.data.data.userId,
                    mobile:response.data.data.loginName,
                    bumen:response.data.data.bumen,
                    isLogin:1,
                    auto:false
                  }
                  _this.$store.commit('saveInfo',data);
                  _this.$router.push("/home")
                }else{
                  _this.$message.error(response.data.message,'success');
                }
            })
			}
		}
	};
</script>

<style scoped>
	.login_container{
		background-color: #2b4b6b;
		height: 100%;
	}
	.login_box{
		width: 450px;
		height: 300px;
		background-color: #fff;
		border-radius:3px ;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);


	}
	.avatar_box {
			height: 130px;
			width: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px;
			position: absolute;
			left: 50%;
			transform: translate(-50%,-50%);
			background-color: #FFFFFF;
		}
	img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
		}
	.login_form {
		position: absolute;
		bottom: 0px;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;

	}

	.btns {
		display: flex;
		justify-content:center;
	}
</style>
