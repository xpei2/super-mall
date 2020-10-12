<template>
   <div class="back-top">
       <img src="~_ats/img/common/top.png" alt="">
   </div>
</template>

<script>
export default {
   name: 'BackTop'
}
</script>

<style scoped>
.back-top {
    position: fixed;
    bottom: 55px;
    right: 5px;
    z-index: 9999;
    width: 50px;
}
.back-top img {
    display: block;
    width: 100%;
}
</style>