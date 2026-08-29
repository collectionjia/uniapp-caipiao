<template>
	<view class="container container329009">
		<view class="page-content">
			<view class="status-bar" :class="online ? 'status-online' : 'status-offline'">
				<view class="status-dot"></view>
				<text>{{ online ? '用户在线' : '用户不在线' }}</text>
			</view>
			<view class="login-card">
				<input type="text" class="token-input" v-model="token" placeholder="请输入 Token" />
				<view class="login-btn" @click="updateToken">登录</view>
			</view>
		<u-form :model="form" :rules="formRules" :errorType="['message', 'toast']" ref="formRef" class="flex diygw-form diygw-col-24 settings-card">
			
			<view class="flex flex-direction-column flex-sub diygw-col-24">
					<view class="flex flex-direction-column flex-sub">
						<view @tap="changeCollapse" data-index="0" class="collapse-header diygw-text-md padding flex" :class="[collapseDatas[0].isShow ? 'collapse-active' : '']">
							<view class="flex-sub collapse-title"> 开关设置 </view>
							<i class="diy-icon-unfold diy-collapse-icon" :class="[collapseDatas[0].isShow ? 'diy-collapse-active' : '']"></i>
						</view>
					<view v-if="collapseDatas[0].isShow" class="solid-bottom">
  
					<u-form-item labelWidth="auto" class="diygw-col-24" label="是否根据预算做关闭：" prop="isColseByMoney">
						<view class="flex diygw-col-24">
							<u-switch :size="44" :activeValue="true" :inactiveValue="false" inactiveTextColor="#000000" activeTextColor="#ffffff" v-model="form.isColseByMoney" slot="right"></u-switch>
						</view>
					</u-form-item>
					<u-form-item labelWidth="auto" class="diygw-col-24" label="模拟投注：" prop="agentpay">
						<view class="flex diygw-col-24">
							<u-switch :size="44" :activeValue="true" :inactiveValue="false" inactiveTextColor="#000000" activeTextColor="#ffffff" v-model="form.agentpay" slot="right"></u-switch>
						</view>
					</u-form-item>
					<u-form-item labelWidth="auto" class="diygw-col-24" label="真实投注：" prop="startpay">
						<view class="flex diygw-col-24">
							<u-switch :size="44" :activeValue="true" :inactiveValue="false" inactiveTextColor="#000000" activeTextColor="#ffffff" v-model="form.startpay" slot="right"></u-switch>
						</view>
					</u-form-item>
					
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
					
					<u-form-item labelWidth="auto" class="diygw-col-24" label="成本：" prop="initmoney">
						<u-input :focus="formData.initmoney" placeholder="请输入整数" v-model="form.initmoney"></u-input>
					</u-form-item>
					<u-form-item labelWidth="auto" class="diygw-col-24" label="最小值：" prop="mincost">
						<u-input :focus="formData.mincost" placeholder="请输入整数" v-model="form.mincost"></u-input>
					</u-form-item>
					<u-form-item labelWidth="auto" class="diygw-col-24" label="最大值：" prop="maxcost">
						<u-input :focus="formData.maxcost" placeholder="请输入整数" v-model="form.maxcost"></u-input>
					</u-form-item>
					
						</view>
					</view>
			
				<view class="flex flex-direction-column flex-sub">
					<view @tap="changeCollapse" data-index="1" class="collapse-header diygw-text-md padding flex" :class="[collapseDatas[1].isShow ? 'collapse-active' : '']">
						<view class="flex-sub collapse-title"> 算法设置 </view>
						<i class="diy-icon-unfold diy-collapse-icon" :class="[collapseDatas[1].isShow ? 'diy-collapse-active' : '']"></i>
					</view>
						<view v-if="collapseDatas[1].isShow" class="solid-bottom">
								<u-form-item class="diygw-col-24 diygw-form-item-top" label="算法类型" prop="suanfatype">
									<u-radio-group class="flex flex-wrap diygw-col-24 flex-direction-column justify-between" wrapClass="flex-direction-column justify-between" v-model="form.suanfatype">
										<u-radio shape="circle" v-for="(suanfatypeitem, suanfatypeindex) in formData.suanfatypeDatas" :key="suanfatypeindex" :name="suanfatypeitem.value">
											{{ suanfatypeitem.label }}
										</u-radio>
									</u-radio-group>
								</u-form-item>
						</view>
				</view>
			
			
		<view class="flex flex-direction-column flex-sub">
		<view @tap="changeCollapse" data-index="2" class="collapse-header diygw-text-md padding flex" :class="[collapseDatas[2].isShow ? 'collapse-active' : '']">
		<view class="flex-sub collapse-title"> 参数设置 </view>
		<i class="diy-icon-unfold diy-collapse-icon" :class="[collapseDatas[2].isShow ? 'diy-collapse-active' : '']"></i>
		</view>
		<view v-if="collapseDatas[2].isShow" class="solid-bottom">

		<u-form-item labelWidth="auto" class="diygw-col-24" label="最新期数获取：" prop="qishu">
		<u-input :focus="formData.qishuFocus" placeholder="请输入整数" v-model="form.qishu"></u-input>
		</u-form-item>
		<u-form-item labelWidth="auto" class="diygw-col-24" label="投注范围：" prop="onceNum">
		<u-input :focus="formData.onceNumFocus" placeholder="请输入整数" v-model="form.onceNum"></u-input>
		</u-form-item>
		<u-form-item labelWidth="auto" class="diygw-col-24" label="投注设置：" prop="countNum">
		<u-input :focus="formData.countNumFocus" placeholder="请输入整数" v-model="form.countNum"></u-input>
		</u-form-item>
		<u-form-item labelWidth="auto" class="diygw-col-24" label="次数设置：" prop="countZu">
		<u-input :focus="formData.countZuFocus" placeholder="请输入整数" v-model="form.countZu"></u-input>
		</u-form-item>
			<u-form-item class="diygw-col-24" label="投注倍率" prop="duozu">
				<u-input :focus="formData.duozuFocus" placeholder="请输入投注组数" v-model="form.duozu"></u-input>
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
			
			
			</view>
			</view>
			</view>
			
			
			
			<!-- <button class="diygw-col-24 btn-clz diygw-btn-default" @click="submitForm">提 交</button> -->
		</u-form>
		
		
		<!-- 	<view class="flex diygw-col-0 right-top floatbar-clz">
					<view class="diygw-grid diygw-actions">
						<button class="diygw-action"  @click="submitForm">
										<view class="diygw-grid-inner">
											<view class="diygw-grid-icon diygw-avatar">
												<image mode="aspectFit" class="diygw-avatar-img" src="/static/sz.png"></image>
											</view>
											<view class="diygw-grid-title"> 设置 </view>
										</view>
									</button>
						<button class="diygw-action" @click="resultContent">
							<view class="diygw-grid-inner">
								<view class="diygw-grid-icon diygw-avatar">
									<image mode="aspectFit" class="diygw-avatar-img" src="/static/sx.png"></image>
								</view>
								<view class="diygw-grid-title"> 刷新 </view>
							</view>
						</button>
						<button class="diygw-action"  @click="truncateResult">
							<view class="diygw-grid-inner">
								<view class="diygw-grid-icon diygw-avatar">
									<image mode="aspectFit" class="diygw-avatar-img" src="/static/qk.png"></image>
								</view>
								<view class="diygw-grid-title"> 清空 </view>
							</view>
						</button>
					</view>
				</view> -->
				<view class="action-section">
					<view class="section-label">数据操作</view>
					<view class="action-row">
						<button class="action-btn btn-blue" @click="submitForm">提交</button>
						<button class="action-btn btn-red" @click="truncateResult">清空</button>
						<button class="action-btn btn-green" @click="resultContent">刷新</button>
					</view>
				</view>

				<view class="action-section">
					<view class="section-label">投注控制</view>
					<view class="action-row">
						<button class="action-btn btn-green" @click="startpaybtn">加油</button>
						<button class="action-btn btn-red" @click="stoppaybtn">刹车</button>
						<button class="action-btn btn-blue" :disabled="betNowRealLoading" @click="betNowRealCachedbtn">{{ betNowRealLoading ? '提交中' : '即点真投' }}</button>
					</view>
				</view>
