<template>
	<view class="container container329009">
		<u-form :model="form" :rules="formRules" :errorType="['message', 'toast']" ref="formRef" class="flex diygw-form diygw-col-24">
			<u-form-item labelWidth="auto" class="diygw-col-24" label="是否打开预测：" prop="isopen">
				<view class="flex diygw-col-24">
					<u-switch :size="44" :activeValue="true" :inactiveValue="false" inactiveTextColor="#000000" activeTextColor="#ffffff" v-model="form.isopen" slot="right"></u-switch>
				</view>
			</u-form-item>
			<u-form-item labelWidth="auto" class="diygw-col-24" label="是否打开投注：" prop="isTouzhu">
				<view class="flex diygw-col-24">
					<u-switch :size="44" :activeValue="true" :inactiveValue="false" inactiveTextColor="#000000" activeTextColor="#ffffff" v-model="form.isTouzhu" slot="right"></u-switch>
				</view>
			</u-form-item>
			<u-form-item labelWidth="auto" class="diygw-col-24" label="是否根据预算做关闭：" prop="isColseByMoney">
				<view class="flex diygw-col-24">
					<u-switch :size="44" :activeValue="true" :inactiveValue="false" inactiveTextColor="#000000" activeTextColor="#ffffff" v-model="form.isColseByMoney" slot="right"></u-switch>
				</view>
			</u-form-item>
			<u-form-item labelWidth="auto" class="diygw-col-24" label="本钱：" prop="initmoney">
				<u-input :focus="formData.initmoney" placeholder="请输入整数" v-model="form.initmoney"></u-input>
			</u-form-item>
			
			<u-form-item labelWidth="auto" class="diygw-col-24" label="是否根据次数投注关闭：" prop="isColseByCount">
				<view class="flex diygw-col-24">
					<u-switch :size="44" :activeValue="true" :inactiveValue="false" inactiveTextColor="#000000" activeTextColor="#ffffff" v-model="form.isColseByCount" slot="right"></u-switch>
				</view>
			</u-form-item>
			<u-form-item labelWidth="auto" class="diygw-col-24" label="几次不中关闭：" prop="nocount">
				<u-input :focus="formData.nocount" placeholder="请输入整数" v-model="form.nocount"></u-input>
			</u-form-item>
			
			
			<u-form-item labelWidth="auto" class="diygw-col-24" label="最新期数获取：" prop="qishu">
				<u-input :focus="formData.qishuFocus" placeholder="请输入整数" v-model="form.qishu"></u-input>
			</u-form-item>
			<u-form-item labelWidth="auto" class="diygw-col-24" label="自定义预测次数：" prop="onceNum">
				<u-input :focus="formData.onceNumFocus" placeholder="请输入整数" v-model="form.onceNum"></u-input>
			</u-form-item>
			<u-form-item labelWidth="auto" class="diygw-col-24" label="自定义预测组数：" prop="countNum">
				<u-input :focus="formData.countNumFocus" placeholder="请输入整数" v-model="form.countNum"></u-input>
			</u-form-item>
			<u-form-item labelWidth="auto" class="diygw-col-24" label="每次投注几个号：" prop="countZu">
				<u-input :focus="formData.countZuFocus" placeholder="请输入整数" v-model="form.countZu"></u-input>
			</u-form-item>
			<u-form-item class="diygw-col-24 diygw-form-item-top" label="算法类型" prop="suanfatype">
				<u-radio-group class="flex flex-wrap diygw-col-24 flex-direction-column justify-between" wrapClass="flex-direction-column justify-between" v-model="form.suanfatype">
					<u-radio shape="circle" v-for="(suanfatypeitem, suanfatypeindex) in formData.suanfatypeDatas" :key="suanfatypeindex" :name="suanfatypeitem.value">
						{{ suanfatypeitem.label }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item class="diygw-col-24" label="路数" prop="lushu">
				<u-checkbox-group class="flex flex-wrap diygw-col-24 justify-start" wrapClass=" justify-start" v-model="form.lushu">
					<u-checkbox v-for="(lushuitem, lushuindex) in formData.lushuDatas" :key="lushuindex" :name="lushuitem.value">
						{{ lushuitem.label }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item class="diygw-col-24" label="投注金额" prop="createmoney">
				<u-input :focus="formData.createmoneyFocus" placeholder="请输入投注金额" v-model="form.createmoney"></u-input>
			</u-form-item>
			<button class="diygw-col-24 btn-clz diygw-btn-default" @click="submitForm">提 交</button>
		</u-form>
		<button class="diygw-col-24 btn-clz diygw-btn-default" @click="resultContent" style="margin-top: 20px;" >刷新结果</button>
		<rich-text :nodes="text1" class="diygw-col-24 text1-clz text-black" style="height: 100px;margin-top: 20px;">   </rich-text>
		<button class="diygw-col-24 red btn1-clz diygw-btn-default"  @click="truncateResult">清空结果</button>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: {},
				 intervalId: null,
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {},
				text1:'显示内容',
				form: {
					isopen: false,
					isTouzhu: false,
					isColseByMoney: false,
					isColseByCount: false,
					qishu: '',
					onceNum: '',
					countNum: '',
					countZu: '',
					initmoney:'',
					nocount:'',
					suanfatype: '无',
					lushu: [],
					createmoney: '1'
				},
				formRules: {},
				formData: {
					qishuFocus: false,
					onceNumFocus: false,
					countNumFocus: false,
					suanfatypeDatas: [
							{ value: '1', label: '阿基米德', checked: true },
							{ value: '2', label: '高斯', checked: false },
							{ value: '3', label: '祖冲之', checked: false },
							{ value: '4', label: '希尔伯特', checked: false },
							{ value: '5', label: '莱布尼茨', checked: false },
							{ value: '6', label: '图灵', checked: false },
							{ value: '7', label: '乔布斯', checked: false }
						],
					lushuDatas: [
						{ value: '1', label: '1' },
						{ value: '2', label: '2' },
						{ value: '3', label: '3' },
						{ value: '4', label: '4' },
						{ value: '5', label: '5' },
						{ value: '6', label: '6' },
						{ value: '7', label: '7' },
						{ value: '8', label: '8' },
						{ value: '9', label: '9' },
						{ value: '10', label: '10' }
					],
					moneyFocus: false
				}
			};
		},
		onShow() {
			this.setCurrentPage(this);
		},
		onLoad(option) {
			this.setCurrentPage(this);
			if (option) {
				this.setData({
					globalOption: this.getOption(option)
				});
			}

			this.initdata();
 
		},
		onReady() {
			this.$refs.formRef?.setRules(this.formRules);
		},
		methods: {
			async init() {
				await this.initResetform();
 
			},
			initResetform() { 
				
				// this.initform = JSON.stringify(this.form);
				//如果想给表单默认初始值，其中row为某一行数据也可能是API返回的结果集，然后给到this.form
				//this.form = this.$tools.changeRowToForm(row,this.form)
			},
			resetForm() {
				this.form = JSON.parse(this.initform);
			},
			
			async initdata(){ 
					let http_header = {};
					const http_url = '/cpapi/api/cp/initdata'
					let http_data = {
					};
					let res = await this.$http.get(http_url, http_data); 
					if (res.code == 200) {
						
						let infostr=res.data;
						if(infostr!=""){ 
						
							let bb=infostr.lushu.split(",");
							infostr.lushu=bb;
							
							this.form.isTouzhu=infostr.isTouzhu;
							this.form.isopen=infostr.isopen;
							this.form.qishu=infostr.qishu;
							this.form.onceNum=infostr.onceNum;
							this.form.countNum=infostr.countNum;
							this.form.countZu=infostr.countZu;
							this.form.suanfatype=infostr.suanfatype;
							this.form.lushu=infostr.lushu;
							this.form.createmoney=infostr.createmoney;
							this.form.isColseByMoney=infostr.isColseByMoney;
							this.form.isColseByCount=infostr.isColseByCount;
							this.form.initmoney=infostr.initmoney;
							this.form.nocount=infostr.nocount;
							
						}
						 
						
						this.interval = setInterval(() => {
								this.resultContent();
						}, 5000); // 每秒执行一次
						
						
					} else {
						 console.log("报错了");
					}	
			},
			
			async resultContent() {//返回结果内容
				let http_header = {};
				const http_url = '/cpapi/api/cp/aishow'
				let http_data = {
				};
				let res = await this.$http.get(http_url, http_data);
				if (res.code == 200) {
					if(res.data==null){
						this.text1="结果已清空，等下次结果出现。。。";
					}else{
						this.text1=res.data;	
					}
					
				} else {
					uni.showToast({
						title: res?.message || '请稍后再试',
						icon: 'error'
					})
				}
			},
			async truncateResult() {//清空结果
				let http_header = {};
				const http_url = '/cpapi/api/cp/tuncateResult'
				let http_data = {
				};
				let res = await this.$http.get(http_url, http_data);
				if (res.code == 200) {
					const datastr=res.data;
					this.resultContent();
				} else {
					uni.showToast({
						title: res?.message || '请稍后再试',
						icon: 'error'
					})
				}
			},
			async submitForm(e) {
				this.$refs.formRef?.setRules(this.formRules);
				this.$nextTick(async () => {
					let valid = await this.$refs.formRef.validate();
					if (valid) {
						//保存数据
						let param = this.form;
						let header = {};
						let url = '/cpapi/api/cp/isopen';
						if (!url) {
							this.showToast('请先配置表单提交地址', 'none');
							return false;
						}
						let res = await this.$http.post(url, param, header, 'json');
						if (res.code == 200) {
							this.showToast(res.msg, 'success');
						} else {
							this.showModal(res.msg, '提示', false);
						}
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.btn-clz {
		background-color: #07c160;
		padding-top: 20rpx;
		color: #fff;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		text-align: center;
		padding-right: 20rpx;
	}
	.text-clz {
		line-height: 16;
	}
	.btn1-clz {
		background-color: #07c160;
		padding-top: 20rpx;
		color: #fff;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		text-align: center;
		padding-right: 20rpx;
	}
	.container329009 {
	}
</style>