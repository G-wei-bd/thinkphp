<template>
	<view>
		<view class="assessContainer">
			<view class="twoParts">
				<uni-card title="我的实习评价">
						<uni-list>
							<uni-list-item title="参与计划" rightText="18实习"></uni-list-item>
							<uni-list-item title="参与时间" rightText="2021.09.01 ~ 2022.01.31"></uni-list-item>
							<uni-list-item title="指导老师" rightText="不知道"></uni-list-item>
							<uni-list-item title="是否评价" note="未评价">
								<view slot="footer">
									<button class="btn btn-danger btn-sm">成绩鉴定</button>
								</view>
							</uni-list-item>
						</uni-list>
				</uni-card>
			</view>
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
	.assessContainer{
		display: flex;
	}
	.twoParts{
		width: 100%;
	}
	.rightContainer{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
