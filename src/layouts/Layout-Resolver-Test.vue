<template>
  <div class="LayoutResolver">
    <component :is="layoutComponent">
      <RouterView />
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './Layout-Main.vue'
import LeftRightLayout from './Layout-LeftRight.vue'
import BlankLayout from './Layout-Blank.vue'

const route = useRoute()

/* 根据 route.meta.layout 决定用哪个布局，没写就兜底 MainLayout */
const layoutMap: Record<string, any> = {
  main: MainLayout,
  leftRight: LeftRightLayout,
  blank: BlankLayout,
}

const layoutComponent = computed(() => layoutMap[route.meta.layout as string] ?? MainLayout)
</script>

<style scoped lang="scss">
.LayoutResolver {
  width: 100%;
  height: 100%;
}
</style>
