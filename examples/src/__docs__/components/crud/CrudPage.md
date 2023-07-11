# 分页

## 页码和条数

```vue demo
<script setup lang="ts">
import { reactive, ref, watch } from "vue";

const data = ref();

const option = reactive({
  column: {
    name: {
      label: "姓名",
      span: 12,
    },
    sex: {
      label: "年龄",
      span: 12,
    },
  },
});

const page = reactive({
  total: 40,
  current: 1,
  pageSize: 20,
});

function onLoad(page: any) {
  console.log("分页信息:" + JSON.stringify(page));
  //模拟分页
  if (page.current === 1) {
    data.value = [
      {
        id: 1,
        name: "张三",
        sex: "男",
      },
      {
        id: 2,
        name: "李四",
        sex: "女",
      },
    ];
  } else if (page.current === 2) {
    data.value = [
      {
        id: 3,
        name: "王五",
        sex: "女",
      },
      {
        id: 4,
        name: "赵六",
        sex: "女",
      },
    ];
  }
}
</script>

<template>
  <div style="margin-bottom: 24px">
    <div style="margin-bottom: 24px">{{ page }}</div>
    <a-button @click="page.current = page.current + 1">页码+1</a-button>
    <a-button @click="page.pageSize = page.pageSize + 10">条数+10</a-button>
    <a-button @click="page.total = page.total + 10">总页数+10</a-button>
  </div>
  <n-crud :option="option" :data="data" :page="page" @on-load="onLoad" />
</template>
```