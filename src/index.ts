import { App } from "vue";
import components from "./ui/index";
import { validatenull } from "./utils/validate";
// import "../styles/index.scss";

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: any, props?: {}) => {
  // 注册组件
  Object.keys(components).forEach((ele) => {
    const component = components[ele];
    app.component(component.name as string, component);
  });
};

// 全部导出
export default {
  install,
  // ...components,
};

export { validatenull, };

export * from './ui/index';
