<template>
	<view>
		<view class="addResInfo">
			<button class="btn btn-danger btn-outline-danger" @click="openPopup">更新学籍</button>
			<uni-popup ref="popup" type="center">
				<view class="addInfo">
					<uni-forms ref="form" :modelValue="formData" :rules="rules">
						<uni-forms-item required label="学习时间" name="study_time">
							<uni-datetime-picker v-model="formData.time" type="daterange" :clearIcon="false"
								start="1990-01-01" end="2099-12-31" rangeSeparator="~" />
						</uni-forms-item>
						<uni-forms-item required label="入学年份" name="into_time">
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
						<uni-forms-item required label="班级" name="major_class">
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
						<uni-th align="center">姓名</uni-th>
						<uni-th align="center">学习时间</uni-th>
						<uni-th align="center">学校</uni-th>
						<uni-th align="center">专业</uni-th>
						<uni-th align="center">班级</uni-th>
						<uni-th align="center">入学时间</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in Arr" :key="index">
						<uni-td align="center">{{index + 1}}</uni-td>
						<uni-td align="center">{{item.user_name}}</uni-td>
						<uni-td align="center">{{item.study_time}}</uni-td>
						<uni-td align="center">{{item.university}}</uni-td>
						<uni-td align="center">{{item.major}}</uni-td>
						<uni-td align="center">{{item.major_class}}</uni-td>
						<uni-td align="center">{{item.into_time}}</uni-td>
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
				student_id: '',
				formData: {},
				rules: {
					study_time: {
						rules: [{
							required: true,
							errorMessage: "请选择学习时间"
						}, ]
					},
					into_time: {
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
					major_class: {
						rules: [{
							required: true,
							errorMessage: "请填写所在班级"
						}, ]
					}

				},
				Arr: []
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			const id = JSON.parse(value).id;
			this.student_id = id;
			uni.request({
				url: 'http://127.0.0.1/index.php/update/search',
				method: 'GET',
				data: {id},
				success: res => {
					this.Arr = res.data;
				},
				fail: () => {
					console.log('失败');
				},
				complete: (res) => {}
			});
		},
		methods: {
			openPopup: function() {
				this.$refs.popup.open();
			},
			submit: function() {
				this.$refs.form.validate().then((res) => {
					this.formData = {};
					this.formData.id = this.student_id;
					this.formData.university = res.university;
					this.formData.major = res.major;
					this.formData.major_class = res.major_class;
					this.formData.study_time = res.study_time;
					this.formData.into_time = res.into_time;
					const data = this.formData;
					
					uni.request({
						url: 'http://127.0.0.1/index.php/update/index',
						method: 'GET',
						data: data,
						success: res => {
							if(res.data == 1){
								uni.showToast({
									title: "更新成功",
									icon: "success",
									duration: 1000
								});
								const id = this.student_id;
								uni.request({
									url: 'http://127.0.0.1/index.php/changePassword/search',
									method: 'GET',
									data: {id},
									success: res => {
										this.Arr = [];
										this.Arr = res.data;
										
									},
									fail: () => {},
									complete: () => {}
								});
							}
						},
						fail: () => {
							console.log('发送失败');
						},
						complete: () => {}
					});
					// this.$refs.popup.close();
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
