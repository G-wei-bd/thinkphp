<template>
	<view>
		<view class="agreementInfo" v-if="!detail.agreement">
			<uni-card title="协议详情">
				<view class="agreeTable">
					<uni-table stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">参与实习</uni-th>
							<uni-th align="center">实习时间</uni-th>
							<uni-th align="center">指导老师</uni-th>
							<uni-th align="center">上传协议</uni-th>
						</uni-tr>
						<uni-tr>
							<uni-td align="center">{{taskData.name}}</uni-td>
							<uni-td align="center">{{taskData.time}}</uni-td>
							<uni-td align="center">{{taskData.teacher_name}}</uni-td>
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
		<view class="filePicker" v-else>
			<uni-card title="协议详情">
				<view class="agreeTable">
					<uni-table stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">参与实习</uni-th>
							<uni-th align="center">实习时间</uni-th>
							<uni-th align="center">指导老师</uni-th>
							<uni-th align="center">审批情况</uni-th>
							<uni-th align="center">协议详情</uni-th>
						</uni-tr>
						<uni-tr>
							<uni-td align="center">{{detail.name}}</uni-td>
							<uni-td align="center">{{detail.time}}</uni-td>
							<uni-td align="center">{{detail.teacher_name}}</uni-td>
							<uni-td align="center">
								<text class="text-danger font-weight-bold">{{examine[agreement_check]}}</text>
							</uni-td>
							<uni-td align="center"><image :src="detail.agreement" style="width: 80px; height: 80px;"></image>
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
				stu_id: '',
				taskData: '',
				detail: '',
				imgArr: [],
				imageValue: [],
				imageStyles: {
					border: true,
					width: 80,
					height: 80,
					borderStyle: {
						width: 1,
						color: '#ff6700',
						redius: 10
					}
				},
				examine: ['未审核', '不通过', '通过', ],
				exaVal: 0
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			this.stu_id = JSON.parse(value).id;
			const id = this.stu_id;
			uni.request({
				url: 'http://127.0.0.1/index.php/practice/plan',
				method: 'GET',
				data: {
					id
				},
				success: res => {
					this.taskData = res.data;
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: 'http://127.0.0.1/index.php/agreement/search',
				method: 'GET',
				data: {id},
				success: res => {
					this.detail = res.data;
					// this.detail.agreement = 'http://127.0.0.1/upload/' + this.detail.agreement;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			// 获取上传状态
			select(e) {
				this.imgArr = e.tempFilePaths;
				const tempFilePaths = e.tempFilePaths;
				const id1 = this.stu_id;
				const uploadTask = uni.uploadFile({
					url: 'http://127.0.0.1/index.php/agreement/index',
					filePath: tempFilePaths[0],
					name: 'file',
					formData: {
						id1
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
						this.exaVal = 3;
					}
				});
				uploadTask.onProgressUpdate((res) => {
					console.log('上传进度' + res.progress);
					console.log('已经上传的数据长度' + res.totalBytesSent);
					console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
				});
			},
		}
	}
</script>

<style>
	.filePicker {}
</style>
