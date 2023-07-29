## 基本用法

```vue demo
<script setup>
import { ref, reactive } from "vue";
const checked = ref(false);
</script>

<template>
  <a-row>
    <a-col span="6">
      checked: {{ JSON.stringify(checked) }} <br />
      <n-switch v-model="checked" />
    </a-col>
  </a-row>
</template>
```
