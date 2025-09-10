<template>
  <div class="Control">
    <h1>Control</h1>
    <TitleCard title="Matrix">
      你好
    </TitleCard>
    <TitleCard title="Matrix">
      你好
    </TitleCard>

    <div @click="system.navigateTo('404')">点击</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TitleCard from '@/components/Style-FSC/TitleCard.vue'
import { useSystemStore } from '@/stores/index'
const system = useSystemStore();
</script>
<style scoped lang="scss">
.Control {}
</style>
