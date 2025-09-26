<template>
  <div class="TitleLineCard">
    <fieldset>
      <legend class="title">{{ title }}</legend>
      <div class="content">
        <slot></slot>
      </div>
    </fieldset>
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

  fieldset {
    border: 1px solid #3e7ebe;
    border-radius: 6px;
    padding: 1rem;
    padding-top: 6px;
    box-sizing: border-box;

    .title {
      text-align: center;
      padding: 0 1rem;
      white-space: nowrap;
    }
  }

}
</style>
