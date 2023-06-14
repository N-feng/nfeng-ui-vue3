<script setup>
let form = ref({
  name: "我是名字",
});
let option = {
  column: [
    {
      label: "姓名",
      prop: "name",
      span: 12,
    },
  ],
};
</script>

<template>
  {{ form }}
  <n-form :option="option" v-model="form" />
</template>
