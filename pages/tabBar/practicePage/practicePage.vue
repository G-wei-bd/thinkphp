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
				list: [{
						id: 'plan',
						name: '实习计划开始',
						open: false,
						pages: [{
								name: '提交实习计划',
								url: 'practice'
							},
							{
								name: '教师提交实习计划',
								url: 'commitPlan'
							}
						]
					},
					{
						id: 'isDoing',
						name: '实习考核',
						url: 'tabbar',
						open: false,
						pages: [{
								name: '三方协议',
								url: 'agreement'
							},
							{
								name: '周记',
								url: 'weekly'
							},
							{
								name: '月记',
								url: 'monthly'
							},
							{
								name: '我的评价',
								url: 'myAssess'
							},
							{
								name: '实习报告',
								url: 'report'
							},
							{
								name: '教师审核三方',
								url: 'examine'
							},
							{
								name: '教师审核周记',
								url: 'exa-weekly'
							},
							{
								name: '教师审核月记',
								url: 'exa-monthly'
							}, 
							{
								name: '教师查看评价',
								url: 'exa-access'
							},
							{
								name: '审核实习报告',
								url: 'exa-report'
							}

						]
					}
				]
			}
		},
		// #ifdef H5
		watch: {
			$route: {
				immediate: true,
				handler(newRoute) {
					if (newRoute.matched.length) {
						let path = newRoute.path.split('/')[3]
						for (const item of this.list) {
							if (Array.isArray(item.pages)) {
								for (const page of item.pages) {
									if (page === path || page.url && page.url === newRoute.path) {
										item.open = true
									}
								}
							}
						}
					}
				}
			}
		},
		// #endif
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
				let url = path.indexOf('') ? path : '/pages/practicePage/' + path + '/' + path;
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
