<!-- 左右布局（侧边栏 + 主内容） -->
<template>
  <div class="LeftRightLayout">
    <aside>
      <SideMenu />
    </aside>
    <main>
      <div class="main-content">
        <Header />
        <div class="title-top">
          <span>{{ routerStore.Router.currentPage }}</span>
          <span>4x2 Fast Switch Matrix Switcher </span>
        </div>
        <div class="container">
          <slot />
        </div>
        <div class="footer">
          <Footer />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import SideMenu from '@/layouts/components/Menu/SideMenu.vue'
import Header from '@/layouts/components/Global/Header.vue'
import Footer from '@/layouts/components/Global/Footer.vue'

import { useRouterStore } from '@/stores/index';
const routerStore = useRouterStore();
</script>
<style scoped lang="scss">
@use '@/layouts/index.scss' as layout;

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
    position: relative;
    overflow: auto;

    .main-content {
      width: 100%;
      height: 100%;
      min-width: layout.$minimum-width-container;
      padding: layout.$padding-container;
      box-sizing: border-box;
      position: relative;

      .title-top {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #fff;
        margin-bottom: 20px;
      }

      .container {
        display: grid;
        grid-template-columns: minmax(calc(layout.$minimum-width-container - layout.$padding-container - layout.$padding-container), calc(100% - 250px)); // 最小宽度，最大宽度
      }

      .footer {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: -1;
      }
    }

  }
}
</style>
