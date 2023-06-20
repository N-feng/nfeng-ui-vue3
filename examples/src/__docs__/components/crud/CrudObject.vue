<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
let data = ref([{
  name: '姓名',
  sex: 14
}]);
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
</script>

<template>
  {{ data }}
  <n-crud :option="option" :data="data" />
</template>
