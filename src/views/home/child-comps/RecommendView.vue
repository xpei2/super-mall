<template>
  <ul class="recommend">
    <li class="recommend-item" v-for="item in recommends" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" alt />
        <p>{{item.title}}</p>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: Array
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  justify-content: space-around;
  padding: 15px 0 20px;
  border-bottom: 7px solid #eee;
}
.recommend-item {
  flex: 0 1 80px;
  font-size: 14px;
  text-align: center;
}
.recommend-item img {
  display: block;
  width: 100%;
  margin-bottom: 7px;
}
</style>