<template>
	<view class="result-table-wrap">
		<view
			v-if="caption"
			class="result-table-caption"
			:class="captionColor ? 'cell-color-' + captionColor : ''"
		>{{ caption }}</view>
		<view class="result-table-scroll">
			<view class="result-table">
				<view class="result-table-row result-table-head">
					<view
						v-for="(header, index) in headers"
						:key="'h-' + index"
						class="result-table-cell"
						:style="cellStyle(index)"
					>{{ header }}</view>
				</view>
				<view
					v-for="(row, rowIndex) in rows"
					:key="'r-' + rowIndex"
					class="result-table-row"
					:class="{ 'result-table-row-even': rowIndex % 2 === 1 }"
				>
					<view
						v-for="(item, cellIndex) in row"
						:key="'c-' + rowIndex + '-' + cellIndex"
						class="result-table-cell"
						:class="cellClass(item)"
						:style="cellStyle(cellIndex)"
					>{{ cellText(item) }}</view>
				</view>
				<view v-if="!rows || !rows.length" class="result-table-empty">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ResultTable',
	props: {
		headers: {
			type: Array,
			default() {
				return [];
			}
		},
		rows: {
			type: Array,
			default() {
				return [];
			}
		},
		caption: {
			type: String,
			default: ''
		},
		captionColor: {
			type: String,
			default: 'blue'
		},
		minCellWidth: {
			type: String,
			default: '120rpx'
		},
		firstCellWidth: {
			type: String,
			default: ''
		}
	},
	methods: {
		cellText(item) {
			if (item && typeof item === 'object') {
				return item.text !== undefined && item.text !== null ? item.text : '';
			}
			return item !== undefined && item !== null ? item : '';
		},
		cellClass(item) {
			if (item && typeof item === 'object' && item.color) {
				return 'cell-color-' + item.color;
			}
			return '';
		},
		cellStyle(index) {
			const width = index === 0 && this.firstCellWidth ? this.firstCellWidth : this.minCellWidth;
			return {
				width,
				minWidth: width
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.result-table-wrap {
	width: 100%;
	min-height: 80rpx;
}

.result-table-caption {
	font-size: 26rpx;
	margin-bottom: 16rpx;
	line-height: 1.5;
}

.result-table-scroll {
	width: 100%;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
}

.result-table {
	display: table;
	width: max-content;
	min-width: 100%;
	table-layout: fixed;
	border: 1rpx solid #e8e8e8;
	border-radius: 12rpx;
	overflow: hidden;
	background: #fff;
	border-collapse: separate;
	border-spacing: 0;
}

.result-table-row {
	display: table-row;
}

.result-table-row:not(.result-table-head):not(:last-child) .result-table-cell {
	border-bottom: 1rpx solid #f0f0f0;
}

.result-table-head {
	.result-table-cell {
		color: #333;
		font-weight: 600;
		background: #f7f8fa;
		border-bottom: 1rpx solid #e8e8e8;
	}
}

.result-table-row-even .result-table-cell {
	background: #fafafa;
}

.result-table-cell {
	display: table-cell;
	padding: 18rpx 16rpx;
	font-size: 24rpx;
	color: #555;
	line-height: 1.4;
	box-sizing: border-box;
	white-space: nowrap;
	text-align: left;
	vertical-align: middle;
}

.cell-color-blue {
	color: #2563eb;
}

.cell-color-red {
	color: #e03e2d;
	font-weight: 600;
}

.result-table-empty {
	padding: 40rpx 24rpx;
	text-align: center;
	font-size: 26rpx;
	color: #999;
}
</style>
