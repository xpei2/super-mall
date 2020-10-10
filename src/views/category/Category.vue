<template>
    <div id="category">
        <nav-bar>
            <template v-slot:nav-center>商品分类</template>
        </nav-bar>
        <div class="category-cont slide-bar">
            <bscroll
                class="category-scroll"
                :probe-type="2"
                :mouse-wheel="true"
                ref="slideScroll"
            >
                <cate-slide-bar
                    :slide-bar-list="CategoryList"
                    @slideItemClick="slideItemClick"
                    @slideLoad="slideLoad"
                />
            </bscroll>
        </div>
        <div class="category-cont sub-category">
            <bscroll
                class="category-scroll"
                :probe-type="2"
                :mouse-wheel="true"
                ref="scroll"
            >
                <sub-category :category-list="subCategoryList" />
                <tab-control
                    class="category-control"
                    :titles="titles"
                    @tabClick="tabClick"
                    ref="tabControl"
                />
                <goods-list :goods-list="categoryDetailList" />
            </bscroll>
        </div>
    </div>
</template>

<script>
// 公共组件
import NavBar from '_com/common/navbar/NavBar';
import Bscroll from '_com/common/bscroll/Bscroll';
import TabControl from '_com/content/tab-control/TabControl';
import GoodsList from '_com/content/goods/GoodsList';

// 子组件
import CateSlideBar from './children/CateSlideBar';
import SubCategory from './children/SubCategory';

//数据
import { getCategory, getSubCategory, getCategoryDetail } from '_new/category';

// 导入混入
import { goodsListenerMixin } from '_con/mixin';

export default {
    name: 'Category',
    components: {
        NavBar,
        Bscroll,
        TabControl,
        GoodsList,
        CateSlideBar,
        SubCategory,
    },
    data() {
        return {
            CategoryList: [],
            subCategoryList: [],
            categoryDetailList: [],
            titles: ['流行', '新款', '精选'],
            slideMiniWallkey: '',
        };
    },
    mixins: [goodsListenerMixin],
    beforeCreate() {
        this.$store.commit('setLoading', false);
    },
    created() {
        // 获取数据
        this.getCategory();
    },
    deactivated() {
        // 取消itemImage事件总线的监听
        this.$bus.$off('itemImageLoad', this.goodstImgListener);
    },
    methods: {
        // 当slide-bar界面渲染完毕，刷新slide的refresh
        slideLoad() {
            this.$refs.slideScroll.refresh();
        },
        // slide-bar点击事件，获取对应数据
        slideItemClick(obj) {
            if (this.slideMiniWallkey !== obj.miniWallkey) {
                //点击slide-bar获取子分类列表
                this.getSubCategory(obj.maitKey);
                //点击slide-bar获取推荐商品列表
                this.getCategoryDetail(obj.miniWallkey, 'pop');
                // 设置当前商品的推荐列表id
                this.slideMiniWallkey = obj.miniWallkey;
                this.$nextTick(() => {
                    // 点击滚动到顶部
                    this.$refs.scroll.scrollTo(0, 0, 50);
                });
            }
        },
        // tabControl点击事件
        tabClick(index) {
            let controlList = ['pop', 'new', 'sell'];
            this.getCategoryDetail(this.slideMiniWallkey, controlList[index]);
        },
        // 获取分类列表数据
        getCategory() {
            getCategory().then((res) => {
                this.CategoryList = res.data.category.list;
                // 设置默认商品推荐列表id为第一个分类的id
                this.slideMiniWallkey = res.data.category.list[0].miniWallkey;
                this.$nextTick(() => {
                    this.getSubCategory(this.CategoryList[0].maitKey);
                    this.getCategoryDetail(this.slideMiniWallkey, 'pop');
                    this.$store.commit('setLoading', true);
                });
            });
        },
        // 获取子分类列表数据及其推荐商品列表
        getSubCategory(key) {
            getSubCategory(key).then((res) => {
                this.subCategoryList = res.data.list;
            });
        },
        // 获取分类推荐商品的详情
        getCategoryDetail(key, type) {
            getCategoryDetail(key, type).then((res) => {
                this.categoryDetailList = res;
            });
        },
    },
};
</script>

<style scoped>
#category {
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 49px);
}
.category-cont {
    flex-shrink: 0;
    height: calc(100% - 44px);
}
.category-scroll {
    height: 100%;
}
.slide-bar {
    width: 100px;
    background-color: #f6f6f6;
}
.sub-category {
    width: calc(100% - 100px);
    background-color: #f7f1f1;
}
</style>
