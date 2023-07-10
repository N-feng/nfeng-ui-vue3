## 基本用法

```vue demo
<script setup>
import { ref, reactive } from "vue";
let value = ref('jack');
</script>

<template>
  <div>
    <div style="margin-bottom: 24px">value: {{ JSON.stringify(value)  }}</div>
    <n-input
      v-model:value="value"
      style="width: 120px"
    />
  </div>
</template>
```
