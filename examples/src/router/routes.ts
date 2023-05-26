import Image from "../__docs__/components/Image.md";

export const routes = [
  {
    path: "/introduce",
    title: "简介",
  },
  {
    path: "/guide",
    title: "使用指南（用前必读）",
  },
  {
    path: "/changelog",
    title: "更新日志",
  },
  {
    path: "/style",
    title: "样式",
    children: [],
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
