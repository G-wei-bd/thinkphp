<template>
	<view>
		<view v-if="display" class="assessContainer">
			<view class="controlItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
					activeColor="#ff0000"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="twoParts">
						<uni-card title="我的实习评价">
							<uni-list>
								<uni-list-item title="参与计划" rightText="18实习"></uni-list-item>
								<uni-list-item title="参与时间" rightText="2021.09.01 ~ 2022.01.31"></uni-list-item>
								<uni-list-item title="指导老师" rightText="不知道"></uni-list-item>
								<uni-list-item title="是否评价" note="未评价">
									<view slot="footer">
										<button class="btn btn-danger btn-sm" @click="toRate">添加评价</button>
									</view>
								</uni-list-item>
							</uni-list>
						</uni-card>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="twoParts">
						<uni-card title="我的实习评价">
							<uni-list>
								<uni-list-item title="参与计划" rightText="18实习"></uni-list-item>
								<uni-list-item title="参与时间" rightText="2021.09.01 ~ 2022.01.31"></uni-list-item>
								<uni-list-item title="指导老师" rightText="不知道"></uni-list-item>
								<uni-list-item title="是否评价" note="已评价">
									<view slot="footer">
										<button disabled class="btn btn-dark btn-sm">已评价</button>
									</view>
								</uni-list-item>
							</uni-list>
						</uni-card>
					</view>
				</view>
				<view v-show="current === 2">
					<view class="allAssess">
						<view v-for="(item, index) in arrData" :key="index">
							<uni-card title="我的实习评价">
								<uni-list>
									<uni-list-item title="参与计划">
										<view slot="footer">
											<text>{{item.name}}</text>
										</view>
									</uni-list-item>
									<uni-list-item title="参与时间">
										<view slot="footer">
											<text>{{item.time}}</text>
										</view>
									</uni-list-item>
									<uni-list-item title="指导老师">
										<view slot="footer">
											<text>{{item.teacher}}</text>
										</view>
									</uni-list-item>
									<uni-list-item title="是否评价">
										<view slot="footer">
											<text class="text-info">{{item.whetherAssess}}</text>
										</view>
									</uni-list-item>
								</uni-list>
							</uni-card>
						</view>
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
						<uni-forms-item label="适应岗位的时间" name="adaptTime">
							<view class="easyInput">
								<uni-easyinput type="number" maxlength="2" v-model="rateData.adaptTime" />
								<text>天</text>
							</view>
						</uni-forms-item>
						<uni-forms-item label="理想的实习时间" name="idealTime">
							<view class="easyInput">
								<uni-easyinput type="number" maxlength="3" v-model="rateData.idealTime" />
								<text>天</text>
							</view>
						</uni-forms-item>
						<uni-forms-item label="岗位胜任情况评价" name="postRate">
							<uni-rate v-model="rateData.postRate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="实习工作量评价" name="workloadRate">
							<uni-rate v-model="rateData.workloadRate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="实习组织满意度" name="organizationRate">
							<uni-rate v-model="rateData.organizationRate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="对本次实践教学的建议" name="suggest">
							<uni-easyinput style="width: 200px;" type="textarea" autoHeight v-model="rateData.suggest" />
						</uni-forms-item>
					</uni-group>
					<uni-group title="指导老师评价" margin-top="0">
						<uni-forms-item label="指导老师满意度" name="teacherRate">
							<uni-rate v-model="rateData.teacherRate"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="对指导老师评价" name="teacherAdvise">
							<uni-easyinput style="width: 200px;" type="textarea" autoHeight v-model="rateData.teacherAdvise" />
						</uni-forms-item>
					</uni-group>
					<uni-group title="对实习单位的评价" margin-top="0">
						<uni-forms-item label="工作环境" name="workCondition">
							<uni-rate v-model="rateData.workCondition"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="工作岗位" name="workPost">
							<uni-rate v-model="rateData.workPost"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="工作指导" name="workGuidance">
							<uni-rate v-model="rateData.workGuidance"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="薪资" name="salary">
							<uni-rate v-model="rateData.salary"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="锻炼价值" name="value">
							<uni-rate v-model="rateData.value"></uni-rate>
						</uni-forms-item>
						<uni-forms-item label="是否留用" name="stay">
							<uni-data-checkbox :value="stayValue" v-model="rateData.stay" mode="default" :localdata="stayData" />
						</uni-forms-item>
					</uni-group>
				</uni-forms>
			</view>
			<view class="submitBtn">
				<button class="submit btn btn-danger btn-outline-danger" @click="submitRate">提交评价</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				display: false,
				current: 0,
				items: [
					"未评价", "已评价", "全部评价"
				],
				arrData: [{
						name: '18实习',
						time: '2022-09-01 ~ 2023-01-01',
						teacher: '第一个老师',
						whetherAssess: '未评价'
					},
					{
						name: '19实习',
						time: '2022-10-01 ~ 2023-01-01',
						teacher: '第二个老师',
						whetherAssess: '已评价'
					},
					{
						name: '20实习',
						time: '2022-11-01 ~ 2023-01-01',
						teacher: '第三个老师',
						whetherAssess: '已评价'
					}
				],
				rateData: {
					adaptTime: '',
					idealTime: '',
					postRate: '',
					workloadRate: '',
					organizationRate: '',
					suggest: '',
					teacherRate: '',
					teacherAdvise: '',
					workCondition: '',
					workPost: '',
					workGuidance: '',
					salary: '',
					value: '',
					stay: ''
				},
				rules: {
					adaptTime: {
						rules: [{
							required: true,
							errorMessage: "请输入时间"
						}]
					},
					idealTime: {
						rules: [{
							required: true,
							errorMessage: "请输入时间"
						}]
					},
					postRate: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					workloadRate: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					organizationRate: {
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
					teacherRate: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					teacherAdvise: {
						rules: [{
							required: true,
							errorMessage: "请填写对指导老师的评价"
						}]
					},
					workCondition: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					workPost: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					},
					workGuidance: {
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
					"value": 0,
					"text": "是"
				}, {
					"value": 1,
					"text": "否"
				}, {
					"value": 2,
					"text": "无意留用"
				}],
			}
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
			submitRate(e){
				this.$refs.form.validate().then((res) => {
					console.log(e);
					console.log(this.rateData);
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
	}

	.easyInput {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 140px;
	}
</style>
