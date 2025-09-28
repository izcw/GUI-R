<template>
  <div class="Audio">
    <ptn-spacer :wrap="false" :size="15">
      <TitleLineCard title="Source Select">
        你好
      </TitleLineCard>
      <TitleLineCard title="Source Select">
        你好
      </TitleLineCard>
    </ptn-spacer>

    <TitleLineWrapCard title="Source Select">
      你好
    </TitleLineWrapCard>
    <TitleLineWrapCard title="Source Select">
      你好
    </TitleLineWrapCard>

  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TitleLineCard from '@/components/Style-MFP/TitleLineCard.vue'
import TitleLineWrapCard from '@/components/Style-MFP/TitleLineWrapCard.vue'

</script>
<style scoped lang="scss">
.Audio {

  .Audio_card {
    display: flex;
  }
}
</style>
