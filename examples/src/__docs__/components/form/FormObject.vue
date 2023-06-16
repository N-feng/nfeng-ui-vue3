<script lang="ts">
export default {
  name: 'FormObject',
}
</script>

<script setup lang="ts">
import { reactive, watch } from 'vue'
let form = reactive({
  name: '姓名',
  sex: 14
});
let option = reactive({
  labelWidth: 120,
  column: {
    name: {
      label: '姓名',
      span: 12,
    },
    sex: {
      label: '年龄',
      span: 12,
    }
  }
});
watch(form, (value) => {
  option.column.name.label = value.name;
});
</script>

<template>
  {{ form }}
  <n-form :option="option" :model="form" />
</template>
