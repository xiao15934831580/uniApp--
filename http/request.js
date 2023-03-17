let baseURL = 'http://101.35.153.193:8001/repair';//公共api地址。示范
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + options.url, //接口地址：前缀+方法中传入的地址
			method: options.method || 'GET', //请求方法：传入的方法或者默认是“GET”
			data: options.data || {}, //传递参数：传入的参数或者默认传递空集合
			dataType:options.dataType || "json",
			header: {
			   'loginClient':'app', //自定义请求头信息
			   'Authorization':uni.getStorageSync('token'), //自定义请求头信息
			   // 'content-type':options.headers['Content-Type'] || 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			success: (res) => {
				console.log(res)
				if(res.data.code == 302){//用户另一端登录
					uni.showModal({
						title: '提示',
						content: res.data.msg,
						showCancel: false, 
						success: function (res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '/pages/login/login'
								});
							} 
						}
					});
				}else if(res.data.code == 500){
					 uni.showToast({
						title: res.data.msg,
						icon: 'none',
						mask: true,
						duration: 2000
					 });
				}else{
					// uni.showToast({
					// 	title: res.data.code,
					// 	icon: 'none',
					// 	mask: true,
					// 	duration: 2000
					// });
					resolve(res.data);
				}
				//返回的数据（不固定，看后端接口，这里是做了一个判断，如果不为true，用uni.showToast方法提示获取数据失败)
				// if (res.data.success != true) {
				// 	return uni.showToast({
				// 		title: '获取数据失败',
				// 		icon: 'none'
				// 	})
				// }
				// 如果不满足上述判断就输出数据
				
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				console.log( baseURL + options.url)
				console.log(err)
				reject(err)
			}
		})
	})
}
