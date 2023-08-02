# 表单组件事件

- `change`事件
- `click`事件
- `focus`事件
- `blur`事件
- `enter`事件

## 组件事件

```vue demo
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { message } from "ant-design-vue";
const baseUrl = "https://cli.avuejs.com/api/area";
const form = reactive({
  province: "110000",
  city: "110100",
});
const option = reactive({
  column: {
    province: {
      label: "省份",
      type: "select",
      span: 12,
      row: true,
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
      cascader: ["city"],
      change: ({ value, column, item, dic }: any) => {
        message.success("change事件查看控制台");
        console.log("值改变", value, column);
      },
      focus: ({ value, column }: any) => {
        message.success("focus事件查看控制台");
        console.log("获取焦点", value, column);
      },
      blur: ({ value, column }: any) => {
        message.success("blur事件查看控制台");
        console.log("失去焦点", value, column);
      },
    },
    city: {
      label: "城市",
      type: "select",
      span: 12,
      row: true,
      dicUrl: `${baseUrl}/getCity/{{key}}`,
      dicData: [
        {
          label: "字典1",
          value: 2,
        },
        {
          label: "字典2",
          value: 3,
        },
      ],
    },
  },
});
</script>

<template>
  <n-form :option="option" :model="form" />
</template>
```

## 组件交互

```vue demo
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { message } from "ant-design-vue";
const baseUrl = "https://cli.avuejs.com/api/area";
const form = reactive({
  text1: 0,
});
const option = reactive({
  column: [
    {
      label: "内容1",
      prop: "text1",
      type: "radio",
      control: (val, form) => {
        if (val === 0) {
          return {
            text2: {
              display: true,
            },
            text3: {
              label: "内容3",
            },
          };
        } else {
          return {
            text2: {
              display: false,
            },
            text3: {
              label: "有没有发现我变了",
            },
          };
        }
      },
      dicData: [
        {
          label: "显示",
          value: 0,
        },
        {
          label: "隐藏",
          value: 1,
        },
      ],
    },
    {
      label: "内容2",
      prop: "text2",
      display: true,
    },
    {
      label: "内容3",
      prop: "text3",
    },
  ],
});
</script>

<template>
  <n-form :option="option" :model="form" />
</template>
```
