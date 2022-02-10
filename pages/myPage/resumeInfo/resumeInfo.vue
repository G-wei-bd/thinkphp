<template>
	<view>
		<view class="resume">
			<uni-collapse>
				<uni-collapse-item title="求职意向">
					<view class="firstForm">
						<uni-forms ref="firstForm">
							<uni-forms-item label="期望岗位" name="">
								<uni-easyinput v-model="firstFormData.post" placeholder="请输入期待岗位" />
							</uni-forms-item>
							<uni-forms-item label="期望城市" name="">
								<uni-easyinput v-model="firstFormData.city" placeholder="请选择城市" />
							</uni-forms-item>
							<uni-forms-item label="期望薪资" name="">
								<uni-easyinput v-model="firstFormData.salary" placeholder="请输入期望薪资" />
							</uni-forms-item>
							<uni-forms-item label="实习时长" name="">
								<uni-easyinput v-model="firstFormData.time" placeholder="请选择实习时长" />
							</uni-forms-item>
							<uni-forms-item label="到岗时间" name="">
								<uni-easyinput v-model="firstFormData.arriveTime" placeholder="请选择到岗时间" />
							</uni-forms-item>
						</uni-forms>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="个人信息">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="教育经历">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="实习经历">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="项目经验">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="个人优势">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="获得荣誉">
					<text>折叠内容</text>
				</uni-collapse-item>
				<uni-collapse-item title="其他">
					<text>折叠内容</text>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstFormData: {
					post:'',
					city:'',
					salary: '',
					time: '',
					arriveTime: ''
					
				}
			}
		},
		methods: {

		}
	}
</script>

<style>
	.resume {
		padding: 10px 50px;
		margin: 10px;
		background-color: #bfa;
	}
	
	.firstForm{
		width: 200px;
		margin-left: 30px;
		background-color: #999;
	}
</style>
