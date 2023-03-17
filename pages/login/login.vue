<template>
	<view class="content">
		<view class="login-image-content"><image style="width: 100%;height: 100%;position: fixed" class="login-bg" src="../../static/loginBgm.jpg"></image></view>
		<view class="login-container">
			<view class="login-box">
				<!-- <image class="login-logo" src="../../static/logo.png"></image> -->
				<view class="input-area">
					<view class="youqige-iconfont icon-gerenzhongxin login-icon"></view>
					<input class="user-name-inp" type="text" placeholder-style="color: #c1c1c1;" placeholder="输入用户名或手机号" v-model="user.loginname" />
				</view>
				<view class="input-area">
					<!-- <view class="youqige-iconfont icon-mima login-icon"></view> -->
					<view class="uni-input-wrapper">
						<input class="uni-input" v-model="user.password" placeholder="请输入密码" placeholder-style="color: #c1c1c1;" :password="showPassword" />
						<uni-icons v-if="showPassword" type="eye-slash" class="state-icon" @click="changePassword">&#xe568;</uni-icons>
						<uni-icons v-if="!showPassword" type="eye" class="state-icon" @click="changePassword">&#xe568;</uni-icons>
					</view>
					<!-- <input type="text" password="true" placeholder-style="color: #c1c1c1;" placeholder="输入密码" v-model="user.password"/> -->
				</view>
				<button type="primary" hover-class="button-hover" class="login-btn" @tap="trunToIndex">登录</button>
				<!-- 记住密码 -->
				<view class="remember-psw">
					<checkbox-group>
						<label>
							<checkbox value="psw" :checked="rememberPsw" @tap="rememberPsw = !rememberPsw" color="#09CC86" />
							记住账号密码
						</label>
					</checkbox-group>
				</view>
				<view class="login-tip">
					<text @tap="turnToForget">忘记密码</text>
					<text>|</text>
					<text @tap="turnToRegister">立即注册</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { login } from '@/http/login.js';
// import {md5} from '../../utils/md5.js';
import md5 from 'js-md5';
export default {
	data() {
		return {
			user: {
				loginname: '',
				password: ''
			},
			rememberPsw: true,
			showPassword: true
		};
	},
	mounted() {
		let that = this;
		//页面加载完成，获取本地存储的用户名及密码
		const userName = uni.getStorageSync('userName');
		const userPsw = uni.getStorageSync('userPsw');
		if (userName && userPsw) {
			that.user.loginname = userName;
			that.user.password = userPsw;
		} else {
			that.user.loginname = '';
			that.user.password = '';
		}
	},
	methods: {
		changePassword() {
			this.showPassword = !this.showPassword;
		},
		//跳转到忘记密码
		turnToForget() {
			// uni.navigateTo({ url: '../forget/forget'});
		},
		//跳转到注册
		turnToRegister() {
			// uni.navigateTo({ url: '../register/register'});
		},
		trunToIndex() {
			const that = this;
			uni.showLoading({ title: '努力登录中...', mask: true });
			let password = md5(that.user.password + 'b459dcbe8a3d46d49dfdc39c12df854e');
			let obj = {
				username: that.user.loginname,
				password: password,
				loginClient: 'app'
			};
			login(obj).then(msg => {
				if (msg.code === 200) {
					console.log(msg);
					uni.showToast({ title: msg, icon: 'none' });
					uni.hideLoading();
					uni.switchTab({ url: '../home/home' });
					uni.setStorageSync('token',msg.msg)
					uni.setStorageSync('userData',msg.data)
					//登录成功将用户名密码存储到用户本地
					if (that.rememberPsw) {
						//用户勾选“记住密码”
						uni.setStorageSync('userName', that.user.loginname);
						uni.setStorageSync('userPsw', that.user.password);
					} else {
						//用户没有勾选“记住密码”
						uni.removeStorageSync('userName');
						uni.removeStorageSync('userPsw');
						that.user.loginname = '';
						that.user.password = '';
					}
				} else {
					uni.showToast({ title: msg, icon: 'none' });
				}
			});
			// let obj = {
			// 	username: that.user.loginname,
			// 	password: password,
			// 	loginClient: 'app'
			// };
			// 			uni.request({
			// 				url: 'http://101.35.153.193:8001/repair/system/login',
			// 				method: 'post',
			// 				data: obj,
			// 				header: {
			// 					loginClient: 'app'
			// 				},

			// 				success: res => {
			// 					console.log(res);
			// 					uni.hideLoading();
			// 					uni.switchTab({ url: '../home/home' });
			// 					//登录成功将用户名密码存储到用户本地
			// 					if (that.rememberPsw) {
			// 						//用户勾选“记住密码”
			// 						uni.setStorageSync('userName', that.user.loginname);
			// 						uni.setStorageSync('userPsw', that.user.password);
			// 					} else {
			// 						//用户没有勾选“记住密码”
			// 						uni.removeStorageSync('userName');
			// 						uni.removeStorageSync('userPsw');
			// 						that.user.loginname = '';
			// 						that.user.password = '';
			// 					}
			// 				},
			// 				fail: msg => {
			// 					uni.showToast({ title: msg, icon: 'none' });
			// 				},
			// 				complete: () => {
			// 					uni.hideLoading();
			// 				}
			// 			});
			// else {
			//                     //登录成功获取用户信息
			//                     that.$api.getUserInfo(function(msg){
			//                         uni.hideLoading();
			//                         if(msg){
			//                             uni.showToast({ title: msg, icon: 'none'});
			//                         } else {
			//                             uni.redirectTo({ url: '../index/index'});
			//                         }
			//                     });

			//                 }
			// })
		}
	}
};
</script>
<style lang="scss">
::v-deep .uni-label-pointer {
	color: #ffffff !important;
}
.content {
	width: 100%;
	height: 100%;
	// position: fixed;
	.login-container {
		width: 100%;
	}
}
.login-container {
	position: absolute;
	top: 6rem;
	.login-box {
		padding: 3rem;
	}
	.login-btn {
		// width: 80%;
		margin: 2rem auto;
		align-items: center;
	}
}
.input-area {
	background-color: white;
	display: flex;
	padding: 5px;
	border-radius: 4px;
	margin-top: 1.5rem;
	// width: 80%;
	// margin: 1rem auto;
	align-items: center;

	> image {
		width: 40rpx;
		height: 40rpx;
	}
}
.login-tip {
	color: #ffffff;
	margin: 1rem auto;
	text-align: right;
}
.state-icon {
	position: absolute;
	right: 5px;
}
</style>
