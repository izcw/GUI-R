<template>
  <div class="not-found">
    <h1>404 - 页面未找到</h1>
    <p>您访问的页面不存在。</p>
    <button @click="routerStore.navigateBack()">后退</button>
    <button @click="routerStore.navigateForward()">前进</button>
  </div>
</template>
<script setup lang="ts">
import { useRouterStore } from '@/stores/index'
const routerStore = useRouterStore();
</script>

<style scoped lang="scss"></style>