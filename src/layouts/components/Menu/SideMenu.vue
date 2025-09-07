<template>
  <ul class="SideMenu">
    <MenuList />
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MenuList from '@/layouts/components/Menu/MenuList.vue'


</script>
<style lang="scss">
.SideMenu {
  width: 200px;

  .item {
    width: 100%;
    padding: 1rem;
    border-radius: 6px;
  }
}
</style>
