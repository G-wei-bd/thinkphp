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
			<uni-forms ref="form" :modelValue="commitData" :rules="rules">
				<view class="formContainer">
					<uni-forms-item label="实习单位名称" name="companyName" required>
						<uni-easyinput  v-model="commitData.companyName" />
					</uni-forms-item>
					<uni-forms-item label="实习岗位名称" name="postName" required>
						<uni-easyinput  v-model="commitData.postName" />
					</uni-forms-item>
					<uni-forms-item label="行业方向" name="trade" required>
						<uni-easyinput  v-model="commitData.trade" />
					</uni-forms-item>
					<uni-forms-item label="实习单位联系人" name="contact" required>
						<uni-easyinput  v-model="commitData.contact" />
					</uni-forms-item>
					<uni-forms-item label="实习单位电话" name="companyNumber" required>
						<uni-easyinput  v-model="commitData.companyNumber" />
					</uni-forms-item>
					<uni-forms-item label="实习单位邮箱" name="companyEmail" required>
						<uni-easyinput  v-model="commitData.companyEmail" />
					</uni-forms-item>
					<uni-forms-item label="实习单位导师" name="companyTeacher" required>
						<uni-easyinput  v-model="commitData.companyTeacher" />
					</uni-forms-item>
					<uni-forms-item label="导师手机号" name="teacherNumber" required>
						<uni-easyinput  v-model="commitData.teacherNumber" />
					</uni-forms-item>
					<uni-forms-item label="薪资" name="salary" required>
						<uni-easyinput  v-model="commitData.salary" />
					</uni-forms-item>
					<uni-forms-item label="实习时间" name="practiceTime" required>
						
					</uni-forms-item>
					<uni-forms-item label="实习所在地区" name="practiceCity" required>
						<view>
							<picker mode="multiSelector" :range="range" :value="value"
								v-model="commitData.practiceCity" @columnchange="columnchange"
								@change="binddata('practiceCity',$event.detail.value,'form')">
								<view class="picker">{{this.range[0][value[0]]}} {{this.range[1][value[1]]}}
								</view>
							</picker>
						</view>
					</uni-forms-item>
					<uni-forms-item label="工作内容" name="workContent" required>
						<uni-easyinput  v-model="commitData.workContent" />
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
	import { area } from './area.js'
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
				},
				range: [
					['请选择期望城市'],
					[]
				],
				provinceCodes: [],
				cityCodes: [],
				value: [0, 0],
			}
		},
		onLoad() {
			this.rules = area.rules;
			for (let provinceCode in area.province_list) {
				this.range[0].push(area.province_list[provinceCode])
				this.provinceCodes.push(provinceCode)
			}
		},
		methods: {
			isSubmit() {
				this.submit = !this.submit;
			},
			columnchange: function(e) {
				this.value[e.detail.column] = e.detail.value;
				// 这是省的滚动列表,用来表示省的滚动判断，并动态加载省各地级市的数据
				if (0 == e.detail.column) {
					let provinceCode = this.provinceCodes[e.detail.value - 1];
					this.range[1] = [];
					let cities = [];
					this.cityCodes = [];
					// 利用 for 循环查找属于本省的地级市的行政代码并加载到数组中进行展示
					for (let cityCode in area.city_list) {
						if (Number(cityCode) >= Number(provinceCode) && Number(cityCode) <= Number(provinceCode) +
							9900) {
							cities.push(area.city_list[cityCode]);
							this.cityCodes.push(cityCode);
						}
					}
					this.range[1] = cities;
					// 这是将数据索引剪切到 value 数组中，进行展示
					this.value.splice(1, 1);
					this.value.splice(2, 1, 0);
				}
			
				// 这是地级市的滚动列表，用来表示市的滚动判断
				else if (1 == e.detail.column) {
					let cityCode = this.cityCodes[e.detail.value - 1];
					// 这是将数据索引剪切到 value 数组中，进行展示
					this.value.splice(2, 1);
				}
				// 提交数据到 this.firstFormData 中
				if (this.value[0] == 0) {
					this.commitData.practiceCity = '';
				}
				if (!this.range[1][this.value[1]]) {
					this.range[1][this.value[1]] = '';
				}
				this.commitData.practiceCity = this.range[0][this.value[0]] + this.range[1][this.value[1]];
				console.log(this.commitData.practiceCity);
			},
		}
	}
</script>

<style>
	.picker {
		width: 170px;
		height: 36px;
		padding-left: 12px;
		border: rgb(229, 229, 229) 1px solid;
		border-radius: 4px;
		font-size: 13px;
		color: #000;
		line-height: 36px;
		text-align: left;
	}
</style>
