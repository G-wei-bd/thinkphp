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
	@import url("//at.alicdn.com/t/font_3123617_i07wm7qzc2q.css");
	/* 隐藏tabbar */
	.uni-app--showtopwindow+.uni-tabbar-bottom {
		display: none;
	}

	/* 隐藏所有页面的 navigationBar */
	.uni-app--showtopwindow uni-page-head {
		display: none;
	}

	/deep/::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 8px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}

	/deep/::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #a6a6a6;
	}

	/deep/::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: #ededed;
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
