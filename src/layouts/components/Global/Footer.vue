<template>
  <footer class="Footer">
    <div class="Test">
      <div class="item">
        <span class="title">主题</span>
        <button @click="systemStore.toggleTheme">
          {{ systemStore.isDark ? '☀️ 浅色' : '🌙 深色' }}
        </button>
      </div>
      <div class="item">
        <span class="title">路由</span>
        <button @click="routerStore.navigateBack()">后退</button>
        <button @click="routerStore.navigateForward()">前进</button>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useSystemStore, useRouterStore } from '@/stores/index';
const systemStore = useSystemStore();
const routerStore = useRouterStore();


</script>
<style scoped lang="scss">
.Footer {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #4800ff;

  button {
    border: 1px solid #ccc;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 10px;

    &:hover {
      background: #f0f0f06b;
    }
  }

  .Test {
    width: 100%;
    height: 100%;

    .item {
      width: 100%;
      min-height: 30px;
      padding: 1rem;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;

      display: flex;
      align-items: center;

      .title {
        font-size: 14px;
        min-width: 50px;
      }
    }

  }
}
</style>
