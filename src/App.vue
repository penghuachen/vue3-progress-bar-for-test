<template>
  <div>
    <h1>Vue Progress Bar Example</h1>
    <button class="start-progress-btn" @click="progressbarRef.actProgressBar('start')">Start Progress</button>
    <button class="stop-progress-btn"  @click="progressbarRef.actProgressBar('stop')">Stop Progress</button>
    <button class="reset-progress-btn" @click="progressbarRef.actProgressBar('reset')">Reset Progress</button>

    <hr />

    <ProgressBar
      ref="progressbarRef"
      infinite
      :stepValue="10"
      v-model:progressValue="progressValue"
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'

const progressbarRef = ref(null)
const progressValue = ref(0)

</script>


<style lang="scss" scoped>
  button {
    margin-right: 5px;
  }
</style>
