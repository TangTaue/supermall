import {request} from './request'

export function getDetail(iid) {
    return request({
      url:'/detail',
      params:{
        iid
      }
    })
}

export class Goods{
  // 构造函数
  constructor(iteminfo,columns,services){
    this.title=iteminfo.title;
    this.desc=iteminfo.desc
    this.newPrice=iteminfo.price
    this.oldPrice=iteminfo.oldPrice
    this.discount=iteminfo.discountDesc
    this.columns=columns
    this.services=services
    this.realPrice=iteminfo.lowNowPrice
    }
}
// 店铺数据
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 尺寸数据
export class GoodsParams {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
