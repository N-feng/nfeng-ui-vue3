# Select选择框

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
      span: 6,
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
  <n-form :option="option" :model="form" />
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
      span: 6,
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
      span: 6,
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
  <n-form :option="option" :model="form" />
</template>
```