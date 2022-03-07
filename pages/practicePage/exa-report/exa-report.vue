<template>
	<view>
		<view class="agreementInfo">
			<uni-card title="实习报告详情">
				<view class="agreeTable">
					<uni-table stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">学生姓名</uni-th>
							<uni-th align="center">参与实习</uni-th>
							<uni-th align="center">实习时间</uni-th>
							<uni-th align="center">指导老师</uni-th>
							<uni-th align="center">提交时间</uni-th>
							<uni-th align="center">实习报告详情</uni-th>
							<uni-th align="center">评分</uni-th>
						</uni-tr>
						<uni-tr>
							<uni-td align="center">未知</uni-td>
							<uni-td align="center">18实习</uni-td>
							<uni-td align="center">2020-09-01~2022-01-30</uni-td>
							<uni-td align="center">第一个老师</uni-td>
							<uni-td align="center">2020-10-22</uni-td>
							<uni-td align="center">
								<img src="../../../static/logo.png">
							</uni-td>
							<uni-td align="center">
								<view class="exa-btn" v-if="isShow">
									<input type="number" class="input" @input="score" />
									<button class="btn btn-danger" @click="commitScore">提交</button>
								</view>
								<view v-else>
									<text class="text-danger font-weight-bold">{{ reportScore }}</text>
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
		methods: {
			score(e){
				this.reportScore = e.detail.value;
			},
			commitScore(){
				console.log(this.reportScore);
				this.isShow = !this.isShow;
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
