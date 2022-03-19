<template>
	<view>
		<view class="agreementInfo">
			<uni-card title="协议详情">
				<view class="agreeTable">
					<uni-table stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">序号</uni-th>
							<uni-th align="center">学生姓名</uni-th>
							<uni-th align="center">参与实习</uni-th>
							<uni-th align="center">实习时间</uni-th>
							<uni-th align="center">指导老师</uni-th>
							<uni-th align="center">协议详情</uni-th>
							<uni-th align="center">意见</uni-th>
							<uni-th align="center">审批情况</uni-th>
						</uni-tr>
						<uni-tr v-for="(item, index) in checkData" :key="index">
							<uni-td align="center">{{index + 1}}</uni-td>
							<uni-td align="center">{{item.student_name}}</uni-td>
							<uni-td align="center">{{item.name}}</uni-td>
							<uni-td align="center">{{item.time}}</uni-td>
							<uni-td align="center">{{item.teacher_name}}</uni-td>
							<uni-td align="center">
								<img :src="item.agreement">
							</uni-td>
							<uni-td align="center" class="text-danger font-weight-bold">{{examine[item.agreement_check]}}</uni-td>
							<uni-td align="center">
								<view class="exa-btn" v-if="isShow">
									<button class="btn btn-danger" @click="success(index)">通过</button>
									<button class="btn btn-danger" @click="reason(index)">未通过</button>
								</view>
								<text v-else class="text-danger font-weight-bold">已通过</text>
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
				teacher_id: '',
				checkData: '',
				isShow: true,
				value: '',
				examine: ['未审核', '通过', '不通过', ],
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
			success(e){
				const id = this.checkData[e].student_id;
				uni.request({
					url: 'http://127.0.0.1/index.php/agreement/success',
					method: 'GET',
					data: {id},
					success: res => {
						console.log(res.data);
						if(res.data == 1){
							uni.reLaunch({
								url: '/pages/practicePage/examine/examine'
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
				
			},
			reason(e){
				const id = this.checkData[e].student_id;
				uni.request({
					url: 'http://127.0.0.1/index.php/agreement/reason',
					method: 'GET',
					data: {id},
					success: res => {
						console.log(res.data);
						if(res.data == 1){
							uni.reLaunch({
								url: '/pages/practicePage/examine/examine'
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			change(e){
				this.value = e.detail.value;
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
	.reason{
		height: 150px;
		position: relative;
		z-index: 999;
		padding: 50px 20px;
	}
</style>
