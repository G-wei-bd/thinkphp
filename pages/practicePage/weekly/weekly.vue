<template>
	<view>
		<view v-if="isWeekly">
			<view class="selectItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
					activeColor="#ff7700"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="weeklyContainer">
						<uni-card title="周记详情">
							<uni-table stripe emptyText="暂无更多数据">
								<uni-tr>
									<uni-th align="center">参与项目</uni-th>
									<uni-th align="center">实习岗位</uni-th>
									<uni-th align="center">实习时间</uni-th>
									<uni-th align="center">周记篇数</uni-th>
									<uni-th align="center">操作</uni-th>
								</uni-tr>
								<uni-tr>
									<uni-td align="center">18网络工程实习</uni-td>
									<uni-td align="center">前端开发</uni-td>
									<uni-td align="center">2021.09.01 ~ 2022.01.31</uni-td>
									<uni-td align="center">20篇</uni-td>
									<uni-td align="center">
										<button class="btn btn-sm btn-primary" @click="isWriteWeekly">新建</button>
									</uni-td>
								</uni-tr>
							</uni-table>
						</uni-card>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="weeklyTable">
						<uni-table ref="table" border stripe emptyText="暂无更多数据">
							<uni-tr>
								<uni-th align="center">周记周数</uni-th>
								<uni-th align="center">提交时间</uni-th>
								<uni-th align="center">批阅状态</uni-th>
								<uni-th align="center">周记关联时间</uni-th>
								<uni-th align="center">更多</uni-th>
							</uni-tr>
							<uni-tr v-for="(item,index) in currentArr" :key="index">
								<uni-td align="center">{{ item.week }}</uni-td>
								<uni-td align="center">{{ item.time }}</uni-td>
								<uni-td align="center">{{ item.state }}</uni-td>
								<uni-td align="center">{{ item.connectTime }}</uni-td>
								<uni-td align="center">
									<button class="btn btn-sm btn-primary">查看</button>
								</uni-td>
							</uni-tr>
						</uni-table>
						<view class="paginationContainer">
							<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
								@change="change"></uni-pagination>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="m-3">
				<button class="btn btn-danger" @click="isWriteWeekly">返回</button>
			</view>
			<uni-forms ref="form" :modelValue="weeklyData" :rules="rules">
				<view class="writeWeekly">
					<uni-forms-item class="formsItem" required label="标题" name="weeklyTitle">
						<uni-easyinput class="easyInput" v-model="weeklyData.weeklyTitle" trim="all" placeholder="标题 1-20 字"  />
					</uni-forms-item>
					<uni-forms-item class="formsItem" required label="关联日期" name="weeklyTime">
						<uni-datetime-picker class="easyInput" type="daterange" :clearIcon="false"
							v-model="weeklyData.weeklyTime" rangeSeparator="至"
							@change="binddata('weeklyData',$event,)" />
					</uni-forms-item>
					<uni-forms-item class="formsItem" required label="周记内容" name="weeklyContent">
						<uni-easyinput class="textareaInput" v-model="weeklyData.weeklyContent" type="textarea" autoHeight maxlength="-1" trim="all" @input="wordCount" />
						<view class="small">已输入<text class="text-danger">{{wordsCount}} </text>/ 300 字</view>
					</uni-forms-item>
					<uni-forms-item class="formsItem" label="其他附件" name="otherFile">
						<uni-file-picker file-mediatype="all"></uni-file-picker>
					</uni-forms-item>
				</view>
			</uni-forms>
			<view class="submit">
				<button class="btn btn-danger" @click="weeklyUpload">发表</button>
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
				isWeekly: true,
				weeklyData: {
					weeklyTitle: '',
					weeklyTime: '',
					weeklyContent: '',
					otherFile: ''
				},
				rules: {
					weeklyTitle: {
						rules: [{
							required: true,
							errorMessage: "请填写周记标题"
						}]
					},
					weeklyTime: {
						rules: [{
							required: true,
							errorMessage: "请选择关联日期"
						}]
					},
					weeklyContent: {
						rules: [{
							required: true,
							errorMessage: "请填写周记内容"
						},
						{
							minLength: 300,
							errorMessage: '至少需要 {minLength} 个字',
						}]
					}
				},
				wordsCount: 0,
				// 每页数据量
				pageSize: 10,
				// 当前显示页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				// 显示在表格上的数据
				currentArr: [],
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
					},
					{
						time: "2022.01.03",
						week: "13",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "14",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "15",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "16",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "17",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "18",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "19",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "20",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "21",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "22",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "23",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "24",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "25",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "26",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "27",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "28",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "29",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "30",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					},
					{
						time: "2022.01.03",
						week: "31",
						state: "已批阅",
						connectTime: "2022.01.02~2022.01.09"
					}
				]
			}
		},
		onLoad() {
			this.total = this.Arr.length;
			this.currentArr = this.Arr.slice(10 * this.pageCurrent - 10, 10 * this.pageCurrent);
		},
		watch: {
			pageCurrent: function(newVal, oldVal) {

			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			isWriteWeekly(){
				this.isWeekly = !this.isWeekly;
			},
			// 分页触发
			change(e) {
				if (e.type == "next" || e.type == "prev") {
					this.currentArr = this.Arr.slice(10 * e.current - 10, 10 * e.current);
				}
				if (e.type == "current") {
					e.pageCurrent = e.current;
					this.currentArr = this.Arr.slice(10 * e.current - 10, 10 * e.current);
				}
			},
			wordCount(e){
				this.wordsCount = e.length;
			},
			weeklyUpload(){
				this.$refs.form.validate().then((res) => {
					
				}).catch((err) => {
					console.log(err)
				})
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

	.content {
		padding-bottom: 100px;
	}

	.selectItem {
		width: 300px;
		margin-left: 14px;
		margin-top: 20px;
	}

	.weeklyTable {
		margin: 20px 14px;
	}

	.paginationContainer {
		margin: 20px 0;
	}
	
	.formsItem{
		margin-left: 16px;
	}
	
	.easyInput{
		width: 250px;
	}
	
	.textareaInput{
		padding-right: 20px;
	}
</style>
