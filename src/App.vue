<template>
    <div id="app">
        <keep-alive exclude="Detail">
            <router-view />
        </keep-alive>
        <main-tab-bar v-show="$store.state.tabBarShow"/>
    </div>
</template>
<script>
import MainTabBar from '_com/content/main-tabbar/MainTabBar';
export default {
    name: 'App',
    components: {
        MainTabBar
    }
};
</script>

<style lang="scss">
@import '~_ats/css/base';
</style>
