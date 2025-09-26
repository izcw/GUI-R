<template>
  <li class="item" v-for="item in UserStore.UserMenus" :key="item.name"
    :class="{ 'active': routerStore.Router.currentPage === item.name }" @click="handleClick(item.name)">
    <img :src="routerStore.Router.currentPage === item.name ? item.meta?.icon_active : item.meta?.icon" alt="">
    {{ item.name }}
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouterStore, useUserStore } from '@/stores/index';
const routerStore = useRouterStore();
const UserStore = useUserStore();
import type { PageName } from '@/types/router'

// 定义 emit
const emit = defineEmits(['clicked']);

const handleClick = (name: PageName) => {
  console.log("88------", name);

  routerStore.navigateTo(name); // 调用 store 中的方法
  emit('clicked'); // 触发事件，通知父组件
};


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
