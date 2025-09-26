<template>
  <div class="SideMenu" :style="{ 'position': moreMenu ? 'fixed' : 'static' }">
    <div class="more-menu-container">
      <div class="mask" @click="moreMenu = false"></div>
      <img src="@/assets/icon/common/more-menu.png" class="more-menu" :style="{ 'left': moreMenu ? '200px' : '0' }"
        @click="moreMenu = !moreMenu" />
      <div class="content" :style="{ 'display': moreMenu ? 'block' : '' }">
        <!-- LOGO -->
        <div class="logo">
          GUI-R
        </div>
        <!-- 内容 -->
        <ul class="menu-list">
          <MenuList @clicked="handleItemClick" />
        </ul>
        <!-- 底部信息 -->
        <div class="info">
          <p>GUI：<span>{{ version.gui }}</span></p>
          <p>Firmware：<span>{{ version.firmware }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import MenuList from '@/layouts/components/Menu/MenuList.vue'

// 菜单呼出
const moreMenu = ref(false);

// 菜单点击收回
const handleItemClick = () => {
  moreMenu.value = false;
};

// 底部信息
const version = reactive({
  gui: 'v1.0.0',
  firmware: 'v1.0.0'
})
</script>
<style lang="scss">
@use '@/layouts/index.scss' as layout;

.SideMenu {
  width: 100%;
  height: 100%;
  position: static;
  top: 0;
  left: 0;
  z-index: 888;


  .more-menu-container {
    width: 100%;
    height: 100%;
    position: relative;

    // 蒙版
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(108, 108, 108, 0.763);
    }

    // 更多菜单按钮
    .more-menu {
      width: 50px;
      height: 50px;
      cursor: pointer;
      background-color: aqua;
      position: absolute;
      left: 200px;
      top: 0;
      z-index: 999;
      transition: left 0.3s;
      display: block;
    }



    // 内容
    .content {
      background-color: black;
      width: 200px;
      height: 100%;
      padding: 0 1rem;
      box-sizing: border-box;
      overflow-y: auto;
      display: none;
      position: relative;


      .logo {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      // 菜单列表
      .menu-list {
        width: 100%;
        height: calc(100% - 200px);
        min-height: 500px;

        .item {
          width: 100%;
          padding: 10px 1rem;
          border-radius: 6px;
        }
      }

      // 底部信息
      .info {
        width: 100%;
        height: 100px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    }
  }
}

@media (min-width: layout.$minimum-width-folding-menu) {
  .SideMenu {
    position: static !important;
  }

  .SideMenu .more-menu {
    display: none !important;
  }

  .SideMenu .content {
    display: block !important;
  }
}
</style>
