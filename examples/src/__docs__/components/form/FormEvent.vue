<script setup lang="ts">
import { ref, reactive, watch } from "vue";
const form = reactive({
  province: "110000",
  city: "110100",
});
const option = reactive({
  labelWidth: 120,
  column: {
    province: {
      label: "省份",
      type: "select",
      span: 24,
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
      },
    },
    city: {
      label: "城市",
      type: "select",
      span: 24,
      row: true,
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
  {{ form }}
  <n-form :option="option" :model="form" />
</template>
