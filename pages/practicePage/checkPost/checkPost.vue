<template>
	<view>
		<view class="practiceList">
			<view class="goBack">
				<button class="btn btn-danger" @click="commitListDisplay">返回</button>
			</view>
			<view class="d-flex flex-wrap" style="width: 500px;">
				<uni-card class="mb-5 dataList" title="实习信息详情" v-for="(item, index) in listData" :key="index">
					<uni-list>
						<uni-list-item title="学生姓名">
							<view slot="footer">
								<text class="text-primary">{{item.student_name}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习单位名称">
							<view slot="footer">
								<text class="text-primary">{{item.company_name}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习岗位名称">
							<view slot="footer">
								<text class="text-primary">{{item.post_name}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="行业方向">
							<view slot="footer">
								<text class="text-primary">{{item.trade}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习单位联系人">
							<view slot="footer">
								<text class="text-primary">{{item.contact}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习单位电话">
							<view slot="footer">
								<text class="text-primary">{{item.company_number}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习单位邮箱">
							<view slot="footer">
								<text class="text-primary">{{item.company_email}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习单位导师">
							<view slot="footer">
								<text class="text-primary">{{item.company_teacher}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="导师手机号">
							<view slot="footer">
								<text class="text-primary">{{item.teacher_number}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="薪资">
							<view slot="footer">
								<text class="text-primary">{{item.salary}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习时间">
							<view slot="footer">
								<text class="text-primary">{{item.practice_time}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习所在地区">
							<view slot="footer">
								<text class="text-primary">{{item.practice_city}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="工作内容">
							<view slot="footer">
								<text class="text-primary">{{item.work_content}}</text>
							</view>
						</uni-list-item>
					</uni-list>
				</uni-card>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teacher_id: '',
				task_id: '',
				last_task_id: '',
				isDisabled: true,
				isCommitList: true,
				taskData: '',
				isHandler: ['未提交', '已提交'],
				handleValue: 0,
				submit: true,
				listData: [],
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			this.teacher_id = JSON.parse(value).phone_num;
			const id = this.teacher_id;
			uni.request({
				url: 'http://127.0.0.1/index.php/practice/check',
				method: 'GET',
				data: {
					id
				},
				success: (res) => {
					if (res.data) {
						this.listData = res.data;
						if (this.data != []) {
							this.handleValue = 1;
						}
						console.log(this.listData);
						this.last_task_id = this.listData.slice(-1)[0].task_id;
						this.isDisabled = !this.isDisabled;
					}
				},
				fail: (res) => {
					console.log(res);
				},
				complete: () => {}
			});
			uni.request({
				url: 'http://127.0.0.1/index.php/practice/plan',
				method: 'GET',
				data: {
					id
				},
				success: res => {
					this.taskData = res.data;
					console.log(res.data);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			isSubmit(e) {
				this.commitData.task_id = e;
				this.submit = !this.submit;
			},
			commitListDisplay() {
				this.isCommitList = !this.isCommitList;
			}
		}
	}
</script>

<style>
	.picker {
		width: 180px;
		height: 38px;
		padding-left: 12px;
		border: rgb(229, 229, 229) 1px solid;
		border-radius: 4px;
		font-size: 13px;
		color: #000;
		line-height: 38px;
		text-align: left;
	}

	.formContainer {
		margin: 20px 0 0 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.commitContainer {
		width: 100%;
	}

	.input {
		width: 180px;
	}

	.commit {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 30px;
	}

	.commitBtn {
		width: 200px;
	}

	.dataList {
		width: 500px;

	}
</style>
