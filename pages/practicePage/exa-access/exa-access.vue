<template>
	<view>
		<view class="table" v-if="isCheck">
			<uni-table stripe emptyText="暂无更多数据">
				<uni-tr>
					<uni-th align="center">序号</uni-th>
					<uni-th align="center">实习名称</uni-th>
					<uni-th align="center">学生姓名</uni-th>
					<uni-th align="center">实习时间</uni-th>
					<uni-th align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in accessData" :key="index">
					<uni-td align="center">{{index + 1}}</uni-td>
					<uni-td align="center">{{item.task_name}}</uni-td>
					<uni-td align="center">{{item.user_name}}</uni-td>
					<uni-td align="center">{{item.time}}</uni-td>
					<uni-td align="center">
						<button class="btn btn-sm btn-outline-danger" @click="check(index)">查看评价</button>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<view v-else>
			<view class="assessRate">
				<view class="m-4">
					<button class="btn btn-danger" @click="toBack">返回</button>
				</view>
				<uni-forms>
					<uni-group title="对实践教学的评价" margin-top="0">
						<uni-forms-item label="适应岗位的时间" name="adapt_time">
							<view class="easyInput">
								<uni-easyinput style="width: 60px;" type="number" maxlength="2" disabled
									v-model="detailAccess.adapt_time" />
								<text>天</text>
							</view>
						</uni-forms-item>
						<uni-forms-item label="理想的实习时间" name="ideal_time">
							<view class="easyInput">
								<uni-easyinput type="number" maxlength="3" disabled style="width: 60px;" v-model="detailAccess.ideal_time" />
								<text>天</text>
							</view>
						</uni-forms-item>
						<uni-forms-item label="岗位胜任情况评价" name="post_rate">
							<uni-rate v-model="detailAccess.post_rate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="实习工作量评价" name="workload_rate">
							<uni-rate v-model="detailAccess.workload_rate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="实习组织满意度" name="organization_rate">
							<uni-rate v-model="detailAccess.organization_rate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="对本次实践教学的建议" name="suggest">
							<uni-easyinput disabled v-model="detailAccess.suggest" />
						</uni-forms-item>
					</uni-group>
					<uni-group title="指导老师评价" margin-top="0">
						<uni-forms-item label="指导老师满意度" name="teacher_rate">
							<uni-rate v-model="detailAccess.teacher_rate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="对指导老师评价" name="teacher_advise">
							<uni-easyinput disabled v-model="detailAccess.teacher_advise" />
						</uni-forms-item>
					</uni-group>
					<uni-group title="对实习单位的评价" margin-top="0">
						<uni-forms-item label="工作环境" name="work_condition">
							<uni-rate v-model="detailAccess.work_condition"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="工作岗位" name="work_post">
							<uni-rate v-model="detailAccess.work_post"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="工作指导" name="work_guidance">
							<uni-rate v-model="detailAccess.work_guidance"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="薪资" name="salary">
							<uni-rate v-model="detailAccess.salary"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="锻炼价值" name="value">
							<uni-rate v-model="detailAccess.value"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="是否留用" name="stay">
							<uni-easyinput style="width: 80px;" disabled v-model="detailAccess.stay" />
						</uni-forms-item>
					</uni-group>
				</uni-forms>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCheck: true,
				teacher_id: '',
				accessData: '',
				detailAccess: ''
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			this.teacher_id = JSON.parse(value).phone_num;
			const id = this.teacher_id;
			uni.request({
				url: 'http://127.0.0.1/index.php/access/check',
				method: 'GET',
				data: {
					id
				},
				success: res => {
					console.log(res.data);
					this.accessData = res.data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			check(e) {
				this.isCheck = !this.isCheck;
				this.detailAccess = this.accessData[e];
				console.log(this.detailAccess);
			},
			toBack(){
				this.isCheck = !this.isCheck;
			}
		}
	}
</script>

<style>

</style>
