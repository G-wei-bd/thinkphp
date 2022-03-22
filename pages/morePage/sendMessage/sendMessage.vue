<template>
	<view class="mb-3">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<view class="d-flex flex-column align-items-center justify-content-center mt-3">
				<uni-forms-item label="教师学工号" name="teacher_id">
					<uni-easyinput class="easyInput" v-model="formData.teacher_id" placeholder="" />
				</uni-forms-item>
				<uni-forms-item label="标题" name="title">
					<uni-easyinput class="easyInput" v-model="formData.title" placeholder="" />
				</uni-forms-item>
				<uni-forms-item label="内容" name="content">
					<uni-easyinput class="easyInput" v-model="formData.content" type="textarea" autoHeight
						maxlength="-1" trim="all" />
				</uni-forms-item>
			</view>
		</uni-forms>
		<view class="submit d-flex justify-content-center">
			<button class="btn btn-danger" @click="messageUpload">发表</button>
		</view>
	</view>
</template>

<script>
	function getTime(type) {
		const time = new Date();
		let year = time.getFullYear();
		let month = time.getMonth() + 1;
		let day = time.getDate();
		let hour = time.getHours();
		let minute = time.getMinutes();
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		hour = hour > 9 ? hour : '0' + hour;
		minute = minute > 9 ? minute : '0' + minute;
		return `${year}-${month}-${day} ${hour}:${minute}`;
	}
	export default {
		data() {
			return {
				formData: {
					teacher_id: '',
					title: '',
					content: '',
					time: ''
				},
				rules: {
					teacher_id: {
						rules: [{
							required: true,
							errorMessage: "请输入学工号"
						}]
					},
					title: {
						rules: [{
							required: true,
							errorMessage: "请填写标题"
						}]
					},
					content: {
						rules: [{
							required: true,
							errorMessage: "请填写内容"
						}]
					}
				},
			}
		},
		methods: {
			messageUpload() {
				this.$refs.form.validate().then((res) => {
					this.formData.time = getTime();
					const value = uni.getStorageSync('user_info');
					this.formData.teacher_name = JSON.parse(value).user_name;
					const data = this.formData;
					console.log(data);
					uni.request({
						url: 'http://127.0.0.1/index.php/message/commit',
						method: 'GET',
						data: data,
						success: res => {
							console.log(res.data);
							if (res.data == 1) {
								uni.showToast({
									title: '发送成功',
									icon: "success",
									duration: 800
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
	.easyInput {
		width: 300px;
	}
</style>
