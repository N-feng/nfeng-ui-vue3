<script setup lang="ts">
import { ref } from "vue";
const form = ref({
  name: "我是名字",
});
const option = {
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
  <n-form :option="option" :model="form" />
</template>
