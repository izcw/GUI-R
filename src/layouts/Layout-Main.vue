<!-- 主布局（顶部导航 + 主内容） -->
<template>
  <div class="LeftRightLayout">
    <header>
      <NavBar />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
<script setup lang="ts">
import NavBar from '@/layouts/components/Menu/NavBar.vue'
import Footer from '@/layouts/components/Global/Footer.vue'
</script>
<style scoped lang="scss">
.LeftRightLayout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  header {
    color: var(--MenuNavBar-font);
    background-color: var(--MenuNavBar-Background);
  }

  main {
    width: 100%;
    height: 100%;
  }
}
</style>
