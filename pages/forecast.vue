<template>
  <view class="container container31931">
    <view class="flex flex-wrap diygw-col-24 flex-direction-column">
      <view class="flex flex-wrap diygw-col-24 flex-direction-column flex4-clz">
        <view class="flex flex-wrap diygw-col-24 items-center flex8-clz">
          <view class="flex flex-wrap diygw-col-0 flex-direction-column flex9-clz">
            <view class="diygw-col-0 text4-clz"> 彩票预测 </view>
          </view>
          <view class="diygw-col-0 text5-clz">(最新100期预测)</view>
        </view>
        <view class="flex flex-wrap diygw-col-24 flex-direction-column flex10-clz">
          <p v-for="(item,index) in status==0?forecastResult:groupedData" :key="index">{{item}}</p>
        </view>
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
      groupedData: [
      ] // 分组后的数据
    }
  },

  created() {
    this.getResult()
  },
  methods: {
    async tenPredictions() {
      uni.showToast({
        title: '正在10次预测请稍后',
        icon: 'success',
        duration: 2000
      })
      this.status = 1
      // this.sortByFrequency(this.groupedData)
      for (let i = 0; i < 10; i++) {
        await this.getResult();
      }
      this.sortDataByFrequency(this.allData);
    },
    sortDataByFrequency(dataArray) {
      let frequencyMap = {};
      dataArray.forEach(str => {
        let numbers = str.split(',').map(Number);
        numbers.forEach(num => {
          if (frequencyMap[num]) {
            frequencyMap[num]++;
          } else {
            frequencyMap[num] = 1;
          }
        });
      });
      let sortedFrequencyMap = Object.entries(frequencyMap)
        .sort((a, b) => b[1] - a[1])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      let sortedDataArray = dataArray.map(str => {
        let numbers = str.split(',').map(Number);
        return numbers
          .sort((a, b) => (sortedFrequencyMap[b] || 0) - (sortedFrequencyMap[a] || 0))
          .join(',');
      });

      let resultData = sortedDataArray.slice(0, 7);
      console.log('频率最高的 7 条数据:', resultData);
      this.sortByFrequency(resultData)
    },
    sortByFrequency(resultData) {
      const frequencyMap = {};
      resultData.forEach(str => {
        const numbers = str.split(',');
        numbers.forEach(num => {
          frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        });
      });
      const sortedNumbers = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a]);
      this.groupedData = resultData.map(str => {
        const numbers = str.split(',');
        const sortedStr = numbers.sort((a, b) => sortedNumbers.indexOf(a) - sortedNumbers.indexOf(b))
          .join(',');
        return sortedStr;
      });
    },
    async getResult() {
      let http_header = {};
      const http_url = '/cpapi/api/cp/ai'
      let http_data = {
        type: 48,
        count: 10
      };
      let res = await this.$http.get(http_url, http_data);
      if (res.code == 200) {
		   this.forecastResult = res.data
		     uni.showToast({
		       title: res?.message || '加载成功',
		       icon: 'success'
		     })
        // if (this.status == 0) {
        //   this.forecastResult = res.data.split('\n')
        //   uni.showToast({
        //     title: res?.message || '加载成功',
        //     icon: 'success'
        //   })
        // } else {
        //   this.allData.push(...res.data.split('\n'))

        //   // this.forecastResult.push()
        // }
        // this.histroyOne = res.data[0].code.replace(/,/g, " ")

      } else {
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
	font-size: xx-large;
  }
}
.flex11-clz{
	margin: 0 4px;
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