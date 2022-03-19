<template>
	<view>
		<view v-if="display" class="assessContainer">
			<view class="controlItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
					activeColor="#ff0000"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="twoParts" v-if="isAccess">
						<uni-card title="我的实习评价">
							<uni-list>
								<uni-list-item title="参与计划">
									<view slot="footer">
										<text>{{taskData.name}}</text>
									</view>
								</uni-list-item>
								<uni-list-item title="参与时间">
									<view slot="footer">
										<text>{{taskData.time}}</text>
									</view>
								</uni-list-item>
								<uni-list-item title="指导老师">
									<view slot="footer">
										<text>{{taskData.teacher_name}}</text>
									</view>
								</uni-list-item>
								<uni-list-item title="是否评价">
									<view slot="footer" class="text-center">
										<text class="mr-5 text-danger font-weight-bold ">未评价</text>
										<button class="btn btn-danger btn-sm" @click="toRate">添加评价</button>
									</view>
								</uni-list-item>
							</uni-list>
						</uni-card>
					</view>
					<view v-else class="font-weight-bold text-center">
						<text>当前没有未添加评价</text>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="allAssess" v-if="arrData">
						<view v-for="(item, index) in arrData" :key="index">
							<uni-card title="我的实习评价">
								<uni-list>
									<uni-list-item title="参与计划">
										<view slot="footer">
											<text>{{item.task_name}}</text>
										</view>
									</uni-list-item>
									<uni-list-item title="参与时间">
										<view slot="footer">
											<text>{{item.time}}</text>
										</view>
									</uni-list-item>
									<uni-list-item title="指导老师">
										<view slot="footer">
											<text>{{item.teacher_name}}</text>
										</view>
									</uni-list-item>
									<uni-list-item title="是否评价">
										<view slot="footer">
											<text class="text-danger font-weight-bold">是</text>
										</view>
									</uni-list-item>
								</uni-list>
							</uni-card>
						</view>
					</view>
					<view v-else>
						<text class="d-flex justify-content-center text-danger mt-5 font-weight-bold">当前没有评价</text>
					</view>
				</view>
			</view>
		</view>
		<view class="rateContainer" v-else>
			<view class="back">
				<button class="btn btn-danger" @click="toRate">返回</button>
			</view>
			<view class="assessRate">
				<uni-forms ref="form" :modelValue="rateData" :rules="rules">
					<uni-group title="对实践教学的评价" margin-top="0">
						<uni-forms-item label="适应岗位的时间" name="adapt_time">
							<view class="easyInput">
								<uni-easyinput type="number" maxlength="2" v-model="rateData.adapt_time" />
								<text>天</text>
							</view>
						</uni-forms-item>
						<uni-forms-item label="理想的实习时间" name="ideal_time">
							<view class="easyInput">
								<uni-easyinput type="number" maxlength="3" v-model="rateData.ideal_time" />
								<text>天</text>
							</view>
						</uni-forms-item>
						<uni-forms-item label="岗位胜任情况评价" name="post_rate">
							<uni-rate v-model="rateData.post_rate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="实习工作量评价" name="workload_rate">
							<uni-rate v-model="rateData.workload_rate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="实习组织满意度" name="organization_rate">
							<uni-rate v-model="rateData.organization_rate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="对本次实践教学的建议" name="suggest">
							<uni-easyinput style="width: 200px;" type="textarea" autoHeight
								v-model="rateData.suggest" />
						</uni-forms-item>
					</uni-group>
					<uni-group title="指导老师评价" margin-top="0">
						<uni-forms-item label="指导老师满意度" name="teacher_rate">
							<uni-rate v-model="rateData.teacher_rate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="对指导老师评价" name="teacher_advise">
							<uni-easyinput style="width: 200px;" type="textarea" autoHeight
								v-model="rateData.teacher_advise" />
						</uni-forms-item>
					</uni-group>
					<uni-group title="对实习单位的评价" margin-top="0">
						<uni-forms-item label="工作环境" name="work_condition">
							<uni-rate v-model="rateData.work_condition"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="工作岗位" name="work_post">
							<uni-rate v-model="rateData.work_post"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="工作指导" name="work_guidance">
							<uni-rate v-model="rateData.work_guidance"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="薪资" name="salary">
							<uni-rate v-model="rateData.salary"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="锻炼价值" name="value">
							<uni-rate v-model="rateData.value"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="是否留用" name="stay">
							<uni-data-checkbox :value="stayValue" v-model="rateData.stay" mode="default"
								:localdata="stayData" />
						</uni-forms-item>
					</uni-group>
				</uni-forms>
			</view>
			<view class="submitBtn">
				<button class="btn btn-danger btn-outline-danger" @click="submitRate">提交评价</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAccess: true,
				taskData: {
					name: '',
					time: '',
					teacher_name: ''
				},
				display: true,
				current: 0,
				items: [
					"未评价", "已评价"
				],
				accessData: '',
				arrData: '',
				rateData: {
					adapt_time: '',
					ideal_time: '',
					post_rate: '',
					workload_rate: '',
					organization_rate: '',
					suggest: '',
					teacher_rate: '',
					teacher_advise: '',
					work_condition: '',
					work_post: '',
					work_guidance: '',
					salary: '',
					value: '',
					stay: ''
				},
				rules: {
					adapt_time: {
						rules: [{
							required: true,
							errorMessage: "请输入时间"
						}]
					},
					ideal_time: {
						rules: [{
							required: true,
							errorMessage: "请输入时间"
						}]
					},
					post_rate: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					workload_rate: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					organization_rate: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					suggest: {
						rules: [{
							required: true,
							errorMessage: "请填写本次教学建议"
						}]
					},
					teacher_rate: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					teacher_advise: {
						rules: [{
							required: true,
							errorMessage: "请填写对指导老师的评价"
						}]
					},
					work_condition: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					work_post: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					work_guidance: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					salary: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					value: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					stay: {
						rules: [{
							required: true,
							errorMessage: "请选择是否留用"
						}]
					}
				},
				stayValue: '',
				stayData: [{
					"value": '是',
					"text": "是"
				}, {
					"value": '否',
					"text": "否"
				}, {
					"value": '无意留用',
					"text": "无意留用"
				}],
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			const id = JSON.parse(value).id;
			uni.request({
				url: 'http://127.0.0.1/index.php/practice/plan',
				method: 'GET',
				data: {
					id
				},
				success: res => {
					console.log(res.data);
					this.taskData.name = res.data.name;
					this.taskData.time = res.data.time;
					this.taskData.teacher_name = res.data.teacher_name;
					this.task_id = res.data.task_id;
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: 'http://127.0.0.1/index.php/access/search',
				method: 'GET',
				data: {
					id: id
				},
				success: res => {
					this.arrData = res.data;
					console.log(this.arrData);
					
				},
				fail: () => {
					console.log('失败');
				},
				complete: () => {}
			});
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			toRate() {
				this.display = !this.display;
			},
			submitRate(e) {
				this.$refs.form.validate().then((res) => {
					const value = uni.getStorageSync('user_info');
					const student_id = JSON.parse(value).id;
					const user_name = JSON.parse(value).user_name;
					this.rateData.student_id = student_id;
					this.rateData.user_name = user_name;
					const formData = this.rateData;
					formData.task_id = this.task_id;
					formData.task_name = this.taskData.name;
					formData.teacher_id = this.taskData.teacher_id;
					formData.teacher_name = this.taskData.teacher_name;
					formData.time = this.taskData.time;
					console.log(formData);
					uni.request({
						url: 'http://127.0.0.1/index.php/access/index',
						method: 'GET',
						data: formData,
						success: res => {
							console.log(res.data);
							if (res.data == 1) {
								uni.showToast({
									title: "提交成功",
									icon: "success",
									duration: 1000
								});
								this.arrData.push(this.taskData);

								this.display = !this.display;
								this.isAccess = !this.isAccess;
								uni.reLaunch({
									url:"/pages/practicePage/myAccess/myAccess"
								})
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	.assessContainer {
		width: 100%;
		margin-top: 20px;
	}

	.controlItem {
		width: 300px;
		margin-left: 30px;
	}

	.twoParts {
		width: 100%;
	}

	.rightContainer {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.allAssess {
		display: flex;
		flex-wrap: wrap;
	}

	.popupContainer {
		position: relative;
		z-index: 1000;
	}

	.rateContainer {
		margin: 20px;
		padding-bottom: 30px;
	}

	.easyInput {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 140px;
	}

	.submitBtn {
		display: flex;
		justify-content: center;
	}
</style>
