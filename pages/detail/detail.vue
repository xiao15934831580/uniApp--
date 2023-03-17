<template>
	<view>
		<text>我是详情页</text>
		<text>name:{{name}}</text>
		<text>sex:{{sex}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				sex:''
			}
		},
		onLoad(e) {
			console.log(e);
			const{name,sex} = e;
			this.name = name;
			this.sex = sex;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
