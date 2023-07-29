# 表格高级用法

## 配置项切换

```vue demo
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
const type: boolean = ref(true)
const data: any = reactive([
  {
    name: "张三",
    sex: "男",
    username: "smallwei",
    password: "smallwei",
  },
  {
    name: "李四",
    sex: "女",
    username: "avue",
    password: "avue",
  },
]);
const option = reactive({})
const option1 = reactive({
  addBtn: false,
  column: [
    {
      label: "姓名",
      prop: "name",
      search: true,
      searchSpan: 12,
    },
  ],
});
const option2 = reactive({
  addBtn: false,
  column: [
    {
      label: "用户名",
      prop: "username",
      search: true,
      searchSpan: 12,
    },
    {
      label: "密码",
      prop: "password",
      type: "password",
      search: true,
      searchSpan: 12,
    },
    {
      label: "姓名",
      prop: "name",
      search: true,
      searchSpan: 12,
    },
  ],
});
const crud = ref()
function handleSwitch() {
  type.value = !type.value;
  if (type.value) {
    Object.assign(option, option1);
  } else {
    Object.assign(option, option2);
  }
  crud.value.refreshTable()
}
onMounted(() => {
  handleSwitch();
})
</script>

<template>
  <n-crud ref="crud" :option="option" :data="data">
    <template #menu-left="{}">
      <a-button type="primary" @click="handleSwitch">
        <template #icon><swap-outlined /></template>
        切换
      </a-button>
    </template>
  </n-crud>
</template>
```
