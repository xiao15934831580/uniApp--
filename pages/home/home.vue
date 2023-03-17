<template>
	<view>
		<uni-section title="待办事项" type="line" padding>
			<uni-grid :column="3" :square="false" @change="change">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box">
						<image class="image" :src="item.url" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
						<view v-if="item.badge" class="grid-dot"><uni-badge :text="item.badge" :type="item.type" /></view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-section>
		<uni-grid :column="4" :highlight="true" >
			<uni-grid-item v-for="(item, index) in todoList" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #fff;" @click="gopage(item.url)">
					<!-- <uni-icons type="image" :size="30" color="#777" /> -->
					<text class="text">{{ item.text }}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dynamicList: [],
			list: [
				{
					url: '/static/todo_item/DPX.png',
					text: '待派修',
					badge: '0',
					type: 'primary',
					value: 'DPX'
				},
				{
					url: '/static/todo_item/DYS.png',
					text: '待验收',
					badge: '1',
					type: 'DYS',
					type: 'primary',
					value: 'DYS'
				},
				{
					url: '/static/todo_item/DYS.png',
					text: '已处理',
					badge: '99',
					type: 'warning',
					value: 'YCL'
				},
				{
					url: '/static/todo_item/YBX.png',
					text: '已报修',
					badge: '2',
					type: 'error',
					value: 'YBX'
				},
				{
					url: '/static/todo_item/DFP.png',
					text: '待分配',
					badge: '2',
					type: 'error',
					value: 'DFP'
				},
				{
					url: '/static/todo_item/DWB.png',
					text: '待维保',
					badge: '2',
					type: 'error',
					value: 'DWB'
				},
				{
					url: '/static/todo_item/WBZ.png',
					text: '维保中',
					badge: '2',
					type: 'error',
					value: 'WBZ'
				},
				{
					url: '/static/todo_item/YYS.png',
					text: '已验收',
					badge: '2',
					type: 'error',
					value: 'YYS'
				},
				{
					url: '/static/todo_item/DTJ.png',
					text: '待提交',
					badge: '2',
					type: 'error',
					value: 'DTJ'
				}
			],
			todoList:[
				{
					url: '/pages/todoitem/repairapply/repairapply',
					text: '报修申请',
				},
				{
					url: '/pages/todoitem/repairapply',
					text: '报修单查询',
				},
				{
					url: '/pages/detail/detail',
					text: '保养申请',
				},
				{
					url: '/static/todo_item/DTJ.png',
					text: '保养单查询',
				},
				{
					url: '/static/todo_item/DTJ.png',
					text: '外来人登记',
				},
				{
					url: '/static/todo_item/DTJ.png',
					text: '外来人员登记记录',
				},
				{
					url: '/static/todo_item/DTJ.png',
					text: '违规登记',
				},
				{
					url: '/static/todo_item/DTJ.png',
					text: '违规历史记录',
				},
			]
		};
	},
	mounted() {
		// this.getData()
	},
	methods: {
		gopage(path){
			uni.navigateTo({
				url:path
			})
		},
		// getData(){
		// 	uni.request({
		// 		url: 'http://101.35.153.193:8001/repair/getTaskCount',
		// 		method: 'POST',
		// 		header: {
		// 		                'loginClient': 'app',
		// 						// 'Authorization':'1111'
		// 		            },
		// 		data: {},
		// 		success: res => {console.log(res)},
		// 		fail: (err) => {console.log(err)},
		// 		complete: () => {}
		// 	});
		// }
	}
};
</script>

<style lang="scss">
.image {
	width: 25px;
	height: 25px;
}

.text {
	font-size: 14px;
	margin-top: 5px;
}

.example-body {
	/* #ifndef APP-NVUE */
	// display: block;
	/* #endif */
}

.grid-dynamic-box {
	margin-bottom: 15px;
}

.grid-item-box {
	flex: 1;
	// position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px 0;
}

.grid-item-box-row {
	flex: 1;
	// position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 15px 0;
}

.grid-dot {
	position: absolute;
	top: 5px;
	right: 15px;
}

.swiper {
	height: 420px;
}

/* #ifdef H5 */
@media screen and (min-width: 768px) and (max-width: 1425px) {
	.swiper {
		height: 630px;
	}
}

@media screen and (min-width: 1425px) {
	.swiper {
		height: 830px;
	}
}

/* #endif */
</style>
