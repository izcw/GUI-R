<template>
  <div class="TitleLineCard">
    <div class="title">
      <span class="line"></span>
      <p>{{ title }}</p>
      <span class="line"></span>
    </div>
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
.TitleLineCard {
  width: 100%;
  margin-bottom: 30px;

  .title {
    width: 100%;
    display: flex;
    align-items: center;

    p {
      padding: 0 1rem;
      white-space: nowrap;
    }

    .line {
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #3e7ebe;
    }
  }

  .content {
    padding: 1rem;
    box-sizing: border-box;
  }
}
</style>
