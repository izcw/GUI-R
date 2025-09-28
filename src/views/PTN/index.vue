<template>
  <div class="PTN">
    <TitleCard title="Form 表单组件">
      <div class="item">
        <p class="title">Switch 开关：</p>
        <ptnSwitch />
      </div>
    </TitleCard>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TitleCard from '@/components/Style-FSC/TitleCard.vue'
import ptnSwitch from '@/views/PTN/component/Form/Switch/index.vue'

</script>
<style scoped lang="scss">
.PTN {

  .item {
    display: flex;
    align-items: center;

    .title {
      padding-right: 1rem;
    }
  }
}
</style>