<template>
  <div class="Control">
    <h1>Control</h1>
    <TitleCard title="Matrix">
      你好
    </TitleCard>
    <TitleCard title="Matrix">
      你好
    </TitleCard>

    <button @click="systemStore.navigateTo('404')">点击</button>

    <button @click="AuthStore.refreshAccessToken()">刷新Token</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TitleCard from '@/components/Style-FSC/TitleCard.vue'
import { useSystemStore, useAuthStore } from '@/stores/index'
const systemStore = useSystemStore();
const AuthStore = useAuthStore();
</script>
<style scoped lang="scss">
.Control {}
</style>
