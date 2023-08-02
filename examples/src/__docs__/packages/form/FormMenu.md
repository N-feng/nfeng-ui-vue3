# 表单操作按钮

## 自定义按钮

```vue demo
<script setup lang="ts">
import { ref } from "vue";
const form = ref({
  name: "我是名字",
});
const option = {
  // menuSpan: 15,
  // menuPosition: "right",
  column: [
    {
      label: "姓名",
      prop: "name",
      span: 12,
      // row: true,
    },
  ],
};
</script>

<template>
  <div style="margin-bottom: 24px">{{ form }}</div>
  <n-form :option="option" :model="form">
    <template #menuForm>
      <a-button type="primary">自定义提交</a-button>
    </template>
  </n-form>
</template>
```