<script setup lang="ts">
let form = reactive({
  province:  '110000',
  city: '110100'
});
let option = {
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
      change: ({value,column,item,dic}) => {
        // this.$message.success('change事件查看控制台')
        console.log('值改变',value,column,item,dic)
        // form.value.city = value;
        // Object.assign(form, {
        //   city: value
        // });
      },
    },
    city: {
      label: '城市',
      type: 'select',
      span: 12,
      dicData: [{
        label: "字典1",
        value: 0
      },{
        label: "字典2",
        value: 1
      }]
    }
  }
};
watch(form, (value) => {
  console.log('form',value)
})
const handleChange = (formData) => {
  // Object.assign(form, {
  //   city: formData.province
  // });
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
