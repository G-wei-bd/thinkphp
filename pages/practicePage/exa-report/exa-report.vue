<template>
	<view>
		<view class="agreementInfo">
			<uni-card title="实习报告详情">
				<view class="agreeTable">
					<uni-table stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">序号</uni-th>
							<uni-th align="center">学生姓名</uni-th>
							<uni-th align="center">参与实习</uni-th>
							<uni-th align="center">实习时间</uni-th>
							<uni-th align="center">指导老师</uni-th>
							<uni-th align="center">实习报告详情</uni-th>
							<uni-th align="center">意见</uni-th>
							<uni-th align="center">评分</uni-th>
						</uni-tr>
						<uni-tr v-for="(item, index) in checkData" :key="index">
							<uni-td align="center">{{index + 1}}</uni-td>
							<uni-td align="center">{{item.student_name}}</uni-td>
							<uni-td align="center">{{item.name}}</uni-td>
							<uni-td align="center">{{item.time}}</uni-td>
							<uni-td align="center">{{item.teacher_name}}</uni-td>
							<uni-td align="center">
								<a :href="item.report">点此查看</a>
							</uni-td>
							<uni-td align="center" class="text-danger font-weight-bold">{{examine[item.report_check]}},评分是:{{item.score}}</uni-td>
							<uni-td align="center">
								<view class="exa-btn">
									<input type="number" class="input" @input="score" />
									<button class="btn btn-danger" @click="commitScore(index)">提交</button>
								</view>
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
				checkData: '',
				examine: ['未审核', '已评分' ],
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
				isShow: true,
				reportScore: ''
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			this.teacher_id = JSON.parse(value).phone_num;
			const id = this.teacher_id;
			console.log(id);
			uni.request({
				url: 'http://127.0.0.1/index.php/agreement/teacher',
				method: 'GET',
				data: {id},
				success: res => {
					console.log(res.data);
					this.checkData = res.data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			score(e){
				this.reportScore = e.detail.value;
			},
			commitScore(e){
				const id = this.checkData[e].student_id;
				const score = this.reportScore;
				console.log(score);
				uni.request({
					url: 'http://127.0.0.1/index.php/report/commit',
					method: 'GET',
					data: {id,score},
					success: res => {
						console.log(res.data);
						if(res.data == 1){
							uni.reLaunch({
								url: '/pages/practicePage/exa-report/exa-report'
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
				
			}
		}
	}
</script>

<style>
	.exa-btn {
		width: 150px;
		display: flex;
		justify-content: space-between;
	}
	
	.input{
		height: 36px;
		border: 1px solid #999;
		border-radius: 5px;
		background-color: #fff;
		margin-right: 10px;
	}
</style>
