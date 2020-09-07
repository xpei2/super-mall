<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <template v-slot:item-icon>
        <img src="~_ats/img/tabbar/home.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~_ats/img/tabbar/home_active.svg" alt />
      </template>
      <template v-slot:item-text>首页</template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template v-slot:item-icon>
        <img src="~_ats/img/tabbar/category.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~_ats/img/tabbar/category_active.svg" alt />
      </template>
      <template v-slot:item-text>分类</template>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="blue">
      <template v-slot:item-icon>
        <img src="~_ats/img/tabbar/shopcart.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~_ats/img/tabbar/shopcart_active.svg" alt />
      </template>
      <template v-slot:item-text>购物车</template>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="blue">
      <template v-slot:item-icon>
        <img src="~_ats/img/tabbar/profile.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~_ats/img/tabbar/profile_active.svg" alt />
      </template>
      <template v-slot:item-text>我的</template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "_com/common/tabbar/TabBar";
import TabBarItem from "_com/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>