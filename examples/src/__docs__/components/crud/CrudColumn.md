# 表格列配置

## 主键

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";

const data: any = reactive([
  {
    ids: 1,
    name: "张三",
    sex: "男",
    age: 24,
  },
  {
    ids: 2,
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  rowKey: "ids",
  column: [
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "年龄",
      prop: "age",
    },
    {
      label: "开关",
      prop: "switch",
    },
  ],
});
</script>

<template>
  <n-crud :option="option" :data="data"> </n-crud>
</template>
```

## 宽度

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";

const data: any = reactive([
  {
    name: "张三",
    sex: "男",
    age: 24,
  },
  {
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  column: [
    {
      width: 200,
      label: "姓名",
      prop: "name",
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "年龄",
      prop: "age",
    },
    {
      label: "开关",
      prop: "switch",
    },
  ],
});
</script>

<template>
  <n-crud :option="option" :data="data"> </n-crud>
</template>
```

## 序号

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";

const data: any = reactive([
  {
    name: "张三",
    sex: "男",
    age: 24,
  },
  {
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  index: true,
  indexLabel: "序号",
  column: [
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "年龄",
      prop: "age",
    },
    {
      label: "开关",
      prop: "switch",
    },
  ],
});
</script>

<template>
  <n-crud :option="option" :data="data"> </n-crud>
</template>
```

## 自定义索引

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";

const data: any = reactive([
  {
    name: "张三",
    sex: "男",
    age: 24,
  },
  {
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  column: [
    {
      label: "序号",
      prop: "index",
      fixed: true,
    },
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "年龄",
      prop: "age",
    },
    {
      label: "开关",
      prop: "switch",
    },
  ],
});
</script>

<template>
  <n-crud :option="option" :data="data">
    <template #index="{ row, index }">
      <a-tag>{{ index + 1 }}</a-tag>
    </template>
  </n-crud>
</template>
```

## 内容超出隐藏

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";

const data: any = reactive([
  {
    name: "张三的名字是一个很长很长的内容",
    sex: "男",
    age: 24,
  },
  {
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  column: [
    {
      label: "姓名",
      prop: "name",
      overHidden: true,
      width: 80,
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "年龄",
      prop: "age",
    },
    {
      label: "开关",
      prop: "switch",
    },
  ],
});
</script>

<template>
  <n-crud :option="option" :data="data"></n-crud>
</template>
```

## 内容格式化

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";

const data: any = reactive([
  {
    name: "张三",
    sex: "男",
    age: 24,
  },
  {
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  column: [
    {
      label: "姓名",
      prop: "name",
      formatter: (val, value, label) => {
        return val.name + "格式化内容";
      },
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "年龄",
      prop: "age",
    },
    {
      label: "开关",
      prop: "switch",
    },
  ],
});
</script>

<template>
  <n-crud :option="option" :data="data"></n-crud>
</template>
```

## 支持 html 转译

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";

const data: any = reactive([
  {
    name: "张三",
    sex: "男",
    age: 24,
  },
  {
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  column: [
    {
      label: "姓名",
      prop: "name",
      html:true,
      formatter: (val) => {
        return '<b style="color:red">' + val.name + "格式化内容</b>";
      },
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "年龄",
      prop: "age",
    },
    {
      label: "开关",
      prop: "switch",
    },
  ],
});
</script>

<template>
  <n-crud :option="option" :data="data"></n-crud>
</template>
```
