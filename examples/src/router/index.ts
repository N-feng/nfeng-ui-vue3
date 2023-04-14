import {
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

const Layout = () => import("@/components/Layout")

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
  }
]

const router = _createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;