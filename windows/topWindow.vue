<template>
	<view class="top-window-header">
		<view class="logo">
			<navigator class="logo" open-type="reLaunch" url="/pages/practicePage/practice/practice">
				<image src="../static/logo.png" mode="heightFix" style="width: 50px;"></image>
			</navigator>
		</view>
		<custom-tab-bar class="tab-bar-flex" direction="horizontal" :show-icon="false" :selected="current"
			@onTabItemTap="toSecondMenu" />
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected: {
					practicePage: 0,
					morePage: 1,
					myPage: 2
				},
				current: 0,
				indexPage: [{
					tabBar: '/pages/tabBar/practicePage/practicePage',
					index: '/pages/practicePage/practice/practice'
				}, {
					tabBar: '/pages/tabBar/morePage/morePage',
					index: '/pages/morePage/message/message'
				}, {
					tabBar: '/pages/tabBar/myPage/myPage',
					index: '/pages/myPage/mySetting/mySetting'
				}],
			}
		},
		watch: {
			$route: {
				immediate: true,
				handler(newRoute) {
					const width = uni.getSystemInfoSync().screenWidth
					if (width >= 768) {
						let path = newRoute.path
						let comp
						if (path === '/') {
							comp = 'practicePage'
							path = '/pages/tabBar/practicePage/practicePage'
						} else {
							comp = path.split('/')[2]
						}
						this.current = this.selected[comp]
						for (const item of this.indexPage) {
							if (path === item.tabBar) {
								uni.redirectTo({
									url: item.index
								})
							}
						}
					}
				}
			}
		},
		methods: {
			toSecondMenu(e) {
				const activeTabBar = '/' + e.pagePath
				const tabBarIndex = activeTabBar.split('/')[3]
				this.current = this.selected[tabBarIndex]
				for (const item of this.indexPage) {
					if (activeTabBar === item.tabBar) {
						uni.redirectTo({
							url: item.index
						})
					}
				}
			}
		}
	}
</script>

<style>
	.top-window-header {
		position: relative;
		height: 50px;
		padding: 0 20px 0 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1px solid #e1e1e1;
		background-color: #FFFFFF;
		color: #333;
	}

	.logo {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		left: 20px;
	}

	.logo image {
		height: 50px;
		width: 50px;
	}

	.logo text {
		margin-left: 8px;
	}

	.tab-bar-flex {
		width: 300px;
	}
</style>
