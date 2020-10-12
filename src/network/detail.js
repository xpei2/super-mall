import {
  request
} from './request';

export function getDetailGoods(iid) {
  // 获取详情数据
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class BaseInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title ? itemInfo.title: '';
    this.desc = itemInfo.desc ? itemInfo.desc : '';
    this.newPrice = itemInfo.price ? itemInfo.price : '';
    this.oldPrice = itemInfo.oldPrice ? itemInfo.oldPrice : '';
    this.discount = itemInfo.discountDesc ? itemInfo.discountDesc : '';
    this.discountBgColor = itemInfo.discountBgColor ? itemInfo.discountBgColor : '';
    this.realPrice = itemInfo.lowNowPrice ? itemInfo.lowNowPrice : '';
    this.columns = columns ? columns : [];
    this.columns.pop();
    this.columns.push(services[services.length - 1].name);
    this.services = services ? services : [];
    this.services.pop()
  }
}

export class ShopInfo {
  constructor(itemInfo) {
    this.name = itemInfo.name ? itemInfo.name : '';
    this.logo = itemInfo.shopLogo ? itemInfo.shopLogo: '';
    this.url = itemInfo.shopUrl ? itemInfo.shopUrl : '';
    this.fans = itemInfo.cFans ? itemInfo.cFans : '';
    this.score = itemInfo.score ? itemInfo.score : [];
    this.sells = itemInfo.cSells ? itemInfo.cSells : '';
    this.shopId = itemInfo.shopId ? itemInfo.shopId : '';
    this.goodsCount = itemInfo.cGoods ? itemInfo.cGoods : 0
  }
}

export class ParamInfo {
  constructor(info, rule) {
    // 注：images可能没有值(某些产品品有值，某些没有)
    this.title = info.key ? info.key : '';
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set ? info.set : [];
    this.sizes = info.images ? rule.tables : []
  }
}
