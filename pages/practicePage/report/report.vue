<template>
	<view>
		<view>
			<view class="selectItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#ff7700"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="twoParts">
						<uni-card title="我的实习评价">
							<uni-list>
								<uni-list-item title="参与计划" :rightText="taskData.name"></uni-list-item>
								<uni-list-item title="参与时间" :rightText="taskData.time"></uni-list-item>
								<uni-list-item title="指导老师" :rightText="taskData.teacher_name"></uni-list-item>
								<uni-list-item title="是否提交" :note="handle[handleValue]">
									<view slot="footer">
										<button class="btn btn-danger btn-sm" @click="openPopup">提交实习报告</button>
									</view>
								</uni-list-item>
							</uni-list>
						</uni-card>
					</view>
					<uni-popup ref="popup" type="center">
						<view class="popupContainer">
							<view>
								<text class="text-primary">请上传实习报告，建议大小不超过 20M</text>
							</view>
							<view class="submitFile">
								<uni-file-picker v-model="imageValue" file-mediatype="all" :image-styles="imageStyles"
									mode="grid" limit="1" @select="select">
								</uni-file-picker>
							</view>
						</view>
					</uni-popup>
				</view>
				<view v-show="current === 1">
					<uni-table stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">参与实习</uni-th>
							<uni-th align="center">实习时间</uni-th>
							<uni-th align="center">指导老师</uni-th>
							<uni-th align="center">评分情况</uni-th>
							<uni-th align="center">报告详情</uni-th>
						</uni-tr>
						<uni-tr>
							<uni-td align="center">{{taskData.name}}</uni-td>
							<uni-td align="center">{{taskData.time}}</uni-td>
							<uni-td align="center">{{taskData.teacher_name}}</uni-td>
							<uni-td align="center">{{taskData.score}}</uni-td>
							<uni-td align="center">{{taskData.report}}</uni-td>
						</uni-tr>
					</uni-table>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskData: '',
				isDisplay: true,
				current: 0,
				items: [
					"待提交", "已提交"
				],
				handle: ['未提交','已提交'],
				handleValue: 0,
				imageValue: [],
				imageStyles: {
					border: true,
					width: 100,
					height: 100,
					borderStyle: {
						width: 1,
						color: '#bfa',
						redius: 10
					}
				}
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			this.stu_id = JSON.parse(value).id;
			const id = this.stu_id;
			uni.request({
				url: 'http://127.0.0.1/index.php/report/search',
				method: 'GET',
				data: {
					id
				},
				success: res => {
					console.log(res.data);
					this.taskData = res.data;
					if(this.taskData.report){
						this.handleValue = 1;
					}
					// this.taskData.report = 'http://127.0.0.1/upload/' + this.taskData.report;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			openPopup() {
				this.$refs.popup.open();
			},
			select(e) {
				const tempFilePaths = e.tempFilePaths;
				const id1 = this.stu_id;
				const uploadTask = uni.uploadFile({
					url: 'http://127.0.0.1/index.php/report/index',
					filePath: tempFilePaths[0],
					name: 'file',
					formData: {
						id1
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
						this.handleValue = 1;
						this.$refs.popup.close();
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
	.selectItem {
		width: 200px;
		margin-left: 14px;
	}

	.popupContainer {
		width: 300px;
		height: 220px;
		padding: 20px 10px;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
