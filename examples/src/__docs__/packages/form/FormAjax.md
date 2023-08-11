# 表单高级用法

## 配置项切换

```vue demo
<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { message } from "ant-design-vue";
const type = ref(true);
const form = reactive({
  name: "张三",
  sex: "男",
  username: "smallwei",
  password: "smallwei",
});
const option = reactive({});
const option1 = {
  addBtn: false,
  column: [
    {
      label: "昵称",
      prop: "name",
    },
  ],
};
const option2 = {
  addBtn: false,
  column: [
    {
      label: "用户名",
      prop: "username",
    },
    {
      label: "密码",
      prop: "password",
      type: "password",
    },
    {
      label: "姓名",
      prop: "name",
    },
  ],
};
function handleSwitch() {
  type.value = !type.value;
  if (type.value) {
    Object.assign(option, option1);
  } else {
    Object.assign(option, option2);
  }
}
onMounted(() => {
  handleSwitch();
});
</script>

<template>
  <a-button @click="handleSwitch">
    <template #icon><SwapOutlined /></template>
    切换
  </a-button>
  <br />
  <br />
  <n-form :option="option" :model="form" />
</template>
```

## 动态改变结构

```vue demo
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { message } from "ant-design-vue";
import { SwapOutlined } from "@ant-design/icons-vue";
const defaults = reactive({});
const form = reactive({
  text1: 0,
});
const option = reactive({
  column: [
    {
      label: "内容1",
      prop: "text1",
      type: "radio",
      // control: (val, form) => {
      //   if (val === 0) {
      //     return {
      //       text2: {
      //         display: true,
      //       },
      //       text3: {
      //         label: "内容3",
      //       },
      //     };
      //   } else {
      //     return {
      //       text2: {
      //         display: false,
      //       },
      //       text3: {
      //         label: "有没有发现我变了",
      //       },
      //     };
      //   }
      // },
      dicData: [
        {
          label: "显示",
          value: 0,
        },
        {
          label: "隐藏",
          value: 1,
        },
      ],
    },
    {
      label: "内容2",
      prop: "text2",
      display: true,
    },
    {
      label: "内容3",
      prop: "text3",
    },
  ],
});
watch(
  () => form.text1,
  (val) => {
    if (val == 0) {
      Object.assign(defaults, {
        text2: {
          display: true,
        },
        text3: {
          label: "内容3",
        },
      });
    } else {
      Object.assign(defaults, {
        text2: {
          display: false,
        },
        text3: {
          label: "有没有发现我变了",
        },
      });
    }
  }
);
</script>

<template>
  <n-form
    :option="option"
    :model="form"
  />
</template>
```
