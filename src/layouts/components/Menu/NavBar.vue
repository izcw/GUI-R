<template>
  <ul class="NavBar">
    <MenuList />
  </ul>
</template>
<script setup lang="ts">
import MenuList from '@/layouts/components/Menu/MenuList.vue'
</script>
<style lang="scss">
.NavBar {
  display: flex;

  .item {
    padding: 2rem 3rem;
  }
}
</style>
