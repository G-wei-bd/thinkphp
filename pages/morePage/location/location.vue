<template>
	<view>
		<text class="d-block text-danger text-center font-weight-bold">现在是{{now_time}}</text>
		<text class="d-block text-danger text-center font-weight-bold">{{week}}</text>
		<view class="content">
			<qian-dao :list="list" :date="date" @day_change="day_change_fun" @date_change="date_change_fun"></qian-dao>
		</view>
	</view>
</template>

<script>
	import QianDao from "@/components/qian-dao/qian-dao.vue";
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}
	function getTime(type) {
		const time = new Date();
		let year = time.getFullYear();
		let month = time.getMonth() + 1;
		let day = time.getDate();
		let hour = time.getHours();
		let minute = time.getMinutes();
		let second = time.getSeconds();
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		hour = hour > 9 ? hour : '0' + hour;
		minute = minute > 9 ? minute : '0' + minute;
		second = second > 9 ? second : '0' + second;
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	}

	export default {
		components: {
			// 签到
			QianDao,
		},
		data() {
			return {
				task_id: '',
				taskData: '',
				teacher_id:'',
				now_time: '',
				week: '',
				// 当前的日期
				date: "",
				monent: '',
				// 已经签到的数据列表
				list: [],
				formData: {}
			}
		},
		onLoad() {
			var str = "今天是星期" + "日一二三四五六".charAt(new Date().getDay());
			this.week = str;
			this.monent = getTime();
			const user_info = uni.getStorageSync('user_info');
			const stud_id = JSON.parse(user_info).id;
			const value = uni.getStorageSync('user_info');
			const id = JSON.parse(value).id;
			uni.request({
				url: 'http://127.0.0.1/index.php/location/search',
				method: 'GET',
				data: {
					time: this.monent,
					student_id: stud_id
				},
				success: res => {
					this.list = res.data;
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: 'http://127.0.0.1/index.php/location/fetch',
				method: 'GET',
				data: {stud_id},
				success: res => {
					this.task_id = res.data.task_id;
					this.teacher_id = res.data.teacher_id;
				},
				fail: () => {},
				complete: () => {}
			});
			
			setInterval(()=>{
				this.now_time = getTime();
			}, 1000);
		},
		methods: {
			// 日期改变时触发
			date_change_fun(date) {
				// 更新日期
				this.date = date;
				// 清空已经签到的列表
				// this.list = [];
			},
			// // 点击天
			day_change_fun(day) {
				console.log(day);
				// 如果今天没有签到(只签到今天的，如果只需要签到今天的可以这么写)
				if (!day.click && day.type == "today") {
					this.list.push(day.nyr);
					uni.chooseLocation({
						success: (res) => {
							this.formData.location = res.address + res.name;
							this.formData.time = this.monent;
							this.formData.date_list = getDate();
							const value = uni.getStorageSync('user_info');
							const id = JSON.parse(value).id;
							const user_name = JSON.parse(value).user_name;
							this.formData.student_id = id;
							this.formData.user_name = user_name;
							this.formData.task_id = this.task_id;
							this.formData.teacher_id = this.teacher_id;
							console.log(this.formData);
							uni.request({
								url: 'http://127.0.0.1/index.php/location/index',
								method: 'GET',
								data: this.formData,
								success: res => {
									if (res.data == 1) {
										uni.showToast({
											title: '签到成功',
											icon: "success",
											duration: 1000
										});
									} else {
										uni.showToast({
											title: '签到失败，请刷新重试',
											icon: "error",
											duration: 1000
										});
									}
								},
								fail: () => {},
								complete: () => {}
							});
						},
						fail: (res) => {

						},
						complete: (res) => {
							if(!res.address){
								uni.reLaunch({
									url: '/pages/morePage/location/location'
								})
							}
						}
					});
				}
				if(!day.click && day.type == "this_month"){
					uni.showToast({
						title: '不允许补签，请点击当天日期',
						icon: "none"
					});
				}else{
					uni.showToast({
					title: '今天已签到',
					icon: "none"
				});
				}
				
				
				

				// 如果没有签到（可以补签，需要补签的可以这么写）
				// if (!day.click) {
				// 	this.list.push(day.nyr);
				// 	uni.chooseLocation({
				// 		success: (res) => {
				// 			this.formData.location = res.address + res.name;
				// 			this.formData.time = getTime();
				// 			this.formData.date_list = this.list;
				// 			const value = uni.getStorageSync('user_info');
				// 			const id = JSON.parse(value).id;
				// 			const user_name = JSON.parse(value).user_name;
				// 			this.formData.student_id = id;
				// 			this.formData.user_name = user_name;
				// 			console.log(this.formData);
				// 			uni.request({
				// 				url: 'http://127.0.0.1/index.php/location/index',
				// 				method: 'GET',
				// 				data: this.formData,
				// 				success: res => {
				// 					if (res.data == 1) {
				// 						uni.showToast({
				// 							title: '签到成功',
				// 							icon: "success",
				// 							duration: 1000
				// 						});
				// 					}
				// 				},
				// 				fail: () => {},
				// 				complete: () => {}
				// 			});
				// 		},
				// 		fail: (res) => {

				// 		}
				// 	});
				// }
				// uni.showToast({
				// 	title: '已签到，无需再次点击',
				// 	icon: "none"
				// });

			},
		}
	}
</script>

<style>

</style>
