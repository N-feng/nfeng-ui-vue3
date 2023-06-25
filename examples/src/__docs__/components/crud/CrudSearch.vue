<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
const data = ref([{
  name: '姓名',
  sex: 14
}]);
const option = reactive({
  labelWidth: 120,
  column: {
    name: {
      label: '姓名',
      searchSpan: 12,
      search:true,
    },
    sex: {
      label: '年龄',
      span: 12,
    }
  }
});
const search = reactive({
  name:'small'
});
</script>

<template>
  <div>{{ search }}</div>
  <n-crud :option="option" :data="data" :search="search" />
</template>
