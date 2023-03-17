<template>
	<view class="container">
		<uni-section title="车辆信息" type="line">
			<view class="example">
				<!-- 基础表单校验 -->
				<uni-forms label-width="100" ref="valiForm" :rules="rules" :modelValue="valiFormData">
					<uni-forms-item label="报修单号" required name="billCode"><uni-easyinput v-model="valiFormData.billCode" placeholder="请输入报修单号" /></uni-forms-item>
					<uni-forms-item label="车辆编号" required name="carCode"><uni-easyinput v-model="valiFormData.carCode" placeholder="请输入车辆编号" /></uni-forms-item>
					<uni-forms-item label="车牌号 " required name="carNumber"><uni-easyinput v-model="valiFormData.carNumber" placeholder="请输入车辆编号" /></uni-forms-item>
					<uni-forms-item label="品牌型号" required name="carBrandType">
						<uni-easyinput v-model="valiFormData.carBrandType" placeholder="请输入车辆编号" />
					</uni-forms-item>
					<uni-forms-item label="紧急程度" required><uni-data-checkbox v-model="valiFormData.urgencyLevel" :localdata="urgencyLevelData" /></uni-forms-item>
					<uni-section title="故障明细" type="line" class="detailstyle">
						<view class="cardBox" v-for="(item, index) in valiFormData.repairDetails" :key="index">
							<p class="tableIndex">序号：{{index+1}}</p>
							<uni-icons @click="closeFault(index)" class="closeFault" type="closeempty" size="15" >
							</uni-icons>
							<uni-forms-item label="故障分类" required name="faultTypeLbl">
								<uni-data-select v-model="item.faultTypeLbl" :localdata="faultType"></uni-data-select>
							</uni-forms-item>
							<uni-forms-item label="故障部件" required name="faultPartLbl">
								<uni-data-select v-model="item.faultPartLbl" :localdata="faultPart"></uni-data-select>
							</uni-forms-item>
							<uni-forms-item label="故障现象" required name="faultSituationLbl">
								<uni-data-select v-model="item.faultSituationLbl" :localdata="faultSituation"></uni-data-select>
							</uni-forms-item>
							<uni-forms-item label="其他说明"><uni-easyinput type="textarea" v-model="item.otherDesc" placeholder="请输入其他说明" /></uni-forms-item>
						</view> 
						<button style="margin-top: 1rem;" size="mini" @click="addFault">添加故障明细</button>
					</uni-section>
				</uni-forms>
				<!-- <button type="primary" @click="submit('valiForm')">提交</button> -->
			</view>
		</uni-section>
	</view>
</template>

<script>
export default {
	data() {
		return {
			urgencyLevelData: [
				{
					text: '普通报修',
					value: 'PT'
				},
				{
					text: '紧急报修',
					value: 'JJ'
				}
			],
			faultType: [
				{ value: 'rwyy', text: '人为原因' },
				{ value: 'wbyy', text: '外部原因' },
				{ value: 'aqbhzz', text: '安全保护装置' },
				{ value: 'kzxt', text: '控制系统' },
				{ value: 'dqxt', text: '电气系统' },
				{ value: 'qita', text: '其他' }
			],
			faultPart: [
				{ value: 'fdj', text: '发动机' },
				{ value: 'cyj', text: '柴油机' },
				{ value: 'lt', text: '轮胎' },
				{ value: 'cq', text: '车桥' },
				{ value: 'cd', text: '铲斗' },
				{ value: 'zy', text: '座椅' }
			],
			faultSituation: [{ value: 'yx', text: '异响' }, { value: 'sh', text: '损坏' }, { value: 'gz', text: '故障' }],
			valiFormData: {
				billCode: '', //报修单号
				carCode: '', //车辆编号
				carNumber: '', //车牌号
				carBrandType: '', //品牌型号
				urgencyLevel: 'PT',
				dropDowns: {
					faultPart: ['发动机', '柴油机', '轮胎', '车桥', '铲斗', '座椅'],
					faultSituation: ['异响', '损坏', '故障'],
					faultType: ['人为原因', '外部原因', '安全保护装置', '控制系统', '电气系统', '其他']
				},
				repairDetails: [
					{
						faultTypeLbl: 'qita',
						faultPartLbl: '',
						faultSituationLbl: '',
						otherDesc: ''
					}
				],
				apvDetails: [
					{
						apvDesc: '已审批',
						apvTime: '2023-06-03'
					},
					{
						name: '待审批',
						time: '2023-06-03'
					},
					{
						name: '待审批',
						time: '2023-06-03'
					},
					{
						name: '待审批',
						time: '2023-06-03'
					}
				]
			},
			rules: {
				name: {
					rules: [
						{
							required: true,
							errorMessage: '姓名不能为空'
						}
					]
				},
				age: {
					rules: [
						{
							required: true,
							errorMessage: '年龄不能为空'
						},
						{
							format: 'number',
							errorMessage: '年龄只能输入数字'
						}
					]
				}
			}
		};
	},
	methods: {
		closeFault(index){
		  this.valiFormData.repairDetails.splice(index,1)
		},
		addFault(){
		  let obj = {
		      faultTypeLbl: "",
		      faultPartLbl: "",
		      faultSituationLbl: "",
		      otherDesc: "",
		    }
		   this.valiFormData.repairDetails.push(obj)
		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep .uni-data-checklist .checklist-group .checklist-box {
	margin: 10px 25px 10px 0;
}
::v-deep .detailstyle .uni-section-header {
	margin: -15px;
	margin-bottom: 8rpx;
}
::v-deep .uni-section-content .cardBox{
	padding-top: 1.9rem;
}
::v-deep .detailstyle>.uni-section .uni-section-content{
	    border: 1px solid rgb(229, 229, 229);
	    padding: 1rem;
	    border-radius: 1rem;
}
.example {
	padding: 15px;
	background-color: #fff;
}

.segmented-control {
	margin-bottom: 15px;
}

.button-group {
	margin-top: 15px;
	display: flex;
	justify-content: space-around;
}

.form-item {
	display: flex;
	align-items: center;
}

.button {
	display: flex;
	align-items: center;
	height: 35px;
	margin-left: 10px;
}
.cardBox {
  // padding-top: 1.2rem;
  // background-color: #ffffff;
  // margin: .16rem;
  // border-radius: 0.21333rem;
  position: relative;
  border: 1px solid rgb(229, 229, 229);
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
  .closeFault{
    font-size: .4rem;
    position: absolute;
    top: .4rem;
    right: .4rem;
  }
  .tableIndex{
    font-size: .4rem;
    position: absolute;
    top: .4rem;
    left:.4rem;
    font-weight: 600;
  }
}
</style>
