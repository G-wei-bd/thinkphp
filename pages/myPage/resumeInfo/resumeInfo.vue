<template>
	<view>
		<view class="resume">
			<uni-collapse>
				<uni-collapse-item title="求职意向">
					<view class="firstForm">
						<uni-forms ref="firstFormRef" :modelValue="firstFormData" :rules="firRules">
							<view class="allForm-Item">
								<uni-forms-item label="期望岗位" name="post" required>
									<input class="picker" type="text" placeholder="请输入期待岗位" v-model="firstFormData.post"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@blur="postChange" @input="binddata('post',$event.detail.value,'firstFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="期望城市" name="city" required>
									<view class="combox">
										<picker mode="multiSelector" :range="range" :value="value"
											v-model="firstFormData.city" @columnchange="columnchange">
											<view class="picker">{{this.range[0][value[0]]}} {{this.range[1][value[1]]}}
											</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="期望薪资" name="salary" required>
									<view class="combox">
										<picker mode="selector" :range="items" :value="itemsIndex"
											v-model="firstFormData.salary" @change="salaryChange">
											<view class="picker">{{items[itemsIndex]}}</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="实习时长" name="time" required>
									<view class="combox">
										<picker mode="selector" :range="pickerTime" :value="timeIndex"
											v-model="firstFormData.time" @change="timeChange">
											<view class="picker">{{pickerTime[timeIndex]}}</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="到岗时间" name="arriveTime" required>
									<view class="combox">
										<picker mode="selector" :range="arriveTime" :value="arriveIndex"
											v-model="firstFormData.arriveTime" @change="arriveChange">
											<view class="picker">{{arriveTime[arriveIndex]}}</view>
										</picker>
									</view>
								</uni-forms-item>
							</view>
						</uni-forms>
						<!-- <view class="submitBtn">
							<button class="btn btn-info" @click="submit">提交</button>
						</view> -->
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="个人信息" open>
					<view class="personInfo">
						<uni-forms ref="secondFormRef" :rules="secRules">
							<view class="allForm-Item">
								<uni-forms-item label="姓名" name="userName" required>
									<input class="picker" type="text" placeholder="请输入姓名"
										v-model="secondFormData.userName"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px" @input="binddata('userName',$event.detail.value,'secondFormRef')" @blur="userNameChange" />
								</uni-forms-item>
								<uni-forms-item label="性别" name="gender" required>
									<uni-data-checkbox :value="genderValue" :localdata="genderData" mode="tag"
										@change="genderChange" />
								</uni-forms-item>
								<uni-forms-item label="出生日期" name="birth" required>
										<uni-datetime-picker style="width: 170px;" type="date" :clearIcon="false"
											v-model="secondFormData.bitrh" />
								</uni-forms-item>
								<uni-forms-item label="籍贯" name="location" required>
									<view class="combox">
										<picker mode="multiSelector" :range="secondRange" :value="secondValue"
											v-model="secondFormData.location" @columnchange="secondColumnchange">
											<view class="picker">{{this.secondRange[0][secondValue[0]]}}
												{{this.secondRange[1][secondValue[1]]}}
											</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="最高学历" name="degree" required>
									<view class="combox">
										<picker mode="selector" :range="degreeRange" :value="degreeValue" @change="degreeChange"
											v-model="secondFormData.degree">
											<view class="picker">{{degreeRange[degreeValue]}}</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="手机号" name="phoneNumber" required>
									<input class="picker" type="number" maxlength="11" placeholder="请输入手机号"
										v-model="secondFormData.phoneNumber"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px" @input="binddata('phoneNumber',$event.detail.value,'secondFormRef')" @blur="phoneNumberChange" />
								</uni-forms-item>
								<uni-forms-item label="邮箱" name="email">
									<input class="picker" type="text" placeholder="请输入邮箱"
										v-model="secondFormData.email"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px" @blur="emailChange" />
								</uni-forms-item>
							</view>
						</uni-forms>
					</view>
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
			<view class="submitBtn">
				<button class="btn btn-info" @click="submit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		area
	} from './area.js'
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
				secondFormData: {
					userName: '',
					gender: '',
					birth: '',
					location: '',
					degree: '',
					phoneNumber: '',
					email: ''
				},
				firRules: {},
				secRules: {},
				range: [
					['请选择期望城市'],
					[]
				],
				provinceCodes: [],
				cityCodes: [],
				value: [0, 0],
				secondRange: [
					['请选择籍贯'],
					[]
				],
				secondProvinceCodes: [],
				secondCityCodes: [],
				secondValue: [0, 0],
				items: [],
				itemsIndex: 0,
				pickerTime: [],
				timeIndex: 0,
				arriveTime: [],
				arriveIndex: 0,
				genderValue: '',
				genderData: [{
					"value": 1,
					"text": "男"
				}, {
					"value": 0,
					"text": "女"
				}],
				degreeRange: [],
				degreeValue: 0
			}
		},
		onLoad: function() {
			this.firRules = area.firRules;
			this.secRules = area.secRules;
			this.items = area.items;
			this.pickerTime = area.pickerTime;
			this.arriveTime = area.arriveTime;
			this.degreeRange = area.degreeRange;
			// 导入各省的数据
			for (let provinceCode in area.province_list) {
				this.range[0].push(area.province_list[provinceCode])
				this.provinceCodes.push(provinceCode)
			}
			for (let secondProvinceCode in area.province_list) {
				this.secondRange[0].push(area.province_list[secondProvinceCode])
				this.secondProvinceCodes.push(secondProvinceCode)
			}
		},
		methods: {
			submit: function(e) {
				this.$refs.firstFormRef.validate().then((res) => {
					this.firstFormData.post = res.post;
					console.log(this.firstFormData);
					console.log(e);
					if (this.firstFormData.city == "" || this.firstFormData.salary == "" || this.firstFormData
						.time == "" || this.firstFormData.arriveTime == "") {
						console.log("未选择全");
					} else {
						console.log("提交成功");
					}
				}).catch((err) => {
					console.log(err)
				})
				this.$refs.secondFormRef.validate().then((res) => {
					console.log(this.secondFormData);
				}).catch((err) => {
					console.log(err)
				})
			},
			postChange(e) {
				this.firstFormData.post = e.detail.value;
				if (e.detail.value == '') {
					this.firstFormData.post = ''
				}
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
					this.firstFormData.city = '';
				}
				if (!this.range[1][this.value[1]]) {
					this.range[1][this.value[1]] = '';
				}
				this.firstFormData.city = this.range[0][this.value[0]] + this.range[1][this.value[1]];
				console.log(this.firstFormData.city);
			},
			salaryChange(e) {
				this.itemsIndex = e.target.value;
				this.firstFormData.salary = this.items[e.target.value];
				if (e.target.value == "0") {
					this.firstFormData.salary = ""
				}
			},
			timeChange(e) {
				this.timeIndex = e.target.value;
				this.firstFormData.time = this.pickerTime[e.target.value];
				if (e.target.value == "0") {
					this.firstFormData.time = ""
				}
			},
			arriveChange(e) {
				this.arriveIndex = e.target.value;
				this.firstFormData.arriveTime = this.arriveTime[e.target.value];
				if (e.target.value == "0") {
					this.firstFormData.arriveTime = ""
				}
			},
			userNameChange(e){
				this.secondFormData.userName = e.detail.value;
				if(e.detail.value = ''){
					this.secondFormData.userName = '';
				}
			},
			genderChange(e) {
				this.secondFormData.gender = e.detail.value;
			},
			secondColumnchange: function(e) {
				this.secondValue[e.detail.column] = e.detail.value;
				if (0 == e.detail.column) {
					let secondProvinceCode = this.secondProvinceCodes[e.detail.value - 1];
					this.secondRange[1] = [];
					let secondCities = [];
					this.secondCityCodes = [];
					for (let secondCityCode in area.city_list) {
						if (Number(secondCityCode) >= Number(secondProvinceCode) && Number(secondCityCode) <= Number(
								secondProvinceCode) +
							9900) {
							secondCities.push(area.city_list[secondCityCode]);
							this.secondCityCodes.push(secondCityCode);
						}
					}
					this.secondRange[1] = secondCities;
					this.secondValue.splice(1, 1);
					this.secondValue.splice(2, 1, 0);
				} else if (1 == e.detail.column) {
					let secondCityCode = this.secondCityCodes[e.detail.value - 1];
					this.secondValue.splice(2, 1);
				}
				if (this.secondValue[0] == 0) {
					this.secondFormData.location = '';
				}
				if (!this.secondRange[1][this.secondValue[1]]) {
					this.secondRange[1][this.secondValue[1]] = '';
				}
				this.secondFormData.location = this.secondRange[0][this.secondValue[0]] + this.secondRange[1][this.secondValue[1]];
			},
			degreeChange(e){
				this.degreeValue = e.target.value;
				this.secondFormData.degree = this.degreeRange[e.target.value];
				if (e.target.value == "0") {
					this.secondFormData.degree = ""
				}
			},
			phoneNumberChange(e){
				this.secondFormData.phoneNumber = e.detail.value;
				if(e.detail.value = ''){
					this.secondFormData.phoneNumber = '';
				}
			},
			emailChange(e){
				this.secondFormData.email = e.detail.value;
			},
		}
	}
</script>

<style>
	.resume {
		padding: 10px 50px;
		margin: 10px;
		/* background-color: #bfa; */
	}

	.firstForm {
		margin-left: 30px;
		padding-bottom: 10px;
	}

	.allForm-Item {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 50px;
	}

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

	.submitBtn {
		width: 100px;
		margin: 0 auto;
	}
</style>
