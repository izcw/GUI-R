<template>
  <div class="not-found">
    <h1>404 - 页面未找到</h1>
    <p>您访问的页面不存在。</p>
    <button @click="systemStore.navigateBack()">后退</button>
    <button @click="systemStore.navigateForward()">前进</button>
  </div>
</template>
<script setup lang="ts">
import { useSystemStore } from '@/stores/index'
const systemStore = useSystemStore();
</script>

<style scoped lang="scss"></style>