// pages/random/random.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    randomDish: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getRandomDish();
  },

  getRandomDish: function () {
    const db = wx.cloud.database();
    // 获取数据库中的总记录数
    db.collection('DISH').count().then(res => {
      const total = res.total;
      // 生成一个随机数，范围是 [0, total)
      const randomIndex = Math.floor(Math.random() * total);
      // 根据随机索引获取对应的菜品数据
      db.collection('DISH').skip(randomIndex).limit(1).get().then(res => {
        // 从获取到的随机菜品记录中提取 dishname 和 shopid 属性
        const randomDish = res.data[0];
        const dishname = randomDish.dishname;
        const shopid = randomDish.shopid;
        // 将获取到的随机菜品及其属性存储到页面数据中
        this.setData({
          randomDish: {
            dishname: dishname,
            shopid: shopid,
          }
        });
        console.log(dishname)
      }).catch(err => {
        console.error('获取随机菜品失败：', err);
      });
    }).catch(err => {
      console.error('获取菜品总数失败：', err);
    });
  },

  change: function(){
    // 获取当前页面的 shopid
    const shopid = this.data.randomDish.shopid;
    wx.navigateTo({
      url: '/pages/fooddetail/fooddetail?shopid=' + shopid,
    })
  },

  refreshRandomDish: function(){
    // 下拉刷新，重新随机抽取菜品
    this.getRandomDish();
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
