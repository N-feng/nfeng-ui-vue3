import { App } from "vue";
import components from "./components";
import "./styles/index.scss";
import { useTheme } from "./_hooks/useTheme";
import { globalOptions } from "./theme-antd";

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: App<Element>) => {
  // 注册组件
  components.forEach((component) => app.component(component.name, component));
};

// 全部导出
export default {
  install,
  ...components,
};
