<template>
	<view>

		<view class="registerContainer">
			<form class="form-group" @submit="submitRegister">
				<view class="userName">
					<text class="iconfont icon-yonghuming"></text>
					<text class="small">姓名</text>
					<input type="text" class="form-control form-control-sm" name="user_name" placeholder="姓名" placeholder-class="small"/>
				</view>
				
				<view class="teacherNumber">
					<text class="iconfont icon-xuegonghao"></text>
					<text class="small">指导老师学工号</text>
					<input type="number" class="form-control form-control-sm" maxlength="11" name="teacher_id" placeholder="请输入指导老师学工号" placeholder-class="small"/>
				</view>
				
				<view class="phoneNumber">
					<text class="iconfont icon-shoujihaoma"></text>
					<text class="small">手机号</text>
					<input type="number" class="form-control form-control-sm" maxlength="11" name="phone_num" placeholder="请输入手机号" placeholder-class="small"/>
				</view>
				
				<view class="password">
					<text class="iconfont icon-mima"></text>
					<text class="small">设置密码</text>
					<input :type="seen ? type_text : type_password" class="form-control form-control-sm" name="password" placeholder="请设置密码(6-16个字符)" placeholder-class="small"/>
					<text class="iconfont icon-xianshimima displayPassword" v-show="!seen" @click="display"></text>
					<text class="iconfont icon-yincangmima displayPassword" v-show="seen" @click="display"></text>
				</view>
				
				<view class="password">
					<text class="iconfont icon-mima"></text>
					<text class="small">确认密码</text>
					<input :type="secondSeen ? type_text : type_password" class="form-control form-control-sm" name="comfirmPassword" placeholder="请再次确认密码" placeholder-class="small"/>
					<text class="iconfont icon-xianshimima displayPassword" v-show="!secondSeen" @click="secondDis"></text>
					<text class="iconfont icon-yincangmima displayPassword" v-show="secondSeen" @click="secondDis"></text>
				</view>
				
				<view class="submit">
					<button class="btn btn-primary btn-outline-primary submitBtn" type="submit" form-type="submit">确认注册</button>
				</view>
				
			</form>
		</view>
	</view>
</template>

<script>
	import graceChecker from "../../common/graceChecker.js";
	export default {
		data() {
			return {
				seen: false,
				secondSeen: false, 
				type_text: "text",
				type_password: "password",
			}
		},
		methods: {
			submitRegister: function(e){
				var rule = [
					{name: "user_name", checkType: "notnull", errorMsg: "请填写姓名"},
					{name: "password", checkType: "notnull", errorMsg: "密码不能为空"},
					{name: "password", checkType: "length", errorMsg: "密码需要6-16个字符"},
					{name: "comfirmPassword", checkType: "same", checkRule:e.detail.value.password, errorMsg: "两次密码不一致"}
				];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					delete formData.comfirmPassword;
					uni.request({
						url: 'http://127.0.0.1/index.php/register/index',
						method: 'GET',
						data: formData,
						success: res => {
							if(res.data == 1){
								uni.showToast({
									title: "注册成功",
									icon: "success",
									duration: 2000
								});
								setTimeout(function(){
									uni.navigateTo({
									url:"../login/login"
								})
								},500);
							}
						},
						fail: () => {
							console.log('发送失败');
						},
						complete: () => {}
					});
				}else{
					uni.showToast({
						title: graceChecker.error,
						icon: "error"
					});
				}
			},
			display: function(){
				this.seen = !this.seen;
			},
			secondDis: function(){
				this.secondSeen = !this.secondSeen;
			}
		}
	}
</script>

<style>
.registerContainer{
	width: 700rpx;
	height: 120vh;
	/* background-color: #BBFFAA; */
	margin: 0 auto;
	padding: 20rpx;
}

.iconfont{
	margin-right: 15rpx;
	font-size: 32rpx;
	line-height: 32rpx;
}

.list-group-item{
	padding: 0 10px;
	height: 30px;
	line-height: 58rpx;
	color: #999999;
}

.password{
	position: relative;
}
.displayPassword{
	position: absolute;
	right: 7px;
	top: 55%;
	
}

.submit{
	display: flex;
	justify-content: center;
}

.submitBtn{
	width: 600rpx;
}

.userName, 
.phoneNumber,
.teacherNumber,
.password, 
.submit{
	margin-bottom: 15px;
}

</style>
