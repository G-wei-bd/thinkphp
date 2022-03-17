<template>
	<view>
		<view class="filePicker">
			<uni-card title="协议详情">
				<view class="agreeTable">
					<uni-table stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">参与实习</uni-th>
							<uni-th align="center">实习时间</uni-th>
							<uni-th align="center">指导老师</uni-th>
							<uni-th align="center">提交时间</uni-th>
							<uni-th align="center">审批情况</uni-th>
							<uni-th align="center">协议详情</uni-th>
						</uni-tr>
						<uni-tr>
							<uni-td align="center">18实习</uni-td>
							<uni-td align="center">2020-09-01~2022-01-30</uni-td>
							<uni-td align="center">第一个老师</uni-td>
							<uni-td align="center">2020-10-22</uni-td>
							<uni-td align="center">
								<text class="text-danger font-weight-bold">{{examine[exaVal]}}</text>
							</uni-td>
							<uni-td align="center"><img style="width: 40px;height: 40px;" :src="this.imgArr" alt=""></uni-td>
						</uni-tr>
					</uni-table>
				</view>
			</uni-card>
		</view>
		<view class="m-3" v-if="!exaVal">
			<text>不通过原因：<text class="text-danger">图片不清晰。</text></text>
		</view>
		<view class="agreementInfo" v-if="!exaVal">
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
									mode="grid" limit="1" :delIcon="false" :autoUpload="false" @select="select">
								</uni-file-picker>
							</uni-td>
						</uni-tr>
					</uni-table>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgArr: [],
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
				},
				examine: ['不通过', '通过'],
				exaVal: 0
			}
		},
		methods: {
			// 获取上传状态
			select(e) {
				this.imgArr = e.tempFilePaths;
				const tempFilePaths = e.tempFilePaths;
				const uploadTask = uni.uploadFile({
					url: 'http://127.0.0.1/index.php/agreement/index',
					filePath: tempFilePaths[0],
					name: 'file',
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
					}
				});
								
				uploadTask.onProgressUpdate((res) => {
					console.log('上传进度' + res.progress);
					console.log('已经上传的数据长度' + res.totalBytesSent);
					console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
								
							
				});
			}

		}
	}
</script>

<style>
	.filePicker {}
</style>
