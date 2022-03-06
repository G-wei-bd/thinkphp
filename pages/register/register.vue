<template>
	<view>

		<view class="registerContainer">
			<form class="form-group" @submit="submitRegister">
				<view class="userName">
					<text class="iconfont icon-yonghuming"></text>
					<text class="small">姓名</text>
					<input type="text" class="form-control form-control-sm" name="userName" placeholder="姓名" placeholder-class="small"/>
				</view>
				
				<view class="gender">
					<text class="iconfont icon-shenfenrenzheng-xingbie"></text>
					<text class="small">性别</text>
					<view class="gender">
						<radio-group name="gender">
							<radio value="男" color="#0069D9" class="form-control-sm radioBtn" /><text class="small">男</text>
							<radio value="女" color="#0069D9" class="form-control-sm radioBtn" /><text class="small">女</text>
						</radio-group>
					</view>
				</view>
				
				<view class="birthday">
					<text class="iconfont icon-chushengriqi"></text>
					<text class="small">出生日期</text>
					<view class="form-control">
						<picker class="small form-control-sm" name="birthday" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="input-group-sm">{{date}}</view>
						</picker>
					</view>
				</view>
				
				<view class="address">
					<text class="iconfont icon-dizhi"></text>
					<text class="small">地址</text>
					<view class="selectAddress addressText" name="address" @click="disAdd()">{{add[0]}}  {{add[1]}}  {{add[2]}}</view>
					<view class="addressList" v-show="dis">
						<lee-select-city class="selectAdd" @submit="submitAddress"></lee-select-city>
					</view>
				</view>
				
				<view class="detailedAdd">
					<text class="iconfont icon-xiangxidizhi"></text>
					<text class="small">详细地址</text>
					<input class="form-control form-control-sm" type="text" name="detailedAddress" placeholder="家庭详细地址" placeholder-class="small"/>
				</view>
				
				<view class="phoneNumber">
					<text class="iconfont icon-shoujihaoma"></text>
					<text class="small">手机号</text>
					<input type="number" class="form-control form-control-sm" maxlength="11" name="phoneNumber" placeholder="请输入手机号" placeholder-class="small"/>
				</view>
				
				<view class="university">
					<text class="iconfont icon-xuexiao1"></text>
					<text class="small">学校名称</text>
					<input type="text" class="form-control form-control-sm" name="university" placeholder="请输入学校名称" placeholder-class="small"/>
				</view>
				
				<view class="degree">
					<text class="iconfont icon-xuexiao"></text>
					<text class="small">学历</text>
					<view class="list-group">
						<picker @change="bindPickerChange" name="degree" :value="index" :range="array" range-key="name">
							<view class="list-group-item small">{{array[index].name}}</view>
						</picker>
					</view>
				</view>
				
				<view class="major">
					<text class="iconfont icon-zhuanyeyukecheng"></text>
					<text class="small">专业</text>
					<input type="text" class="form-control form-control-sm" name="major" placeholder="就读专业全称" placeholder-class="small"/>
				</view>
				
				<view class="majorClass">
					<text class="iconfont icon-banjiketang"></text>
					<text class="small">所在班级</text>
					<input type="text" class="form-control form-control-sm" name="majorClass" placeholder="所在班级" placeholder-class="small"/>
				</view>
				
				<view class="password">
					<text class="iconfont icon-mima"></text>
					<text class="small">设置密码</text>
					<input :type="seen ? type_text : type_password" class="form-control form-control-sm" name="password" placeholder="请设置密码(6-16个字符)" placeholder-class="small"/>
					<text class="iconfont icon-xianshimima displayPassword" v-show="!seen" @click="display"></text>
					<text class="iconfont icon-yincangmima displayPassword" v-show="seen" @click="display"></text>
				</view>
				
				<view class="password">
					<text class="iconfont icon-mima"></text>
					<text class="small">确认密码</text>
					<input :type="secondSeen ? type_text : type_password" class="form-control form-control-sm" name="comfirmPassword" placeholder="请再次确认密码" placeholder-class="small"/>
					<text class="iconfont icon-xianshimima displayPassword" v-show="!secondSeen" @click="secondDis"></text>
					<text class="iconfont icon-yincangmima displayPassword" v-show="secondSeen" @click="secondDis"></text>
				</view>
				
				<view class="submit">
					<button class="btn btn-primary btn-outline-primary submitBtn" type="submit" form-type="submit">确认注册</button>
				</view>
				
			</form>
		</view>
	</view>
