import { App } from "vue";
import components from "./ui/index";
import "../styles/index.scss";

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: any) => {
  // 注册组件
  // components.forEach((component) => app.component(component.name, component));
  Object.keys(components).forEach((ele) => {
    // console.log('ele: ', ele);
    const component = components[ele];
    app.component(component.name as string, component);
    // app.component(ele, components[ele])
  });
};

// 全部导出
export default {
  install,
  ...components,
};
