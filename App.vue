<script>
	// uni-app的主组件，所有页面都是在App.vue下进行切换的，是页面入口文件。但App.vue本身不是页面，这里不能编写视图元素。

	// 这个文件的作用包括：调用应用生命周期函数、配置全局样式、配置全局的存储globalData

	// 应用生命周期仅可在App.vue中监听，在页面监听无效。
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/common/bootstrap.css";
	@import url("//at.alicdn.com/t/font_3123617_2ymsrh96ido.css");
	/* 隐藏tabbar */
	/* .uni-app--showtopwindow+.uni-tabbar-bottom {
		display: none;
	} */
	
	/* 隐藏所有页面的 navigationBar */
	.uni-app--showtopwindow uni-page-head {
	    display: none;
	}
	
	/* 隐藏滚动栏 */
	/* /deep/::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
	} */
</style>
