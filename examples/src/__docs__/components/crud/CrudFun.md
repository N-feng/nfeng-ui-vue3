# 增删改查方法

## 新增数据

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
const data = ref([
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
  },
]);
const option = reactive({
  editBtn: false,
  delBtn: false,
  addBtnText: "新增数据",
  addBtnIcon: "user-outlined",
  column: {
    name: {
      label: "姓名",
      span: 12,
    },
    sex: {
      label: "性别",
      span: 12,
    },
    age: {
      label: "年龄",
      span: 12,
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
</script>

<template>
  <n-crud :data="data" :option="option" @row-save="rowSave" />
</template>
```

## 修改数据

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
const data = ref([
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
  },
]);
const option = reactive({
  addBtn: false,
  delBtn: false,
  editBtnText: "修改数据",
  editBtnIcon: "user-outlined",
  column: {
    name: {
      label: "姓名",
      span: 12,
    },
    sex: {
      label: "性别",
      span: 12,
    },
    age: {
      label: "年龄",
      span: 12,
    },
  },
});

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
  <n-crud :data="data" :option="option" @row-update="rowUpdate" />
</template>
```

## 删除数据

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
const data = ref([
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
  },
]);
const option = reactive({
  editBtn: false,
        addBtn: false,
        delBtnText: '删除数据',
        delBtnIcon: 'user-outlined',
  column: {
    name: {
      label: "姓名",
      span: 12,
    },
    sex: {
      label: "性别",
      span: 12,
    },
    age: {
      label: "年龄",
      span: 12,
    },
  },
});

const rowDel = (form: any, index: number, done: Function) => {
  Modal.confirm({
    title: "此操作将永久删除该文件, 是否继续?",
    okText: "确定",
    cancelText: "取消",
    maskClosable: true,
    onOk() {
      done(form);
      // this.$message({
      //   type: 'success',
      //   message: '删除成功!'
      // });
      console.log("删除成功!");
    },
  });
};
</script>

<template>
  <n-crud
    :option="option"
    :data="data"
    @row-del="rowDel"
  />
</template>
```

## 综合用法

```vue demo
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
const data = ref([
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
  },
]);
const option = reactive({
  column: {
    name: {
      label: "姓名",
      span: 12,
    },
    sex: {
      label: "性别",
      span: 12,
    },
    age: {
      label: "年龄",
      span: 12,
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

const rowDel = (form: any, index: number, done: Function) => {
  Modal.confirm({
    title: "此操作将永久删除该文件, 是否继续?",
    okText: "确定",
    cancelText: "取消",
    maskClosable: true,
    onOk() {
      done(form);
      // this.$message({
      //   type: 'success',
      //   message: '删除成功!'
      // });
      console.log("删除成功!");
    },
  });
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
    :data="data"
    :option="option"
    @row-save="rowSave"
    @row-update="rowUpdate"
    @row-del="rowDel"
  />
</template>
```
