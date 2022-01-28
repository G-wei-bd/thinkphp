<template>
	<view>
		<view class="weeklyContainer">
			<uni-card title="标题文字" extra="额外信息">
				显示周记篇数的卡片栏
			</uni-card>
		</view>
		<view class="selectItem">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="#ff7700"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					这是写周记的界面，可以编写周记并提交
				</view>
				<view v-show="current === 1">
					这是查看周记的页面，可以查看周记提交情况
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				items: [
					"写周记","我的周记"
				]
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			}
		}
	}
</script>

<style>
	.selectItem{
		width: 400px;
		margin-left: 14px;
	}
</style>
