<script setup lang="ts">
import { ref } from "vue";
const form = ref({
  province: "110000",
  city: "110100",
});
const option = ref({
  labelWidth: 120,
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
    },
  },
});
</script>

<template>
  {{ form }}
  <n-form :option="option" :model="form" />
</template>
