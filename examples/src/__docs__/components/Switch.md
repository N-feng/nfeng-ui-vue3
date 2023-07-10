## 基本用法

```vue demo
<script setup>
import { ref, reactive } from "vue";
const checked = ref(false);
</script>

<template>
  <div>
    <div style="margin-bottom: 24px">checked: {{ JSON.stringify(checked)  }}</div>
    <n-switch
      v-model="checked"
      style="width: 120px"
    />
  </div>
</template>
```
