<template>
	<view>
		<view class="messageContainer" v-if="isDetail">
			<uni-list class="messageList">
				<uni-list :border="true" v-for="(item, index) in messageArr" :key="index">
					<!-- 头像显示角标 -->
					<uni-list-chat :title="item.title" clickable @click="back(index)" avatar="../../../static/logo.png"
						note="点击查看详情" ellipsis="1" :time="item.time" badge-positon="left"></uni-list-chat>
				</uni-list>
			</uni-list>
		</view>
		<view v-else>
			<view class="navBarContainer">
				<uni-nav-bar left-icon="left" right-text="菜单" left-text="返回" title="消息详情" @clickLeft="back" />
			</view>
			<view class="detail">
				<text class="d-block text-center font-weight-bold m-3">{{messageArr[list_item].title}}</text>
				<view class="d-flex justify-content-around mb-2">
					<text class="font-weight-bold">发送人：{{messageArr[list_item].teacher_name}}</text>
					<text>时间：{{messageArr[list_item].time}}</text>
				</view>
				<text>{{messageArr[list_item].content}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDetail: true,
				messageArr: '',
				list_item: ''
			}
		},
		onLoad() {
			uni.request({
				url: 'http://127.0.0.1/index.php/message/index',
				method: 'GET',
				data: {},
				success: res => {
					this.messageArr = res.data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			back(e) {
				console.log(e);
				this.list_item = e;
				this.isDetail = !this.isDetail;
			}
		}
	}
</script>

<style>
	.messageContainer {}
</style>
