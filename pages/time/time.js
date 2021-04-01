// pages/time/time.js
const date = new Date();
const years = [];
const months = [];
const days = [];
const tempMonth = [];
const tempDays = []
for (let i = 1; i <= date.getMonth() + 1; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  tempMonth.push("" + i);
}
for (let i = 1; i <= date.getDate(); i++) {
  if (i < 10) {
    i = "0" + i;
  }
  tempDays.push("" + i);
}
//获取年
for (let i = 1921; i <= date.getFullYear(); i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fontsize: "48rpx",
    color: "#626262",
    background_color: "#D3D3D3",
    flag: false,
    time: "_ _ _ _ 年 _ _ 月 _ _ 日",
    multiArray: [years, tempMonth, tempDays],
    multiIndex: [date.getFullYear() - 1921, date.getMonth(), date.getDate() - 1],
    choose_year: '',
    imgURL: "cloud://cloud1-6gitxzn42ff64a24.636c-cloud1-6gitxzn42ff64a24-1305426378/second.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      choose_year: this.data.multiArray[0][-1]
    })
  },
  // 跳转到入党誓词
  bindToPledge(){
    if(this.data.flag){
      wx.navigateTo({
        url: '../pledge/pledge'
      })
    }
  },
  //获取时间日期
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: year + '    年     ' + month + ' 月 ' + day + '    日 '
    })
    console.log(this.data.time);
    this.setData({
      background_color : "#BD1E1B",
      color: "#FFD7B9",
      flag: true,
      fontsize: "53rpx"
    })
    var temp1 = year + '-' + month + '-' + day
    var temp2 = year + '-' + month + '-' + day
    console.log(Date.parse(temp1))
    var app=getApp();     // 取得全局App
    app.globalData.year = temp1;
    app.globalData.time = temp2;
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function(e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
      if(choose_year == date.getFullYear()){
        this.data.multiArray[1] = tempMonth;
        this.data.multiArray[2] = tempDays;
      }else{
        this.data.multiArray[1] = months;
        this.data.multiArray[2] = days;
      }
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})