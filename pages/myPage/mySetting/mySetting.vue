<template>
	<view>
		<view class="tipInfo">
			<text class="text-danger m-4">当前登录：{{user_name}}</text>
		</view>
		<view class="registerContainer">
			<form class="form-group" @submit="submitRegister">
				<view class="allForm">
					<view class="userName">
						<view class="tipText">
							<text class="iconfont icon-yonghuming"></text>
							<text class="small">姓名</text>
						</view>
						<input type="text" class="form-control form-control-sm" name="user_name" placeholder="姓名"
							placeholder-class="small" />
					</view>

					<view class="gender">
						<view class="tipText">
							<text class="iconfont icon-shenfenrenzheng-xingbie"></text>
							<text class="small">性别</text>
						</view>
						<view class="gender">
							<radio-group name="gender">
								<radio value="1" color="#0069D9" class="form-control-sm radioBtn" /><text
									class="small">男</text>
								<radio value="0" color="#0069D9" class="form-control-sm radioBtn" /><text
									class="small">女</text>
							</radio-group>
						</view>
					</view>

					<view class="birthday">
						<view class="tipText">
							<text class="iconfont icon-chushengriqi"></text>
							<text class="small">出生日期</text>
						</view>
						<view>
							<uni-datetime-picker type="date" :clearIcon="false" v-model="bitrhday" @change="dateChange" />
							</picker>
						</view>
					</view>

					<view class="address">
						<text class="iconfont icon-dizhi"></text>
						<text class="small">地址</text>
						<view class="selectAddress" name="add" @click="disAdd()">{{add}}
						</view>
						<view class="addressList" v-show="dis">
							<lee-select-city class="selectAdd" @submit="submitAddress"></lee-select-city>
						</view>
					</view>

					<view class="detailedAdd">
						<view class="tipText">
							<text class="iconfont icon-xiangxidizhi"></text>
							<text class="small">详细地址</text>
						</view>
						<input class="form-control form-control-sm" type="text" name="address"
							placeholder="家庭详细地址" placeholder-class="small" />
					</view>

					<view class="university">
						<view class="tipText">
							<text class="iconfont icon-xuexiao1"></text>
							<text class="small">学校名称</text>
						</view>
						<input type="text" class="form-control form-control-sm" name="university" placeholder="请输入学校名称"
							placeholder-class="small" />
					</view>

					<view class="degree">
						<view class="tipText">
							<text class="iconfont icon-xuexiao"></text>
							<text class="small">学历</text>
						</view>
						<view class="list-group">
							<picker @change="bindPickerChange" name="degree" :value="index" :range="array"
								range-key="name">
								<view class="list-group-item small">{{array[index].name}}</view>
							</picker>
						</view>
					</view>

					<view class="major">
						<view class="tipText">
							<text class="iconfont icon-zhuanyeyukecheng"></text>
							<text class="small">专业</text>
						</view>
						<input type="text" class="form-control form-control-sm" name="major" placeholder="就读专业全称"
							placeholder-class="small" />
					</view>

					<view class="majorClass">
						<view class="tipText">
							<text class="iconfont icon-banjiketang"></text>
							<text class="small">所在班级</text>
						</view>
						<input type="text" class="form-control form-control-sm" name="major_class" placeholder="所在班级"
							placeholder-class="small" />
					</view>

				</view>
				<view class="submit">
						<button class="btn btn-primary btn-outline-primary submitBtn" type="submit"
							form-type="submit">保存</button>
					</view>
			</form>
		</view>
	</view>
</template>

<script>
	import LeeSelectCity from '@/components/lee-select-city/lee-select-city.vue';
	import graceChecker from "../../../common/graceChecker.js";
	export default {
		components: {
			LeeSelectCity
		},
		data() {
			return {
				user_name: '',
				bitrhday: '',
				add: "请选择",
				dis: false,
				array: [{
					name: '专科'
				}, {
					name: '本科'
				}, {
					name: '硕士'
				}, {
					name: '博士'
				}],
				index: 0,
				degree: "",
			}
		},
		onLoad() {
			const user = uni.getStorageSync('user_info');
			this.user_name = JSON.parse(user).user_name;
		},
		methods: {
			submitRegister: function(e) {
				var rule = [{
						name: "user_name",
						checkType: "notnull",
						errorMsg: "请填写姓名"
					},
					{
						name: "gender",
						checkType: "notnull",
						errorMsg: "请选择性别"
					},
					{
						name: "address",
						checkType: "notnull",
						errorMsg: "请输入详细地址"
					},
					{
						name: "university",
						checkType: "notnull",
						errorMsg: "请填写学校名称"
					},
					{
						name: "degree",
						checkType: "select",
						errorMsg: "请选择学历"
					},
					{
						name: "major",
						checkType: "notnull",
						errorMsg: "请填写所在专业"
					},
					{
						name: "major_class",
						checkType: "notnull",
						errorMsg: "所在班级不能为空"
					}
				];
				const formData = e.detail.value;
				formData.address = this.add + e.detail.value.address;
				formData.birthday = this.birthday;
				const value = uni.getStorageSync('user_info');
				const id = JSON.parse(value).id;
				formData.id = id;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url: 'http://127.0.0.1/index.php/update/index',
						method: 'GET',
						data: formData,
						success: res => {
							console.log(res.data);
							if(res.data == 1){
								uni.showToast({
									title: "修改成功",
									icon: "success",
									duration: 2000
								});
							}
						},
						fail: () => {
							console.log('发送失败');
						},
						complete: () => {}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "error"
					});
				}
			},
			disAdd: function() {
				this.dis = !this.dis;
			},
			submitAddress: function({
				simple,
				selected
			}) {
				this.dis = !this.dis;
				this.add = simple.join('');
			},
			dateChange: function(e) {
				this.birthday = e;
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value;
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

	.tipInfo {
		width: 330px;
		margin: 25px 10px;
		color: #ff6700;
	}

	.registerContainer {
		width: 100%;
		margin-left: 20px;
	}

	.allForm {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;

	}

	.iconfont {
		margin-right: 8px;
		font-size: 16px;
		line-height: 16px;
	}

	.radioBtn {
		transform: scale(0.7);
	}

	.selectAddress {
		width: 100%;
		height: 30px;
		font-size: 10px;
		line-height: 30px;
		color: #999999;
		background-color: #FFFFFF;
		border: #ced4da 1rpx solid;
		border-radius: 3px;
		padding: 0 10px;
	}

	.addressList {
		width: 330px;
		height: 320px;
		border: 1rpx #cbcbcb solid;
		position: absolute;
		z-index: 99;
	}

	.list-group-item {
		padding: 0 10px;
		height: 30px;
		line-height: 29px;
		color: #999999;
	}

	.submit {
		display: flex;
		justify-content: center;
		padding-top: 30px;
	}

	.submitBtn {
		width: 200px;
	}

	.photo,
	.userName,
	.gender,
	.birthday,
	.address,
	.detailedAdd,
	.university,
	.degree,
	.major,
	.majorClass {
		margin-right: 50px;
		margin-top: 20px;
		width: 250px;
	}
</style>
