<template>
	<view class="loginContainer container-fluid">
		<view class="userContainer">
			<image class="loginLogo" src="../../static/logo.svg"></image>
			<form class="form-group" @submit="formSubmit">
				<view class="userInfoContainer">
					<view class="userInfo">
						<view class="input">
							<text class="iconfont icon-yonghuming"></text>
							<input type="number" class="form-control" name="phone_num" placeholder="手机号"  placeholder-class="placeholder" focus/>
						</view>
						<view class="input">
							<text class="iconfont icon-mima"></text>
							<input :type="seen ? type_text : type_password" class="form-control" name="password" placeholder="密码" placeholder-class="placeholder"/>
							<text class="iconfont icon-xianshimima displayPassword" v-show="!seen" @click="display"></text>
							<text class="iconfont icon-yincangmima displayPassword" v-show="seen" @click="display"></text>
						</view>
						
					</view>
					<view class="text-dark userRegister">
						<text>还没有账号？</text>
						<navigator class="text-info registerBtn" url="/pages/register/register">点此注册</navigator>
					</view>
					<view class="submit">
						<button class="loginBtn btn btn-primary btn-outline-primary" form-type="submit" >登录</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import graceChecker from "../../common/graceChecker.js"
	import {
		mapMutations, //调用 index.js 里的方法
		mapState //读取数据
	} from 'vuex'
	export default {
		data() {
			return {
				seen: false,
				type_text: "text",
				type_password: "password",
			}
		},
		computed: {
			...mapState({
				student_id: state => state.student_id
			})
		},
		methods: {
			...mapMutations(['setStudent_id']),
			formSubmit: function(e) {
	            //定义表单规则
	            var rule = [
					{name:"phone_num", checkType : "null", errorMsg:"请输入手机号"},
					{name:"password", checkType : "null", errorMsg:"请输入密码"}
	            ];
	            //进行表单检查
	            var formData = e.detail.value;
	            var checkRes = graceChecker.check(formData, rule);
	            if(checkRes){
	               uni.request({
					url: 'http://127.0.0.1/index.php/login/login',
					method: 'GET',
					data: formData,
					success: (res) => {
						this.setStudent_id(res.data);
						if(res.data == 0){
							uni.showToast({
								title: '用户名或密码错误',
								icon:"error"
							})
						}
						else{
							uni.showToast({
								icon:"success",
								title: '验证通过'
							});
							console.log(res.data);
							uni.setStorageSync('user_info', JSON.stringify(res.data));
							setTimeout(function(){
								uni.reLaunch({
									url: "../tabBar/practicePage/practicePage"
								})
							}, 300);
						}
					},
					fail: () => {
						console.log('发送失败');
					},
					complete: () => {}
				});
	            }else{
	                uni.showToast({ title: graceChecker.error, icon: "none" });
	            }
			},
			display: function(){
				this.seen = !this.seen;
			}
		}
		
	}
</script>

<style>
	.loginContainer{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loginLogo{
		width: 240rpx;
		height: 80rpx;
		margin: 0 auto;
		
	}
	.userInfoContainer{
		width: 100%;
		height: 100%;
	}
	.userContainer{
		width: 700rpx;
		height: 580rpx;
		margin-top: 20vh;
		/* background-color: #bbffaa; */
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		
	}
	
	.userInfo{
		/* background-color: #ff7700; */
		height: 220rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: 30rpx;
	}
	
	.input{
		position: relative;
		width: 90%;
		display: flex;
		align-items: center;
	}
	
	.placeholder{
		font-size: 20rpx;
	}
	
	.input text{
		display: inline-block;
		padding: 0 10rpx;
	}
	
	.displayPassword{
		position: absolute;
		right: 14rpx;
	}
	
	
	.userRegister{
		font-size: 20rpx;
		padding: 10rpx 0 10rpx 50rpx;
		margin-bottom: 10rpx;
		display: flex;
	}
	
	.registerBtn{
		width: 100rpx;
	}
	
	.submit{
		/* background-color: pink; */
		display: flex;
		justify-content: center;
	}
	.submit .loginBtn{
		width: 600rpx;
	}
</style>

