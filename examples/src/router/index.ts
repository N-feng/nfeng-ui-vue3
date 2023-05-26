import {
  RouteRecordRaw,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

import config from "./routes"

const Layout = () => import("@/components/Layout")

const expandRoutes = () => {
  let current: RouteRecordRaw[] = []
  const data = [...config.routes]
  data.forEach((item: any) => {
    if (item.children) {
      item.children.forEach((child: any) => {
        child.path = item.path + child.path
        current.push({
          ...child,
          meta: {
            title: child.title,
            ...(child.meta || {}),
          }
        })
      })
    } else {
      current.push({
        ...item,
        meta: {
          title: item.title,
          ...(item.meta || {}),
        }
      })
    }
  })

  return current
}

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: config.routes[0].path,
    children: expandRoutes(),
  }
]

const router = _createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;