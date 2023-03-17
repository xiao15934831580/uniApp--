<!-- vue-base  生成标签 -->
<template>
	<!-- div,h1标签属于web标签，无法自动转化为小程序或者app
	必须使用官方提供的兼容性标签 view，text...开发出来的软件才能适配app或者小程序 -->
	<!-- <div>
		<h1>你好呀</h1>
	</div> -->
	<view class="">
		<text>你好呀</text>
		<navigator :url="`/pages/detail/detail?name=${name}&sex=${sex}`">详情</navigator>
		</br>
		<button type="default" size="mini" @click="godetail()">详情页。。。</button>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				name:'hello',
				sex:'man'
			}
		},
		methods:{	
			godetail(){
				uni.navigateTo({
					url:`/pages/detail/detail?name=${this.name}&sex=${this.sex}`,
					success:res=>{},
					fail: () => {},
					complete: () => {}
				})
			}
		}
	}
</script>

<style scoped>

</style>