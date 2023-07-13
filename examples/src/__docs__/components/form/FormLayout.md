# 表单布局

## 栏大小

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const form = reactive({
  name: "我是名字",
});
const option = reactive({
  size: "default",
  column: [
    {
      label: "姓名",
      prop: "name",
      span: 12,
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "年龄",
      prop: "number",
      // type: "number",
    },
  ],
});
</script>

<template>
  <a-row style="margin-bottom:20px">
    <a-radio-group v-model:value="option.size">
      <a-radio value="large">large</a-radio>
      <a-radio value="default">default</a-radio>
      <a-radio value="small">small</a-radio>
    </a-radio-group>
  </a-row>
  <n-form :option="option" :model="form" />
</template>
```

## 栏距列数

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const form = reactive({
  name: "我是名字",
});
const option = reactive({
  column: [
    {
      label: "姓名",
      prop: "name",
      span: 24,
    },
    {
      label: "性别",
      prop: "sex",
      span: 12,
    },
    {
      label: "年龄",
      prop: "number",
      // type: "number",
      // span: 12,
    },
  ],
});
</script>

<template>
  <n-form :option="option" :model="form" />
</template>
```

## 栏排序

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const option = reactive({
  column: [
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "性别",
      prop: "sex",
      order: 1,
    },
  ],
});
</script>

<template>
  <n-form :option="option" />
</template>
```

## 栏隐藏

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const option = reactive({
  column: [
    {
      label: "姓名",
      prop: "name",
      display: false,
    },
  ],
});
</script>

<template>
  <n-form :option="option" />
</template>
```

## 标题宽度

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const option = reactive({
  column: [
    {
      labelWidth: 200,
      label: "我是一个超级长的标题",
      prop: "name",
    },
    {
      label: "性别",
      prop: "sex",
    },
  ],
});
</script>

<template>
  <n-form :option="option" />
</template>
```

## 标题位置

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const option = reactive({
  layout: "horizontal",
  labelPosition: "top",
  column: [
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "性别",
      prop: "sex",
    },
  ],
});
</script>

<template>
  <a-row style="margin-bottom:20px">
    <a-radio-group v-model:value="option.layout">
      <a-radio value="horizontal">Horizontal</a-radio>
      <a-radio value="vertical">Vertical</a-radio>
      <a-radio value="inline">Inline</a-radio>
    </a-radio-group>
  </a-row>
  <n-form :option="option" />
</template>
```

## 标题辅助语

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const option = reactive({
  column: [
    {
      label: "姓名",
      prop: "name",
      labelTip: "我是一个标题提示语",
    },
    {
      label: "性别",
      prop: "sex",
      labelTip: "我是一个标题提示语",
      labelTipPlacement: "right",
    },
  ],
});
</script>

<template>
  <n-form :option="option" />
</template>
```

## 内容辅助语

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const option = reactive({
  column: [
    {
      label: "姓名",
      prop: "name",
      tip: "我是一个默认提示语",
    },
    {
      label: "性别",
      prop: "sex",
      tip: "我是一个左边提示语",
      tipPlacement: "left",
    },
  ],
});
</script>

<template>
  <n-form :option="option" />
</template>
```

## 选项卡展示

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const form = reactive({
  text: "文本",
  text1: "文本1",
  text2: "文本2",
  text3: "文本3",
});
const option = reactive({
  tabs: true,
  tabsActive: 2,
  column: [
    {
      label: "内容1",
      prop: "text1",
    },
  ],
  group: [
    {
      icon: "el-icon-info",
      label: "分组1",
      prop: "group1",
      column: [
        {
          label: "内容1",
          prop: "text1",
        },
      ],
    },
    {
      icon: "el-icon-info",
      label: "分组2",
      prop: "group2",
      column: [
        {
          label: "选项卡2",
          prop: "text2",
        },
        {
          label: "选项卡3",
          prop: "text3",
        },
      ],
    },
  ],
});
</script>

<template>
  <n-form :option="option" :model="form" />
</template>
```
