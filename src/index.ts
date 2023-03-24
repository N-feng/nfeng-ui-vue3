import type { App } from "vue";
import components from "./components";

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: App) => {
  // 注册组件
  components.forEach((component) => app.component(component.name, component));
};

// 全部导出
export default {
  install,
  ...components,
};
