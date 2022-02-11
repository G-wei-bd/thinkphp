<template>
	<view>
		<view class="resume">
			<uni-collapse>
				<uni-collapse-item title="求职意向" open>
					<view class="firstForm">
						<uni-forms ref="firstForm" :rules="rules">
							<view class="firForm">
								<uni-forms-item label="期望岗位" name="post">
									<uni-easyinput trim="all" v-model="firstFormData.post" style="width: 170px;"
										:styles="styles" placeholder="请输入期待岗位"
										placeholderStyle="color: #000;font-weight: 500;font-size: 13px" />
								</uni-forms-item>
								<uni-forms-item label="期望城市" name="city">
									<view class="combox">
										<picker id="picker" mode="multiSelector" :range="range" :value="value"
											@columnchange="columnchange">
											<view class="picker">{{this.range[0][value[0]]}} {{this.range[1][value[1]]}}
											</view>
										</picker>
									</view>
								</uni-forms-item>
								<uni-forms-item label="期望薪资" name="salary">
									<view class="combox">
										<picker mode="selector" :range="items" :value="itemsIndex" @change="salary">
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
				rules: {
					post: {
						rules: [{
							required: true,
							errorMessage: "请选择期望岗位"
						}]
					}
				},
				styles: {
					color: '#000'
				},
				// 存放省市文字数据的位置, range[0] 是所有省文字数据，this.range[1] 省下所有地级市的文字数据
				range: [['请选择期望城市'],[]],
				provinceCodes: [],
				cityCodes: [],
				// 省市的索引存放位置
				value: [0, 0],
				index1: '',
				index2:'',
				items: ["请选择期望薪资", "2k以下", "2k-3k", "3k-4k", "4k-5k", "5k-6k", "6k-7k", "7k以上"],
				itemsIndex: 0,
				pickerTime: ["请选择实习时间", "1-3个月", "3-6个月", "6-9个月", "9个月以上"],
				timeIndex: 0,
				arriveTime: ["请选择到岗时间", "随时", "一周以内", "一个月以内", "1-3个月", "三个月以后"],
				arriveIndex: 0
			}
		},
		onLoad: function() {
			// 导入各省的数据
			for (let provinceCode in area.province_list) {
				this.range[0].push(area.province_list[provinceCode])
				
				this.provinceCodes.push(provinceCode)
			}
		},
		methods: {
			submit: function() {
				this.$refs.firstForm.validate().then((res) => {
					this.firstFormData.post = res.post;
					console.log(this.firstFormData);
					if (this.firstFormData.salary == "" || this.firstFormData.time == "" || this.firstFormData
						.arriveTime == "") {
						console.log("未选择全");
					} else {
						console.log("成功");
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			columnchange: function(e) {
				this.value[e.detail.column] = e.detail.value
				// 这是省的滚动列表,用来表示省的滚动判断，并动态加载省各地级市的数据
				if (0 == e.detail.column) {
					let provinceCode = this.provinceCodes[e.detail.value - 1]
					this.range[1] = []
					let cities = []
					this.cityCodes = []
					// 利用 for 循环查找属于本省的地级市的行政代码并加载到数组中进行展示
					for (let cityCode in area.city_list) {
						if (Number(cityCode) >= Number(provinceCode) && Number(cityCode) <= Number(provinceCode) +
							9900) {
							cities.push(area.city_list[cityCode])
							this.cityCodes.push(cityCode)
						}
					}
					
					this.range[1] = cities
					// 这是将数据索引剪切到 value 数组中，进行展示
					this.value.splice(1, 1)
					this.value.splice(2, 1, 0)
				}
				
				// 这是地级市的滚动列表，用来表示市的滚动判断
				else if (1 == e.detail.column) {
					let cityCode = this.cityCodes[e.detail.value - 1]
					// 这是将数据索引剪切到 value 数组中，进行展示
			  this.value.splice(2, 1)
				}
				console.log("this.value是：======"+this.value);
				console.log(this.value[0]);
				console.log(this.value[1]);
				// console.log(this.range[this.value[0]][this.value[1]]);
			},
			salary(e) {
				this.itemsIndex = e.target.value;
				this.firstFormData.salary = this.items[e.target.value];
				if (e.target.value == "0") {
					this.firstFormData.salary = ""
				}
			},
			time(e) {
				this.timeIndex = e.target.value;
				this.firstFormData.time = this.pickerTime[e.target.value];
				if (e.target.value == "0") {
					this.firstFormData.time = ""
				}
			},
			arrive(e) {
				this.arriveIndex = e.target.value;
				this.firstFormData.arriveTime = this.arriveTime[e.target.value];
				if (e.target.value == "0") {
					this.firstFormData.arriveTime = ""
				}
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
