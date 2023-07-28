import Introduce from "../__docs__/Introduct.md";
import Guide from "../__docs__/Guide.md";
import Theme from "../__docs__/styles/Theme.md";
import Divider from "../__docs__/components/Divider.md";
import Input from "../__docs__/components/Input.md";
import Select from "../__docs__/components/Select.md";
import Switch from "../__docs__/components/Switch.md";

import FormObject from "../__docs__/components/form/FormObject.md";
import FormLayout from "../__docs__/components/form/FormLayout.md";

import CrudObject from "../__docs__/components/crud/CrudObject.md";
import CrudPage from "../__docs__/components/crud/CrudPage.md";
import CrudSearch from "../__docs__/components/crud/CrudSearch.md";
import CrudColumn from "../__docs__/components/crud/CrudColumn.md";
import CrudMenu from "../__docs__/components/crud/CrudMenu.md";
import CrudFun from "../__docs__/components/crud/CrudFun.md"
import CrudCell from "../__docs__/components/crud/CrudCell.md";
import CrudSortable from "../__docs__/components/crud/CrudSortable.md";
import CrudAjax from "../__docs__/components/crud/CrudAjax.md";

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
    children: [{ path: "/theme", title: "主题预设", component: Theme }],
  },
  {
    path: "/basic-component",
    title: "布局",
    children: [
      { path: "/divider", title: "Divider 分割线", component: Divider },
    ],
  },
  {
    path: "/data-component",
    title: "数据录入",
    children: [
      { path: "/input", title: "Input 输入框", component: Input },
      { path: "/select", title: "Select 下拉选择", component: Select },
      { path: "/switch", title: "Switch 开关", component: Switch },
    ],
  },
  {
    path: "/form-component",
    title: "Form 组件",
    children: [
      { path: "/form", title: "Object对象用法", component: FormObject },
      { path: "/form-layout", title: "表单布局", component: FormLayout },
    ],
  },
  {
    path: "/crud-component",
    title: "Crud 组件",
    children: [
      { path: "/crud-object", title: "Object对象用法", component: CrudObject },
      { path: "/crud-page", title: "分页", component: CrudPage },
      { path: "/crud-search", title: "搜索", component: CrudSearch },
      { path: "/crud-column", title: "表格列配置", component: CrudColumn },
      { path: "/crud-menu", title: "操作栏配置", component: CrudMenu },
      { path: "/crud-fun", title: "增删改查方法", component: CrudFun },
      { path: "/crud-cell", title: "行编辑", component: CrudCell },
      { path: "/crud-sortable", title: "拖拽排序", component: CrudSortable },
      { path: "/curd-ajax", title: "表格高级用法", component: CrudAjax }
    ],
  },
  {
    path: "/data-component",
    title: "数据展示",
    children: [
      { path: "/image", title: "Image 图片", component: Image },
    ],
  },
];

function filter(arr: any) {
  return arr.map((row: any) => {
    const anchor = row.component && row.component?.$vd?.toc;
    if (row.children) {
      if (anchor) {
        return {
          ...row,
          children: filter(row.children),
          anchor
        }
      }
      return {
        ...row,
        children: filter(row.children)
      }
    }
    if (anchor) {
      return {
        ...row,
        anchor
      }
    }
    return row
  })
};

export default {
  baseUrl: "/component",
  title: "组件库",
  routes: filter(routes),
};
