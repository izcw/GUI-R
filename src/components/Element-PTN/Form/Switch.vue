<template>
  <div class="switch-container" :class="{ 'is-disabled': disabled }">
    <span v-if="activeText && inlinePrompt" class="switch-text">{{ activeText }}</span>
    <label class="switch" :style="{ 'cursor': disabled ? 'not-allowed' : 'pointer' }">
      <input type="checkbox" :checked="isChecked" @change="handleChange" :disabled="disabled" />
      <div class="slider round"></div>
      <span v-if="!inlinePrompt && activeText && isChecked" class="switch-text-embedded left">
        {{ inactiveText }}
      </span>
      <span v-if="!inlinePrompt && inactiveText && !isChecked" class="switch-text-embedded right">
        {{ activeText }}
      </span>
    </label>
    <span v-if="inactiveText && inlinePrompt" class="switch-text">{{ inactiveText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
interface SwitchProps {
  modelValue: boolean | string | number  // 双向绑定的值
  activeValue?: boolean | string | number // 激活状态的值（默认true）
  inactiveValue?: boolean | string | number // 非激活状态的值（默认false）
  activeText?: string     // 激活状态显示文本
  inactiveText?: string   // 非激活状态显示文本
  inlinePrompt?: boolean  // 文本显示模式（true为行内模式，false为嵌入模式）
  disabled?: boolean      // 是否禁用开关
}

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
  activeText: '',
  inactiveText: '',
  inlinePrompt: true,
  disabled: false
})

// 定义事件发射器，明确可触发的事件类型
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean | string | number): void
}>()

// 计算属性：判断当前是否处于激活状态，依赖变化时自动缓存结果
const isChecked = computed(() => {
  return props.modelValue === props.activeValue
})

// 监听modelValue变化，进行值校验
watch(() => props.modelValue, (newVal) => {
  if (newVal !== props.activeValue && newVal !== props.inactiveValue) {
    console.warn('Switch组件警告：modelValue应为activeValue或inactiveValue之一')
  }
})

// 处理开关状态变化事件
const handleChange = (event: Event) => {
  // 禁用状态下不响应操作
  if (props.disabled) return

  const target = event.target as HTMLInputElement
  // 根据复选框状态选择对应的值
  const newValue = target.checked ? props.activeValue : props.inactiveValue

  // 仅当值实际发生变化时触发更新，避免不必要的渲染
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue)
  }
}
</script>

<style scoped lang="scss">
$switch-width: 86px;
$switch-height: 40px;
$slider-size: 36px;
$slider-margin: 2px;
$switch-border-radius: 34px;

.switch-container {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: $switch-width;
  height: $switch-height;
  margin: 0 6px;
  cursor: pointer;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: $slider-size;
  width: $slider-size;
  left: $slider-margin;
  bottom: $slider-margin;
  background-color: white;
  transition: 0.4s;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
  transform: translateX(calc($switch-width - $slider-size - ($slider-margin * 2)));
}

.slider.round {
  border-radius: $switch-border-radius;
}

.slider.round:before {
  border-radius: 50%;
}

.switch-text-embedded {
  width: calc($switch-width - $slider-size - ($slider-margin * 2));
  height: 100%;
  padding: 0 1px;
  box-sizing: border-box;
  margin: 0;
  line-height: $switch-height;
  text-align: center;
  position: absolute;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &.left {
    left: $slider-margin;
  }

  &.right {
    right: $slider-margin;
  }
}
</style>