<template>
  <div class="Control">

    <TitleCard title="Matrix">
      你好
    </TitleCard>
    <TitleCard title="Matrix">
      你好
    </TitleCard>

    <button @click="routerStore.navigateTo('404')">点击</button>

    <button @click="AuthStore.refreshAccessToken()">刷新Token</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TitleCard from '@/components/Style-FSC/TitleCard.vue'
import { useRouterStore, useAuthStore } from '@/stores/index'
const routerStore = useRouterStore();
const AuthStore = useAuthStore();


</script>
<style scoped lang="scss">
.Control {}
</style>
