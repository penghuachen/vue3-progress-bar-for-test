<script setup>
import { onUnmounted } from 'vue'

const props = defineProps({
  infinite: {
    type: Boolean,
    default: false
  },
  progressValue: {
    type: Number,
    default: 0
  },
  stepValue: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['update:progressValue'])

let intervalId = null
async function operateProgress() {
  if (props.infinite && props.progressValue >= 100) {
    emit('update:progressValue', 0)
    return
  }

  if (props.progressValue >= 100) {
    stopProgress()
  }

  emit('update:progressValue', props.progressValue + props.stepValue)
}

function startProgress() {
  intervalId = setInterval(operateProgress, 1000)
}

function stopProgress() {
  clearInterval(intervalId)
  intervalId = null
}

function actProgressBar(action) {
  switch (action) {
    case 'start':
      if (intervalId) return
      startProgress()
      break
    case 'stop':
      stopProgress()
      break
    case 'reset':
      emit('update:progressValue', 0)
      stopProgress()
      break
    default:
      break
  }
}

defineExpose({
  actProgressBar,
  operateProgress,
  startProgress
})

onUnmounted(() => {
  stopProgress()
})
</script>

<template>
  <div class="progress-bar-container">
    <div
      class="progress-bar bg-green"
      :style="{ width: `${props.progressValue}%` }"
    ></div>
  </div>
</template>

<style scoped lang="css">
.progress-bar-container {
  width: 200px;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.bg-green {
  background-color: green;
}
</style>
