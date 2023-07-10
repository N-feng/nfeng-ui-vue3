<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
const data = ref([{
  name: '姓名',
  sex: 14
}]);
const option = reactive({
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
  <div style="margin-bottom: 24px">{{ data }}</div>
  <n-crud :option="option" :data="data" />
</template>
