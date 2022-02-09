<template>
	<view class="uni-container">
		<view class="uni-panel" v-for="(item, index) in list" :key="item.id">
			<view :class="{'selectText': leftWinActive === item.url  && hasLeftWin, 'uni-panel-h-on': item.open}"
				class="uni-panel-h menuList" @click="triggerCollapse(index, item.id)">
				<text class="menu small font-weight-bold">{{item.name}}</text><!-- 菜单主体文字样式 -->
				<text class="iconfont right-icon" :class="item.open  ? 'icon-xiangshang' : 'icon-xiangxia'"></text>
				<!-- 菜单右侧小图标 -->
			</view>
			<view class="uni-panel-c" v-if="item.open ">
				<view :class="{'selectText': leftWinActive === item2.url  && hasLeftWin}"
					class="uni-navigate-item menuItem" v-for="(item2,key) in item.pages" :key="key"
					@click="goDetailPage(item2)">
					<text class="itemMenu small">{{item2.name ? item2.name : item2}}</text>
					<text class="iconfont icon-anniu-jiantouxiangyou_o"></text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			hasLeftWin: {
				type: Boolean
			},
			leftWinActive: {
				type: String
			}
		},
		data() {
			return {
				list: [
					{
						id: 'navbar',
						name: '顶部原生导航标题栏',
						open: false,
						pages: [
							{
								name: '导航栏带自定义按钮',
								url: 'nav-button'
							},
							{
								name: '导航栏带红点和角标',
								url: 'nav-dot'
							},
							{
								name: '导航栏带城市选择',
								url: 'nav-city-dropdown'
							},
							{
								name: '导航栏带搜索框',
								url: 'nav-search-input'
							},
							{
								name: '透明渐变样式',
								url: 'nav-transparent'
							},
							{
								name: '导航栏带图片',
								url: 'nav-image'
							}
						]
					},
					{
						name: '顶部选项卡',
						url: 'tabbar',
						open: false,
						pages: [
							{
								name: '导航栏带自定义按钮',
								url: 'nav-button'
							},
							{
								name: '导航栏带红点和角标',
								url: 'nav-dot'
							},
							{
								name: '导航栏带城市选择',
								url: 'nav-city-dropdown'
							},
							{
								name: '导航栏带搜索框',
								url: 'nav-search-input'
							},
							{
								name: '透明渐变样式',
								url: 'nav-transparent'
							},
							{
								name: '导航栏带图片',
								url: 'nav-image'
							}
						]
					}
				]
			}
		},
		watch: {
			$route: {
				immediate: true,
				handler(newRoute) {
					if (newRoute.matched.length) {
						let path = newRoute.path.split('/')[3]
						for (const item of this.list) {
							if (Array.isArray(item.pages)) {
								for (const page of item.pages) {
									if (page === path || page.url && page.url === path) {
										item.open = true
									}
								}
							}
						}
					}
				}
			}
		},
		methods: {
			triggerCollapse(e, id) {
				if (!this.list[e].pages) {
					this.goDetailPage(this.list[e].url);
					return;
				}
				for (var i = 0; i < this.list.length; ++i) {
					if (e === i) {
						this.list[i].open = !this.list[i].open;
					} else {
						this.list[i].open = false;
					}
				}
			},
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = path.indexOf('') ? path : '/pages/thirdPage/' + path + '/' + path;
				if (this.hasLeftWin) {
					uni.reLaunch({
						url: url
					})
				} else {
					uni.navigateTo({
						url: url
					})
				}
				return false;
			}
		}
	}
</script>

<style>
	@import '../../../common/uni-nvue.css';
	@import '../../../common/leftWindow.css';
</style>
