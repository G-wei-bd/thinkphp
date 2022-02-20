<template>
	<view>
		<view class="practiceContainer">
			<uni-card title="实习情况" extra="额外信息">
				<uni-list>
					<uni-list-item title="实习计划" rightText="18网络工程 生产实习"></uni-list-item>
					<uni-list-item title="实践课程" rightText="生产实习"></uni-list-item>
					<uni-list-item title="实践周数" rightText="20周"></uni-list-item>
					<uni-list-item title="参与实习时间" rightText="2021-09-01~2022-01-28"></uni-list-item>
					<uni-list-item title="参与状态">
						<text class="text-danger text-right small" slot="footer">已参与</text>
					</uni-list-item>
					<uni-list-item title="实习岗位" rightText="前端开发"></uni-list-item>
					<uni-list-item title="实习指导老师" rightText="不知道"></uni-list-item>
					<uni-list-item title="实习进展">
						<view class="text-warning" slot="footer">
							<uni-tag class="footer" text="三方协议" size="small" type="primary" circle @click="agreement"></uni-tag>	
							<uni-tag class="footer" text="周记" size="small" type="primary" circle @click="weekly"></uni-tag>	
							<uni-tag class="footer" text="实习材料" size="small" type="primary" circle></uni-tag>	
						</view>
					</uni-list-item>
				</uni-list>
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
			agreement(){
				uni.navigateTo({
					url: '/pages/practicePage/agreement/agreement',
				});
			},
			weekly(){
				uni.navigateTo({
					url: '/pages/practicePage/weekly/weekly',
				});
			},
			
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.footer{
		margin-right: 10px;
	}
</style>

