# 表单多级联动

## Select 多级联动

```vue demo
<script setup lang="ts">
import { ref, reactive } from "vue";
const baseUrl = "";
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
    },
    city: {
      label: "城市",
      type: "select",
      span: 12,
      dicUrl: `${baseUrl}/getCity/{{key}}?params={{params}}`,
    },
  },
});
</script>

<template>
  <n-form :option="option" :model="form" />
</template>
```

## Select+InputTable 多级联动

```vue demo
<script setup lang="ts">
import { ref } from "vue";
import { message } from 'ant-design-vue';
const baseUrl = "";
const form = ref({
  province: "110000",
  city: "110100",
});
const option = ref({
  column: [
    {
      label: "省份",
      prop: "province",
      type: "table",
      children: {
        border: true,
        column: [
          {
            label: "名称",
            search: true,
            searchSpan: 24,
            prop: "name",
          },
        ],
      },
      load: ({ page, value, data }, callback) => {
        //首次加载去查询对应的值
        if (value) {
          message.success("首次查询" + value);
          callback({
            id: "110000",
            name: "北京市",
          });
          return;
        }
        if (data) {
          message.success("搜索查询参数" + JSON.stringify(data));
        }
        if (page) {
          message.success("分页参数" + JSON.stringify(page));
        }
        //分页查询信息
        callback({
          total: 2,
          data: [
            {
              id: "110000",
              name: "北京市",
            },
            {
              id: "130000",
              name: "河北省",
            },
          ],
        });
      },
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
      cascader: ["city"],
    },
    {
      label: "城市",
      prop: "city",
      type: "select",
      span: 12,
      dicUrl: `${baseUrl}/getCity/{{key}}?params={{params}}`,
    },
  ],
});
</script>

<template>
  <n-form :option="option" :model="form" />
</template>
```
