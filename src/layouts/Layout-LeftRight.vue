<!-- 左右布局（侧边栏 + 主内容） -->
<template>
  <div class="LeftRightLayout">
    <aside>
      <SideMenu />
    </aside>
    <main>
      <header>
        <Header />
      </header>
      <div class="main-content">
        <slot />
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import SideMenu from '@/layouts/components/Menu/SideMenu.vue'
import Header from '@/layouts/components/Global/Header.vue'
import Footer from '@/layouts/components/Global/Footer.vue'
</script>
<style scoped lang="scss">
.LeftRightLayout {
  width: 100%;
  height: 100%;
  display: flex;


  aside {
    color: var(--MenuNavBar-font);
    background-color: var(--MenuNavBar-Background);
  }

  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .main-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
