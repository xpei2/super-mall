<template>
  <div id="app">
    <router-view />
    <main-tab-bar />
  </div>
</template>
<script>
import MainTabBar from '_com/content/main-tabbar/MainTabBar'
export default {
    name: 'App',
    components: {
        MainTabBar
    }
}
</script>

<style lang="scss">
@import '~_ats/css/base'
</style>
