<template>
	<view>
		<view class="agreementInfo">
			<uni-card title="协议详情">
				<view class="agreeTable">
					<uni-table stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">参与实习</uni-th>
							<uni-th align="center">实习时间</uni-th>
							<uni-th align="center">指导老师</uni-th>
							<uni-th align="center">提交时间</uni-th>
							<uni-th align="center">上传协议</uni-th>
						</uni-tr>
						<uni-tr>
							<uni-td align="center">18实习</uni-td>
							<uni-td align="center">2020-09-01~2022-01-30</uni-td>
							<uni-td align="center">第一个老师</uni-td>
							<uni-td align="center">2020-10-22</uni-td>
							<uni-td align="center">
								<uni-file-picker v-model="imageValue" fileMediatype="image" :image-styles="imageStyles"
									mode="grid" limit="1" @select="select" @progress="progress" @success="success"
									@fail="fail">
								</uni-file-picker>
							</uni-td>

						</uni-tr>
					</uni-table>
				</view>
			</uni-card>
		</view>
		<!-- <view class="filePicker">
			<text>请上传三方协议</text>
			<uni-file-picker v-model="imageValue" fileMediatype="image" :image-styles="imageStyles" mode="grid"
				limit="1" @select="select" @progress="progress" @success="success" @fail="fail">
				<button class="btn btn-primary btn-sm">选择文件</button>
			</uni-file-picker>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				imageStyles: {
					border: true,
					width: 100,
					height: 100,
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
	.filePicker {
		width: 240px;
		height: 100%;
		margin-left: 100px;
	}
</style>
