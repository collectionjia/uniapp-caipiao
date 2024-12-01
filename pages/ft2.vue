<template>
	<view class="container container31931">
		<u-navbar titleWidth="500" :isFixed="true" :isSlotTitle="true" title="赛道概率预测" backText="返回" backIconColor="#fff"
			titleColor="inherit" bgColor="green" :backTextStyle="{ color: 'inherit' }" :isHome="true" :isBack="true">
			<template v-slot:title> 赛道概率预测 </template>
		</u-navbar>
		<view style="padding-top: 20upx;padding-left: 20upx;" :style="{color: online ? '#519eff': 'red'}">
			{{online ? '用户在线' : '用户不在线'}}
		</view>
		<view style="text-align: center;padding: 20upx;box-sizing: border-box;">
			<input type="text" v-model="token" />
			<view @click="updateToken"
				style="border-radius: 10upx;background: #519eff;color: #fff;text-align: center;padding: 20upx 60upx;display: inline-block;">
				登录
			</view>
		</view>
		<view class="countDown" style="text-align: center;font-size: 30upx;" v-if="count > -1">
			倒计时：
			<text :style="{'color': count <= 5 ? 'red': '#333'}">
				{{count}}s
			</text>
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
					<rich-text :nodes="text8" class="diygw-col-24"></rich-text>
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
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
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
				text8: '',
				text11: '',
				text17: '',
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
							this.text8 = ''
							res.data.forEach((item, index) => {
								this.text8 +=
									`<div style="padding: 5px 0;font-weight:bold;">赛道${item.index+1} 概率</div>`
								let cStr = '<span style="font-weight:bold;">20期</span>【'
								item.stat.forEach(v => {
									if (v.willRate > 95) {
										cStr +=
											`<span style="color: #e03e2d;margin-right: 10px;">${v.number}(${v.willRate}%)</span>`
									} else {
										cStr +=
											`<span style="margin-right: 10px;">${v.number}(${v.willRate}%)</span>`
									}
								})
								cStr += '】<br/>'

								cStr += '<span style="font-weight:bold;">50期</span>【'
								res2.data[index].stat.forEach(v => {
									if (v.willRate > 95) {
										cStr +=
											`<span style="color: #e03e2d;margin-right: 10px;">${v.number}(${v.willRate}%)</span>`
									} else {
										cStr +=
											`<span style="margin-right: 10px;">${v.number}(${v.willRate}%)</span>`
									}
								})
								cStr += '】<br/>'

								cStr += '<span style="font-weight:bold;">100期</span>【'
								res3.data[index].stat.forEach(v => {
									if (v.willRate > 95) {
										cStr +=
											`<span style="color: #e03e2d;margin-right: 10px;">${v.number}(${v.willRate}%)</span>`
									} else {
										cStr +=
											`<span style="margin-right: 10px;">${v.number}(${v.willRate}%)</span>`
									}
								})
								cStr += '】'

								this.text8 +=
									`<div style="word-break: break-all;">${cStr}</div>`
							})
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
	input {
		height: 70upx;
		border-radius: 10upx;
		border: 1px solid #aaa;
		margin-bottom: 20upx;
		text-align: left;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.flex4-clz {
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

	.flex8-clz {
		border-bottom-left-radius: 0rpx;
		overflow: hidden;
		font-weight: bold;
		font-size: 28rpx !important;
		border-top-left-radius: 0rpx;
		border-top-right-radius: 0rpx;
		border-bottom-right-radius: 0rpx;
		border-bottom: 2rpx solid #020202;
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
		padding-top: 10rpx;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
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

	.container31931 {
		padding-left: 0px;
		padding-right: 0px;
	}

	.container31931 {}
</style>