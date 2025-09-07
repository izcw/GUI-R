<template>
  <!-- ③ 动态布局 + 动态页面 -->
  <template v-if="system.currentLayoutComp && system.currentPageComp">
    <component :is="system.currentLayoutComp">
      <component :is="system.currentPageComp" />
    </component>
  </template>
  <div v-else>
    加载中...
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/stores/index';
const system = useSystemStore();
</script>

<style scoped lang="scss"></style>