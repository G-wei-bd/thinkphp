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
										@input="binddata('post',$event.detail.value,'firstFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="期望城市" name="city" required>
									<view class="combox">
										<picker mode="multiSelector" :range="range" :value="value"
											v-model="firstFormData.city" @columnchange="columnchange"
											@change="binddata('city',$event.detail.value,'firstFormRef')">
											<view class="picker">{{this.range[0][value[0]]}} {{this.range[1][value[1]]}}
											</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="期望薪资" name="salary" required>
									<view class="combox">
										<picker mode="selector" :range="items" :value="itemsIndex"
											v-model="firstFormData.salary"
											@change="binddata('salary',$event.detail.value,'firstFormRef')">
											<view class="picker">{{items[itemsIndex]}}</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="实习时长" name="time" required>
									<view class="combox">
										<picker mode="selector" :range="pickerTime" :value="timeIndex"
											v-model="firstFormData.time"
											@change="binddata('time',$event.detail.value,'firstFormRef')">
											<view class="picker">{{pickerTime[timeIndex]}}</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="到岗时间" name="arriveTime" required>
									<view class="combox">
										<picker mode="selector" :range="arriveTime" :value="arriveIndex"
											v-model="firstFormData.arriveTime"
											@change="binddata('arriveTime',$event.detail.value,'firstFormRef')">
											<view class="picker">{{arriveTime[arriveIndex]}}</view>
										</picker>
									</view>
								</uni-forms-item>
							</view>
						</uni-forms>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="个人信息">
					<view class="personInfo">
						<uni-forms ref="secondFormRef" :rules="secRules" :modelValue="secondFormData">
							<view class="allForm-Item">
								<uni-forms-item label="姓名" name="userName" required>
									<input class="picker" type="text" placeholder="请输入姓名"
										v-model="secondFormData.userName"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('userName',$event.detail.value,'secondFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="性别" name="gender" required>
									<uni-data-checkbox :value="genderValue" :localdata="genderData" mode="tag"
										v-model="secondFormData.gender" />
								</uni-forms-item>
								<uni-forms-item label="出生日期" name="birth" required>
									<uni-datetime-picker style="width: 170px;" type="date" :clearIcon="false"
										v-model="secondFormData.bitrh" @change="binddata('birth',$event,'secondFormRef')"/>	
								</uni-forms-item>
								<uni-forms-item label="籍贯" name="location" required>
									<view class="combox">
										<picker mode="multiSelector" :range="secondRange" :value="secondValue"
											v-model="secondFormData.location" @columnchange="secondColumnchange"
											@change="binddata('location',$event.detail.value,'secondFormRef')">
											<view class="picker">{{this.secondRange[0][secondValue[0]]}}
												{{this.secondRange[1][secondValue[1]]}}
											</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="最高学历" name="degree" required>
									<view class="combox">
										<picker mode="selector" :range="degreeRange" :value="degreeValue"
											@change="binddata('degree',$event.detail.value,'secondFormRef')"
											v-model="secondFormData.degree">
											<view class="picker">{{degreeRange[degreeValue]}}</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="手机号" name="phoneNumber" required>
									<input class="picker" type="number" maxlength="11" placeholder="请输入手机号"
										v-model="secondFormData.phoneNumber"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('phoneNumber',$event.detail.value,'secondFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="邮箱" name="email" required>
									<input class="picker" type="text" placeholder="请输入邮箱" v-model="secondFormData.email"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('email',$event.detail.value,'secondFormRef')" />
								</uni-forms-item>
							</view>
						</uni-forms>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="教育经历">
					<view class="thirdForm">
						<uni-forms ref="thirdFormRef" :modelValue="thirdFormData" :rules="thirdRules">
							<view class="allForm-Item">
								<uni-forms-item label="院校" name="university" required>
									<input class="picker" type="text" placeholder="请输入学校" v-model="thirdFormData.university"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('university',$event.detail.value,'thirdFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="专业" name="major" required>
									<input class="picker" type="text" placeholder="请输入专业" v-model="thirdFormData.major"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('major',$event.detail.value,'thirdFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="学习时间" name="studyTime" required>
									<uni-datetime-picker type="daterange" :clearIcon="false"
										v-model="thirdFormData.studyTime" rangeSeparator="至" @change="binddata('studyTime',$event,'thirdFormRef')"/>
								</uni-forms-item>
							</view>
						</uni-forms>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="实习经历">
					<view class="forthForm">
						<uni-forms ref="forthFormRef" :modelValue="forthFormData" :rules="forthRules">
							<view class="allForm-Item">
								<uni-forms-item label="公司名称" name="company" required>
									<input class="picker" type="text" placeholder="请输入公司名称" v-model="forthFormData.company"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('company',$event.detail.value,'forthFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="我的职位" name="jobs" required>
									<input class="picker" type="text" placeholder="请输入我的职位" v-model="forthFormData.jobs"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('jobs',$event.detail.value,'forthFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="工作时间" name="workTime" required>
									<uni-datetime-picker type="daterange" :clearIcon="false"
										v-model="forthFormData.workTime" rangeSeparator="至" @change="binddata('workTime',$event,'forthFormRef')"/>
								</uni-forms-item>
								<uni-forms-item label="简介" name="intro" required>
									<textarea class="textareaPicker" maxlength="200" placeholder="请填写简介" v-model="forthFormData.intro"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('intro',$event.detail.value,'forthFormRef')" />
								</uni-forms-item>
							</view>
						</uni-forms>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="项目经验">
					<view class="fifthForm">
						<uni-forms ref="fifthFormRef" :modelValue="fifthFormData" :rules="fifthRules">
							<view class="allForm-Item">
								<uni-forms-item label="项目名称" name="itemName" required>
									<input class="picker" type="text" placeholder="请输入项目名称" v-model="fifthFormData.itemName"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('itemName',$event.detail.value,'fifthFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="担任职位" name="jobs" required>
									<input class="picker" type="text" placeholder="请输入担任职位" v-model="fifthFormData.jobs"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('jobs',$event.detail.value,'fifthFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="项目时间" name="itemTime" required>
									<uni-datetime-picker type="daterange" :clearIcon="false"
										v-model="fifthFormData.itemTime" rangeSeparator="至" @change="binddata('itemTime',$event,'fifthFormRef')"/>
								</uni-forms-item>
								<uni-forms-item label="项目描述" name="intro" required>
									<textarea class="textareaPicker" maxlength="200" placeholder="请填写项目描述" v-model="fifthFormData.intro"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('intro',$event.detail.value,'fifthFormRef')" />
								</uni-forms-item>
								<uni-forms-item label="项目职责" name="duty" required>
									<textarea class="textareaPicker" maxlength="200" placeholder="请填写项目职责" v-model="fifthFormData.duty"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('duty',$event.detail.value,'fifthFormRef')" />
								</uni-forms-item>
							</view>
						</uni-forms>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="个人优势" open>
					<view class="sixthForm">
						<uni-forms ref="sixthFormRef" :modelValue="sixthFormData" :rules="sixthRules">
							<view class="allForm-Item">	
								<uni-forms-item label="个人优势" name="advantage" required>
									<textarea class="textareaPicker" maxlength="200" placeholder="请填写个人优势" v-model="sixthFormData.advantage"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px"
										@input="binddata('advantage',$event.detail.value,'sixthFormRef')" />
								</uni-forms-item>
							</view>
						</uni-forms>
					</view>
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
				thirdFormData: {
					university: '',
					major: '',
					studyTime: ''
				},
				forthFormData: {
					company: '',
					jobs: '',
					workTime: '',
					intro: ''
				},
				fifthFormData: {
					itemName: '',
					jobs: '',
					itemTime: '',
					intro: '',
					duty: ''
				},
				sixthFormData: {
					advantage: ''
				},
				firRules: {},
				secRules: {},
				thirdRules:{},
				forthRules:{},
				fifthRules:{},
				sixthRules:{},
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
			this.thirdRules = area.thirdRules;
			this.forthRules = area.forthRules;
			this.fifthRules = area.fifthRules;
			this.sixthRules = area.sixthRules;
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
			binddata(name, value, form) {
				if (form == 'firstFormRef') {
					this.$refs.firstFormRef.setValue(name, value);
					switch (name) {
						case 'salary':
							if (value == "0") {
								this.firstFormData.salary = ""
							}
							this.itemsIndex = value;
							this.firstFormData.salary = this.items[value];
							break;
						case 'time':
							if (value == "0") {
								this.firstFormData.time = ""
							}
							this.timeIndex = value;
							this.firstFormData.time = this.pickerTime[value];
							break;
						case 'arriveTime':
							if (value == "0") {
								this.firstFormData.arriveTime = ""
							}
							this.arriveIndex = value;
							this.firstFormData.arriveTime = this.arriveTime[value];
							break;
							break;
					}
				}
				if (form == 'secondFormRef') {
					this.$refs.secondFormRef.setValue(name, value);
					if (name == 'degree') {
						this.degreeValue = value;
						this.secondFormData.degree = this.degreeRange[value];
					}
				}
				if(form == 'thirdFormRef'){
					this.$refs.thirdFormRef.setValue(name, value);
				}
				if(form == 'forthFormRef'){
					this.$refs.forthFormRef.setValue(name, value);
				}
				if(form == 'fifthFormRef'){
					this.$refs.fifthFormRef.setValue(name, value);
				}
				if(form == 'sixthFormRef'){
					this.$refs.sixthFormRef.setValue(name, value);
				}

			},
			submit: function(e) {
				console.log(e);
				this.$refs.firstFormRef.validate().then((res) => {
					console.log(this.firstFormData);
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
				this.$refs.thirdFormRef.validate().then((res) => {
					console.log(this.thirdFormData);
				}).catch((err) => {
					console.log(err)
				})
				this.$refs.forthFormRef.validate().then((res) => {
					console.log(this.forthFormData);
				}).catch((err) => {
					console.log(err)
				})
				this.$refs.fifthFormRef.validate().then((res) => {
					console.log(this.fifthFormData);
				}).catch((err) => {
					console.log(err)
				})
				this.$refs.sixthFormRef.validate().then((res) => {
					console.log(this.fifthFormData);
				}).catch((err) => {
					console.log(err)
				})
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
				this.secondFormData.location = this.secondRange[0][this.secondValue[0]] + this.secondRange[1][this
					.secondValue[1]
				];
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
	.textareaPicker {
		width: 270px;
		height: 170px;
		padding-left: 12px;
		border: rgb(229, 229, 229) 1px solid;
		border-radius: 4px;
		font-size: 13px;
		color: #000;
		text-align: left;
	}

	.submitBtn {
		width: 100px;
		margin: 0 auto;
	}
</style>
