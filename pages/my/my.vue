<template>
	<view>
		<button @tap="logut">退出登录</button>
	</view>
</template>

<script>
	import { loginOut } from '@/http/login.js';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logut(){
				loginOut(()=>{
					if(res){
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}
				})

			}
		}
	}
</script>

<style>

</style>
