<template>
	<view>
		<view class="messageContainer">
			<uni-list class="messageList">
				<uni-list :border="true">
					<!-- 头像显示角标 -->
					<uni-list-chat title="消息助手" link="navigateTo" to="../messageDetail/messageDetail"
						avatar="../../../static/logo.png"
						note="您收到一条新的消息" time="2022-02-22 22:22" badge-positon="left" badge-text="99"></uni-list-chat>
					<uni-list-chat title="学校" link="navigateTo" to="../messageDetail/messageDetail"
						avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						note="您收到一条新的消息" time="2022-02-22 22:22" badge-positon="left" badge-text="9"></uni-list-chat>
					<uni-list-chat title="老师" link="navigateTo" to="../messageDetail/messageDetail"
						avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						note="您收到一条新的消息" time="2022-02-22 22:22" badge-positon="left" badgeText="dot"></uni-list-chat>
					<uni-list-chat title="其他" link="navigateTo" to="../messageDetail/messageDetail"
						avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						note="您收到一条新的消息" time="2022-02-22 22:22" badge-positon="left" badge-text="2"></uni-list-chat>
				</uni-list>
			</uni-list>
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
	.messageContainer{
		
	}
</style>
