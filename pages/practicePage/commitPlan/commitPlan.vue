<template>
	<view>
		<view class="addInfo">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item required label="实习计划名称" name="name">
					<uni-easyinput v-model="formData.name" trim="all" placeholder="请输入实习计划名称" />
				</uni-forms-item>
				<uni-forms-item required label="关联学生" name="major_class">
					<uni-data-checkbox multiple v-model="value" :localdata="range"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item required label="实习计划时间" name="time">
					<uni-datetime-picker v-model="formData.time" type="daterange" :clearIcon="false" start="1990-01-01"
						end="2099-12-31" rangeSeparator="~" />
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
					major_class: {
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
					claim: {
						rules: [{
							required: true,
							errorMessage: "请填写要求"
						}, ]
					}

				},
				value: [],
				range: [{
					"value": 0,
					"text": ""
				}, {
					"value": 1,
					"text": ""
				}]
			}
		},
		onLoad() {
			uni.request({
				url: 'http://127.0.0.1/index.php/commitplan/index',
				method: 'GET',
				data: {id: 1001},
				success: res => {
					for(var i = 0; i <= res.data.length; i++){
						this.range[i].value = res.data[i];
						this.range[i].text = res.data[i];
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
					uni.request({
						url: 'http://127.0.0.1/index.php/commitplan/commit',
						method: 'GET',
						data: {formData},
						success: res => {
							if(res.data != null){
								setTimeout(function(){
									uni.showToast({
										title: '提交成功'
									});
								}, 1000);
							}
							console.log(res.data);
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
