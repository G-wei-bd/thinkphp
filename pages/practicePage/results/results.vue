<template>
	<view>
		<view class="assessContainer">
			<view class="twoParts" v-if="isDisplay">
				<uni-card title="我的实习评价">
					<uni-list>
						<uni-list-item title="参与计划" rightText="18实习"></uni-list-item>
						<uni-list-item title="参与时间" rightText="2021.09.01 ~ 2022.01.31"></uni-list-item>
						<uni-list-item title="指导老师" rightText="不知道"></uni-list-item>
						<uni-list-item title="是否提交" note="未提交">
							<view slot="footer">
								<button class="btn btn-danger btn-sm" @click="switchDisplay">提交成绩鉴定</button>
							</view>
						</uni-list-item>
					</uni-list>
				</uni-card>
			</view>
			<view class="submitContainer" v-else>
				<view class="sub">
					<button class="btn btn-danger" @click="switchDisplay">返回</button>
				</view>
				<view class="formContainer">
					<uni-forms ref="assessForm" :rules="rules" :modelValue="formData">
						<view class="allForm">
							<uni-group title="自我小结" mode="card">
								<uni-forms-item label="自我小结" name="myselfAssess" required>
									<view class="easyInput">
										<uni-easyinput style="width: 250px;" type="textarea" autoHeight
											v-model="formData.myselfAssess" />
										<text class="text-primary">主要内容：
											1、本次实习主要工作内容；2、自己在本次实习过程中的成长、收获与不足；3、对下一步专业知识学习的计划；4、对学校实践教学的建议；5、对实习单位的建议等。
											要求：20-100字'</text>
									</view>
								</uni-forms-item>
							</uni-group>
							<uni-group title="企业鉴定" mode="card">
								<uni-forms-item label="实习单位鉴定" name="companyAssess" required>
									<view class="easyInput">
										<uni-easyinput style="width: 250px;" type="textarea" autoHeight
											v-model="formData.companyAssess" />
										<text></text>
									</view>
								</uni-forms-item>
							</uni-group>
							<uni-group title="指导老师鉴定" mode="card">
								<uni-forms-item label="指导老师评语" name="teacherAssess" required>
									<view class="easyInput">
										<uni-easyinput style="width: 250px;" type="textarea" autoHeight
											v-model="formData.teacherAssess" />
										<text></text>
									</view>
								</uni-forms-item>
								<uni-forms-item label="指导老师评分" name="teacherRate" required>
									<uni-rate v-model="formData.teacherRate"></uni-rate>
								</uni-forms-item>
							</uni-group>
						</view>
					</uni-forms>
				</view>
				<view class="submitBtn">
					<button class="btn btn-danger btn-outline-danger" @click="submitAssess">提交评价</button>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDisplay: false,
				formData: {
					myselfAssess: '',
					companyAssess: '',
					teacherAssess: '',
					teacherRate: ''
				},
				rules: {
					myselfAssess: {
						rules: [{
							required: true,
							errorMessage: "请填写自我鉴定"
						}]
					},
					companyAssess: {
						rules: [{
							required: true,
							errorMessage: "请填写企业鉴定"
						}]
					},
					teacherAssess: {
						rules: [{
							required: true,
							errorMessage: "请填写指导老师鉴定"
						}]
					},
					teacherRate: {
						rules: [{
							required: true,
							errorMessage: "请选择评价等级"
						}]
					}
				},
			}
		},
		methods: {
			switchDisplay() {
				this.isDisplay = !this.isDisplay;
			},
			submitAssess(e){
				this.$refs.assessForm.validate().then((res) => {
					console.log(e);
					console.log(this.formData);
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	.assessContainer {
		display: flex;
	}

	.twoParts {
		width: 100%;
	}

	.rightContainer {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.submitContainer {
		width: 100%;
		margin:14px 0 0 14px;
		padding-bottom: 30px;
	}
	
	.submitBtn{
		display: flex;
		justify-content: center;
	}
</style>
