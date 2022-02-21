<template>
	<view>
		<view class="applyContainer" v-if="submit" :style="isCommitList ? '' : 'display: none;' ">
			<uni-card :title="titleName">
				<uni-list>
					<uni-list-item title="实习时间" :note="practiceTime"></uni-list-item>
					<uni-list-item title="提交岗位时间" :note="applyTime"></uni-list-item>
					<uni-list-item title="是否提交岗位" :note="isHandler[handleValue]">
						<view slot="footer">
							<button v-if="isDisabled" class="btn btn-danger btn-sm" @click="isSubmit">提交岗位</button>
							<button v-else class="btn btn-primary" v-show="isCommitList" @click="commitListDisplay">查看实习信息</button>
						</view>
					</uni-list-item>
				</uni-list>
			</uni-card>
		</view>
		<view class="commitContainer" v-else>
			<uni-popup ref="popupSuccess" type="message">
				<uni-popup-message type="success" message="提交成功" :duration="2000"></uni-popup-message>
			</uni-popup>
			<view class="goBack">
				<button class="btn btn-danger" @click="isSubmit">返回</button>
			</view>
			<view class="text-center">
				<text class="text-danger font-weight-bold">请添加实习单位信息</text>
			</view>
			<uni-forms ref="form" :modelValue="commitData" :rules="rules">
				<view class="formContainer">
					<uni-forms-item style="margin-left: 14px;" label="实习单位名称" name="companyName" required>
						<uni-easyinput class="input" v-model="commitData.companyName" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习岗位名称" name="postName" required>
						<uni-easyinput class="input" v-model="commitData.postName" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="行业方向" name="trade" required>
						<uni-easyinput class="input" v-model="commitData.trade" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习单位联系人" name="contact" required>
						<uni-easyinput class="input" v-model="commitData.contact" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习单位电话" name="companyNumber" required>
						<uni-easyinput class="input" v-model="commitData.companyNumber" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习单位邮箱" name="companyEmail" required>
						<uni-easyinput class="input" v-model="commitData.companyEmail" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习单位导师" name="companyTeacher" required>
						<uni-easyinput class="input" v-model="commitData.companyTeacher" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="导师手机号" name="teacherNumber" required>
						<uni-easyinput class="input" v-model="commitData.teacherNumber" type="number" trim="all"
							maxlength="11" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="薪资" name="salary" required>
						<uni-easyinput class="input" v-model="commitData.salary" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习时间" name="practiceTime" required>
						<uni-datetime-picker style="width: 250px;" type="daterange" :clearIcon="false"
							v-model="commitData.practiceTime" rangeSeparator="至"
							@change="binddata('practiceTime',$event,'form')" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习所在地区" name="practiceCity" required>
						<view>
							<picker mode="multiSelector" :range="range" :value="value" v-model="commitData.practiceCity"
								@columnchange="columnchange"
								@change="binddata('practiceCity',$event.detail.value,'form')">
								<view class="picker">{{this.range[0][value[0]]}} {{this.range[1][value[1]]}}
								</view>
							</picker>
						</view>
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="工作内容" name="workContent" required>
						<uni-easyinput trim="all" type="textarea" autoHeight style="width: 220px;" class="input"
							v-model="commitData.workContent" />
					</uni-forms-item>
				</view>
			</uni-forms>
			<view class="commit">
				<button class="btn btn-danger commitBtn" @click="commit">提交</button>
			</view>
		</view>
		<view class="practiceList" v-show="!isCommitList">
			<view class="goBack">
				<button class="btn btn-danger" @click="commitListDisplay">返回</button>
			</view>
			<uni-card title="实习信息详情">
				<uni-list v-for="(item, index) in listData" :key="index">
					<uni-list-item title="实习单位名称">
						<view slot="footer">
							<text class="text-primary">{{item.companyName}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="实习岗位名称">
						<view slot="footer">
							<text class="text-primary">{{item.postName}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="行业方向">
						<view slot="footer">
							<text class="text-primary">{{item.trade}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="实习单位联系人">
						<view slot="footer">
							<text class="text-primary">{{item.contact}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="实习单位电话">
						<view slot="footer">
							<text class="text-primary">{{item.companyNumber}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="实习单位邮箱">
						<view slot="footer">
							<text class="text-primary">{{item.companyEmail}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="实习单位导师">
						<view slot="footer">
							<text class="text-primary">{{item.companyTeacher}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="导师手机号">
						<view slot="footer">
							<text class="text-primary">{{item.teacherNumber}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="薪资">
						<view slot="footer">
							<text class="text-primary">{{item.salary}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="实习时间">
						<view slot="footer">
							<text class="text-primary">{{item.practiceTime[0]}} - {{item.practiceTime[1]}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="实习所在地区">
						<view slot="footer">
							<text class="text-primary">{{item.practiceCity}}</text>
						</view>
					</uni-list-item>
					<uni-list-item title="工作内容">
						<view slot="footer">
							<text class="text-primary">{{item.workContent}}</text>
						</view>
					</uni-list-item>
				</uni-list>
			</uni-card>
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
				isDisabled: true,
				isCommitList: true,
				titleName: "18毕业实习",
				practiceTime: "2021-08-31 - 2022-01-30",
				applyTime: "2021-08-01 - 2021-10-01",
				isHandler: ['未提交', '已提交'],
				handleValue: 0,
				submit: true,
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
				listData: [],
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
			commit(e) {
				this.$refs.form.validate().then((res) => {
					console.log(this.commitData);
					this.handleValue = 1;
					this.$refs.popupSuccess.open();
					this.submit = !this.submit;
					this.isDisabled = !this.isDisabled;
					this.listData.push(this.commitData);
				}).catch((err) => {
					console.log(err)
				})
			},
			commitListDisplay(){
				this.isCommitList = !this.isCommitList;
			}
		}
	}
</script>

<style>
	.picker {
		width: 180px;
		height: 38px;
		padding-left: 12px;
		border: rgb(229, 229, 229) 1px solid;
		border-radius: 4px;
		font-size: 13px;
		color: #000;
		line-height: 38px;
		text-align: left;
	}

	.formContainer {
		margin: 20px 0 0 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.commitContainer {
		width: 100%;
	}

	.input {
		width: 180px;
	}

	.commit {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 30px;
	}

	.commitBtn {
		width: 200px;
	}
</style>
