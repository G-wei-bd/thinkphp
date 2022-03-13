<template>
	<view>
		<view v-if="ismonthly">
			<view class="selectItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#ff7700"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="monthlyContainer">
						<uni-card title="月记详情">
							<uni-table stripe emptyText="暂无更多数据">
								<uni-tr>
									<uni-th align="center">参与项目</uni-th>
									<uni-th align="center">实习岗位</uni-th>
									<uni-th align="center">实习时间</uni-th>
									<uni-th align="center">月记篇数</uni-th>
									<uni-th align="center">操作</uni-th>
								</uni-tr>
								<uni-tr>
									<uni-td align="center">18网络工程实习</uni-td>
									<uni-td align="center">前端开发</uni-td>
									<uni-td align="center">2021.09.01 ~ 2022.01.31</uni-td>
									<uni-td align="center">{{currentArr.length}}篇</uni-td>
									<uni-td align="center">
										<button class="btn btn-sm btn-primary" @click="isWritemonthly">新建</button>
									</uni-td>
								</uni-tr>
							</uni-table>
						</uni-card>
					</view>
				</view>
				<view v-show="current === 1">
					<view v-show="!isCheck">
						<view class="monthlyTable">
							<uni-table ref="table" border stripe emptyText="暂无更多数据">
								<uni-tr>
									<uni-th align="center">序号</uni-th>
									<uni-th align="center">月记名称</uni-th>
									<uni-th align="center">提交时间</uni-th>
									<uni-th align="center">批阅状态</uni-th>
									<uni-th align="center">月记关联时间</uni-th>
									<uni-th align="center">更多</uni-th>
								</uni-tr>
								<uni-tr v-for="(item,index) in currentArr" :key="index">
									<uni-td align="center">{{ item.id }}</uni-td>
									<uni-td align="center">{{ item.monthly_title }}</uni-td>
									<uni-td align="center">{{ item.commit_time }}</uni-td>
									<uni-td align="center" class="text-danger font-weight-bold">{{ check[item.check] }}
									</uni-td>
									<uni-td align="center">{{ item.monthly_time }}</uni-td>
									<uni-td align="center">
										<button class="btn btn-sm btn-primary"
											@click="changeIsCheck(item.id)">查看</button>
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
							<button class="btn btn-danger btn-sm" @click="toBack">返回</button>
						</view>
						<uni-card title="月记详情">
							<view class="m-4">
								<view class="monthlyTitle text-center m-3">
									<text class="text-center font-weight-bold">{{monthly.monthly_title}}</text>
								</view>
								<view class="message text-center d-flex justify-content-between">
									<text>姓名：
										<text>{{monthly.user_name}}</text>
									</text>
									<text>提交时间：
										<text>{{monthly.commit_time}}</text>
									</text>
									<text>班级：
										<text>{{monthly.major_class}}</text>
									</text>
									<text>关联日期：
										<text>{{monthly.monthly_time}}</text>
									</text>
								</view>
							</view>
							<view class="monthlyMain">
								<text>{{monthly.content}}</text>
							</view>
						</uni-card>
						<view class="access m-4">
							<text class="font-weight-bold d-block text-center">指导老师评语</text>
							<view class="font-weight-bold">评分：
								<text class="text-danger">90</text>
							</view>
							<text class="d-block m-4">评语：
								<text>人生是充满希望的，未来也需要我们乘风破浪，勇于克服困难，才能更好地适应社会；注意疫情防护，不要到高风险地区，注意自身安全，佩戴口罩，多锻炼身体，照顾好自己，下月继续努力。</text>
							</text>
							<view class="teacherMes d-flex justify-content-between">
								<text>评阅人：
									<text>老师1</text>
								</text>
								<text>电话：
									<text>12345678909</text>
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="m-3">
				<button class="btn btn-danger" @click="isWritemonthly">返回</button>
			</view>
			<uni-forms ref="form" :modelValue="monthlyData" :rules="rules">
				<view class="writemonthly">
					<uni-forms-item class="formsItem" required label="标题" name="monthly_title">
						<uni-easyinput class="easyInput" v-model="monthlyData.monthly_title" trim="all"
							placeholder="标题 1-20 字" />
					</uni-forms-item>
					<uni-forms-item class="formsItem" required label="关联日期" name="monthly_time">
						<uni-datetime-picker class="easyInput" type="daterange" :clearIcon="false"
							v-model="monthlyData.monthly_time" rangeSeparator="至"
							@change="binddata('monthlyData',$event,)" />
					</uni-forms-item>
					<uni-forms-item class="formsItem" required label="月记内容" name="content">
						<uni-easyinput class="textareaInput" v-model="monthlyData.content" type="textarea" autoHeight
							maxlength="-1" trim="all" @input="wordCount" />
						<view class="small">已输入<text class="text-danger">{{wordsCount}} </text>/ 300 字</view>
					</uni-forms-item>
				</view>
			</uni-forms>
			<view class="submit">
				<button class="btn btn-danger" @click="monthlyUpload">发表</button>
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
				check: ['未审核', '已审核', '未通过'],
				ismonthly: true,
				isCheck: false,
				monthlyData: {
					monthly_title: '',
					monthly_time: '',
					content: '',
				},
				rules: {
					monthly_title: {
						rules: [{
							required: true,
							errorMessage: "请填写月记标题"
						}]
					},
					monthly_time: {
						rules: [{
							required: true,
							errorMessage: "请选择关联日期"
						}]
					},
					content: {
						rules: [{
								required: true,
								errorMessage: "请填写月记内容"
							},
							{
								minLength: 300,
								errorMessage: '至少需要 {minLength} 个字',
							}
						]
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
				currentArr: '',
				Arr: [],
				monthly: ''
			}
		},
		onLoad() {
			this.total = this.Arr.length;
			this.currentArr = this.Arr.slice(10 * this.pageCurrent - 10, 10 * this.pageCurrent);
			const value = uni.getStorageSync('user_info');
			const id = JSON.parse(value).id
			uni.request({
				url: 'http://127.0.0.1/index.php/monthly/search',
				method: 'GET',
				data: {id: id},
				success: res => {
					this.currentArr = res.data;
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
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				if (this.current == 1) {
					const value = uni.getStorageSync('user_info');
					const id = JSON.parse(value).id
					uni.request({
						url: 'http://127.0.0.1/index.php/monthly/search',
						method: 'GET',
						data: {id: id},
						success: res => {
							this.currentArr = res.data;
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			isWritemonthly() {
				this.ismonthly = !this.ismonthly;
			},
			changeIsCheck(e) {
				const id = e;
				uni.request({
					url: 'http://127.0.0.1/index.php/monthly/monthly',
					method: 'GET',
					data: {
						id: id
					},
					success: res => {
						this.monthly = res.data[0];
					},
					fail: () => {},
					complete: () => {}
				});
				this.isCheck = !this.isCheck;
			},
			toBack() {
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
			monthlyUpload() {
				const value = uni.getStorageSync('user_info');
				const userData = JSON.parse(value);
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				const commit_time = `${year}-${month}-${day}`;
				this.$refs.form.validate().then((res) => {
					res.user_name = userData.user_name;
					res.student_id = userData.id;
					res.major_class = userData.major_class;
					res.commit_time = commit_time;
					const formData = res;
					uni.request({
						url: 'http://127.0.0.1/index.php/monthly/index',
						method: 'GET',
						data: formData,
						success: res => {
							console.log(res.data);
							if (res.data == 1) {
								uni.showToast({
									title: "提交成功",
									icon: "success",
									duration: 1000
								});
								this.ismonthly = !this.ismonthly;
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

	.selectItem {
		width: 300px;
		margin-left: 14px;
		margin-top: 20px;
	}

	.monthlyTable {
		margin: 20px 14px;
	}

	.paginationContainer {
		margin: 20px 0;
	}

	.formsItem {
		margin-left: 16px;
	}

	.easyInput {
		width: 250px;
	}

	.textareaInput {
		padding-right: 20px;
	}

	.message {
		width: 700px;
	}

	.teacherMes {
		width: 300px;
	}
</style>
