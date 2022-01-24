<template>
	<view class="left-window-style">
		<view class="second-menu">
			<!-- <keep-alive> -->
			<component v-bind:is="active" :hasLeftWin="hasLeftWin" :leftWinActive="leftWinActive"></component>
			<!-- </keep-alive> -->
		</view>
	</view>
</template>

<script>
	import practice from '@/pages/tabBar/practicePage/practicePage.vue'
	import third from '@/pages/tabBar/thirdPage/thirdPage.vue'
	import my from '@/pages/tabBar/myPage/myPage.vue'
	import {
		mapMutations,//调用 index.js 里的方法
		mapState//读取数据
	} from 'vuex'
	let isPcObserver, isPhoneObserver
	export default {
		data() {
			return {
				nav: [
					'practicePage',
					'thirdPage',
					'myPage'
				],
				isPC: false
			}
		},
		components: {
			practice,
			third,
			my
		},
		computed: {
			...mapState({
				active: state => state.active,
				hasLeftWin: state => !state.noMatchLeftWindow,
				leftWinActive: state => state.leftWinActive.split('/')[3],
			})
		},
		mounted() {
			isPcObserver = uni.createMediaQueryObserver(this)
			isPhoneObserver = uni.createMediaQueryObserver(this)

			isPcObserver.observe({
				minWidth: 768
			}, matched => {
				this.isPC = matched
				const pageUrl = this.$route.path
				if (!pageUrl) return
				const pageName = this.$route.path.split('/')[4]
				if (pageUrl === '/' || this.nav.includes(pageName)) {
					const tabbarUrl = pageName ? (pageName === 'practicePage' ? '/' : `/pages/tabBar/${pageName}/${pageName}`) : '/'
					if (pageUrl === '/' || pageUrl === tabbarUrl) {
						uni.switchTab({
							url: pageUrl,
						})
					}
				} else {
					uni.reLaunch({
						url: pageUrl
					})
				}
			})

			isPhoneObserver.observe({
				maxWidth: 767
			}, matched => {
				this.isPC = !matched
				if (matched) {
					const pageUrl = this.$route.path
					const tabbarName = this.$route.path.split('/')[2]
					const tabbarUrl = tabbarName && (tabbarName === 'practicePage' ? '/' : `/pages/tabBar/${tabbarName}/${tabbarName}`)
					uni.switchTab({
						url: tabbarUrl,
						success(e) {
							uni.navigateTo({
								url: pageUrl
							})
						}
					})
				}

			})
		},
		unmounted() {
			isPcObserver.disconnect()
			isPhoneObserver.disconnect()
		},
		watch: {
			isPC: {
				immediate: true,
				handler(newMatches) {
					this.setMatchLeftWindow(newMatches)
				}
			},
			$route: {
				immediate: true,
				handler(newRoute) {
					this.handlerRoute(newRoute)
				}
			},
			$route(newRoute) {
				this.handlerRoute(newRoute)
			}
		},

		methods: {
			...mapMutations(['setMatchLeftWindow', 'setActive', 'setLeftWinActive']),

			handlerRoute(newRoute) {
				if (this.isPC) {
					if (newRoute.path === '/') {
						// uni.redirectTo({
						// 	url: '/pages/component/view/view'
						// })
					} else if (!newRoute.matched.length) {
						uni.redirectTo({
							url: '/pages/error/404'
						})
					} else {
						this.setLeftWinActive(newRoute.path)
						let active = newRoute.path.split('/')[2]
						if (this.nav.includes(active)) {
							if (active === 'practicePage') {
								active = 'practice'
							}
							if (active === 'thirdPage'){
								active = 'third'
							}
							if (active === 'myPage') {
								active = 'my'
							}
							this.setActive(active)
						}
					}
				}
			},

			switchTab() {

			}
		}
	}
</script>

<style>

	.left-window-style {
		min-height: calc(100vh - var(--top-window-height));
		background-color: #f8f8f8;
	}

	.second-menu {
		width: 175px;
		background-color: #F8F8F8;
	}

	.icon-image {
		width: 30px;
		height: 30px;
	}
</style>

