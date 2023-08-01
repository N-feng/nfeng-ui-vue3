import Divider from "../__docs__/packages/basic/Divider.md";

import Input from "../__docs__/packages/component/Input.md";
import InputTable from "../__docs__/packages/component/InputTable.md";
import Select from "../__docs__/packages/component/Select.md";
import Switch from "../__docs__/packages/component/Switch.md";

import CrudObject from "../__docs__/packages/crud/CrudObject.md";
import CrudPage from "../__docs__/packages/crud/CrudPage.md";
import CrudSearch from "../__docs__/packages/crud/CrudSearch.md";
import CrudColumn from "../__docs__/packages/crud/CrudColumn.md";
import CrudMenu from "../__docs__/packages/crud/CrudMenu.md";
import CrudFun from "../__docs__/packages/crud/CrudFun.md";
import CrudTree from "../__docs__/packages/crud/CrudTree.md";
import CrudCell from "../__docs__/packages/crud/CrudCell.md";
import CrudSortable from "../__docs__/packages/crud/CrudSortable.md";
import CrudAjax from "../__docs__/packages/crud/CrudAjax.md";

import Image from "../__docs__/packages/default/Image.md";

import FormObject from "../__docs__/packages/form/FormObject.md";
import FormSelect from "../__docs__/packages/form/FormSelect.md";
import FormLayout from "../__docs__/packages/form/FormLayout.md";
import FormMenu from "../__docs__/packages/form/FormMenu.md";
import FormCascader from "../__docs__/packages/form/FormCascader.md";
import FormEvent from "../__docs__/packages/form/FormEvent.md";

import Introduce from "../__docs__/packages/Introduct.md";
import Guide from "../__docs__/packages/Guide.md";
import Theme from "../__docs__/styles/Theme.md";

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
    path: "/basic",
    title: "布局",
    children: [
      { path: "/divider", title: "Divider 分割线", component: Divider },
    ],
  },
  {
    path: "/component",
    title: "表单组件",
    children: [
      { path: "/input", title: "Input 输入框", component: Input },
      { path: "/input-table", title: "InputTable 表格选择器", component: InputTable },
      { path: "/select", title: "Select 下拉选择", component: Select },
      { path: "/switch", title: "Switch 开关", component: Switch },
    ],
  },
  {
    path: "/form",
    title: "Form 组件",
    children: [
      { path: "/form", title: "Object对象用法", component: FormObject },
      { path: "/form-select", title: "Select选择框", component: FormSelect },
      { path: "/form-layout", title: "表单布局", component: FormLayout },
      { path: "/form-menu", title: "表单操作按钮", component: FormMenu },
      { path: "/form-cascader", title: "表单多级联动", component: FormCascader },
      { path: "/form-event", title: "表单组件事件", component: FormEvent },
    ],
  },
  {
    path: "/crud",
    title: "Crud 组件",
    children: [
      { path: "/crud-object", title: "Object对象用法", component: CrudObject },
      { path: "/crud-page", title: "分页", component: CrudPage },
      { path: "/crud-search", title: "搜索", component: CrudSearch },
      { path: "/crud-column", title: "表格列配置", component: CrudColumn },
      { path: "/crud-menu", title: "操作栏配置", component: CrudMenu },
      { path: "/crud-fun", title: "增删改查方法", component: CrudFun },
      { path: "/crud-tree", title: "表格树", component: CrudTree },
      { path: "/crud-cell", title: "行编辑", component: CrudCell },
      { path: "/crud-sortable", title: "拖拽排序", component: CrudSortable },
      { path: "/curd-ajax", title: "表格高级用法", component: CrudAjax },
    ],
  },
  {
    path: "/data",
    title: "Data 组件",
    children: [],
    meta: {
      hide: true,
    },
  },
  {
    path: "/default",
    title: "Default 组件",
    children: [{ path: "/image", title: "Image 图片", component: Image }],
  },
];

function filter(arr: any[]) {
  arr.forEach((row) => {
    if (row.component) {
      row["anchor"] = row.component?.$vd?.toc;
    }
    if (row.children) {
      filter(row.children);
    }
  });
}

filter(routes);

export default {
  baseUrl: "/packages", // 路由数据
  title: "组件库",
  routes: routes,
};
