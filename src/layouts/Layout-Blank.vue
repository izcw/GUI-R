<!-- 空白布局（登录页等） -->
<template>
  <div class="BlankLayout">
    <main>
      <slot />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>

</template>
<script setup lang="ts">
import Footer from '@/layouts/components/Global/Footer.vue'
</script>
<style scoped lang="scss">
.BlankLayout {
  width: 100%;
  height: 100%;
}
</style>
