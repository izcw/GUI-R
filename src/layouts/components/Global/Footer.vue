<template>
  <div class="Footer">
    <div class="Test">
      <!-- 主题切换按钮 -->
      <div class="theme-btn">
        <button @click="systemStore.toggleTheme">
          {{ systemStore.isDark ? '☀️ 浅色' : '🌙 深色' }}
        </button>
      </div>
      <!-- ① 布局切换 -->
      <div class="layout-switch">
        <nav class="nav">
          <button v-for="layout in systemStore.layouts" :key="layout.key"
            :class="{ active: systemStore.config.currentLayout === layout.key }"
            @click="systemStore.setCurrentLayout(layout.key)">
            {{ layout.name }}
          </button>
        </nav>
      </div>
      <div>
        <button @click="authStore.logout">
          退出登录
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSystemStore } from '@/stores/index';
const systemStore = useSystemStore();

import { useAuthStore } from '@/stores/index'
const authStore = useAuthStore()

</script>
<style scoped lang="scss">
.Footer {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #4800ff;

  button {
    border: 1px solid #ccc;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 10px;
  }

  .Test {
    display: flex;

    .theme-btn {

      button {



        &:hover {
          background: #f0f0f0;
        }
      }
    }

    .layout-switch {

      .nav {
        display: flex;

        button {

          &.active {
            background: #42b883;
            color: #fff;
          }
        }
      }
    }



  }
}
</style>
