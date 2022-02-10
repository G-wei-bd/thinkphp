<template>
	<view>
		<view class="resume">
			<uni-collapse>
				<uni-collapse-item title="求职意向">
					<view class="firstForm">
						<uni-forms ref="firstForm" :rules="rules">
							<view class="firForm">
								<uni-forms-item label="期望岗位" name="post">
									<uni-easyinput v-model="firstFormData.post" placeholder="请输入期待岗位"
										placeholderStyle="color: #000;font-weight: bold;" />
								</uni-forms-item>
								<uni-forms-item label="期望城市" name="city">
									<view class="combox">
										<uni-easyinput v-model="firstFormData.city" placeholder="请输入期望城市"
											placeholderStyle="color: #000;font-weight: bold;" />
									</view>
								</uni-forms-item>
								<uni-forms-item label="期望薪资" name="salary">
									<view class="combox">
										<picker mode="selector" :range="items" :value="itemsIndex" @change="salary"
											@click="binddata('salary',$event.detail.value,'firstForm')">
											<view class="picker">{{items[itemsIndex]}}</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="实习时长" name="time">
									<view class="combox">
										<picker mode="selector" :range="pickerTime" :value="timeIndex" @change="time">
											<view class="picker">{{pickerTime[timeIndex]}}</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="到岗时间" name="arriveTime">
									<view class="combox">
										<picker mode="selector" :range="arriveTime" :value="arriveIndex"
											@change="arrive">
											<view class="picker">{{arriveTime[arriveIndex]}}</view>
										</picker>
									</view>
								</uni-forms-item>
							</view>
						</uni-forms>
						<view class="submitBtn">
							<button class="btn btn-info" @click="submit">提交</button>
						</view>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="个人信息">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="教育经历">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="实习经历">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="项目经验">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="个人优势">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="获得荣誉">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="其他">
					<text>折叠内容</text>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstFormData: {
					post: '',
					city: '',
					salary: '',
					time: '',
					arriveTime: ''
				},
				rules: {
					post: {
						rules: [{
							required: true,
							errorMessage: "请选择期望岗位"
						}, ]
					},
					city: {
						rules: [{
							required: true,
							errorMessage: "请选择期望城市"
						}, ]
					},
					salary: {
						rules: [{
							required: true,
							errorMessage: "请填写期望薪资"
						}, ]
					},
					time: {
						rules: [{
							required: true,
							errorMessage: "请填写实习时长"
						}, ]
					},
					arriveTime: {
						rules: [{
							required: true,
							errorMessage: "请填写到岗时间"
						}, ]
					}
				},
				items: ["请选择期望薪资", "2k以下", "2k-3k", "3k-4k", "4k-5k", "5k-6k", "6k-7k", "7k以上"],
				itemsIndex: 0,
				pickerTime: ["请选择实习时间", "1-3个月", "3-6个月", "6-9个月", "9个月以上"],
				timeIndex: 0,
				arriveTime: ["请选择到岗时间", "随时", "一周以内", "一个月以内", "1-3个月", "三个月以后"],
				arriveIndex: 0
			}
		},
		methods: {
			submit: function() {
				this.$refs.firstForm.validate().then((res) => {
					this.firstFormData.post = res.post;
					this.firstFormData.city = res.city;
					this.firstFormData.salary = res.salary;
					this.firstFormData.time = res.time;
					this.firstFormData.arriveTime = res.arriveTime;
					console.log(this.firstFormData);
				}).catch((err) => {
					console.log(err)
				})
			},
			salary(e) {
				this.itemsIndex = e.target.value;
			},
			time(e) {
				this.timeIndex = e.target.value;
			},
			arrive(e) {
				this.arriveIndex = e.target.value;
			}
		}
	}
</script>

<style>
	.resume {
		padding: 10px 50px;
		margin: 10px;
		background-color: #bfa;
	}

	.firstForm {
		height: 220px;
		margin-left: 30px;
		padding-bottom: 20px;
	}

	.firForm {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 50px;
	}

	.picker {
		width: 170px;
		height: 36px;
		padding-left: 14px;
		border: rgb(229, 229, 229) 1px solid;
		border-radius: 4px;
		font-size: 13px;
		color: #000;
		font-weight: bold;
		line-height: 36px;
		text-align: left;
	}

	.submitBtn {
		width: 100px;
		margin: 0 auto;
	}
</style>
