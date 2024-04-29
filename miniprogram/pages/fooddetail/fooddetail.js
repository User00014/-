// fooddetail.js

const db = wx.cloud.database()
const shopCollection = db.collection('SHOP');
const dishCollection = db.collection('DISH');
Page({
  data: {
    shopId: null,
  },

  onLoad: function(options) {
    const shopId = Number(options.shopid);
    this.setData({
      shopId: shopId
     }); // 存储到页面数据中
    const that = this; // 保存当前页面对象的引用

    db.collection('SHOP').where({
      shopid: shopId,
    }).get({
      success: function(res) {
        // res.data 是包含搜索到的店铺信息的数组
  
        // 如果搜索到了店铺信息，则提取第一个店铺信息的shopaddress和shopname
        if (res.data.length > 0) {
          const shopInfo = res.data[0]; // 获取第一个店铺信息对象
          const shopAddress = shopInfo.shopaddress; // 提取店铺地址
          const shopName = shopInfo.shopname; // 提取店铺名称
          const cloudPic = shopInfo.pic;
  
          // 更新页面数据，将提取的店铺地址和名称保存到页面数据对象中
          that.setData({
            shopAddress: shopAddress,
            shopName: shopName,
            cloudPic: cloudPic
          });
        } else {
          console.log('未找到对应店铺信息');
        }
      },
      fail: function(err) {
        console.error('查询店铺信息失败：', err);
      }
    });

    db.collection('DISH').where({
      shopid: shopId,
    }).get({
      success: function(ans) {
        // res.data 是包含搜索到的菜品信息的数组
    
        // 如果搜索到了菜品信息，则提取菜品信息数组
        if (ans.data.length > 0) {
          const dishes = ans.data.map(item => {
            return {
              dishname: item.dishname,
              price: item.price
            };
          });
    
          // 更新页面数据，将提取的菜品信息数组保存到页面数据对象中
          that.setData({
            dishes: dishes
          });
        } else {
          console.log('未找到对应菜品信息');
        }
      },
      fail: function(err) {
        console.error('查询菜品信息失败：', err);
      }
    });
  },

  change(event) {
    const shopId = this.data.shopId;
    console.log(shopId);
    wx.navigateTo({
      url: '/pages/comment/comment?shopId=' + shopId, // 将shopId作为参数传递
    });
  }
  
});