<template>
    <div id="profile">
        <nav-bar class="profile-bar">
            <template v-slot:nav-center>商品分类</template>
        </nav-bar>
        <profile-info />
        <finance>
            <finance-item num="0.00" company="元" is-link />
            <finance-item num="0" title="我的优惠" is-link />
            <finance-item company="分" title="我的积分" is-link />
        </finance>
        <profile-cell />
    </div>
</template>

<script>
// 公共组件
import NavBar from '_com/common/navbar/NavBar';
import { Finance, FinanceItem } from '_com/content/finance/index';

// 子组件
import ProfileInfo from './children/ProfileInfo';
import ProfileCell from './children/ProfileCell';

export default {
    name: 'Profile',
    components: {
        NavBar,
        Finance,
        FinanceItem,
        ProfileInfo,
        ProfileCell,
    },
};
</script>

<style scoped>
.profile-bar {
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
}
</style>
