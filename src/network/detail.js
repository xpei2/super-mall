import { request } from './request';

export function getDetailGoods(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.discountBgColor = itemInfo.discountBgColor;
        this.realPrice = itemInfo.lowNowPrice;;
        this.columns = columns;
        this.columns.pop();
        this.columns.push(services[services.length - 1].name);
        this.services = services;
        this.services.pop()
    }
}

export class ShopInfo {
  constructor(itemInfo) {
    this.name = itemInfo.name;
    this.logo = itemInfo.shopLogo;
    this.url = itemInfo.shopUrl;
    this.fans = itemInfo.fans;
    this.score = itemInfo.score;;
    this.sells = itemInfo.cSells;
    this.shopId = itemInfo.shopId;
    this.goodsCount = itemInfo.cGoods
  }
}

export class GoodsParam {
    constructor(info, rule) {
        // 注：images可能没有值(某些产品品有值，某些没有)
        this.title = info.key;
        this.image = info.images? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables
    }
}