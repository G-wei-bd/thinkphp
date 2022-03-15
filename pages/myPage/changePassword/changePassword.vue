<template>
	<view class="passwordContainer">
		<form class="form-group" @submit="changePassword">
			<view class="oldPassword">
				<text class="small">旧密码</text>
				<uni-easyinput name="oldPassword" type="password" trim placeholder="请输入旧密码" />
			</view>
			<view class="newPassword">
				<text class="small">新密码</text>
				<uni-easyinput name="newPassword" type="password" trim placeholder="请输入新密码" />
			</view>
			<view class="text-center m-3">
				<button style="width: 150px;" class="btn btn-danger" type="submit" form-type="submit">提交</button>
			</view>
			
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_password: '',
				data: {
					id: '',
					password: ''
				}
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			this.old_password = JSON.parse(value).password;
			this.data.id = JSON.parse(value).id;
			
		},
		methods: {
			changePassword(e){
				// console.log(e.detail.value.newPassword);
				if(this.old_password == e.detail.value.oldPassword){
					this.data.password = e.detail.value.newPassword;
					 const commitData = this.data;
					 uni.request({
					 	url: 'http://127.0.0.1/index.php/changePassword/index',
					 	method: 'GET',
					 	data: commitData,
					 	success: res => {
							if(res.data == 1){
								uni.showToast({
									title: '修改密码成功',
									icon: "success",
									duration: 500
								});
							}else{
								uni.showToast({
									title: '操作异常，请重新修改'
								});
							}
						},
					 	fail: () => {},
					 	complete: () => {
							const id = this.data.id;
							uni.request({
								url: 'http://127.0.0.1/index.php/changePassword/search',
								method: 'GET',
								data: id,
								success: res => {
									console.log(res.data);
								},
								fail: () => {},
								complete: () => {}
							});
						}
					 });
				}else{
					uni.showToast({
						title: '原密码不正确',
						icon:"error"
					});
				}
			}
		}
	}
</script>

<style>
	.passwordContainer{
		width: 250px;
		margin: 30px auto;
	}
	
</style>
