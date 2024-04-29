const db = wx.cloud.database()
Page({
  data: {
  },

  onLoad: function(options) {
    const shopId = Number(options.shopId);
    const that = this; // 保存当前页面对象的引用
    console.log(shopId)

    db.collection('COMMENT').where({
      shopid: shopId,
    }).get({
      success: function(ans) {
        // res.data 是包含搜索到的菜品信息的数组
    
        // 如果搜索到了菜品信息，则提取菜品信息数组
        if (ans.data.length > 0) {
          const com = ans.data.map(item => {
            return {
              comment: item.comment
            };
          });
    
          // 更新页面数据，将提取的菜品信息数组保存到页面数据对象中
          that.setData({
            com: com
          });
        } else {
          console.log('未找到对应菜品信息');
        }
      },
      fail: function(err) {
        console.error('查询菜品信息失败：', err);
      }
    });
  }
})