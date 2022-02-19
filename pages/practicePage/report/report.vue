<template>
	<view>
		<view>
			<view class="selectItem">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#ff7700"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="twoParts">
						<uni-card title="我的实习评价">
							<uni-list>
								<uni-list-item title="参与计划" rightText="18实习"></uni-list-item>
								<uni-list-item title="参与时间" rightText="2021.09.01 ~ 2022.01.31"></uni-list-item>
								<uni-list-item title="指导老师" rightText="不知道"></uni-list-item>
								<uni-list-item title="是否提交" note="未提交">
									<view slot="footer">
										<button class="btn btn-danger btn-sm" @click="openPopup">提交实习报告</button>
									</view>
								</uni-list-item>
							</uni-list>
						</uni-card>
					</view>
					<uni-popup ref="popup" type="center">
						<view class="popupContainer">
							<view>
								<text class="text-primary">请上传实习报告，建议大小不超过 20M</text>
							</view>
							<view class="submitFile">
								<uni-file-picker v-model="imageValue" file-mediatype="all" :image-styles="imageStyles"
									mode="grid" limit="1" @select="select" @progress="progress" @success="success"
									@fail="fail">
								</uni-file-picker>
							</view>
						</view>
					</uni-popup>
				</view>
				<view v-show="current === 1">
					<text>这是进行中的</text>
				</view>
				<view v-show="current === 2">
					<text>这是待审核</text>
				</view>
				<view v-show="current === 3">
					<text>这是已审核</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDisplay: true,
				current: 0,
				items: [
					"全部", "进行中", "待审核", "已审核"
				],
				imageValue: [],
				imageStyles: {
					border: true,
					width: 100,
					height: 100,
					borderStyle: {
						width: 1,
						color: '#bfa',
						redius: 10
					}
				}
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			openPopup() {
				this.$refs.popup.open();
			}
		}
	}
</script>

<style>
	.selectItem {
		width: 400px;
		margin-left: 14px;
	}
	
	.popupContainer{
		width: 300px;
		height: 220px;
		padding: 20px 10px;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
