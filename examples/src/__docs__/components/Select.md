## 基本用法

```vue demo
<script setup>
import { ref, reactive } from "vue";
let form = {
  name: 1,
};
let option = {
  column: [
    {
      label: "姓名",
      prop: "name",
      type: "select",
      span: 12,
      dicData: [
        {
          label: "字典1",
          value: 0,
        },
        {
          label: "字典2",
          value: 1,
        },
      ],
    },
  ],
};
let value = ref('jack');
</script>

<template>
  <!-- <n-form :option="option" v-model="form" /> -->
  <div>
    <div>value: {{ JSON.stringify(value)  }}</div>
    <n-select
      v-model="value"
      style="width: 120px"
      :dic="[
        { type: 'jack', name: 'Jack' },
        {
          type: 'lucy',
          name: 'Lucy',
        },
        { type: 'disabled', name: 'Disabled', disabled: true },
        { type: 'Yiminghe', name: 'yiminghe' },
      ]"
      :props="{
        label: 'name',
        value: 'type',
      }"
    />
  </div>
</template>
```

## 字典属性

```vue demo
<script setup>
let form = {
  select: "下拉框",
};
let option = {
  column: [
    {
      label: "下拉框",
      prop: "select",
      type: "select",
      span: 12,
      props: {
        label: "name",
        value: "code",
      },
      dicData: [
        {
          name: "字典1",
          code: 0,
        },
        {
          name: "字典2",
          code: 1,
        },
      ],
    },
  ],
};
</script>

<template>
  <!-- <n-form :option="option" v-model="form" /> -->
</template>
```

## 创建条目和搜索

```vue demo
<script setup>
let form = {
  name: 0,
};
let option = {
  column: [
    {
      label: "姓名",
      prop: "name",
      type: "select",
      allowCreate: true,
      filterable: true,
      row: true,
      span: 12,
      dicData: [
        {
          label: "字典1",
          value: 0,
        },
        {
          label: "字典2",
          value: 1,
        },
      ],
    },
    {
      label: "姓名",
      prop: "name",
      type: "select",
      filterable: true,
      span: 12,
      dicData: [
        {
          label: "字典1",
          value: 0,
        },
        {
          label: "字典2",
          value: 1,
        },
      ],
    },
  ],
};
</script>

<template>
  <!-- <n-form :option="option" v-model="form" /> -->
</template>
```
