<script setup>
let form = ref({
  name: "我是名字",
});
let option = {
  // menuSpan: 15,
  // menuPosition: "right",
  column: [
    {
      label: "姓名",
      prop: "name",
      span: 12,
      // row: true,
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
