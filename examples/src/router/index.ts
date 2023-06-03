import {
  RouteRecordRaw,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

import config from "./routes";

const Layout = () => import("@/components/Layout");

const expandRoutes = () => {
  let current: RouteRecordRaw[] = [];
  const data = [...config.routes];
  data.forEach((item: any) => {
    if (item.children) {
      item.children.forEach((child: any) => {
        current.push({
          ...child,
          path: config.baseUrl + item.path + child.path,
          meta: {
            title: child.title,
            anchor: child.anchor,
            ...(child.meta || {}),
          },
        });
      });
    } else {
      current.push({
        ...item,
        path: config.baseUrl + item.path,
        meta: {
          title: item.title,
          anchor: item.anchor,
          ...(item.meta || {}),
        },
      });
    }
  });

  return current;
};

const routes = expandRoutes();

const router = _createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/component/introduce",
    },
    {
      path: "/component",
      name: "Layout",
      component: Layout,
      redirect: config.baseUrl + config.routes[0].path,
      children: routes,
    },
  ],
});

export default router;
