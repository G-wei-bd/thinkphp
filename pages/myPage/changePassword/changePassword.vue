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
				
			}
		},
		methods: {
			changePassword(e){
				console.log(e.detail.value);
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
