# 操作栏配置

## 操作栏隐藏

```vue demo
<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
const data = ref([
  {
    name: "张三",
    sex: "男",
  },
  {
    name: "李四",
    sex: "女",
  },
]);
const option1 = reactive({
  menu: false,
  column: {
    name: {
      label: "姓名",
      prop: "name",
    },
    sex: {
      label: "年龄",
      prop: "sex",
    },
  },
});
</script>

<template>
  <n-crud :option="option1" :data="data" />
</template>
```

## 合并菜单

```vue demo
<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
const data = ref([
  {
    name: "张三",
    sex: "男",
  },
  {
    name: "李四",
    sex: "女",
  },
  {
    name: "王五",
    sex: "女",
  },
  {
    name: "赵六",
    sex: "男",
  },
]);
const option1 = reactive({
  menuType: "menu",
  menuBtnTitle: "自定义名称",
  column: {
    name: {
      label: "姓名",
      prop: "name",
    },
    sex: {
      label: "年龄",
      prop: "sex",
    },
  },
});

function tip(row) {
  // this.$message.success('自定义按钮' + JSON.stringify(row));
  console.log("自定义按钮" + JSON.stringify(row));
}
</script>

<template>
  <n-crud :option="option1" :data="data">
    <template #menu-btn="{ row }">
      <a-menu-item divided @click="tip(row)">
        <DownOutlined />
        自定义按钮
      </a-menu-item>
    </template>
    <template #menu="{ row }">
      <a-button type="link" @click="tip(row)">
        <template #icon>
          <user-outlined />
        </template>
        自定义按钮
      </a-button>
    </template>
  </n-crud>
</template>
```
