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
										<picker id="picker" mode="multiSelector" :range="range" :value="value" @columnchange="columnchange">
										    <view class="picker">{{selected}}</view>
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
	import {area} from './area.js'
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
				selected: '请选择期望城市',
				range: [[''], [''], ['']],
				provinceCodes: [],
				cityCodes: [],
				value: [0,0,0],
				items: ["请选择期望薪资", "2k以下", "2k-3k", "3k-4k", "4k-5k", "5k-6k", "6k-7k", "7k以上"],
				itemsIndex: 0,
				pickerTime: ["请选择实习时间", "1-3个月", "3-6个月", "6-9个月", "9个月以上"],
				timeIndex: 0,
				arriveTime: ["请选择到岗时间", "随时", "一周以内", "一个月以内", "1-3个月", "三个月以后"],
				arriveIndex: 0
			}
		},
		onLoad:function(){
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
			    if (0==e.detail.column) {
			        let provinceCode = this.provinceCodes[e.detail.value-1]
			        this.range[1] = ['']
			        this.range[2] = ['']
			        let cities = ['']
			        this.cityCodes = []
			        for (let cityCode in area.city_list) {
			            if (Number(cityCode)>=Number(provinceCode) && Number(cityCode)<=Number(provinceCode)+9900) {
			                cities.push(area.city_list[cityCode])
			                this.cityCodes.push(cityCode)
			            }
			        }
			        this.range[1] = cities
			        this.value.splice(1, 1, 0)
			        this.value.splice(2, 1, 0)
			    } 
				else if (1==e.detail.column) {
			        this.value[2] = 0
			        let cityCode = this.cityCodes[e.detail.value-1]
			        this.range[2] = ['']
			        let counties = ['']
			        for (let countyCode in area.county_list) {
			            if (Number(countyCode)>=Number(cityCode) && Number(countyCode)<=Number(cityCode)+99) {
			                counties.push(area.county_list[countyCode])
			            }
			        }
			        this.range[2] = counties
			        this.value.splice(2, 1, 0)
			    }
			    this.$forceUpdate()
			    if (this.range[2][this.value[2]]) {
			        this.selected = this.range[2][this.value[2]]
			    } else if(this.range[1][this.value[1]]) {
			        this.selected = this.range[1][this.value[1]]
			    } else if(this.range[0][this.value[0]]) {
			        this.selected = this.range[0][this.value[0]]
			    }
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
