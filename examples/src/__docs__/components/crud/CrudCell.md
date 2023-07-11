# 行编辑

## 普通用法

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
const data: any = reactive([
  {
    id: 1,
    name: "张三",
    sex: "男",
    age: 24,
    $cellEdit: true,
  },
  {
    id: 2,
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  addBtn: false,
  addRowBtn: true,
  cellBtn: true,
  dialogType: "drawer",
  dialogWidth: 800,
  column: {
    name: {
      label: "姓名",
      span: 12,
      cell: true,
      rules: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
    },
    sex: {
      label: "性别",
      span: 12,
      cell: true,
    },
    age: {
      label: "年龄",
      span: 12,
      cell: true,
    },
    switch: {
      label: "开关",
      type: "switch",
      cell: true,
    },
  },
});

const rowSave = (form: any, done: Function, loading: Function) => {
  form.id = new Date().getTime();
  // this.$message.success('模拟网络请求')
  console.log("模拟网络请求");
  setTimeout(() => {
    // this.$message.success('关闭按钮等待');
    console.log("关闭按钮等待");
    loading();
  }, 1000);
  setTimeout(() => {
    // this.$message.success('新增数据'+ JSON.stringify(form));
    console.log("新增数据" + JSON.stringify(form));
    done(form);
  }, 2000);
};

const rowUpdate = (
  form: any,
  index: number,
  done: Function,
  loading: Function
) => {
  // this.$message.success('模拟网络请求')
  console.log("模拟网络请求");
  setTimeout(() => {
    // this.$message.success('关闭按钮等待');
    console.log("关闭按钮等待");
    loading();
  }, 1000);
  setTimeout(() => {
    // this.$message.success('编辑数据'+ JSON.stringify(form)+'数据序号'+index);
    console.log("编辑数据" + JSON.stringify(form) + "数据序号" + index);
    done(form);
  }, 2000);
};
</script>

<template>
  <n-crud
    :option="option"
    :data="data"
    ref="crudRef"
    @row-save="rowSave"
    @row-update="rowUpdate"
  >
  </n-crud>
</template>
```

## 内容自定义

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
const data: any = reactive([
  {
    id: 1,
    name: "张三",
    sex: "男",
    age: 24,
    $cellEdit: true,
  },
  {
    id: 2,
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  addBtn: false,
  addRowBtn: true,
  cellBtn: true,
  dialogType: "drawer",
  dialogWidth: 800,
  column: {
    name: {
      label: "姓名",
      span: 12,
      cell: true,
      rules: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
    },
    sex: {
      label: "性别",
      span: 12,
      cell: true,
    },
    age: {
      label: "年龄",
      span: 12,
      cell: true,
    },
    switch: {
      label: "开关",
      type: "switch",
      cell: true,
    },
  },
});


const crudRef: any = ref();

function addBreakRow(index: number) {
  data.splice(index, 0, {
    $cellEdit: true,
  });
}

function addNextRow(index: number) {
  data.splice(index + 1, 0, {
    $cellEdit: true,
  });
}

function addRow() {
  // this.$message.success('正在添加，请稍后')
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      crudRef.value.rowCellAdd({
        name: "",
      });
    }
  }, 500);
}

function rowCell(row: any, index: number) {
  crudRef.value.rowCell(row, index);
}

const rowSave = (form: any, done: Function, loading: Function) => {
  form.id = new Date().getTime();
  // this.$message.success('模拟网络请求')
  console.log("模拟网络请求");
  setTimeout(() => {
    // this.$message.success('关闭按钮等待');
    console.log("关闭按钮等待");
    loading();
  }, 1000);
  setTimeout(() => {
    // this.$message.success('新增数据'+ JSON.stringify(form));
    console.log("新增数据" + JSON.stringify(form));
    done(form);
  }, 2000);
};

const rowUpdate = (
  form: any,
  index: number,
  done: Function,
  loading: Function
) => {
  // this.$message.success('模拟网络请求')
  console.log("模拟网络请求");
  setTimeout(() => {
    // this.$message.success('关闭按钮等待');
    console.log("关闭按钮等待");
    loading();
  }, 1000);
  setTimeout(() => {
    // this.$message.success('编辑数据'+ JSON.stringify(form)+'数据序号'+index);
    console.log("编辑数据" + JSON.stringify(form) + "数据序号" + index);
    done(form);
  }, 2000);
};
</script>

<template>
  <n-crud
    :option="option"
    :data="data"
    ref="crudRef"
    @row-save="rowSave"
    @row-update="rowUpdate"
  >
    <template #age="{ row }">
      <a-tag>{{ row.age }}</a-tag>
    </template>
    <template #age-form="{ row, disabled }">
      自定义:<a-input v-model:value="row.age" :disabled="disabled"></a-input>
    </template>
    <template #name-form="{ row }">
      <a-input v-model:value="row.name" :disabled="row.$index == 2"></a-input>
    </template>
    <template #menu-left="{}">
      <a-button @click="addRow">添加10条</a-button>
    </template>
    <template #menu="{ row, index, size, type }">
      <a-button @click="addBreakRow(index)" :size="size" :type="type" text
        >向上添加</a-button
      >
      <a-button @click="addNextRow(index)" :size="size" :type="type" text
        >向下添加</a-button
      >
    </template>
  </n-crud>
</template>
```

## 按钮自定义

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
const data: any = reactive([
  {
    id: 1,
    name: "张三",
    sex: "男",
    age: 24,
    $cellEdit: true,
  },
  {
    id: 2,
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  addBtn: false,
  addRowBtn: true,
  cellBtn: true,
  dialogType: "drawer",
  dialogWidth: 800,
  column: {
    name: {
      label: "姓名",
      span: 12,
      cell: true,
      rules: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
    },
    sex: {
      label: "性别",
      span: 12,
      cell: true,
    },
    age: {
      label: "年龄",
      span: 12,
      cell: true,
    },
    switch: {
      label: "开关",
      type: "switch",
      cell: true,
    },
  },
});

const crudRef: any = ref();

function rowCell(row: any, index: number) {
  crudRef.value.rowCell(row, index);
}

const rowSave = (form: any, done: Function, loading: Function) => {
  form.id = new Date().getTime();
  // this.$message.success('模拟网络请求')
  console.log("模拟网络请求");
  setTimeout(() => {
    // this.$message.success('关闭按钮等待');
    console.log("关闭按钮等待");
    loading();
  }, 1000);
  setTimeout(() => {
    // this.$message.success('新增数据'+ JSON.stringify(form));
    console.log("新增数据" + JSON.stringify(form));
    done(form);
  }, 2000);
};

const rowUpdate = (
  form: any,
  index: number,
  done: Function,
  loading: Function
) => {
  // this.$message.success('模拟网络请求')
  console.log("模拟网络请求");
  setTimeout(() => {
    // this.$message.success('关闭按钮等待');
    console.log("关闭按钮等待");
    loading();
  }, 1000);
  setTimeout(() => {
    // this.$message.success('编辑数据'+ JSON.stringify(form)+'数据序号'+index);
    console.log("编辑数据" + JSON.stringify(form) + "数据序号" + index);
    done(form);
  }, 2000);
};
</script>

<template>
  <n-crud
    :option="option"
    :data="data"
    ref="crudRef"
    @row-save="rowSave"
    @row-update="rowUpdate"
  >
    <template #menu="{ row, index, size, type }">
      <a-button text :type="type" @click="rowCell(row, index)">
        <template #icon
          ><plus-outlined v-if="row.$cellEdit" /><edit-outlined
            v-else /></template
        >{{ row.$cellEdit ? "自定义保存" : "自定义修改" }}</a-button
      >
      <a-button
        v-if="row.$cellEdit"
        text
        :type="type"
        @click="crudRef.rowCancel(row, index)"
        >取消</a-button
      >
    </template>
  </n-crud>
</template>
```

## 行单击编辑

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
const data: any = reactive([
  {
    id: 1,
    name: "张三",
    sex: "男",
    age: 24,
  },
  {
    id: 2,
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  menu: false,
  dialogType: "drawer",
  dialogWidth: 800,
  column: {
    name: {
      label: "姓名",
      span: 12,
      cell: true,
      rules: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
    },
    sex: {
      label: "性别",
      span: 12,
      cell: true,
    },
    age: {
      label: "年龄",
      span: 12,
      cell: true,
    },
    switch: {
      label: "开关",
      type: "switch",
      cell: true,
    },
  },
});

const crudRef: any = ref();

function handleRowClick(row: any, event: any, column: any) {
  crudRef.value.rowEdit(row, row.$index);
}
</script>

<template>
  <n-crud
    :option="option"
    :data="data"
    ref="crudRef"
    @row-click="handleRowClick"
  >
  </n-crud>
</template>
```

## 行双击编辑

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
const data: any = reactive([
  {
    id: 1,
    name: "张三",
    sex: "男",
    age: 24,
  },
  {
    id: 2,
    name: "李四",
    sex: "女",
    age: 18,
    switch: true,
  },
]);
const option = reactive({
  menu: false,
  dialogType: "drawer",
  dialogWidth: 800,
  column: {
    name: {
      label: "姓名",
      span: 12,
      cell: true,
      rules: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
    },
    sex: {
      label: "性别",
      span: 12,
      cell: true,
    },
    age: {
      label: "年龄",
      span: 12,
      cell: true,
    },
    switch: {
      label: "开关",
      type: "switch",
      cell: true,
    },
  },
});

const crudRef: any = ref();

function handleRowDBLClick(row: any, event: any) {
  crudRef.value.rowEdit(row, row.$index);
}
</script>

<template>
  <n-crud
    :option="option"
    :data="data"
    ref="crudRef"
    @row-dblclick="handleRowDBLClick"
  >
  </n-crud>
</template>
```