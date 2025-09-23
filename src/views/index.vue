<!-- src/views/index.vue -->
<template>
  <!-- 动态布局 + 动态页面 -->
  <template v-if="systemStore.currentLayoutComp && systemStore.currentPageComp">
    <component :is="systemStore.currentLayoutComp">
      <component :is="systemStore.currentPageComp" />
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
import { watch, watchEffect, onUnmounted } from 'vue';
import { useSystemStore } from '@/stores/index';
const systemStore = useSystemStore();
import { UserActivityMonitor } from '@/config/userActivityMonitor'


// 配置用户活动监听器
const activityMonitor = new UserActivityMonitor({
  onTimeout: () => {
    console.warn('[活动监听] 会话超时处理')
    // 超时后跳转到登录页
    systemStore.navigateTo('Login')
  },
})

// 监听页面变化
const unwatch = watch(
  () => systemStore.config.currentPage,
  (newPage) => {
    if (newPage === 'Login') {
      console.log('当前是登录页，停止活动监听')
      activityMonitor.stop()
    } else {
      console.log('当前不是登录页，启动活动监听')
      activityMonitor.start()
    }
  },
  { immediate: true } // 初始化时执行
)

// 组件卸载时清理
onUnmounted(() => {
  unwatch() // 停止监听
  activityMonitor.stop() // 确保停止监听器
})
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