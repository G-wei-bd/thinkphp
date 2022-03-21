<template>
	<view>
		<view class="applyContainer" v-if="submit" :style="isCommitList ? '' : 'display: none;' ">
			<uni-card :title="taskData.name">
				<uni-list>
					<uni-list-item title="实习时间" :note="taskData.time"></uni-list-item>
					<uni-list-item title="指导老师" :note="taskData.teacher_name"></uni-list-item>
					<uni-list-item title="是否提交岗位" :note="isHandler[handleValue]">
						<view slot="footer">
							<button v-if="taskData.task_id == last_task_id" class="btn btn-primary" v-show="isCommitList"
								@click="commitListDisplay">查看实习信息</button>
							<button v-else class="btn btn-danger btn-sm" @click="isSubmit(taskData.task_id)">提交岗位</button>
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
					<uni-forms-item style="margin-left: 14px;" label="实习单位名称" name="company_name" required>
						<uni-easyinput class="input" v-model="commitData.company_name" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习岗位名称" name="post_name" required>
						<uni-easyinput class="input" v-model="commitData.post_name" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="行业方向" name="trade" required>
						<uni-easyinput class="input" v-model="commitData.trade" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习单位联系人" name="contact" required>
						<uni-easyinput class="input" v-model="commitData.contact" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习单位电话" name="company_number" required>
						<uni-easyinput class="input" v-model="commitData.company_number" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习单位邮箱" name="company_email" required>
						<uni-easyinput class="input" v-model="commitData.company_email" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习单位导师" name="company_teacher" required>
						<uni-easyinput class="input" v-model="commitData.company_teacher" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="导师手机号" name="teacher_number" required>
						<uni-easyinput class="input" v-model="commitData.teacher_number" type="number" trim="all"
							maxlength="11" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="薪资" name="salary" required>
						<uni-easyinput class="input" v-model="commitData.salary" trim="all" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习时间" name="practice_time" required>
						<uni-datetime-picker style="width: 250px;" type="daterange" :clearIcon="false"
							v-model="commitData.practice_time" rangeSeparator="至"
							@change="binddata('practiceTime',$event,'form')" />
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="实习所在地区" name="practice_city" required>
						<view>
							<picker mode="multiSelector" :range="range" :value="value"
								v-model="commitData.practice_city" @columnchange="columnchange"
								@change="binddata('practiceCity',$event.detail.value,'form')">
								<view class="picker">{{this.range[0][value[0]]}} {{this.range[1][value[1]]}}
								</view>
							</picker>
						</view>
					</uni-forms-item>
					<uni-forms-item style="margin-left: 14px;" label="工作内容" name="work_content" required>
						<uni-easyinput trim="all" type="textarea" autoHeight style="width: 220px;" class="input"
							v-model="commitData.work_content" />
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
			<view>
				<uni-card class="mb-5 dataList" title="实习信息详情" v-for="(item, index) in listData" :key="index">
					<uni-list>
						<uni-list-item title="实习单位名称">
							<view slot="footer">
								<text class="text-primary">{{item.company_name}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习岗位名称">
							<view slot="footer">
								<text class="text-primary">{{item.post_name}}</text>
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
								<text class="text-primary">{{item.company_number}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习单位邮箱">
							<view slot="footer">
								<text class="text-primary">{{item.company_email}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习单位导师">
							<view slot="footer">
								<text class="text-primary">{{item.company_teacher}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="导师手机号">
							<view slot="footer">
								<text class="text-primary">{{item.teacher_number}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="薪资">
							<view slot="footer">
								<text class="text-primary">{{item.salary}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习时间">
							<view slot="footer">
								<text class="text-primary">{{item.practice_time}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="实习所在地区">
							<view slot="footer">
								<text class="text-primary">{{item.practice_city}}</text>
							</view>
						</uni-list-item>
						<uni-list-item title="工作内容">
							<view slot="footer">
								<text class="text-primary">{{item.work_content}}</text>
							</view>
						</uni-list-item>
					</uni-list>
				</uni-card>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		area
	} from './area.js'
	import {
		mapState //读取数据
	} from 'vuex'
	export default {
		data() {
			return {
				stu_id: '',
				task_id: '',
				last_task_id: '',
				isDisabled: true,
				isCommitList: true,
				taskData: '',
				isHandler: ['未提交', '已提交'],
				handleValue: 0,
				submit: true,
				commitData: {
					company_name: '',
					post_name: '',
					trade: '',
					contact: '',
					company_number: '',
					company_email: '',
					company_teacher: '',
					teacher_number: '',
					salary: '',
					practice_time: '',
					practice_city: '',
					work_content: ''
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
			const value = uni.getStorageSync('user_info');
			this.stu_id = JSON.parse(value).id;
			const id = this.stu_id;
			uni.request({
				url: 'http://127.0.0.1/index.php/practice/search',
				method: 'GET',
				data: {id},
				success: (res) => {
					if (res.data) {
						this.listData = res.data;
						if(this.data != []){
							this.handleValue = 1;
						}
						console.log(this.listData);
						this.last_task_id = this.listData.slice(-1)[0].task_id;
						this.isDisabled = !this.isDisabled;
					}
				},
				fail: (res) => {
					console.log(res);
				},
				complete: () => {}
			});
			uni.request({
				url: 'http://127.0.0.1/index.php/practice/plan',
				method: 'GET',
				data: {id},
				success: res => {
					this.taskData = res.data;
					console.log(res.data);
				},
				fail: () => {},
				complete: () => {}
			});
		},	
		methods: {
			isSubmit(e) {
				this.commitData.task_id = e;
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
					this.commitData.practice_city = '';
				}
				if (!this.range[1][this.value[1]]) {
					this.range[1][this.value[1]] = '';
				}
				this.commitData.practice_city = this.range[0][this.value[0]] + this.range[1][this.value[1]];
			},
			commit(e) {
				this.$refs.form.validate().then((res) => {
					const value = uni.getStorageSync('user_info');
					this.commitData.student_id = JSON.parse(value).id;
					uni.request({
						url: 'http://127.0.0.1/index.php/practice/index',
						method: 'GET',
						data: this.commitData,
						success: res => {
							if (res.data == 1) {
								this.handleValue = 1;
								this.$refs.popupSuccess.open();
								this.submit = !this.submit;
								this.isDisabled = !this.isDisabled;
								uni.reLaunch({
									url:'/pages/practicePage/practice/practice'
								})
							}
						},
						fail: () => {
							console.log('发送失败');
						},
						complete: () => {}
					});

				}).catch((err) => {
					console.log(err)
				})
			},
			commitListDisplay() {
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
	
	.dataList{
		width: 500px;
	}
</style>
