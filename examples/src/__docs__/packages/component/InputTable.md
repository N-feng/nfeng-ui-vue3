# inputTable表格选择器

```vue demo
<script setup>
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";
const column = reactive({
  children: {
    border: true,
    column: [
      {
        label: "姓名",
        width: 120,
        search: true,
        prop: "name",
      },
      {
        label: "性别",
        search: true,
        prop: "sex",
      },
    ],
  },
});
const props = {
  label: "name",
  value: "id",
};
const form = ref("jack");
function onLoad({ page, value, data }, callback) {
  //首次加载去查询对应的值
  if (value) {
    message.success("首次查询" + value);
    callback({
      id: "0",
      name: "张三",
      sex: "男",
    });
    return;
  }
  if (data) {
    message.success("搜索查询参数" + JSON.stringify(data));
  }
  if (page) {
    message.success("分页参数" + JSON.stringify(page));
  }
  //分页查询信息
  callback({
    total: 2,
    data: [
      {
        id: "0",
        name: "张三",
        sex: "男",
      },
      {
        id: "1",
        name: "李四",
        sex: "女",
      },
    ],
  });
}
function formatter(row) {
  if (!row.name) return "";
  return row.name + "-" + row.sex;
}
</script>

<template>
  <a-row>
    <a-col span="6">
      值:{{ form }} <br />
      <n-input-table
        :props="props"
        :column="column"
        :load="onLoad"
        v-model="form"
      />
      格式化值:{{ form }} <br />
      <n-input-table
        :props="props"
        :column="column"
        :formatter="formatter"
        :load="onLoad"
        v-model="form"
      />
    </a-col>
  </a-row>
</template>
```
