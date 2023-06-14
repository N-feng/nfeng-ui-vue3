<script setup>
let form = ref({
  name: '姓名',
  sex: 14
});
let option = ref({
  labelWidth: 120,
  column: {
    name: {
      label: '姓名',
      span: 12,
    },
    sex: {
      label: '年龄',
      span: 12,
    }
  }
});
const handleChange = (value) => {
  option.value.column.name.label = value.name;
};
</script>

<template>
  {{ form }}
  <n-form :option="option" v-model="form" @change="handleChange">
    <template #menuForm>
      <a-button type="primary">自定义提交</a-button>
    </template>
  </n-form>
</template>
