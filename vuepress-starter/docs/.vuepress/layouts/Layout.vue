<template>
  <div>
    <a-config-provider :locale="{ zhCN }">
      <a-layout>
        <a-layout>
          <header-layout></header-layout>
          <a-layout>
            <Content />
            <!-- <ContentLayout /> -->
          </a-layout>
        </a-layout>
      </a-layout>
    </a-config-provider>
  </div>
</template>

<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
</script>
