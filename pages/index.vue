<template>
	<view class="container container31931">
		<u-navbar titleWidth="500" :isFixed="true" :isSlotTitle="true" title="彩票概率预测" backText="返回" backIconColor="#fff" titleColor="inherit" bgColor="green" :backTextStyle="{ color: 'inherit' }" :isHome="true" :isBack="true">
			<template v-slot:title> 彩票概率预测 </template>
		</u-navbar>
		<view class="flex flex-wrap diygw-col-24 flex-clz">
			<view class="flex flex-wrap diygw-col-0 flex-direction-column justify-start items-start flex2-clz" @tap="handleFt">
				<view class="diygw-col-0"> 飞艇 </view>
				<view class="diygw-col-0 text1-clz"> 48 </view>
			</view>
			<view class="flex flex-wrap diygw-col-0 flex-direction-column justify-start items-start flex3-clz" @tap="handleSc">
				<view class="diygw-col-0"> 赛车 </view>
				<view class="diygw-col-0 text5-clz"> 67 </view>
			</view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: { logintype: '0', agree: '0' }
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

			this.init();
		},
		methods: {
			handleFt() {
				uni.navigateTo({
					url: '/pages/ft'
				})
			},
			handleSc() {
				uni.navigateTo({
					url: '/pages/sc'
				})
			},
			async init() {},
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
	.flex-clz {
		padding-top: 10rpx;
		z-index: 100;
		color: #ffffff;
		font-weight: bold;
		padding-left: 10rpx;
		font-size: 28rpx !important;
		padding-bottom: 10rpx;
		height: 160rpx;
		padding-right: 10rpx;
	}
	.flex2-clz {
		padding-top: 16rpx;
		border-bottom-left-radius: 12rpx;
		z-index: 100;
		background-size: cover;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		border-top-right-radius: 12rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
		overflow: hidden;
		flex: 1;
		border-top-left-radius: 12rpx;
		margin-top: 10rpx;
		border-bottom-right-radius: 12rpx;
		background-image: url(/static/916f05db-9c0a-4db3-97a6-168e070847c1.png);
		margin-bottom: 10rpx;
		padding-right: 16rpx;
	}
	.text1-clz {
		margin-left: 0rpx;
		color: #e5e5e5;
		font-size: 22rpx !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.flex3-clz {
		padding-top: 16rpx;
		border-bottom-left-radius: 12rpx;
		z-index: 100;
		background-size: cover;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		border-top-right-radius: 12rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
		overflow: hidden;
		flex: 1;
		border-top-left-radius: 12rpx;
		margin-top: 10rpx;
		border-bottom-right-radius: 12rpx;
		background-image: url(/static/cfe2af9f-9039-49d4-9ab6-47c976712d90.png);
		margin-bottom: 10rpx;
		padding-right: 16rpx;
	}
	.text5-clz {
		margin-left: 0rpx;
		color: #e5e5e5;
		font-size: 22rpx !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.container31931 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container31931 {
	}
</style>
