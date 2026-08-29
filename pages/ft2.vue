<template>
	<view class="container container31931">
		<u-navbar titleWidth="500" :isFixed="true" :isSlotTitle="true" title="赛道概率预测" backText="返回" backIconColor="#fff"
			titleColor="inherit" bgColor="green" :backTextStyle="{ color: 'inherit' }" :isHome="true" :isBack="true">
			<template v-slot:title> 赛道概率预测 </template>
		</u-navbar>
		<view class="page-body">
			<view class="status-bar" :class="online ? 'status-online' : 'status-offline'">
				<view class="status-dot"></view>
				<text>{{ online ? '用户在线' : '用户不在线' }}</text>
			</view>
			<view class="login-card">
				<input type="text" class="token-input" v-model="token" placeholder="请输入 Token" />
				<view class="login-btn" @click="updateToken">登录</view>
			</view>
			<view class="countdown-card" v-if="count > -1">
				<text class="countdown-label">倒计时</text>
				<text class="countdown-value" :class="{ 'countdown-urgent': count <= 5 }">{{ count }}s</text>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<view class="flex flex-wrap diygw-col-24 flex-direction-column flex4-clz">
				<view class="flex flex-wrap diygw-col-24 items-center flex8-clz">
					<view class="flex flex-wrap diygw-col-0 flex-direction-column flex9-clz">
						<view class="diygw-col-0 text4-clz"> 彩票预测 </view>
					</view>
					<view class="diygw-col-0 text5-clz">(100期最新一期){{histroyOne}}</view>
				</view>
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex10-clz">
					<result-table :headers="statTable.headers" :rows="statTable.rows" minCellWidth="120rpx" />
				</view>
			</view>
			<!-- <view class="flex flex-wrap diygw-col-24 flex-direction-column flex11-clz">
				<view class="flex flex-wrap diygw-col-24 items-center flex12-clz">
					<view class="flex flex-wrap diygw-col-0 flex-direction-column flex13-clz">
						<view class="diygw-col-0 text7-clz"> 彩票预测 </view>
					</view>
					<view class="diygw-col-0 text9-clz">(50期最新一期){{histroyOne}}</view>
				</view>
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex14-clz">
					<rich-text :nodes="text11" class="diygw-col-24"></rich-text>
				</view>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column flex15-clz">
				<view class="flex flex-wrap diygw-col-24 items-center flex16-clz">
					<view class="flex flex-wrap diygw-col-0 flex-direction-column flex17-clz">
						<view class="diygw-col-0 text12-clz"> 彩票预测 </view>
					</view>
					<view class="diygw-col-0 text14-clz">(100期最新一期){{histroyOne}}</view>
				</view>
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex18-clz">
					<rich-text :nodes="text17" class="diygw-col-24"></rich-text>
				</view>
			</view> -->
			</view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	import { buildStatTable } from '@/common/StringTableParser.js';
	import ResultTable from '@/components/result-table/result-table.vue';

	export default {
		components: {
			ResultTable
		},
		data() {
			return {
				token: '0c46fb5c2f8c4f3a8c8b6cf93b5e8b0c1713335295591',
				online: false,
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {
					logintype: '0',
					agree: '0'
				},
				statTable: {
					headers: ['赛道', '期数', '号码', '概率'],
					rows: []
				},
				histroyOne: '',
				count: -1
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
			if (this.online) {
				this.getTokenState();
				this.setContent()
				this.listTopData();
				this.getNow();
			}
		},
		onUnload() {
			console.log('页面卸载')
			this.count = -1
		},
		methods: {
			countdown() {
				this.count--;
				console.log('倒计时：', this.count)
				if (this.count > 0) {
					setTimeout(() => {
						this.countdown()
					}, 1000)
				} else {
					console.log('倒计时完成：', this.count)
					uni.showToast({
						icon: 'error',
						title: '倒计时完成啦！'
					})
				}
			},
			setContent() {
				this.init(20, (res) => {
					this.init(50, (res2) => {
						this.init(100, (res3) => {
							this.statTable = buildStatTable(res, res2, res3);
						});
					});
				});
			},
			async getNow() {
				const http_url = '/cpapi/api/cp/getNow'
				let http_data = {
					type: 48,
				};
				let http_header = {};
				let res = await this.$http.get(http_url, http_data, http_header);
				const timestamp = (res.data?.endTime - res.data?.startTime) || -1
				this.count = parseInt(timestamp / 1000)
				this.countdown()
			},
			async updateToken() {
				const http_url = '/cpapi/api/cp/updateToken'
				let http_data = {
					token: this.token
				};
				let http_header = {};
				let res = await this.$http.post(http_url, http_data, http_header);
				uni.showToast({
					title: res?.message || '操作成功',
					icon: 'success'
				})
				this.getTokenState();
				this.setContent()
				this.listTopData();
				this.getNow();
			},
			async getTokenState() {
				const http_url = '/cpapi/api/cp/getTokenState'
				let http_data = {};
				let http_header = {};
				let res = await this.$http.get(http_url, http_data, http_header);
				this.online = res?.data ?? false
			},
			async init(count, callback) {
				const http_url = '/cpapi/api/cp/stat'
				let http_data = {
					type: 48,
					count
				};
				let http_header = {};
				let res = await this.$http.post(http_url, http_data, http_header, 'json');
				callback(res)
			},
			async listTopData() {
				const http_url = '/cpapi/api/cp/listTopData'
				let http_data = {
					type: 48,
					count: 100
				};
				let http_header = {};
				let res = await this.$http.post(http_url, http_data, http_header, 'json');

				// this.text11 = ''
				// res.data.forEach(item=>{
				// 	this.text11 += `<div style="padding: 5px 0;font-weight:bold;">${item.issue} ${item.saleStartTime}<div style="font-weight:normal;">${item.code}</div></div>`
				// })
				this.histroyOne = res.data[0].code.replace(/,/g, " ")
			},
			// 同意或不同意 自定义方法
			async agreeFunction(param) {
				let thiz = this;
				//如果不同意，改为同意
				this.globalData.agree = this.globalData.agree == '1' ? '0' : '1';
			},

			// 验证码登录或密码登录 自定义方法
			async codeFunction(param) {
				let thiz = this;
				//如果1表示验证码登录，0表进密码登录
				this.globalData.logintype = this.globalData.logintype == '1' ? '0' : '1';
			},

			// 发送短信验证码 自定义方法
			async sendMsgFunction(param) {
				let thiz = this;
				this.formData.codeFlag = false;
				if (!this.form.phone) {
					this.showToast('手机号码不能为空');
					//不给发送验证码
					this.formData.codeFlag = false;
					return;
				}
				let pattern = /^1[3-9]\d{9}$/;
				if (!pattern.test(this.form.phone)) {
					this.showToast('手机号码输入有误');
					//不给发送验证码
					this.formData.codeFlag = false;
					return;
				}
				let http_url = '';
				//配置后可删除下面的判断
				if (!http_url) {
					this.showToast('默认发送短信验证地址，配置后可删除此判断');
					return;
				}
				let http_data = {
					phone: this.form.phone
				};
				let http_header = {};
				let data = await this.$http.post(http_url, http_data, http_header, 'json');
				if (data.code == 0) {
					this.showToast(data.msg);
					return;
				} else {
					//修改为true
					this.formData.codeFlag = true;
					this.$refs.codeCodeRef.start();
					this.showToast('验证码已发送');
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container31931 {
		background: #f0f2f5;
		min-height: 100vh;
		padding-left: 0;
		padding-right: 0;
	}

	.page-body {
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

	.countdown-card {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 28rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
	}

	.countdown-label {
		font-size: 28rpx;
		color: #666;
	}

	.countdown-value {
		font-size: 40rpx;
		font-weight: 700;
		color: #333;
	}

	.countdown-urgent {
		color: #ff4d4f;
		animation: pulse 1s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	.flex4-clz {
		margin-left: 0;
		border: none;
		border-radius: 16rpx;
		overflow: hidden;
		width: 100% !important;
		font-size: 28rpx !important;
		margin-top: 0;
		margin-bottom: 0;
		margin-right: 0;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
		background: #fff;
	}

	.flex8-clz {
		border-bottom: 1rpx solid #eee;
		overflow: hidden;
		font-weight: bold;
		font-size: 28rpx !important;
	}

	.flex9-clz {
		background-color: #07c160;
		transform: translate(0rpx, 0rpx) skew(-25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		font-size: 30rpx !important;
	}

	.text4-clz {
		background-color: #07c160;
		padding-top: 16rpx;
		transform: translate(-16rpx, 0rpx) skew(25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		padding-left: 40rpx;
		font-size: 30rpx !important;
		padding-bottom: 16rpx;
		padding-right: 20rpx;
	}

	.text5-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 20rpx;
	}

	.flex10-clz {
		padding: 20rpx;
	}

	.flex11-clz {
		margin-left: 20rpx;
		border: 2rpx solid #020202;
		border-bottom-left-radius: 0rpx;
		overflow: hidden;
		width: calc(100% - 20rpx - 20rpx) !important;
		font-size: 28rpx !important;
		border-top-left-radius: 0rpx;
		margin-top: 20rpx;
		border-top-right-radius: 0rpx;
		border-bottom-right-radius: 0rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
	}

	.flex12-clz {
		border-bottom-left-radius: 0rpx;
		overflow: hidden;
		font-weight: bold;
		font-size: 28rpx !important;
		border-top-left-radius: 0rpx;
		border-top-right-radius: 0rpx;
		border-bottom-right-radius: 0rpx;
		border-bottom: 2rpx solid #020202;
	}

	.flex13-clz {
		background-color: #fc0202;
		transform: translate(0rpx, 0rpx) skew(-25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		font-size: 30rpx !important;
	}

	.text7-clz {
		background-color: #fc0202;
		padding-top: 16rpx;
		transform: translate(-16rpx, 0rpx) skew(25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		padding-left: 40rpx;
		font-size: 30rpx !important;
		padding-bottom: 16rpx;
		padding-right: 20rpx;
	}

	.text9-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 20rpx;
	}

	.flex14-clz {
		padding-top: 10rpx;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}

	.flex15-clz {
		margin-left: 20rpx;
		border: 2rpx solid #020202;
		border-bottom-left-radius: 0rpx;
		overflow: hidden;
		width: calc(100% - 20rpx - 20rpx) !important;
		font-size: 28rpx !important;
		border-top-left-radius: 0rpx;
		margin-top: 20rpx;
		border-top-right-radius: 0rpx;
		border-bottom-right-radius: 0rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
	}

	.flex16-clz {
		border-bottom-left-radius: 0rpx;
		overflow: hidden;
		font-weight: bold;
		font-size: 28rpx !important;
		border-top-left-radius: 0rpx;
		border-top-right-radius: 0rpx;
		border-bottom-right-radius: 0rpx;
		border-bottom: 2rpx solid #020202;
	}

	.flex17-clz {
		background-color: #0131fc;
		transform: translate(0rpx, 0rpx) skew(-25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		font-size: 30rpx !important;
	}

	.text12-clz {
		background-color: #0131fc;
		padding-top: 16rpx;
		transform: translate(-16rpx, 0rpx) skew(25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		padding-left: 40rpx;
		font-size: 30rpx !important;
		padding-bottom: 16rpx;
		padding-right: 20rpx;
	}

	.text14-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 20rpx;
	}

	.flex18-clz {
		padding-top: 10rpx;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}

	.container31931 {}
</style>