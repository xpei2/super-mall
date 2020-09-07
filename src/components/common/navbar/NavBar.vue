<template>
  <div class="nav-bar">
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
  name: ''
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  box-shadow: 0 1px 3px rgba(100, 100, 100, 0.1);
}
.nav-left,
.nav-right,
.nav-center {
  display: grid;
  place-items: center;
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