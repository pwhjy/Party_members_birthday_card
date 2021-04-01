// pages/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    days: "",
    imgURL: "../../images/last.png",
    text2: '我光荣加入中国共产党',
    text4: '我将',
    text5: '铭记誓言',
    text6: '终身坚守',
    text7: '永远奋斗',
    shareImgPath: '',
    canvasHidden: false, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = getApp().globalData.year
    var time =  getApp().globalData.time
    var  startDate = Date.parse(date);
    var  endDate = new Date();
    var days=(endDate - startDate)/(1*24*60*60*1000);
    days = Math.ceil(days)

    this.setData({
      days: '至今已' + days.toString() +'天',
      time: time
    })
    var that = this;
    this.sys()
  },
  sys: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowW: res.windowWidth,
          windowH: res.windowHeight
        })
      },
    })
  },
  imgLoadFunc: function(e) {
    var tempWidth = e.detail.width; // 获取图片实际宽度
    var tempHeight = e.detail.height; // 获取图片实际高度
    var result = this.data.windowW * tempHeight / tempWidth
    this.setData({
      windowH: result,
    })
  },
  canvasdraw: function () {
    var that = this;
    var canvas = wx.createCanvasContext('share');
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    console.log(windowW)
    console.log(windowH)
    var canvasimgbg = that.data.imgURL;
    canvas.drawImage(canvasimgbg, 0, 0, windowW, windowH);
    canvas.setFontSize(windowW / 20)
    var h = windowH * 0.436
    var z = windowH * 0.04
    canvas.textAlign = 'center'
    canvas.setFillStyle('#A50E0E')
    canvas.font = 'normal normal bolder 22px sans-serif'
    canvas.fillText(this.data.time, windowW / 2, h)
    canvas.setFillStyle('black')
    canvas.font = 'normal normal normal 22px sans-serif'
    canvas.fillText(this.data.text2,  windowW / 2, h + z)
    canvas.setFillStyle('#A50E0E')
    canvas.font = 'normal normal bolder 22px sans-serif'
    canvas.fillText(this.data.days,   windowW / 2, h + 2 * z)
    canvas.setFillStyle('black')
    canvas.font = 'normal normal normal 22px sans-serif'
    canvas.fillText(this.data.text4,   windowW / 2, h + 3 * z)
    canvas.fillText(this.data.text5,  windowW / 2, h + 4 * z)
    canvas.fillText(this.data.text6,  windowW / 2, h + 5 * z)
    canvas.fillText(this.data.text7,  windowW / 2, h + 6 * z)
 
    canvas.draw(true,setTimeout(function(){
      that.daochu()
    },1000));
    // canvas.draw();
  },
  daochu: function () {
    console.log('a');
    var that = this;
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: windowW,
      height: windowH,
      destWidth: windowW * 750 / wx.getSystemInfoSync().windowWidth,
      destHeight: windowH * 750 / wx.getSystemInfoSync().windowWidth,
      canvasId: 'share',
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '已保存到相册',
            })
          }
        })
        // wx.previewImage({
        //   urls: [res.tempFilePath],
        // })
        
      }
    })
  },
 
   // 长按保存图片
   saveImage(e){
    
   },
   saveImg1(url){
    wx.getImageInfo({
     src: url,
     success:(res)=> {
      let path = res.path;
      wx.saveImageToPhotosAlbum({
       filePath:path,
       success:(res)=> { 
        console.log(res);
       },
       fail:(res)=>{
        console.log(res);
       }
      })
     },
     fail:(res)=> {
      console.log(res);
     }
    })
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

  },
  getTempFilePath: function () {
    wx.canvasToTempFilePath({
      canvasId: 'share',
      success: (res) => {
        this.setData({
          shareTempFilePath: res.tempFilePath
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // const that = this;
    // wx.downloadFile({
    //   url: that.data.shareImgSrc,
    //   success: function (res) {
    //     that.data.shareImgSrc = res.tempFilePath
    //   }, fail: function (res) {
    //   }
    // })
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