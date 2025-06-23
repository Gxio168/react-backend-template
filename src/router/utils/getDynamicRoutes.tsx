import { type RouteItem } from '@/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet } from 'react-router-dom'

type MenuItem = RouteItemAndId2String & {
  children: MenuItem[]
}

type RouteItemAndId2String = RouteItem & {
  id: string
  parentId: string
}

/**
 * 获取动态路由
 * @param routes
 * @returns
 */
export function getDynamicRoutes(routes: RouteItem[]) {
  const tempRoutes = convertMenuIdToString(routes)
  const menuTree = convertRoutesToMenuTree(tempRoutes)
  return convertMenuTreeToRoutes(menuTree)
}

/**
 * 获取菜单
 * @param routes
 * @param parentKey
 * @returns
 */
export function getMenuList(routes: RouteItem[]): any {
  const { t } = useTranslation()

  const tempRoutes = convertMenuIdToString(routes)
  const menuTree = convertRoutesToMenuTree(tempRoutes)

  function getMenuListTree(routes: MenuItem[], parentKey: string = ''): any {
    routes.sort((a, b) => a.order - b.order)
    return routes.map(item => {
      const tempKey = parentKey + '/' + item.route
      return {
        label: t(item.label), // 国际化翻译
        key: tempKey,
        icon: item.icon && <Icon icon={item.icon} className="w-6 h-6" />,
        children: item.children.length ? getMenuListTree(item.children, tempKey) : undefined,
      }
    })
  }
  return getMenuListTree(menuTree)
}

/**
 * 将路由的 id 和 parentId 转化为字符串类型
 * @param routes
 * @returns
 */
function convertMenuIdToString(routes: any[]): RouteItemAndId2String[] {
  return routes.map(route => {
    route.id = route.id.toString()
    route.parentId = route.parentId ? route.parentId.toString() : ''
    return route
  })
}

/**
 * 将扁平化路由转化为树形菜单
 * @param routes
 * @param parentId
 * @returns
 */
function convertRoutesToMenuTree(
  routes: RouteItemAndId2String[],
  parentId: string = ''
): MenuItem[] {
  const menuTree = [] as MenuItem[]
  routes.forEach(route => {
    const tempMenuItem = { ...route, children: [] } as MenuItem
    if (route.parentId === parentId) {
      menuTree.push(tempMenuItem)
    } else {
      const parentMenu = menuTree.find(item => item.id === route.parentId)
      if (parentMenu) {
        parentMenu.children.push(tempMenuItem)
      }
    }
  })
  return menuTree
}

/**
 * 将 menuTree 转化为 Routes
 * @param routes
 * @param parentPath
 * @returns
 */
function convertMenuTreeToRoutes(routes: MenuItem[], parentPath: string = '') {
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
        ? convertMenuTreeToRoutes(route.children, parentPath + '/' + route.route)
        : undefined,
    })
  })
  return dynamicRoutes
}
