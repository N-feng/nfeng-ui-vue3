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
const baseUrl = 'https://cli.avuejs.com/api/area'
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
        // this.$message.success('change事件查看控制台')
        console.log("值改变", value, column, item, dic);
        form.city = value;
        Object.assign(form, {
          city: value,
        });
        if (value) {
          if (
            option.column.city.dicData.findIndex(
              (item: any) => item.value === value
            ) === -1
          ) {
            option.column.city.dicData.push({
              label: `我选择了：${item.name}`,
              value,
            });
          } else {
            option.column.city.dicData.push({
              label: `我又选择了：${item.name}`,
              value,
            });
          }
        }
      },
      focus: ({ value,column }: any) => {
        // this.$message.success('focus事件查看控制台')
        console.log('获取焦点',value,column);
      },
      blur: ({ value, column }: any) => {
        // this.$message.success('blur事件查看控制台')
        console.log("失去焦点", value, column);
      }
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
  <div style="margin-bottom: 24px">{{ form }}</div>
  <n-form :option="option" :model="form" />
</template>
```