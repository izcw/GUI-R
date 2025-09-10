<template>
  <div class="TitleCard">
    <div class="title">{{ title }}</div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
<style scoped lang="scss">
.TitleCard {
  width: 100%;
  padding: 30px;
  border-radius: 6px;
  background-color: #2d3441;
  margin-bottom: 20px;

  .title {
    height: 20px;
    font-size: 18px;
    text-indent: 15px;
    font-weight: bold;
    margin-bottom: 20px;
    position: relative;

    &::after {
      display: block;
      content: '';
      width: 4px;
      height: 20px;
      background-color: #00a4e7;
      position: absolute;
      left: 0px;
      top: 2px;
    }
  }
}
</style>
