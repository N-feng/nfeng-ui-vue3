## 基本用法

```vue demo
<script setup>
import { ref, reactive } from "vue";
let value = ref('jack');
</script>

<template>
  <a-row>
    <a-col span="6">
      value: {{ JSON.stringify(value)  }} <br />
      <n-select
        v-model="value"
        style="width: 100%"
        :dic="[
          { type: 'jack', name: 'Jack' },
          {
            type: 'lucy',
            name: 'Lucy',
          },
          { type: 'disabled', name: 'Disabled', disabled: true },
          { type: 'Yiminghe', name: 'yiminghe' },
        ]"
        :props="{
          label: 'name',
          value: 'type',
        }"
      />
    </a-col>
  </a-row>
</template>
```
