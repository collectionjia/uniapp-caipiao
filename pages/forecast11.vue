<template>
	<view class="container container31931">
		<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<view class="flex flex-wrap diygw-col-24 flex-direction-column flex4-clz">
				<view class="flex flex-wrap diygw-col-24 items-center flex8-clz">
					<view class="flex flex-wrap diygw-col-0 flex-direction-column flex9-clz">
						<view class="diygw-col-0 text4-clz"> 彩票预测 </view>
					</view>
					<view class="diygw-col-0 text5-clz">(最新100期预测)</view>
					<button type="primary" @click="getResult">十次预测</button>
				</view>
				<rich-text :nodes="text1" class="diygw-col-24 text1-clz text-black"></rich-text>
				<!-- <view class="flex flex-wrap diygw-col-24 flex-direction-column flex10-clz">
					<p v-for="(item,index) in groupedData" :key="index">{{item}}</p>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 0,
				histroyOne: '',
				forecastResult: [],
				allData: [], // 用于存储所有数据项
				groupedData: {},
				text1:'',
				datastr:''
				// "7,2,6,8,3,5,10,9,4,1",
				// "1,3,7,6,4,2,8,9,10,5",
				// "5,8,4,2,6,3,10,7,1,9",
				// "1,2,3,4,5,6,7,8,9,10",
				// "4,6,8,1,3,5,7,9,2,10",
				// "3,5,7,9,2,4,6,8,10,1",
				// "7,2,6,8,3,5,10,9,4,1"
				// 分组后的数据
			}
		},

		created() {
			this.getResult()
		},
		computed: {
			// top7Data() {
			// 	return this.getTop7Data(this.allData);
			// }
		},
		methods: {
			async tenPredictions() {
				this.allData = []
				this.groupedData = []
				this.datastr="";
				uni.showToast({
					title: '正在10次预测请稍后',
					icon: 'success',
					duration: 2000
				})
				this.status = 1
				for (let i = 0; i < 8; i++) {
					await this.get10Result();
				}
				console.log(this.allData, '元数据')
				this.datasort(this.allData)

			}
			,async get10Result() {
				let http_header = {};
				const http_url = '/cpapi/api/cp/ai'
				let http_data = {
					type: 67,
					count: 10
				};
				let res = await this.$http.get(http_url, http_data);
				if (res.code == 200) {
					
					const datastr=res.data;
					uni.showToast({
					  title: res?.message || '加载成功',
					  icon: 'success'
					})
					// this.allData.push(...datastr);
					  
				} else {
					uni.showToast({
						title: res?.message || '请稍后再试',
						icon: 'error'
					})
				}
			},
			datasort(dataArray){
				this.allData1 = [];
				this.allData2 = [];
				this.allData3 = [];
				this.allData4 = [];
				this.allData5 = [];
				this.allData6 = [];
				this.allData7 = [];
				this.allData8 = [];
				this.allData9 = [];
				this.allData10 = [];
				
				
				for(var i=0;i<dataArray.length;i++){
					const  dataobj= dataArray[i];
					const dataobjindex=dataobj.split(",");
					if(dataobjindex!=""){
						
					 
					
					//行进行统计数据
					this.allData1.push(dataobjindex[0]);
					this.allData2.push(dataobjindex[1]);
					this.allData3.push(dataobjindex[2]);
					this.allData4.push(dataobjindex[3]);
					this.allData5.push(dataobjindex[4]);
					this.allData6.push(dataobjindex[5]);
					this.allData7.push(dataobjindex[6]);
					this.allData8.push(dataobjindex[7]);
					this.allData9.push(dataobjindex[8]);
					this.allData10.push(dataobjindex[9]);
					
				}
				}
				
				//每列统计数并进行排序
				
				this.allData11=this.getSortedCounts(this.allData1);
				this.allData12=this.getSortedCounts(this.allData2);
				this.allData13=this.getSortedCounts(this.allData3);
				this.allData14=this.getSortedCounts(this.allData4);
				this.allData15=this.getSortedCounts(this.allData5);
				this.allData16=this.getSortedCounts(this.allData6);
				this.allData17=this.getSortedCounts(this.allData7);
				this.allData18=this.getSortedCounts(this.allData8);
				this.allData19=this.getSortedCounts(this.allData9);
				this.allData110=this.getSortedCounts(this.allData10);
				
			 
				
				
				for(var i=0;i<3;i++){
					 this.groupedData.push("1:"+this.allData11[i][0]+"("+this.allData11[i][1]+"次)  2:"+this.allData12[i][0]+"("+this.allData12[i][1]+")  3:"+this.allData13[i][0]+"("+this.allData13[i][1]+")  4:"+this.allData14[i][0]+"("+this.allData14[i][1]+")   5:"+this.allData15[i][0]+"("+this.allData15[i][1]+")   6:"+this.allData16[i][0]+"("+this.allData16[i][1]+")   7:"+this.allData17[i][0]+"("+this.allData17[i][1]+")    8:"+this.allData18[i][0]+"("+this.allData18[i][1]+")   9:"+this.allData19[i][0]+"("+this.allData19[i][1]+")   10:"+this.allData110[i][0]+"("+this.allData110[i][1]+") \n");
				}
				
				 
				
				
			},
			counts(dataArray2) {
			      return dataArray2.reduce((acc, number) => {
			        acc[number] = (acc[number] || 0) + 1;
			        return acc;
			      }, {});
			    },
			getSortedCounts(dataArray2) {
			      const counts = this.counts(dataArray2);
			      return Object.entries(counts).sort((a, b) => b[1] - a[1]);
			    }
			,
			
			processData(dataArray) {
				const dataArrays = dataArray.map(row => row.split(',').map(Number));
				const columnFrequencies = dataArrays[0].map(() => ({}));
				dataArrays.forEach(row => {
					row.forEach((num, index) => {
						if (!columnFrequencies[index][num]) {
							columnFrequencies[index][num] = 0;
						}
						columnFrequencies[index][num]++;
					});
				});

				const frequencyRows = [];
				for (let i = 0; i < dataArrays[0].length; i++) {
					const frequencyMap = columnFrequencies[i];
					const sortedNumbers = Object.entries(frequencyMap)
						.sort((a, b) => b[1] - a[1])
						.map(entry => parseInt(entry[0], 10));
					frequencyRows.push(sortedNumbers);
				}

				const topRows = [];
				for (let i = 0; i < 8; i++) {
					const topRow = frequencyRows.map(row => row[i] || null);
					topRows.push(topRow);
				}

				const joinData = []
				topRows.forEach((item, index) => {
					console.log(item+" 佳佳");
					debugger;
					joinData.push(item.join(','));

				})
				console.log(joinData, '合成数组')
				console.log(topRows,'row')
				this.groupedData = joinData.slice(0,3)
			},
			async getResult() {
				uni.showLoading({
								title: "正在生成"
				}); 
				let http_header = {};
				const http_url = '/cpapi/api/cp/ai'
				let http_data = {
					type: 67,
					count: 10
				};
				let res = await this.$http.get(http_url, http_data);
				
				if (res.code == 200) { 
					this.text1 = res.data
					uni.hideLoading();
						uni.showToast({
							title: res?.message || '加载成功',
							icon: 'success'
						})
					// if (this.status == 0) {
					// 	this.forecastResult = res.data.split('\n')
					// 	console.log(this.forecastResult+"拆分的结果")
					// 	uni.showToast({
					// 		title: res?.message || '加载成功',
					// 		icon: 'success'
					// 	})
					// } else {
					// 	this.allData.push(...res.data.split('\n'))
					// 	console.log(this.allData+"所有数据");
					// }
					
			
				} else {
					this.text1 = res.data+"生成有误...";
					uni.showToast({
						title: res?.message || '请稍后再试',
						icon: 'error'
					})
				}
			}
		},


	}
</script>

<style lang="scss" scoped>
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

	.flex10-clz {
		p {
			padding: 10rpx;
			border-bottom: 1rpx solid #f1f1f1;
			font-size: x-large;
		}
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

	.text5-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 20rpx;
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
</style>