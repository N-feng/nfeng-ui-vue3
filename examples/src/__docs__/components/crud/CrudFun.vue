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
  searchIndex: 1,
  searchIcon: true,
  column: {
    name: {
      label: "姓名",
      span: 12,
      searchSpan: 12,
      search: true,
    },
    sex: {
      label: "性别",
      span: 12,
      searchSpan: 12,
      search: true,
      searchOrder: 1,
    },
    age: {
      label: "年龄",
      span: 12,
      searchSpan: 12,
      search: true,
    },
  },
});
const search = reactive({
  name: "small",
});

const searchChange = (params: any, done: Function) => {
  // this.$message.success('2s后关闭锁定')
  console.log("2s后关闭锁定");
  setTimeout(() => {
    done();
    // this.$message.success(JSON.stringify(params));
    console.log(JSON.stringify(params));
  }, 2000);
};

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
  <div style="margin-bottom: 24px">{{ search }}</div>
  <n-crud
    :option="option"
    :data="data"
    :search="search"
    @search-change="searchChange"
    @row-save="rowSave"
    @row-update="rowUpdate"
    @row-del="rowDel"
  />
</template>
