export class ShopInfo {
  constructor(itemInfo) {
    this.name = itemInfo.name
    this.logo = itemInfo.services.shopLogo
    this.url = itemInfo.services.shopUrl
    this.score = itemInfo.score
    this.allSells = (itemInfo.cSells / 1000).toFixed(1)
    this.goodsNum = itemInfo.cGoods
  }
}