</template>

<script>
	import LeeSelectCity from '@/components/lee-select-city/lee-select-city.vue';
	import graceChecker from "../../common/graceChecker.js";
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 40;
		} else if (type === 'end') {
			year = year;
		}
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		components: {
			LeeSelectCity
		},
		data() {
			return {
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				add: "请选择",
				dis: false,
				array: [{name:'-请选择学历-'},{name:'专科'},{name: '本科'}, {name:'硕士'}, {name:'博士'}],
				index: 0,
				degree: "",
				seen: false,
				secondSeen: false,
				type_text: "text",
				type_password: "password",
			}
		},
		methods: {
			submitRegister: function(e){
				console.log("表单提交数据为：" + JSON.stringify(e.detail.value));
				console.log("非表单提交数据为：" + this.add);
				var rule = [
					{name: "userName", checkType: "notnull", errorMsg: "请填写姓名"},
					{name: "gender", checkType: "notnull", errorMsg: "请选择性别	"},
					{name: "detailedAddress", checkType: "notnull", errorMsg: "请输入详细地址"},
					{name: "phoneNumber", checkType: "notnull", errorMsg: "手机号不能为空"},
					{name: "university", checkType: "notnull", errorMsg: "请填写学校名称"},
					{name: "degree", checkType: "select", errorMsg: "请选择学历"},
					{name: "major", checkType: "notnull", errorMsg: "请填写所在专业"},
					{name: "majorClass", checkType: "notnull", errorMsg: "所在班级不能为空"},
					{name: "password", checkType: "notnull", errorMsg: "密码不能为空"},
					{name: "password", checkType: "length", errorMsg: "密码需要6-16个字符"},
					{name: "comfirmPassword", checkType: "same", checkRule:e.detail.value.password, errorMsg: "两次密码不一致"},
				];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					uni.showToast({
						title: "注册成功",
						icon: "success"
					});
					uni.navigateTo({
						url:"../login/login"
					})
				}else{
					uni.showToast({
						title: graceChecker.error,
						icon: "error"
					});
				}
			},
			disAdd: function(){
				this.dis = !this.dis;
			},
			submitAddress: function({ simple, selected }){
				this.dis = !this.dis;
				this.add = simple;
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value;
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			display: function(){
				this.seen = !this.seen;
			},
			secondDis: function(){
				this.secondSeen = !this.secondSeen;
			}
		}
	}
</script>

<style>
.registerContainer{
	width: 700rpx;
	height: 120vh;
	/* background-color: #BBFFAA; */
	margin: 0 auto;
	padding: 20rpx;
}

.iconfont{
	margin-right: 15rpx;
	font-size: 32rpx;
	line-height: 32rpx;
}

.radioBtn{
	transform: scale(0.7);
}
.selectAddress{
	width: 100%;
	height: 60rpx;
	font-size: 20rpx;
	line-height: 60rpx;
	color: #999999;
	background-color: #FFFFFF;
	border: #ced4da 1rpx solid;
	border-radius: 6rpx;
	padding: 0 20rpx;
}

.addressList{
	width: 661rpx;
	height: 50vh;
	border: 1rpx #999999 solid;
	border-top: none;
	position: absolute;
	z-index: 99;
}

.list-group-item{
	padding: 0 20rpx;
	height: 60rpx;
	line-height: 58rpx;
	color: #999999;
}

.password{
	position: relative;
}
.displayPassword{
	position: absolute;
	right: 14rpx;
	top: 55%;
	
}

.submit{
	display: flex;
	justify-content: center;
}

.submitBtn{
	width: 600rpx;
}

.userName, 
.gender, 
.birthday, 
.address, 
.detailedAdd, 
.phoneNumber, 
.university, 
.degree, 
.major, 
.majorClass,
.password, 
.submit{
	margin-bottom: 30rpx;
}

</style>
