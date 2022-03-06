<template>
	<view>
		<view class="agreementInfo">
			<uni-card title="协议详情">
				<view class="agreeTable">
					<uni-table stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">学生姓名</uni-th>
							<uni-th align="center">参与实习</uni-th>
							<uni-th align="center">实习时间</uni-th>
							<uni-th align="center">指导老师</uni-th>
							<uni-th align="center">提交时间</uni-th>
							<uni-th align="center">协议详情</uni-th>
							<uni-th align="center">审批情况</uni-th>
						</uni-tr>
						<uni-tr>
							<uni-td align="center">未知</uni-td>
							<uni-td align="center">18实习</uni-td>
							<uni-td align="center">2020-09-01~2022-01-30</uni-td>
							<uni-td align="center">第一个老师</uni-td>
							<uni-td align="center">2020-10-22</uni-td>
							<uni-td align="center">
								<img src="" alt="">
							</uni-td>
							<uni-td align="center">
								<view class="exa-btn">
									<button class="btn btn-danger">通过</button>
									<button class="btn btn-danger">未通过</button>
								</view>
							</uni-td>
						</uni-tr>
					</uni-table>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				imageStyles: {
					border: true,
					width: 100,
					height: 100,
					borderStyle: {
						width: 1,
						color: '#ff6700',
						redius: 10
					}
				}
			}
		},
		methods: {
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		}
	}
</script>

<style>
	.exa-btn{
		width: 150px;
		display: flex;
		justify-content: space-between;
	}
	
</style>
