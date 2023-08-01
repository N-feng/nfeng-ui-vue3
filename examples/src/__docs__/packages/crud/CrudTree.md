# 表格树

- 配置 rowKey 主键(默认为 id)
- 配置 rowParentKey 父类主键(默认为 parentId)

## 普通用法

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
const crud = ref();
const parentId = ref(undefined);
const data: any = reactive([
  {
    id: 10,
    event: "事件1",
    timeLine: 50,
    comment: "无",
  },
  {
    id: 1,
    event: "事件1",
    timeLine: 100,
    comment: "无",
    children: [
      {
        parentId: 1,
        id: 2,
        event: "事件2",
        timeLine: 10,
        comment: "无",
      },
      {
        parentId: 1,
        id: 3,
        event: "事件3",
        timeLine: 90,
        comment: "无",
        children: [
          {
            parentId: 3,
            id: 4,
            event: "事件4",
            timeLine: 5,
            comment: "无",
          },
          {
            parentId: 3,
            id: 5,
            event: "事件5",
            timeLine: 10,
            comment: "无",
          },
        ],
      },
    ],
  },
]);
const option = reactive({
  headerAlign: "center",
  align: "center",
  border: true,
  index: true,
  indexWidth: 110,
  rowKey: "id",
  rowParentKey: "parentId",
  // defaultExpandAll:true,
  column: [
    {
      label: "事件",
      prop: "event",
      align: "left",
      width: 200,
    },
    {
      label: "时间线",
      prop: "timeLine",
    },
    {
      label: "备注",
      prop: "comment",
    },
  ],
});
function rowSave(row, done) {
  row.parentId = parentId.value;
  row.id = new Date().getTime();
  parentId.value = undefined;
  done(row);
}
function rowUpdate(row, index, done) {
  done(row);
}
function handleAdd(row) {
  parentId.value = row.id;
  crud.value.rowAdd();
}
</script>

<template>
  <n-crud
    ref="crud"
    :option="option"
    :data="data"
    @row-save="rowSave"
    @row-update="rowUpdate"
  >
    <template #menu="{ row, size }">
      <a-button :size="size" type="link" @click="handleAdd(row)"
        >新增子级</a-button
      >
    </template>
  </n-crud>
</template>
```
