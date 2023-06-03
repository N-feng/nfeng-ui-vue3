import { computed, defineComponent } from "vue";

import routes from "@/router/routes";
import { useRoute } from "vue-router";

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
    const route = useRoute()
    const anchor = computed(() => (route.meta.anchor as any[]) || [])

    const systemMenus = [
      {
        baseUrl: "/component",
        menuList: getMenus(routes.routes, ""),
        name: "组件库",
        tenementId: 0,
      },
    ];

    const onClick = (e: Event, link: Object) => {
      console.log('e: ', e);
      e.preventDefault();
    };

    return () => {
      return (
        <a-layout class={"min-h100vh"}>
          <header-layout />
          <a-layout class={"mt-48"}>
            <sider-layout
              systemMenus={systemMenus}
              headerSelectedKeys={[routes.baseUrl]}
            />
            <content-layout />
            <a-anchor class="layout-anchor" offsetTop={30} onClick={onClick}>
              {anchor.value.map((item: any) => {
                return (
                  <a-anchor-link
                    href={"#" + item.anchor}
                    title={item.content}
                  />
                );
              })}
            </a-anchor>
          </a-layout>
        </a-layout>
      );
    };
  },
});
