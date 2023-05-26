import Introduce from "../__docs__/Introduct.md";
import Guide from "../__docs__/Guide.md";
import Theme from "../__docs__/styles/Theme.md";
import Image from "../__docs__/components/Image.md";

export const routes = [
  {
    path: "/introduce",
    title: "简介",
    component: Introduce,
  },
  {
    path: "/guide",
    title: "使用指南（用前必读）",
    component: Guide,
  },
  {
    path: "/changelog",
    title: "更新日志",
    href: "https://github.com/N-feng/nfeng-ui-vue3",
  },
  {
    path: "/style",
    title: "样式",
    children: [{ path: '/theme', title: "主题预设", component: Theme }],
  },
  {
    path: "/data-component",
    title: "数据展示",
    children: [{ path: "/image", title: "Image 图片", component: Image }],
  },
  {
    path: "/basic-component",
    title: "基础组件",
    children: [{ path: "/divider", title: "Divider 分割线" }],
  },
];

export default {
  baseUrl: "/component",
  title: "组件库",
  routes: routes,
};
