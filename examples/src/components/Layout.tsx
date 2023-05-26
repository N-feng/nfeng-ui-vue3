import { defineComponent } from "vue";

import routes from "@/router/routes";

function getMenus(routes: any, parentPath: string) {
  return routes.map((node: any) => {
    if (node.children) {
      node.children = getMenus(node.children, node.path)
      if (node.href) {
        return {
          url: `${parentPath}${node.path}`,
          menuName: node.title,
          children: node.children,
          href: node.href,
        };
      }
      return {
        url: `${parentPath}${node.path}`,
        menuName: node.title,
        children: node.children,
      };
    }
    if (node.href) {
      return {
        url: `${parentPath}${node.path}`,
        menuName: node.title,
        href: node.href,
      };
    }
    return {
      url: `${parentPath}${node.path}`,
      menuName: node.title,
    };
  });
}


export default defineComponent({
  setup() {
    const systemMenus = [
      {
        baseUrl: "/component",
        menuList: getMenus(routes.routes, ""),
        name: "组件库",
        tenementId: 0,
      },
    ];

    return () => {
      return (
        <a-layout class={"h-100vh"}>
          <header-layout />
          <a-layout>
            <sider-layout systemMenus={systemMenus} headerSelectedKeys={[routes.baseUrl]} />
            <content-layout />
          </a-layout>
        </a-layout>
      );
    };
  },
});
