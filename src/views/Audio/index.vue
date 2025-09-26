<template>
  <div class="Audio">
    <ptn-Spacer :wrap="false" :size="15">
      <TitleLineCard title="Source Select">
        你好
      </TitleLineCard>
      <TitleLineCard title="Source Select">
        你好
      </TitleLineCard>
    </ptn-Spacer>
    <TitleLineWrapCard title="Source Select">
      你好
    </TitleLineWrapCard>
    <TitleLineWrapCard title="Source Select">
      你好
    </TitleLineWrapCard>

    <el-button type="success" @click="dialogVisible = true">弹窗</el-button>
    <el-date-picker-panel v-model="value" />
    <el-dialog v-model="dialogVisible" title="Tips" width="500">
      <span>This is a message</span>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TitleLineCard from '@/components/Style-MFP/TitleLineCard.vue'
import TitleLineWrapCard from '@/components/Style-MFP/TitleLineWrapCard.vue'


const dialogVisible = ref(false)
const value = ref()
</script>
<style scoped lang="scss">
.Audio {

  .Audio_card {
    display: flex;
  }
}
</style>
