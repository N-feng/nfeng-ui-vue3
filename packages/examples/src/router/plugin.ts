const routes = [
  {
    path: '/introduce',
    title: '简介',
  },
  {
    path: '/guide',
    title: '使用指南（用前必读）'
  },
  {
    path: '/changelog',
    title: '更新日志',
  },
  {
    path: '/style',
    title: '样式',
    children: []
  }
]

export default {
  title: '组件库',
  routes: routes,
}