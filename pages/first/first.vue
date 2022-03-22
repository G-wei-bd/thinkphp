<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
			console.log('这是第一页');
			const value = uni.getStorageSync('user_info');
			if(value){
				uni.switchTab({
					url: '/pages/practicePage/practice/practice'
				})
			}else{
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
