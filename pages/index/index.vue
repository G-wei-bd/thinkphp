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
		            console.log('App Launch')
		             // token标志来判断
		            let token= uni.getStorageSync('user_info');   
		            console.log(token);
		             if (!token) {
		                 console.log('没有token'),
		                 //跳到登录页面.relaunch可以打开任何界面
		               uni.reLaunch({
		                url:'/pages/login/login'
		               })
		            } else {
		                console.log('有token')
		                //跳到首页,跳转tabbar界面,必须使用这个方法
		                uni.switchTab({
		                        url: '/pages/tabBar/practicePage/practicePage'
		                    })
		            }   
		            
		        },
		methods: {

		}
	}
</script>

<style>

</style>
