# Object 对象用法

```vue demo
<script setup lang="ts">
import { reactive, watch, onMounted } from "vue";
const form = reactive({
  name: "姓名",
  sex: 14,
});
const option = reactive({
  column: {
    name: {
      label: "姓名",
      span: 12,
    },
    sex: {
      label: "年龄",
      span: 12,
    },
  },
});
watch(option, (value) => {
  // console.log("value: ", value);
});
onMounted(() => {
  option.column.name.label += "(name)";
});
</script>

<template>
  <div style="margin-bottom: 24px">{{ form }}</div>
  <n-form :option="option" :model="form" />
</template>
```
