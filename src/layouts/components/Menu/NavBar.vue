<template>
  <ul class="NavBar">
    <MenuList />
  </ul>
  <SideMenu class="SideMenu" />
</template>
<script setup lang="ts">
import MenuList from '@/layouts/components/Menu/MenuList.vue'
import SideMenu from '@/layouts/components/Menu/SideMenu.vue'
</script>
<style lang="scss">
@use '@/layouts/index.scss' as layout;

.NavBar {
  width: 100%;
  height: 100px;
  display: flex;

  .item {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.SideMenu {
  display: none;
}

@media (max-width: layout.$minimum-width-folding-menu) {
  .NavBar {
    display: none;
  }

  .SideMenu {
    display: block;
  }
}
</style>
