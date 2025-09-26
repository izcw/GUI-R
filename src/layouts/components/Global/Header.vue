<template>
  <header class="Header">
    <ul>
      <li><img src="@\assets\icon\common\standby.png">Standby</li>
      <li @click="authStore.Logout()"><img src="@\assets\icon\common\exit.png">Logout</li>
    </ul>
  </header>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/index'
const authStore = useAuthStore()

</script>
<style scoped lang="scss">
.Header {
  width: 100%;
  height: 80px;
  background-color: #3333336e;

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 2rem;
      cursor: pointer;

      img {
        width: 22px;
        height: 22px;
        margin-right: 4px;
      }

      &:hover,
      &:active {
        color: #ff1414;
      }
    }
  }
}
</style>
