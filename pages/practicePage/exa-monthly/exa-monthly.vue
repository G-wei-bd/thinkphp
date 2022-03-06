<template>
	<view>
		<view v-if="isWeekly" class="weeklyContainer">
			<uni-card title="月记">
				<uni-table stripe emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center">学生姓名</uni-th>
						<uni-th align="center">参与项目</uni-th>
						<uni-th align="center">实习岗位</uni-th>
						<uni-th align="center">实习时间</uni-th>
						<uni-th align="center">提交月记篇数</uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr>
						<uni-td align="center">学生1</uni-td>
						<uni-td align="center">18网络工程实习</uni-td>
						<uni-td align="center">前端开发</uni-td>
						<uni-td align="center">2021.09.01 ~ 2022.01.31</uni-td>
						<uni-td align="center">6篇</uni-td>
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
					<text class="text-danger">学生1<text class="text-primary">的月记详情</text></text>
					<uni-table ref="table" border stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">月记月数</uni-th>
							<uni-th align="center">提交时间</uni-th>
							<uni-th align="center">批阅状态</uni-th>
							<uni-th align="center">月记关联时间</uni-th>
							<uni-th align="center">更多</uni-th>
						</uni-tr>
						<uni-tr v-for="(item,index) in currentArr" :key="index">
							<uni-td align="center">{{ item.week }}</uni-td>
							<uni-td align="center">{{ item.time }}</uni-td>
							<uni-td align="center">{{ item.state }}</uni-td>
							<uni-td align="center">{{ item.connectTime }}</uni-td>
							<uni-td align="center">
								<button class="btn btn-sm btn-primary" @click="changeIsCheck">查看</button>
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
					<button class="btn btn-danger btn-sm" @click="changeIsCheck">返回</button>
				</view>
				<uni-card title="月记详情">
					<view class="m-4">
						<view class="weeklyTitle text-center m-3">
							<text class="text-center font-weight-bold">第二月月记</text>
						</view>
						<view class="message text-center d-flex justify-content-between">
							<text>姓名：
								<text>学生1</text>
							</text>
							<text>专业：
								<text>1班</text>
							</text>
							<text>班级：
								<text>1班</text>
							</text>
							<text>关联日期：
								<text>2020-01-01~2020-09-01</text>
							</text>
						</view>
					</view>
					<view class="weeklyMain">
						<text>很快就到春节了，春节的到来就意味着我的工作就已经准备告一段落。其实我在想在这段时间的实习过程中我自己有没有做好进入这个社会的各方面的准备呢。我想也许我已经做好了大部分的准备了，不管是心态上也好、生活上、工作上也好，在这个实习的过程中我们每一个人都在不知不觉中做好了准备，在对这个社会做出适合自己的改变。也许我们从来也没有发觉到这一点。我想这也许就是我们实习最大的意义吧。对于每一个刚出校门的我们，身上有太多的锐气以及傲气。我们就像是刚出山上开凿下来的石头，有太多的棱角。而这实习的几个月就像是把我们打磨得更加的圆滑去适应社会。只有这样子才能让我们更好的去适应这个社会，而不被社会所淘汰。这个实习让我能够及时明白：社会不是我们想象的这么简单，还有很长的路要走呢。</text>
					</view>
				</uni-card>
				<view class="access m-4">
					<text class="d-block m-3 text-center font-weight-bold">教师评价</text>
					<uni-forms ref="form" :modelValue="scoreData">
						<uni-forms-item label="分数" name="score">
							<uni-easyinput style="width: 200px;" type="number" v-model="scoreData.score" placeholder="请输入分数" />
						</uni-forms-item>
						<uni-forms-item label="评语" name="accessTitle">
							<uni-easyinput style="width: 400px;" type="textarea" autoHeight v-model="scoreData.accessTitle" placeholder="请输入评语" />
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
				isWeekly: true,
				isCheck: false,
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
					}
				],
				scoreData: {
					score: '',
					accessTitle: ''
				}
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
			isWriteWeekly() {
				this.isWeekly = !this.isWeekly;
			},
			changeIsCheck() {
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
			weeklyUpload() {
				this.$refs.form.validate().then((res) => {

				}).catch((err) => {
					console.log(err)
				})
			},
			submitAccess(e){
				this.$refs.form.validate().then((res) => {
					console.log(e);
					console.log(this.scoreData);
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
	
	.teacherMes{
		width: 300px;
	}
</style>
