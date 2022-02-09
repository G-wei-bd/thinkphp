<template>
	<view>
		<view class="addResInfo">
			<button class="btn btn-danger btn-outline-danger" @click="openPopup">+ 添加学籍</button>
			<uni-popup ref="popup" type="center">
				<view class="addInfo">
					<uni-forms ref="form" :modelValue="formData" :rules="rules">
						<uni-forms-item required label="学习时间" name="time">
							<uni-datetime-picker v-model="formData.time" type="daterange" :clearIcon="false"
								start="1990-01-01" end="2099-12-31" rangeSeparator="~" />
						</uni-forms-item>
						<uni-forms-item required label="入学年份" name="intoTime">
							<uni-datetime-picker type="date" :clearIcon="false" v-model="formData.intoTime" />
						</uni-forms-item>
						<uni-forms-item required label="学校" name="university">
							<uni-easyinput v-model="formData.university" trim="all" placeholder="请输入学校名称" />
						</uni-forms-item>
						<uni-forms-item required label="院系" name="collage">
							<uni-easyinput v-model="formData.collage" trim="all" placeholder="请输入院系名称" />
						</uni-forms-item>
						<uni-forms-item required label="专业" name="major">
							<uni-easyinput v-model="formData.major" trim="all" placeholder="请输入专业名称" />
						</uni-forms-item>
						<uni-forms-item required label="班级" name="majorClass">
							<uni-easyinput v-model="formData.majorClass" trim="all" placeholder="请输入班级" />
						</uni-forms-item>
					</uni-forms>
					<view class="submitBtn">
						<button class="btn btn-info" @click="submit">提交</button>
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="resCard">
			<uni-card title="学籍信息">
				<uni-table stripe emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center">序号</uni-th>
						<uni-th align="center">学习时间</uni-th>
						<uni-th align="center">学校</uni-th>
						<uni-th align="center">院系</uni-th>
						<uni-th align="center">专业</uni-th>
						<uni-th align="center">班级</uni-th>
						<uni-th align="center">入学时间</uni-th>
						<uni-th align="center">审核状态</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in Arr" :key="index">
						<uni-td align="center">{{index + 1}}</uni-td>
						<uni-td align="center">{{item.time[0]}} ~ {{item.time[1]}}</uni-td>
						<uni-td align="center">{{item.university}}</uni-td>
						<uni-td align="center">{{item.collage}}</uni-td>
						<uni-td align="center">{{item.major}}</uni-td>
						<uni-td align="center">{{item.majorClass}}</uni-td>
						<uni-td align="center">{{item.intoTime}}</uni-td>
						<uni-td align="center">
							<text class="text-danger font-weight-bold">已通过</text>
						</uni-td>
					</uni-tr>
				</uni-table>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					time: '',
					university: '',
					collage: '',
					major: '',
					majorClass: '',
					intoTime: ''
				},
				rules: {
					time: {
						rules: [{
							required: true,
							errorMessage: "请选择学习时间"
						}, ]
					},
					intoTime: {
						rules: [{
							required: true,
							errorMessage: "请选择入学时间"
						}, ]
					},
					university: {
						rules: [{
							required: true,
							errorMessage: "请填写学校"
						}, ]
					},
					collage: {
						rules: [{
							required: true,
							errorMessage: "请填写院系"
						}, ]
					},
					major: {
						rules: [{
							required: true,
							errorMessage: "请填写专业"
						}, ]
					},
					majorClass: {
						rules: [{
							required: true,
							errorMessage: "请填写所在班级"
						}, ]
					}

				},
				Arr: [{
					time: ["2017-09-1", "2021-6-30"],
					university: "广东工业大学华立学院",
					collage: "计算机与信息工程学院",
					major: "网络工程",
					majorClass: "18网络1班",
					intoTime: "2018-09-1"
				}]
			}
		},
		methods: {
			openPopup: function() {
				this.$refs.popup.open();
			},
			submit: function() {
				this.$refs.form.validate().then((res) => {
					this.formData.university = res.university;
					this.formData.collage = res.collage;
					this.formData.major = res.major;
					this.formData.majorClass = res.majorClass;
					this.formData.time = res.time;
					this.formData.intoTime = res.intoTime;
					this.Arr.push(this.formData);
					this.formData = {};
					this.$refs.popup.close();
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.addInfo {
		width: 600px;
		height: 100%;
		background-color: #FFF;
		border-radius: 5px;
		padding: 20px 100px;
	}

	.addResInfo {
		margin: 20px 40px;
		display: flex;
		justify-content: flex-end;
	}

	.submitBtn {
		width: 100px;
		margin: 0 auto;
	}
</style>
