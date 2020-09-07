<template>
   <div class="goods">
       <goods-list-item v-for="item in goodsList" :goodsItem="item" :key="item.image"/>
   </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';
export default {
   name: 'GoodList',
   props: {
       goodsList: Array
   },
   components: {
       GoodsListItem
   }
}
</script>

<style scoped>
.goods {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 1.5%;
    background-color: #eee;
}
</style>