<template>
	<view>
		<text>这是我的评价的页面，负责编写我的评价</text>
		<uni-rate v-model="value" allowHalf @change="onChange"/>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            value: 2
	        }
	    },
	    methods: {
	        onChange(e) {
	            console.log('rate发生改变:' + JSON.stringify(e))
	        }
	    }
	}
</script>

<style>

</style>
