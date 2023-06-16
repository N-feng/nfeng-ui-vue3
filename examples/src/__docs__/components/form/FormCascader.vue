<script setup>
let form = ref({
  province:  '110000',
  city: '110100'
});
let option = ref({
  labelWidth: 120,
  column: {
    province: {
      label: '省份',
      type: 'select',
      span: 12,
      props:{
        label:'name',
        value:'code'
      },
      dicData:[{
        name:'字典1',
        code:0
      },{
        name:'字典2',
        code:1
      }],
      cascader: ['city'],
    },
    city: {
      label: '城市',
      type: 'select',
      span: 12,
    }
  }
});
const handleChange = (value) => {
  // option.value.column.name.label = value.name;
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
