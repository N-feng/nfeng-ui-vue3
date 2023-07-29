## 基本用法

```vue demo
<script setup>
import { ref, reactive } from "vue";
const form = ref("jack");
</script>

<template>
  <a-row>
    <a-col span="6">
      值: {{ JSON.stringify(form) }} <br />
      <n-input v-model="form" />
    </a-col>
  </a-row>
</template>
```
