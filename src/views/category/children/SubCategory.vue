<template>
    <ul class="sub-category-list">
        <li class="sub-category-item" v-for="(item, index) in categoryList" :key="index">
            <a :href="item.link">
                <img v-lazy="item.image" :alt="item.title"/>
                <p>{{ item.title }}</p>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'SubCategory',
    props: {
        categoryList: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};
</script>

<style scoped>
.sub-category-list {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    padding: 15px;
    background-color: #fff;
}
.sub-category-item {
    width: 30%;
    margin-bottom: 5.33333vw;
    padding: 0 5px;
    text-align: center;
}
.sub-category-item img {
    display: block;
    width: 100%;
}
.sub-category-item p {
    margin-top: 8px;
    font-size: 14px;
}
</style>