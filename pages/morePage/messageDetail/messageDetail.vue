<template>
	<view>
		<view class="navBarContainer">
			<uni-nav-bar left-icon="left" right-text="菜单" left-text="返回" title="消息详情" @clickLeft="back" />
		</view>
		<view class="detail">
			<text class="font-weight-bold">这是题目\n</text>
			<text>这是消息详情，点进来就有好多信息可以查看。这是消息详情，点进来就有好多信息可以查看。</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(e) {
			console.log(e);
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>

</style>
