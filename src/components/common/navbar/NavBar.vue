<template>
    <div class="nav-bar" :style="navBarStyle">
        <div class="nav-left">
            <slot name="nav-left"></slot>
        </div>
        <div class="nav-center">
            <slot name="nav-center"></slot>
        </div>
        <div class="nav-right">
            <slot name="nav-right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        navColor: {
            type: String,
            default: '#fff',
        },
        navBgColor: {
            type: String,
            default: 'var(--color-tint)',
        }
    },
    computed: {
        navBarStyle() {
            return {
                'color': this.navColor,
                'background-color': this.navBgColor,
            };
        }
    },
};
</script>

<style scoped>
.nav-bar {
    display: flex;
    width: 100%;
    height: 44px;
    box-shadow: 0 1px 3px rgba(100, 100, 100, 0.1);
    font-size: 16px;
}
.nav-left,
.nav-right,
.nav-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.nav-left,
.nav-right {
    flex-shrink: 0;
    width: 60px;
}
.nav-center {
    flex-grow: 1;
}
</style>