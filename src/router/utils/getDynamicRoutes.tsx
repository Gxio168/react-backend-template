import { type MenuItem } from '@/config'
import { Navigate, Outlet } from 'react-router-dom'

export function getDynamicRoutes(routes: MenuItem[], parentPath: string = '') {
  const modules = import.meta.glob('@/pages/**/**.tsx', { eager: true })
  const dynamicRoutes: any[] = []
  let hasParent = false

  // 对路由进行排序
  routes.sort((a, b) => a.order - b.order)
  routes.forEach(route => {
    // 如果存在父节点
    if (!hasParent && route.parentId !== '') {
      hasParent = true
      dynamicRoutes.push({
        index: true,
        element: <Navigate to={parentPath + '/' + route.route} replace />,
      })
    }
    const Component = (modules[`/src${route.component}`] as any)?.default
    dynamicRoutes.push({
      path: parentPath + '/' + route.route,
      element: route.component ? <Component /> : <Outlet />,
      children: route.children.length
        ? getDynamicRoutes(route.children, parentPath + '/' + route.route)
        : undefined,
    })
  })
  return dynamicRoutes
}
