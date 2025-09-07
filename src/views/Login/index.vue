<template>
  <div class="Login">
    <h1>Login</h1>
    <button @click="LoginSubmit">
      登录
    </button>
    <button @click="parseToken">
      解析token
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useSystemStore } from '@/stores/index';
const systemStore = useSystemStore();

import { useUserStore, useAuthStore } from '@/stores/index';
const UserStore = useUserStore();

import {
  generateMockToken,
  generateMockRefreshToken,
  parseMockToken,
  type MockPayload,
} from '@/utils/token-mock'
const authStore = useAuthStore()

// 登录
const LoginSubmit = () => {
  let msg = 1;
  authStore.login({ username: 'izcw', role: 'admin' })

  if (msg == 1) {
    let filteredMenus = systemStore.menus.filter((item, i) => UserStore.UserMenuPermissions[i] === '1' && !item.hidden && (item.permission?.includes(UserStore.UserPermissionRole) ?? true)) // 只显示未隐藏且符合权限的菜单
    UserStore.setMenus(filteredMenus)
  }

}

const parseToken = () => {
  // authStore.refreshAccessToken;
  console.log(authStore.accessToken);

  console.log("解析token", parseMockToken(authStore.accessToken));
}
</script>
<style scoped lang="scss">
.Login {
  button {
    border: 1px solid #ccc;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>
