<template>
	<view>
		<view class="addInfo">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item required label="实习计划名称" name="name">
					<uni-easyinput v-model="formData.name" trim="all" placeholder="请输入实习计划名称" />
				</uni-forms-item>
				<uni-forms-item required label="关联学生" name="students">
					<uni-data-checkbox multiple v-model="value" :localdata="range"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item required label="实习计划时间" name="time">
					<uni-datetime-picker v-model="formData.time" type="daterange" :clearIcon="false" start="1990-01-01"
						end="2099-12-31" rangeSeparator="~" />
				</uni-forms-item>
				<uni-forms-item required label="指导老师" name="teacher_name">
					<uni-easyinput v-model="formData.teacher_name" trim="all" placeholder="请输入指导老师姓名" />
				</uni-forms-item>
				<uni-forms-item required label="学工号" name="teacher_id">
					<uni-easyinput v-model="formData.teacher_id" trim="all" placeholder="请输入指导老师学工号" />
				</uni-forms-item>
				<uni-forms-item required label="要求" name="claim">
					<uni-easyinput v-model="formData.claim" trim="all" placeholder="请输入实习要求" />
				</uni-forms-item>
			</uni-forms>
			<view class="submitBtn">
				<button class="btn btn-info" @click="submit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				formData: {},
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: "请填写实习计划名称"
						}, ]
					},
					students: {
						rules: [{
							required: true,
							errorMessage: "请选择关联学生"
						}, ]
					},
					time: {
						rules: [{
							required: true,
							errorMessage: "请选择时间"
						}, ]
					},
					teacher_id: {
						rules: [{
							required: true,
							errorMessage: "请填写要求"
						}]
					},
					teacher_name: {
						rules: [{
							required: true,
							errorMessage: "请填写要求"
						}]
					},
					claim: {
						rules: [{
							required: true,
							errorMessage: "请填写要求"
						}]
					}

				},
				value: [],
				range: []
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			const teacher_id = JSON.parse(value).phone_num;
			uni.request({
				url: 'http://127.0.0.1/index.php/commitplan/index',
				method: 'GET',
				data: {
					id: teacher_id
				},
				success: res => {
					const keys = Object.keys(res.data);
					for (var i = 0; i < keys.length; i++) {
						const key = keys[i];
						const obj = {
							"value": "",
							"text": ""
						};
						obj.value = key;
						obj.text = res.data[key];
						this.range.push(obj);
						obj = {
							"value": "",
							"text": ""
						};
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			submit: function() {
				this.$refs.form.validate().then((res) => {
					var formData = res;
					formData.commit_time = getDate();
					console.log(res);
					uni.request({
						url: 'http://127.0.0.1/index.php/commitplan/commit',
						method: 'GET',
						data: formData,
						success: res => {
							console.log(res.data);
							if (res.data == 1) {
								uni.showToast({
									title: '提交成功',
									icon: "success"
								});
								uni.reLaunch({
									url: '/pages/practicePage/commitPlan/commitPlan'
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	.addInfo {
		width: 600px;
		height: 100%;
		background-color: #FFF;
		border-radius: 5px;
		padding: 20px 100px;
	}

	.submitBtn {
		width: 100px;
		margin: 0 auto;
	}
</style>

</style>
