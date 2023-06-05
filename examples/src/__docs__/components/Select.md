## 基本用法

```vue demo
<script setup>
let form = {
  name: "我是名字",
};
let option = {
  column: [
    {
      label: "姓名",
      prop: "name",
      type: "select",
      dicData: [{
        label: "字典1",
        value: 0
      },{
        label: "字典2",
        value: 1
      }]
    },
  ],
};
</script>

<template>
  {{ form }}
  <n-form :option="option" v-model="form" />
</template>
```