<!-- 		<view class="flex flex-wrap diygw-col-24 justify-between">
			<button class="diygw-col-8 btn2-clz diygw-btn-default" @click="resultContent">结果刷新</button>
			<button class="diygw-col-8 red btn1-clz diygw-btn-default"  @click="truncateResult">清空结果</button>
		</view>
		 -->
		
		
		
	 
		<view class="result-section">
			<view class="result-tabs">
				<view
					class="result-tab-item"
					:class="{ 'result-tab-active': index === tabsIndex }"
					v-for="(item, index) in tabsDatas"
					:key="index"
					@click="changeTabs"
					:data-index="index"
				>
					<text class="result-tab-label">{{ item.text }}</text>
					<text
						v-if="index === 2 && count > -1"
						class="tab-countdown"
						:class="{ 'tab-countdown-urgent': count <= 5 }"
					>{{ count }}s</text>
				</view>
			</view>
			<view class="result-content">
				<view v-if="resultTables.empty" class="empty-text">{{ resultTables.message }}</view>
				<block v-else>
					<block v-if="tabsIndex === 0">
						<view v-for="(section, sectionIndex) in resultTables.chooseNum.sections" :key="'choose-' + sectionIndex" class="table-block">
							<view class="table-block-title">{{ section.title }}</view>
							<result-table
								:caption="section.caption"
								:captionColor="section.captionColor"
								:headers="section.headers"
								:rows="section.rows"
								minCellWidth="140rpx"
							/>
						</view>
					</block>
					<block v-else-if="tabsIndex === 1">
						<result-table
							:headers="resultTables.currentNum.headers"
							:rows="resultTables.currentNum.rows"
							minCellWidth="120rpx"
						/>
					</block>
					<block v-else-if="tabsIndex === 2">
						<view
							v-for="(section, sectionIndex) in resultTables.payRecord.sections"
							:key="'pay-' + sectionIndex"
							class="period-block"
						>
							<view class="period-header">
								<view class="period-header-cell period-header-cell-full">
									<text class="period-header-label">期数</text>
									<text class="period-header-value cell-color-blue">{{ section.planNo }}</text>
								</view>
								<view class="period-header-cell">
									<text class="period-header-label">上期中奖号</text>
									<text class="period-header-value cell-color-red">{{ section.lastWinCount || '-' }}</text>
								</view>
								<view class="period-header-cell">
									<text class="period-header-label">投入号个数</text>
									<text class="period-header-value cell-color-blue">{{ section.betCount }}</text>
								</view>
							</view>
							<result-table
								:headers="section.headers"
								:rows="section.rows"
								minCellWidth="120rpx"
								firstCellWidth="72rpx"
							/>
						</view>
						<view v-if="!resultTables.payRecord.sections.length" class="empty-text">暂无投注记录</view>
					</block>
					<block v-else-if="tabsIndex === 3">
						<view class="balance-bar">
							<text
								v-for="(item, balanceIndex) in resultTables.winRecord.balanceInfo"
								:key="'balance-' + balanceIndex"
								class="balance-bar-item"
								:class="item.color ? 'cell-color-' + item.color : ''"
							>{{ item.text }}</text>
						</view>
						<result-table
							:headers="resultTables.winRecord.headers"
							:rows="resultTables.winRecord.rows"
							minCellWidth="130rpx"
						/>
					</block>
				</block>
			</view>
		</view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	import { buildAiShowTables } from '@/common/StringTableParser.js';
	import ResultTable from '@/components/result-table/result-table.vue';

	export default {
		components: {
			ResultTable
		},
		data() {
			return {
				//用户全局信息
				userInfo: {},
				 intervalId: null,
				//页面传参
				globalOption: {},
				tabsDatas: [
					{ text: `投注号`, icon: `` },
					{ text: `原始出号`, icon: `` },
					{ text: `投注记录`, icon: `` },
					{ text: `中奖记录`, icon: `` }
				],
				tabsLeft: 0,
				tabsWidth: 0,
				tabsItemWidth: 0,
				tabsIndex: 0,
				collapseDatas: [
					{ text: '开关设置', isShow: false },
					{ text: '算法设置', isShow: false },
					{ text: '参数设置', isShow: false }
				],
				//自定义全局变量
				globalData: {},
				resultTables: {
					empty: true,
					message: '结果已清空，等下次结果出现。。。'
				},
				betNowRealLoading: false,
				count: -1,
				gameType: 67,
				countdownTimer: null,
				token: '',
				online: false,
				form: {
					isopen: false,
					isTouzhu: false,
					isColseByMoney: false,
					agentpay: false,
					startpay:false,
					isColseByCount: false,
					qishu: '',
					onceNum: '',
					countNum: '',
					countZu: '',
					initmoney:'',
					mincost:'',
					maxcost:'',
					nocount:'',
					suanfatype: '无',
					lushu: [],
					duozu:'',
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
							{ value: '4', label: '华罗庚', checked: false }
						
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
			this.getTokenState();
 
		},
		onUnload() {
			this.count = -1;
			if (this.countdownTimer) {
				clearTimeout(this.countdownTimer);
				this.countdownTimer = null;
			}
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
			}
		},
		onReady() {
			this.$refs.formRef?.setRules(this.formRules);
		},
		methods: {
			async updateToken() {
				const http_url = '/cpapi/api/cp/updateToken';
				const http_data = {
					token: this.token
				};
				const res = await this.$http.post(http_url, http_data, {});
				uni.showToast({
					title: res?.message || '操作成功',
					icon: 'success'
				});
				this.getTokenState();
				this.resultContent();
				this.getNow();
			},
			async getTokenState() {
				const http_url = '/cpapi/api/cp/getTokenState';
				const res = await this.$http.get(http_url, {}, {});
				this.online = res?.data ?? false;
			},
			countdown() {
				if (this.count > 0) {
					this.count--;
				}
				if (this.count > 0) {
					this.countdownTimer = setTimeout(() => {
						this.countdown();
					}, 1000);
				} else {
					this.getNow();
				}
			},
			syncCountdown(data) {
				if (!data) {
					return;
				}
				const endTime = Number(data.endTime);
				const startTime = Number(data.startTime);
				const now = Date.now();
				let seconds = 0;
				if (endTime > now) {
					seconds = Math.floor((endTime - now) / 1000);
				} else if (endTime > startTime) {
					seconds = Math.floor((endTime - startTime) / 1000);
				}
				if (seconds > 0) {
					this.count = seconds;
					if (this.countdownTimer) {
						clearTimeout(this.countdownTimer);
					}
					this.countdown();
				}
			},
			async getNow() {
				try {
					const http_url = '/cpapi/api/cp/getNow';
					const res = await this.$http.get(http_url, { type: this.gameType }, {});
					if (res.code == 200 && res.data) {
						const tableData = res.data.data ? res.data.data : res.data;
						this.syncCountdown(tableData);
					}
				} catch (e) {
					console.error('getNow error', e);
				}
			},
			async init() {
				await this.initResetform();
			},
		changeCollapse(evt) {
					let { index } = evt.currentTarget.dataset;
					let collapseDatas = this.collapseDatas;
	
					collapseDatas[index]['isShow'] = !collapseDatas[index]['isShow'];
					this.setData({ collapseDatas });
				},
			initResetform() { 
				
				// this.initform = JSON.stringify(this.form);
				//如果想给表单默认初始值，其中row为某一行数据也可能是API返回的结果集，然后给到this.form
				//this.form = this.$tools.changeRowToForm(row,this.form)
			},
			changeTabs(evt) {
							let { index } = evt.currentTarget.dataset;
							if (index == this.tabsIndex) return;
							this.setData({
								tabsIndex: index
							});
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
							this.form.agentpay=infostr.agentpay;
							this.form.startpay=infostr.startpay;
							this.form.initmoney=infostr.initmoney;
							this.form.mincost=infostr.mincost;
							this.form.maxcost=infostr.maxcost;
							this.form.nocount=infostr.nocount;
							this.form.duozu=infostr.duozu;
						}
						 
						
						this.interval = setInterval(() => {
								this.resultContent();
						}, 4000);
						this.getNow();
						
						
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
					const tableData = res.data && res.data.data ? res.data.data : res.data;
					this.resultTables = buildAiShowTables(tableData);
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
			async startpaybtn() {//清空结果
				let http_header = {};
				const http_url = '/cpapi/api/cp/startpay'
				let http_data = {
					startpay:"true"
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
			async stoppaybtn() {//清空结果
				let http_header = {};
				const http_url = '/cpapi/api/cp/startpay'
				let http_data = {
					startpay:"false"
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
			async betNowRealCachedbtn() {
				if (this.betNowRealLoading) {
					return;
				}
				this.betNowRealLoading = true;
				try {
					const http_url = '/cpapi/api/cp/betNowRealCached';
					const res = await this.$http.post(http_url, {}, {}, 'json');
					if (res.code == 200 && res.data && res.data.success) {
						uni.showToast({
							title: '真投成功 ' + res.data.realBetCount + ' 笔',
							icon: 'success'
						});
						this.resultContent();
					} else {
						const msg = (res.data && res.data.message) || res.message || '下单失败';
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 3000
						});
					}
				} catch (e) {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
				} finally {
					this.betNowRealLoading = false;
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
	.container329009 {
		background: #f0f2f5;
		min-height: 100vh;
	}

	.page-content {
		padding: 24rpx;
		box-sizing: border-box;
	}

	.status-bar {
		display: flex;
		align-items: center;
		padding: 20rpx 24rpx;
		border-radius: 12rpx;
		margin-bottom: 24rpx;
		font-size: 28rpx;
		font-weight: 500;

		.status-dot {
			width: 16rpx;
			height: 16rpx;
			border-radius: 50%;
			margin-right: 16rpx;
		}
	}

	.status-online {
		background: rgba(7, 193, 96, 0.1);
		color: #07c160;

		.status-dot {
			background: #07c160;
			box-shadow: 0 0 8rpx rgba(7, 193, 96, 0.5);
		}
	}

	.status-offline {
		background: rgba(255, 77, 79, 0.1);
		color: #ff4d4f;

		.status-dot {
			background: #ff4d4f;
		}
	}

	.login-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 28rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
	}

	.token-input {
		height: 80rpx;
		border-radius: 12rpx;
		border: 1rpx solid #e8e8e8;
		padding: 0 24rpx;
		font-size: 28rpx;
		margin-bottom: 24rpx;
		box-sizing: border-box;
		background: #fafafa;
	}

	.login-btn {
		border-radius: 12rpx;
		background: linear-gradient(135deg, #3b8cff, #2563eb);
		color: #fff;
		text-align: center;
		padding: 24rpx;
		font-size: 30rpx;
		font-weight: 500;
	}

	.settings-card {
		background: #fff;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
		overflow: hidden;
		margin-bottom: 24rpx;
	}

	.collapse-header {
		background: #fafafa;
		border-bottom: 1rpx solid #eee;
		transition: background 0.2s;

		&.collapse-active {
			background: linear-gradient(135deg, #07c160 0%, #05a850 100%);

			.collapse-title {
				color: #fff;
				font-weight: 600;
			}

			.diy-collapse-icon {
				color: #fff;
			}
		}
	}

	.collapse-title {
		font-size: 30rpx;
		color: #333;
	}

	.action-section {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
	}

	.section-label {
		font-size: 26rpx;
		color: #888;
		margin-bottom: 20rpx;
		padding-left: 8rpx;
	}

	.action-row {
		display: flex;
		gap: 16rpx;
	}

	.action-btn {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #fff;
		border: none;
		border-radius: 12rpx;
		padding: 0;
		margin: 0;

		&::after {
			border: none;
		}

		&[disabled] {
			opacity: 0.6;
		}
	}

	.btn-green {
		background: linear-gradient(135deg, #07c160, #05a850);
	}

	.btn-blue {
		background: linear-gradient(135deg, #3b8cff, #2563eb);
	}

	.btn-red {
		background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
	}

	.result-section {
		background: #fff;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}

	.result-tabs {
		display: flex;
		background: #fafafa;
		border-bottom: 1rpx solid #eee;
	}

	.result-tab-item {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 6rpx;
		padding: 24rpx 4rpx;
		font-size: 26rpx;
		color: #666;
		position: relative;
		transition: color 0.2s;

		&.result-tab-active {
			color: #07c160;
			font-weight: 600;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 20%;
				right: 20%;
				height: 4rpx;
				background: #07c160;
				border-radius: 2rpx;
			}
		}
	}

	.result-tab-label {
		font-size: 26rpx;
		line-height: 1.2;
	}

	.tab-countdown {
		font-size: 22rpx;
		color: #2563eb;
		font-weight: 700;
		line-height: 1.2;
		white-space: nowrap;
	}

	.tab-countdown-urgent {
		color: #e03e2d;
	}

	.result-content {
		padding: 28rpx;
		min-height: 300rpx;
		background: #fff;
	}

	.empty-text {
		padding: 60rpx 24rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999;
	}

	.table-block {
		margin-bottom: 28rpx;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.table-block-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 16rpx;
		padding-left: 8rpx;
		border-left: 6rpx solid #07c160;
	}

	.balance-bar {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 24rpx;
		padding: 20rpx 24rpx;
		margin-bottom: 20rpx;
		background: #f7f8fa;
		border-radius: 12rpx;
		font-size: 26rpx;
	}

	.balance-bar-item {
		flex: 1;
		min-width: 240rpx;
	}

	.cell-color-blue {
		color: #2563eb;
	}

	.cell-color-red {
		color: #e03e2d;
		font-weight: 600;
	}

	.period-block {
		margin-bottom: 32rpx;
		padding-bottom: 24rpx;
		border-bottom: 2rpx dashed #e8e8e8;

		&:last-child {
			margin-bottom: 0;
			padding-bottom: 0;
			border-bottom: none;
		}
	}

	.period-header {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16rpx;
		padding: 20rpx 24rpx;
		margin-bottom: 16rpx;
		background: #eef4ff;
		border-radius: 12rpx;
		border-left: 6rpx solid #2563eb;
	}

	.period-header-cell {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
		padding: 16rpx 20rpx;
		background: rgba(255, 255, 255, 0.72);
		border-radius: 10rpx;
	}

	.period-header-cell-full {
		grid-column: 1 / -1;
	}

	.period-header-label {
		font-size: 22rpx;
		color: #6b7280;
		line-height: 1.4;
	}

	.period-header-value {
		font-size: 30rpx;
		font-weight: 600;
		line-height: 1.4;
		word-break: break-all;
	}
</style>