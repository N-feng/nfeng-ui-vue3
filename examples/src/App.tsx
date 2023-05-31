import { defineComponent } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

import { globalOptions } from "../../src/theme-antd";

export default defineComponent({
  setup() {
    return () => {
      return (
        <a-config-provider locale={zhCN}>
          <n-theme-provider theme={globalOptions}>
            <router-view></router-view>
          </n-theme-provider>
        </a-config-provider>
      )
    }
  } 
})
