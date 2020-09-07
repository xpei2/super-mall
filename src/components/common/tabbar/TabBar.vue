<template>
  <nav id="tab-bar">
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  box-shadow: 0 -1px 3px rgba(100, 100, 100, 0.1);
  background-color: #f6f6f6;
}
</style>