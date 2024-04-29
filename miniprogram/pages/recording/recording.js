// pages/recording/recording.js
Page({
  // 在原始页面的事件处理函数中触发跳转到recording页面
// 在原始页面的事件处理函数中触发跳转到recording页面
  // 点击开始记录按钮的事件处理函数

  /**
   * 页面的初始数据
   */

   // pages/diet/diet.js

  // 定义输入优质碳水食物的方法
  inputCarbs: function(event) {
    // 处理输入逻辑
  },

  // 定义输入优质蛋白食物的方法
  inputProtein: function(event) {
    // 处理输入逻辑
  },

  // 定义输入水果食物的方法
  inputFruit: function(event) {
    // 处理输入逻辑
  },

  fillText: function(event) {
    // 获取点击按钮的父级 food-item 元素
    var foodItem = event.currentTarget.dataset.fooditem;
    
    // 根据 food-item 来确定对应的文本类名
    var textClass = foodItem + "-text";
  
    // 点击按钮，向输入框填充 "没吃" 并将对应文本设置为红色
    this.setData({
      inputValue: '没吃',
      [textClass]: true // 添加红色文本类名
    });
  },
  
  
  

  data: {
inputId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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