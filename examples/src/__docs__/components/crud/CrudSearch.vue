<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
const data = ref([{
  name: '姓名',
  sex: 14
}]);
const option = reactive({
  searchIndex:1,
  searchIcon:true,
  column: {
    name: {
      label: '姓名',
      span: 12,
      searchSpan: 12,
      search:true,
    },
    sex: {
      label: '性别',
      span: 12,
      searchSpan: 12,
      search:true,
      searchOrder:1,
    },
  }
});
const search = reactive({
  name:'small'
});

const searchChange = (params: any,done: Function) => {
  // this.$message.success('2s后关闭锁定')
  console.log('2s后关闭锁定');
  setTimeout(()=>{
    done();
    // this.$message.success(JSON.stringify(params));
    console.log(JSON.stringify(params));
  },2000);
}
</script>

<template>
  <div style="margin-bottom: 24px">{{ search }}</div>
  <n-crud :option="option" :data="data" :search="search" @search-change="searchChange" />
</template>
