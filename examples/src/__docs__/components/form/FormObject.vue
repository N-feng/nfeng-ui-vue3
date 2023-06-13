<script setup>
let form = {
  name: '姓名',
  sex: 14
};
let option = {
  labelWidth: 120,
  column: {
    name: {
      label: '姓名',
    },
    sex: {
      label: '年龄',
    }
  }
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
