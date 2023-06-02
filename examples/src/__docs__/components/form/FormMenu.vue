<script setup>
let form = {
  name: "我是名字",
};
let option = {
  menuSpan: 10,
  menuPosition: "right",
  column: [
    {
      label: "姓名",
      prop: "name",
    },
  ],
};
</script>

<template>
  {{ form }}
  <n-form :option="option" v-model="form">
    <template #menuForm>
      <a-button type="primary">自定义提交</a-button>
    </template>
  </n-form>
</template>
