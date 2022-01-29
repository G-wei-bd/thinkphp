<template>
	<view>
		<view class="weeklyContainer">
			<uni-card title="标题文字" extra="额外信息">
				显示周记篇数的卡片栏
			</uni-card>
		</view>
		<view>
			<view class="selectItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
					activeColor="#ff7700"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					这是写周记的界面，可以编写周记并提交
				</view>
				<view v-show="current === 1">
					<view class="weeklyTable">
						<uni-table ref="table" border stripe emptyText="暂无更多数据">
							<uni-tr>
								<uni-th align="center">序号</uni-th>
								<uni-th align="center">提交时间</uni-th>
								<uni-th align="center">周记周数</uni-th>
								<uni-th align="center">批阅状态</uni-th>
								<uni-th align="center">周记关联时间</uni-th>
								<uni-th align="center">更多</uni-th>
							</uni-tr>
							<uni-tr  v-for="(item,index) in Arr" :key="index">
								<uni-td align="center">{{ index + 1 }}</uni-td>
								<uni-td align="center">{{ item.time }}</uni-td>
								<uni-td align="center">{{ item.week }}</uni-td>
								<uni-td align="center">{{ item.state }}</uni-td>
								<uni-td align="center">{{ item.connectTime }}</uni-td>
								<uni-td align="center">
									<button class="btn btn-sm btn-primary">查看</button>
								</uni-td>
							</uni-tr>
						</uni-table>
						<view class="paginationContainer">
							<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change"></uni-pagination>
						</view>
					</view>
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
					"写周记", "我的周记"
				],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				Arr: [
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"},
					{time: "2022.01.03", week: "15", state: "已批阅", connectTime: "2022.01.02~2022.01.09"}
				]
			}
		},
		onLoad() {
			this.total = this.Arr.length
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 分页触发
			change(e) {
				console.log(e);
				console.log(this.$refs.table)
				
			}
			
		}
	}
</script>

<style>
	.selectItem {
		width: 400px;
		margin-left: 14px;
	}
	.weeklyTable{
		margin: 20px 14px;
		
	}
</style>
