# Object对象用法

```vue demo
<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
const data = ref([{
  name: '姓名',
  sex: 14
}]);
const option = reactive({
  column: {
    name: {
      label: '姓名',
      span: 12,
    },
    sex: {
      label: '年龄',
      span: 12,
    }
  }
});
onMounted(() => {
  option.column.name.label += "(name)";
});
</script>

<template>
  <div style="margin-bottom: 24px">{{ data }}</div>
  <n-crud :option="option" :data="data" />
</template>
```