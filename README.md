# MyProgressBar 進度條組件

`MyProgressBar` 是一個簡單且可自定義的 Vue 進度條組件，支援自動增長、無限循環等功能。

## 特點
- 自定義進度條樣式
- 支援無限循環模式
- 可調整進度條步進值
- 提供啟動、停止及重置的控制方法

## 安裝

### 使用 NPM
```bash
npm install my-progress-bar
```


### 使用方法

```
<template>
  <MyProgressBar 
    :progressValue="progress" 
    :infinite="true" 
    :stepValue="10" 
    @update:progressValue="handleProgressUpdate" 
    ref="progressBar"
  />
  <button @click="startProgress">啟動</button>
  <button @click="stopProgress">停止</button>
  <button @click="resetProgress">重置</button>
</template>

<script setup>
import { ref } from 'vue'
import MyProgressBar from 'my-progress-bar'

const progress = ref(0)
const progressBar = ref(null)

function handleProgressUpdate(value) {
  progress.value = value
}

function startProgress() {
  progressBar.value.actProgressBar('start')
}

function stopProgress() {
  progressBar.value.actProgressBar('stop')
}

function resetProgress() {
  progressBar.value.actProgressBar('reset')
}
</script>
```

#### Props

| Prop          | 類型      | 預設值 | 說明                       |
| ------------- | --------- | ------ | -------------------------- |
| `infinite`    | `Boolean` | false  | 是否啟用無限循環模式       |
| `progressValue` | `Number`  | 0      | 當前進度條的進度值         |
| `stepValue`   | `Number`  | 5      | 每次自動增長的步進值       |

#### Emits

| 事件                   | 參數    | 說明                     |
| ---------------------- | ------- | ------------------------ |
| `update:progressValue`  | `Number` | 當進度條更新時觸發此事件 |

#### 方法
| 方法                     | 說明                          |
| ------------------------ | ----------------------------- |
| `actProgressBar('start')` | 啟動進度條                    |
| `actProgressBar('stop')`  | 停止進度條                    |
| `actProgressBar('reset')` | 重置進度條至 0                |

