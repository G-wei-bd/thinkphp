<template>
	<view>
		<uni-table stripe border emptyText="暂无更多数据">
			<uni-tr>
				<uni-th align="center">序号</uni-th>
				<uni-th align="center">学生姓名</uni-th>
				<uni-th align="center">签到地点</uni-th>
				<uni-th align="center">签到日期</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in locationData" :key="index">
				<uni-td align="center">{{ index + 1 }}</uni-td>
				<uni-td align="center">{{item.user_name}}</uni-td>
				<uni-td align="center" style="font-size: 10px;">{{item.location}}</uni-td>
				<uni-td align="center">{{item.time}}</uni-td>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				locationData: ''
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			const teacher_id = JSON.parse(value).phone_num;
			console.log(teacher_id);
			uni.request({
				url: 'http://127.0.0.1/index.php/location/all',
				method: 'GET',
				data: {teacher_id},
				success: res => {
					this.locationData = res.data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
