<template>
  <li class="item" v-for="item in UserStore.UserMenus" :key="item.key"
    :class="{ 'active': systemStore.config.currentPage === item.key }"
    @click="systemStore.setCurrentPage(item.key, item.layout)">
    <img :src="systemStore.config.currentPage === item.key ? item.meta?.icon_active : item.meta?.icon" alt="">
    {{ item.name }}
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { useSystemStore } from '@/stores/index';
const systemStore = useSystemStore();

import { useUserStore } from '@/stores/index';
const UserStore = useUserStore();

</script>

<style scoped lang="scss">
.item {
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  &:hover,
  &:active {
    background-color: rgb(var(--color-menu-hover));
  }

  &.active {
    background-color: rgb(var(--color-menu-active));
  }
}
</style>
