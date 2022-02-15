<template>
	<view>
		<view class="steps">
			<uni-card title="实习进度" extra="无额外信息">
				当前实习计划进度
				<uni-steps
					:options="[{title:'事件一'},{title:'事件二'},{title:'事件三'},{title:'事件四'},{title:'事件五'},{title:'事件六'},{title:'事件七'}]"
					:active=active activeColor="#ff0000"></uni-steps>
				<view class="step-icons">
					<view class="detailStep" v-for="(item, index) in stepList" :key="index">
						<text class="iconfont icon-shijian"></text>
						<text>{{item.index}}</text>
					</view>
				</view>
			</uni-card>
			<button class="btn btn-info btn-sm" type="default" @click="add">前进</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				stepList:[
					{id:1,index: '岗位申请通过'},
					{id:2,index: '三方协议通过'},
					{id:3,index: '提交周/日志'},
					{id:4,index: '提交我的评价'},
					{id:5,index: '提交企业评定'},
					{id:6,index: '提交自我鉴定'},
					{id:7,index: '提交实习报告'}
						]
			}
		},
		methods: {
			add() {
				if (this.active < 6) {
					this.active++;
				} else {
					this.active = 0;
				}
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.step-icons{
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
	.detailStep{
		width: 60px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.select-step{
		color: #94bcff;
	}
	.iconfont{
		font-size: 26px;
	}
</style>
