<template>
	<view class="container container31931">
		<u-navbar titleWidth="500" :isFixed="true" :isSlotTitle="true" title="彩票概率预测" backText="返回" backIconColor="#fff"
			titleColor="inherit" bgColor="green" :backTextStyle="{ color: 'inherit' }" :isHome="true" :isBack="true">
			<template v-slot:title> 彩票概率预测 </template>
		</u-navbar>
		<view class="page-body">
			<view class="home-header">
				<text class="home-title">彩票百分比</text>
				<text class="home-subtitle">选择彩种，进入赛道概率预测</text>
			</view>
			<view class="game-cards">
				<view class="game-card game-card-ft" @tap="handleFt">
					<view class="game-card-icon game-card-icon-ft">飞</view>
					<view class="game-card-main">
						<view class="game-card-title-row">
							<text class="game-card-title">飞艇</text>
							<text class="game-card-badge">类型 48</text>
						</view>
						<text class="game-card-desc">极速飞艇 · 赛道概率分析</text>
					</view>
					<text class="game-card-enter">进入</text>
				</view>
				<view class="game-card game-card-sc" @tap="handleSc">
					<view class="game-card-icon game-card-icon-sc">赛</view>
					<view class="game-card-main">
						<view class="game-card-title-row">
							<text class="game-card-title">赛车</text>
							<text class="game-card-badge game-card-badge-sc">类型 67</text>
						</view>
						<text class="game-card-desc">幸运赛车 · 赛道概率分析</text>
					</view>
					<text class="game-card-enter">进入</text>
				</view>
			</view>
			<view class="home-tip">
				<text>点击卡片进入对应彩种预测页面</text>
			</view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				globalOption: {},
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
					url: '/pages/forecast10jieguo'
				});
			},
			handleSc() {
				uni.navigateTo({
					url: '/pages/forecast10jieguo67'
				});
			},
			async init() {}
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
		padding: 32rpx 24rpx 48rpx;
		box-sizing: border-box;
	}

	.home-header {
		margin-bottom: 36rpx;
		padding: 8rpx 8rpx 0;
	}

	.home-title {
		display: block;
		font-size: 40rpx;
		font-weight: 700;
		color: #1a1a1a;
		line-height: 1.3;
		margin-bottom: 12rpx;
	}

	.home-subtitle {
		display: block;
		font-size: 28rpx;
		color: #888;
		line-height: 1.4;
	}

	.game-cards {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}

	.game-card {
		display: flex;
		align-items: center;
		padding: 32rpx 28rpx;
		border-radius: 20rpx;
		box-shadow: 0 8rpx 28rpx rgba(0, 0, 0, 0.08);
		position: relative;
		overflow: hidden;
		transition: transform 0.15s ease;

		&:active {
			transform: scale(0.98);
		}
	}

	.game-card-ft {
		background: linear-gradient(135deg, #07c160 0%, #05a850 100%);
	}

	.game-card-sc {
		background: linear-gradient(135deg, #3b8cff 0%, #2563eb 100%);
	}

	.game-card-icon {
		width: 96rpx;
		height: 96rpx;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
		margin-right: 24rpx;
	}

	.game-card-icon-ft {
		background: rgba(255, 255, 255, 0.25);
	}

	.game-card-icon-sc {
		background: rgba(255, 255, 255, 0.25);
	}

	.game-card-main {
		flex: 1;
		min-width: 0;
	}

	.game-card-title-row {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 12rpx;
		margin-bottom: 10rpx;
	}

	.game-card-title {
		font-size: 36rpx;
		font-weight: 700;
		color: #fff;
		line-height: 1.2;
	}

	.game-card-badge {
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.95);
		background: rgba(255, 255, 255, 0.22);
		padding: 4rpx 16rpx;
		border-radius: 20rpx;
		line-height: 1.4;
	}

	.game-card-badge-sc {
		background: rgba(255, 255, 255, 0.22);
	}

	.game-card-desc {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1.4;
	}

	.game-card-enter {
		font-size: 26rpx;
		color: #fff;
		font-weight: 600;
		padding: 12rpx 24rpx;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 32rpx;
		flex-shrink: 0;
		margin-left: 16rpx;
	}

	.home-tip {
		margin-top: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #aaa;
		line-height: 1.5;
	}
</style>
