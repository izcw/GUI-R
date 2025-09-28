<template>
  <ptn-spacer :wrap="false" :size="15">
    <ptn-switch v-model="switchValue" active-value="on" inactive-value="off" />
    <ptn-switch v-model="switchValue" active-value="on" inactive-value="off" active-text="OFF" inactive-text="ON"
      :inlinePrompt="false" />
    <ptn-switch v-model="switchValue" active-value="on" inactive-value="off" active-text="OFF" inactive-text="ON" />
    <ptn-switch v-model="switchValue" active-value="on" inactive-value="off" active-text="OFF" inactive-text="ON"
      disabled />
  </ptn-spacer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ptnSwitch from '@/components/Element-PTN/Form/Switch.vue'
const switchValue = ref('off')
</script>
