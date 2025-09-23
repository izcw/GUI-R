<template>
  <div class="Dialog" v-if="dialogVisible" @click="handleMaskClick">
    <div class="content" @click.stop
      :style="{ 'width': props.width, 'height': props.height, 'min-width': fixedSize ? props.width : 'auto', 'min-height': fixedSize ? props.height : 'auto' }">
      <!-- 头部 -->
      <div class="header">
        <div class="title">{{ title }}</div>
        <div v-if="props.showclose" class="close" @click="close()"></div>
      </div>
      <!-- 内容 -->
      <div class="body" :style="style">
        <slot>默认内容</slot>
      </div>
      <!-- 尾部 -->
      <div class="footer" v-show="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  title: { // 标题
    type: String,
    default: ''
  },
  width: { // 宽度
    type: String,
    default: '300px'
  },
  height: { // 高度
    type: String,
    default: '400px'
  },
  fixedSize: { // 是否固定大小
    type: Boolean,
    default: true
  },
  showclose: { // 是否显示关闭按钮
    type: Boolean,
    default: true
  },
  maskclose: { // 点击遮罩层是否关闭
    type: Boolean,
    default: false
  },
  style: { // 自定义样式
    type: Object,
    default: () => ({}),
  },
  timeClose: { // 自动关闭延迟时间（毫秒），为 0 则不自动关闭
    type: Number,
    default: 0
  },
  modelValue: { // v-model 绑定的值
    type: Boolean,
    default: false
  },
})

const emits = defineEmits(['update:modelValue', 'close'])

let autoCloseTimer: number | null = null

// 监听 modelValue 的变化
watch(() => props.modelValue, (newValue) => {
  dialogVisible.value = newValue;
  if (newValue) {
    setAutoCloseTimer();
  } else {
    clearAutoCloseTimer();
  }
});

const dialogVisible = ref(props.modelValue);

// 点击遮罩层处理
const handleMaskClick = () => {
  if (props.maskclose) {
    close();
  }
}

// 设置自动关闭定时器
const setAutoCloseTimer = () => {
  if (props.timeClose > 0) {
    autoCloseTimer = setTimeout(() => {
      close();
    }, props.timeClose);
  }
}

// 清理定时器
const clearAutoCloseTimer = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }
}

// 关闭弹窗，并清理资源
const close = () => {
  clearAutoCloseTimer(); // 清理定时器
  dialogVisible.value = false;
  emits('update:modelValue', false); // 更新 v-model 的值
  emits('close'); // 触发关闭事件，通知父组件
}

// 组件卸载前清理资源
onBeforeUnmount(() => {
  clearAutoCloseTimer();
});
</script>

<style scoped lang="scss">
.Dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: rgba(109, 109, 109, 0.217);


  .content {
    background-color: rgb(181, 181, 181);
    display: flex;
    flex-direction: column;
    justify-content: space-between;



    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: black;
      padding: 10px;
      box-sizing: border-box;

      .title {
        font-weight: bold;
      }

      .close {
        position: relative;
        width: 20px;
        height: 20px;
        // background-color: #f44336;
        border: none;
        color: white;
        cursor: pointer;
        outline: none;
      }

      .close::before,
      .close::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 2px;
        background-color: white;
        transform: translate(-50%, -50%);
      }

      .close::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      .close::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }

    .body {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
    }

    .footer {
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
