<template>
	<view>
		<view class="filePicker">
			<text>请上传三方协议</text>
			<uni-file-picker v-model="imageValue" fileMediatype="image" :image-styles="imageStyles"
				mode="grid" limit="1" @select="select" @progress="progress" @success="success" @fail="fail">
				<button class="btn btn-primary btn-sm">选择文件</button>
			</uni-file-picker>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				imageStyles: {
					border: true,
					width: 250,
					height: 250,
					borderStyle: {
						width: 1,
						color: '#ff6700',
						redius: 10
					}
				}
			}
		},
		methods: {
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		}
	}
</script>

<style>
	.filePicker{
		width: 240px;
		height: 100%;
		margin-left: 100px;
	}
</style>
