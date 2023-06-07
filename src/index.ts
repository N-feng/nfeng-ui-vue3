import components from "./ui/index";
import "../styles/index.scss";

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: any) => {
  // 注册组件
  Object.keys(components).forEach((ele) => {
    const component = components[ele];
    app.component(component.name as string, component);
  });
};

// 全部导出
export default {
  install,
  ...components,
};
