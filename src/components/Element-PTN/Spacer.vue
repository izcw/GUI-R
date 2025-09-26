<template>
  <div class="ptn-spacer" :class="spacerClasses" :style="spacerStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** 间距大小，支持数字(px)和字符串格式 */
  size?: number | string
  /** 布局方向 */
  direction?: 'horizontal' | 'vertical'
  /** 是否自动换行（水平布局时有效） */
  wrap?: boolean
  /** 对齐方式 */
  align?: 'start' | 'end' | 'center' | 'stretch'
}

const props = withDefaults(defineProps<Props>(), {
  size: 10,
  direction: 'horizontal',
  wrap: true,
  align: 'start'
})

// 计算间距值
const gapValue = computed(() => {
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})

// 容器类名
const spacerClasses = computed(() => [
  `spacer-${props.direction}`,
  `spacer-align-${props.align}`,
  { 'spacer-wrap': props.wrap && props.direction === 'horizontal' }
])

// 容器样式
const spacerStyles = computed(() => ({
  gap: gapValue.value
}))
</script>

<style scoped>
.ptn-spacer {
  display: flex;
  box-sizing: border-box;
}

/* 水平布局 */
.spacer-horizontal {
  flex-direction: row;
}

/* 垂直布局 */
.spacer-vertical {
  flex-direction: column;
}

/* 换行设置 */
.spacer-wrap {
  flex-wrap: wrap;
}

/* 对齐方式 */
.spacer-align-start {
  align-items: flex-start;
}

.spacer-align-end {
  align-items: flex-end;
}

.spacer-align-center {
  align-items: center;
}

.spacer-align-stretch {
  align-items: stretch;
}
</style>