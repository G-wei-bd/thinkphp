<template>
	<view>
		<view>
			<view class="selectItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#ff7700"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<text>这是全部报告</text>
				</view>
				<view v-show="current === 1">
					<text>这是进行中的</text>
				</view>
				<view v-show="current === 2">
					<text>这是待审核</text>
				</view>
				<view v-show="current === 3">
					<text>这是已审核</text>
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
					"全部", "进行中", "待审核", "已审核"
				]
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
		}
	}
</script>

<style>
	.selectItem {
		width: 400px;
		margin-left: 14px;
	}
	
</style>
