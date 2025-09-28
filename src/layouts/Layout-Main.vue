<!-- 主布局（顶部导航 + 主内容） -->
<template>
  <div class="LeftRightLayout">
    <header>
      <NavBar />
    </header>
    <main>
      <div class="container">
        <slot />
      </div>
    </main>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>
<script setup lang="ts">
import NavBar from '@/layouts/components/Menu/NavBar.vue'
import Footer from '@/layouts/components/Global/Footer.vue'
</script>
<style scoped lang="scss">
@use '@/layouts/index.scss' as layout;

.LeftRightLayout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;

  header {
    color: var(--MenuNavBar-font);
    background-color: var(--MenuNavBar-Background);
  }

  main {
    width: 100%;
    height: 100%;
    min-width: layout.$minimum-width-container;
    padding: 100px layout.$padding-container;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    position: relative;

    .container {
      display: grid;
      grid-template-columns: minmax(calc(layout.$minimum-width-container - layout.$padding-container - layout.$padding-container), layout.$maximum-width-container);
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
