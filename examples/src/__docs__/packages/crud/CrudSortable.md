# 拖拽排序

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";

const data: any = reactive([
  {
    text1: "内容1-1",
    text2: "内容1-2",
  },
  {
    text1: "内容2-1",
    text2: "内容2-2",
  },
  {
    text1: "内容3-1",
    text2: "内容3-2",
  },
]);
const option = reactive({
  sortable: true,
  column: [
    {
      label: "列内容1",
      prop: "text1",
    },
    {
      label: "列内容2",
      prop: "text2",
    },
  ],
});
</script>

<template>
  <n-crud :option="option" :data="data"></n-crud>
</template>
```
