<template>
  <div v-if="visible" class="message" :class="type" @click="handleClick">
    <div class="message-content">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const visible = ref(true);

const handleClick = () => {
  visible.value = false;
};

setTimeout(() => {
  visible.value = false;
}, props.duration);
</script>

<style scoped lang="scss">
.message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  z-index: 10000;

  &.info {
    background-color: #1890ff;
  }

  &.success {
    background-color: #52c41a;
  }

  &.warning {
    background-color: #faad14;
  }

  &.error {
    background-color: #ff4d4f;
  }

  .message-content {
    cursor: pointer;
  }
}
</style>