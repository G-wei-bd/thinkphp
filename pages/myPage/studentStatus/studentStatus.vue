<template>
	<view>
		<view class="addResInfo">
			<button class="btn btn-danger btn-outline-danger">+ 添加学籍</button>
		</view>
		<view class="resCard">
			<uni-card title="学籍信息">
				<uni-table stripe emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center">序号</uni-th>
						<uni-th align="center">学校</uni-th>
						<uni-th align="center">院系</uni-th>
						<uni-th align="center">专业</uni-th>
						<uni-th align="center">班级</uni-th>
						<uni-th align="center">入学年份</uni-th>
						<uni-th align="center">审核状态</uni-th>
					</uni-tr>
					<uni-tr>
						<uni-td align="center">1</uni-td>
						<uni-td align="center">广东工业大学华立学院</uni-td>
						<uni-td align="center">计算机与信息工程学院</uni-td>
						<uni-td align="center">网络工程</uni-td>
						<uni-td align="center">18网络1班</uni-td>
						<uni-td align="center">2018.09</uni-td>
						<uni-td align="center">
							<text class="text-danger font-weight-bold">已通过</text>
						</uni-td>
					</uni-tr>
				</uni-table>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.addResInfo {
		margin: 20px 40px;
		display: flex;
		justify-content: flex-end;
	}
</style>
