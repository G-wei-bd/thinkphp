<template>
	<view>
		<view class="weeklyContainer">
			<uni-card title="周记详情">
				<uni-table stripe emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center">参与项目</uni-th>
						<uni-th align="center">实习岗位</uni-th>
						<uni-th align="center">实习时间</uni-th>
						<uni-th align="center">月记篇数</uni-th>
					</uni-tr>
					<uni-tr>
						<uni-td align="center">18网络工程实习</uni-td>
						<uni-td align="center">前端开发</uni-td>
						<uni-td align="center">2021.09.01 ~ 2022.01.31</uni-td>
						<uni-td align="center">12篇</uni-td>
					</uni-tr>
				</uni-table>
			</uni-card>
		</view>
		<view>
			<view class="selectItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#ff7700"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<textarea focus class="textContainer" placeholder="请输入文字,不少于300字" />
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
							<uni-tr v-for="(item,index) in Arr" :key="index">
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
					"写月记", "我的月记"
				],
				Arr: [{
						time: "2022.01.03",
						week: "1",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "2",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "3",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "4",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "5",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "6",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "7",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "8",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "9",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "10",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "11",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "12",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					}
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
			}

		}
	}
</script>

<style>
	.textContainer {
		width: 500px;
		height: 300px;
		padding: 10px;
		border: 1px solid #999999;
		border-radius: 5px;
		margin: 20px 14px;
	}

	.selectItem {
		width: 200px;
		margin-left: 14px;
	}

	.weeklyTable {
		margin: 20px 14px;
	}
</style>
