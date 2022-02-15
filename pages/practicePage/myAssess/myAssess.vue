<template>
	<view>
		<view class="assessContainer">
			<view class="controlItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
					activeColor="#ff0000"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="twoParts">
						<uni-card title="我的实习评价">
							<uni-list>
								<uni-list-item title="参与计划" rightText="18实习"></uni-list-item>
								<uni-list-item title="参与时间" rightText="2021.09.01 ~ 2022.01.31"></uni-list-item>
								<uni-list-item title="指导老师" rightText="不知道"></uni-list-item>
								<uni-list-item title="是否评价" note="未评价">
									<view slot="footer">
										<button class="btn btn-danger btn-sm">添加评价</button>
									</view>
								</uni-list-item>
							</uni-list>
						</uni-card>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="twoParts">
						<uni-card title="我的实习评价">
							<uni-list>
								<uni-list-item title="参与计划" rightText="18实习"></uni-list-item>
								<uni-list-item title="参与时间" rightText="2021.09.01 ~ 2022.01.31"></uni-list-item>
								<uni-list-item title="指导老师" rightText="不知道"></uni-list-item>
								<uni-list-item title="是否评价" note="已评价">
									<view slot="footer">
										<button disabled class="btn btn-dark btn-sm">添加评价</button>
									</view>
								</uni-list-item>
							</uni-list>
						</uni-card>
					</view>
				</view>
				<view v-show="current === 2">
					<view class="allA">
						<view class="allAssess" v-for="(item, index) in arrData" :key="index">
							<uni-card title="我的实习评价">
								<uni-list>
									<uni-list-item title="参与计划">
										<view slot="footer">
											<text>{{item.name}}</text>
										</view>
									</uni-list-item>
									<uni-list-item title="参与时间">
										<view slot="footer">
											<text>{{item.time}}</text>
										</view>
									</uni-list-item>
									<uni-list-item title="指导老师">
										<view slot="footer">
											<text>{{item.teacher}}</text>
										</view>
									</uni-list-item>
									<uni-list-item title="是否评价">
										<view slot="footer">
											<text class="text-info">{{item.whetherAssess}}</text>
										</view>
									</uni-list-item>
								</uni-list>
							</uni-card>
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
					"未评价", "已评价", "全部评价"
				],
				arrData: [{
						name: '18实习',
						time: '2022-09-01 ~ 2023-01-01',
						teacher: '第一个老师',
						whetherAssess: '未评价'
					},
					{
						name: '19实习',
						time: '2022-10-01 ~ 2023-01-01',
						teacher: '第二个老师',
						whetherAssess: '已评价'
					},
					{
						name: '20实习',
						time: '2022-11-01 ~ 2023-01-01',
						teacher: '第三个老师',
						whetherAssess: '已评价'
					}
				]
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
		}
	}
</script>

<style>
	.assessContainer {
		width: 100%;
		margin-top: 20px;
	}

	.controlItem {
		width: 300px;
		margin-left: 30px;
	}

	.twoParts {
		width: 100%;
	}

	.rightContainer {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.allAssess {
		width: 33%;
	}
	
	.allA{
		display: flex;
		flex-wrap: wrap;
	}
</style>
