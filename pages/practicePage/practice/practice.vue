<template>
	<view>
		<view class="applyContainer" v-if="submit">
			<uni-card :title="titleName">
				<uni-list>
					<uni-list-item title="实习时间" :note="practiceTime"></uni-list-item>
					<uni-list-item title="提交岗位时间" :note="applyTime"></uni-list-item>
					<uni-list-item title="是否提交岗位" :note="isHandler[0]">
						<view slot="footer">
							<button class="btn btn-danger btn-sm" @click="isSubmit">提交岗位</button>
						</view>
					</uni-list-item>
				</uni-list>
			</uni-card>
		</view>
		<view class="commitContainer" v-else>
			<view class="goBack">
				<button class="btn btn-danger">返回</button>
			</view>
			<uni-forms ref="form" :rules="rules">
				<view class="formContainer">
					<uni-forms-item label="实习单位名称" name="companyName" required>
						
					</uni-forms-item>
					<uni-forms-item label="实习岗位名称" name="postName" required>

					</uni-forms-item>
					<uni-forms-item label="行业方向" name="trade" required>

					</uni-forms-item>
					<uni-forms-item label="实习单位联系人" name="contact" required>

					</uni-forms-item>
					<uni-forms-item label="实习单位电话" name="companyNumber" required>

					</uni-forms-item>
					<uni-forms-item label="实习单位邮箱" name="companyEmail" required>

					</uni-forms-item>
					<uni-forms-item label="实习单位导师" name="companyTeacher" required>

					</uni-forms-item>
					<uni-forms-item label="导师手机号" name="teacherNumber" required>

					</uni-forms-item>
					<uni-forms-item label="薪资" name="salary" required>

					</uni-forms-item>
					<uni-forms-item label="实习时间" name="practiceTime" required>

					</uni-forms-item>
					<uni-forms-item label="实习所在地区" name="practiceCity" required>

					</uni-forms-item>
					<uni-forms-item label="工作地点" name="workContent" required>

					</uni-forms-item>
				</view>
			</uni-forms>
			<view class="commit">
				<button class="btn btn-danger">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleName: "18毕业实习",
				practiceTime: "2021-08-31 - 2022-01-30",
				applyTime: "2021-08-01 - 2021-10-01",
				isHandler: ['未提交', '已提交'],
				submit: false,
				commitData: {
					companyName: '',
					postName: '',
					trade: '',
					contact: '',
					companyNumber: '',
					companyEmail: '',
					companyTeacher: '',
					teacherNumber: '',
					salary: '',
					practiceTime: '',
					practiceCity: '',
					workContent: ''
					
				}
			}
		},
		methods: {
			isSubmit() {
				this.submit = !this.submit;
			}
		}
	}
</script>

<style>

</style>
