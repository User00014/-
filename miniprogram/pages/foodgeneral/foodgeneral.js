// pages/shopList/shopList.js

Page({
  data: {
    categories: [], // 所有分类
    shopsByCategory: {}, // 按分类存储的店铺信息
    currentIndex: 0, // 当前选中的分类索引
    currentShop: {}, // 当前选中的店铺信息
  },

  onLoad: function () {
    // 加载数据
    this.loadData();
  },

  // 加载数据
  loadData: function () {
    // 从云数据库中获取所有店铺信息
    const db = wx.cloud.database();
    const _ = db.command;
    const MAX_LIMIT = 20; // 每次获取的最大数据量

    // 分次获取数据
    db.collection('SHOP').count().then(count => {
      const batchTimes = Math.ceil(count.total / MAX_LIMIT);
      const tasks = [];
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('SHOP').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
        tasks.push(promise);
      }
      return Promise.all(tasks);
    }).then(res => {
      const shops = res.reduce((acc, cur) => {
        return acc.concat(cur.data);
      }, []);
      
      // 提取所有分类
      const categories = [...new Set(shops.map(item => item.shopcatogory))];
      // 将店铺按分类存储
      const shopsByCategory = {};
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        shopsByCategory[category] = shops.filter(item => item.shopcatogory === category);
      }
      // 更新数据
      this.setData({
        categories: categories,
        shopsByCategory: shopsByCategory,
        currentShop: shopsByCategory[categories[0]][0], // 默认显示第一个分类的第一个店铺信息
      });
    }).catch(err => {
      console.error('加载数据失败：', err);
    });
  },

  goToFoodDetail(event) {
    const shopId = event.currentTarget.dataset.shopid;
    wx.navigateTo({
      url: '/pages/fooddetail/fooddetail?shopid=' + shopId, // 小写的 shopid
    });
  },

  // 选择分类
  selectCategory: function (e) {
    const index = e.currentTarget.dataset.index;
    const category = this.data.categories[index];
    // 更新当前选中的分类索引和对应的店铺信息
    this.setData({
      currentIndex: index,
      currentShop: this.data.shopsByCategory[category][0], // 默认显示当前分类的第一个店铺信息
    });
  },
});

module.exports = {
  // 额外部分，用于遍历数据，以确保数据是否成功加载
  forLoop: function () {
    const obj = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3'
    };

    for (const key in obj) {
      console.log(key + ': ' + obj[key]);
    }
  }
};
