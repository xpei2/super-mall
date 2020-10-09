<template>
   <div class="finance">
       <slot></slot>
   </div>
</template>

<script>
export default {
   name: 'Finance',
}
</script>

<style scoped>
.finance {
    display: flex;
    align-items: stretch;
}
</style>