<template>
	<view>
		<view v-if="isWeekly" class="weeklyContainer">
			<uni-card title="月记">
				<uni-table stripe emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center">参与项目</uni-th>
						<uni-th align="center">实习时间</uni-th>
						<uni-th align="center">审核月记篇数</uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr>
						<uni-td align="center">{{title.name}}</uni-td>
						<uni-td align="center">{{title.time}}</uni-td>
						<uni-td align="center" class="text-danger">{{Arr.length}}篇</uni-td>
						<uni-td align="center">
							<button class="btn btn-sm btn-primary" @click="isWriteWeekly">查看</button>
						</uni-td>
					</uni-tr>
				</uni-table>
			</uni-card>
		</view>
		<view v-else>
			<view v-show="!isCheck">
				<view class="goBack m-3">
					<button class="btn btn-sm btn-danger" @click="isWriteWeekly">返回</button>
				</view>
				<view class="weeklyTable">
					<uni-table ref="table" border stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">序号</uni-th>
							<uni-th align="center">学生姓名</uni-th>
							<uni-th align="center">月记月数</uni-th>
							<uni-th align="center">提交时间</uni-th>
							<uni-th align="center">批阅状态</uni-th>
							<uni-th align="center">月记关联时间</uni-th>
							<uni-th align="center">更多</uni-th>
						</uni-tr>
						<uni-tr v-for="(item,index) in currentArr" :key="index">
							<uni-td align="center">{{ index + 1 }}</uni-td>
							<uni-td align="center">{{ item.user_name }}</uni-td>
							<uni-td align="center">{{ item.monthly_title }}</uni-td>
							<uni-td align="center">{{ item.commit_time }}</uni-td>
							<uni-td align="center" class="text-danger font-weight-bold">{{ checkList[item.check] }}</uni-td>
							<uni-td align="center">{{ item.monthly_time }}</uni-td>
							<uni-td align="center">
								<button class="btn btn-sm btn-primary" @click="changeIsCheck(index)">查看</button>
							</uni-td>
						</uni-tr>
					</uni-table>
					<view class="paginationContainer">
						<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
							@change="change"></uni-pagination>
					</view>
				</view>
			</view>
			<view v-show="isCheck">
				<view class="m-3">
					<button class="btn btn-danger btn-sm" @click="goback">返回</button>
				</view>
				<uni-card title="月记详情">
					<view class="m-4">
						<view class="weeklyTitle text-center m-3">
							<text class="text-center font-weight-bold">{{detailMonthly.monthly_title}}</text>
						</view>
						<view class="message text-center d-flex justify-content-between">
							<text>姓名：
								<text>{{detailMonthly.user_name}}</text>
							</text>
							<text>班级：
								<text>{{detailMonthly.major_class}}</text>
							</text>
							<text>提交日期：
								<text>{{detailMonthly.commit_time}}</text>
							</text>
							<text>关联日期：
								<text>{{detailMonthly.monthly_time}}</text>
							</text>
						</view>
					</view>
					<view class="weeklyMain">
						<text>{{detailMonthly.content}}</text>
					</view>
				</uni-card>
				<view class="access m-4">
					<text class="d-block m-3 text-center font-weight-bold">教师评价</text>
					<uni-forms ref="form" :modelValue="scoreData">
						<uni-forms-item label="分数" name="score">
							<uni-easyinput style="width: 200px;" type="number" v-model="scoreData.score"
								placeholder="请输入分数" />
						</uni-forms-item>
						<uni-forms-item label="评语" name="access">
							<uni-easyinput style="width: 400px;" type="textarea" autoHeight trim="all"
								v-model="scoreData.accessTitle" placeholder="请输入评语" />
						</uni-forms-item>
					</uni-forms>
					<view class="text-center">
						<button style="width: 200px;" class="btn btn-danger" @click="submitAccess">提交</button>
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
				teacher_id: '',
				title:'',
				isWeekly: true,
				isCheck: false,
				checkList: ['未审核', '已审核'],
				check: 0,
				wordsCount: 0,
				// 每页数据量
				pageSize: 10,
				// 当前显示页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				// 显示在表格上的数据
				currentArr: [],
				Arr: [],
				detailMonthly: '',
				monthly_id: '',
				scoreData: {
					score: '',
					access: ''
				}
			}
		},
		onLoad() {
			const value = uni.getStorageSync('user_info');
			this.teacher_id = JSON.parse(value).phone_num;
			const id = this.teacher_id;
			uni.request({
				url: 'http://127.0.0.1/index.php/monthly/title',
				method: 'GET',
				data: {
					id
				},
				success: res => {
					console.log(res.data);
					this.title = res.data[0];
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: 'http://127.0.0.1/index.php/monthly/studentmonthly',
				method: 'GET',
				data: {
					id
				},
				success: res => {
					console.log(res.data);
					this.Arr = res.data;
					this.total = this.Arr.length;
					this.currentArr = this.Arr.slice(10 * this.pageCurrent - 10, 10 * this.pageCurrent);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		watch: {
			pageCurrent: function(newVal, oldVal) {

			}
		},
		methods: {
			isWriteWeekly() {
				this.isWeekly = !this.isWeekly;
			},
			changeIsCheck(e) {
				this.detailMonthly = this.currentArr[e];
				this.isCheck = !this.isCheck;
			},
			goback() {
				this.isCheck = !this.isCheck;
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
			wordCount(e) {
				this.wordsCount = e.length;
			},
			submitAccess(e) {
				this.$refs.form.validate().then((res) => {
					const id = this.detailMonthly.id;
					const score = this.scoreData.score;
					const access = this.scoreData.access;
					uni.request({
						url: 'http://127.0.0.1/index.php/monthly/commit',
						method: 'GET',
						data: {
							id,
							score,
							access
						},
						success: res => {
							if (res.data == 1) {
								uni.showToast({
									title: '提交成功',
									icon:"success",
									duration: 1000
								});
								uni.request({
									url: 'http://127.0.0.1/index.php/weekly/studentweekly',
									method: 'GET',
									data: {
										id
									},
									success: res => {
										this.Arr = res.data;
									},
									fail: () => {},
									complete: () => {}
								});
								this.isCheck = !this.isCheck;
								uni.reLaunch({
									url: '/pages/practicePage/exa-monthly/exa-monthly'
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
					
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

	.weeklyTable {
		margin: 20px 14px;
	}

	.formsItem {
		margin-left: 16px;
	}

	.message {
		width: 700px;
	}

	.teacherMes {
		width: 300px;
	}
</style>
