<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
const data = ref([{
  id: 1,
  name: '张三',
  sex:'男',
  age: 24,
}, {
  id:2,
  name:'李四',
  sex:'女',
  age: 18,
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
    age: {
      label: '年龄',
      span: 12,
      searchSpan: 12,
      search: true,
    }
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

const rowUpdate = (form: any,index: number,done: Function,loading: Function) => {
  // this.$message.success('模拟网络请求')
  console.log('模拟网络请求');
  setTimeout(()=>{
    // this.$message.success('关闭按钮等待');
    console.log('关闭按钮等待');
    loading();
  },1000)
  setTimeout(()=>{
    // this.$message.success('编辑数据'+ JSON.stringify(form)+'数据序号'+index);
    console.log('编辑数据'+ JSON.stringify(form)+'数据序号'+index);
    done(form);
  },2000)
}
</script>

<template>
  <div>{{ search }}</div>
  <n-crud :option="option" :data="data" :search="search" @search-change="searchChange" @row-update="rowUpdate" />
</template>
