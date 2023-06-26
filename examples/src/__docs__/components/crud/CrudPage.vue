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
const page = reactive({
  total: 1000,
  current: 1,
  pageSize: 10
});
</script>

<template>
  <div>{{ page }}</div>
  <a-button @click="page.current=page.current+1">页码+1</a-button>
  <a-button @click="page.pageSize=page.pageSize+10">条数+1</a-button>
  <a-button @click="page.total=page.total+10">总页数+1</a-button>
  <n-crud :option="option" :data="data" :page="page" />
</template>
