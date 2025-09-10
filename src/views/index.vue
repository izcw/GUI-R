<!-- src/views/index.vue -->
<template>
  <!-- 动态布局 + 动态页面 -->
  <template v-if="system.currentLayoutComp && system.currentPageComp">
    <component :is="system.currentLayoutComp">
      <component :is="system.currentPageComp" />
    </component>
  </template>

  <!-- 优化加载状态 -->
  <div v-else class="loading-container">
    <!-- 加载动画 -->
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>

    <!-- 加载提示 -->
    <div class="loading-text">
      <p>正在加载页面组件...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/stores/index';
const system = useSystemStore();
</script>

<style scoped lang="scss">
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--bg-color);
  padding: 20px;
}

.loading-spinner {
  margin-bottom: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  text-align: center;
  color: var(--text-color);
  font-size: 16px;

  p {
    margin: 5px 0;
  }
}
</style>