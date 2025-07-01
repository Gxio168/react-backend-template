import type { RouteItem } from '#/entity'

// 根据角色返回的用户所有能访问的路由和菜单信息
export const Menu: RouteItem[] = [
  {
    id: 1,
    parentId: null,
    label: 'sys.menu.dashboard',
    name: 'Dashboard',
    icon: 'solar:home-bold',
    route: 'dashboard',
    order: 1,
    component: '/pages/Dashboard/index.tsx',
  },
  {
    id: 2,
    parentId: null,
    label: 'sys.menu.user',
    name: 'User',
    icon: 'material-symbols:supervised-user-circle',
    route: 'user',
    order: 2,
    component: '/pages/User/index.tsx',
  },
  {
    id: 3,
    parentId: null,
    label: 'sys.menu.role',
    name: 'Role',
    icon: 'material-symbols:user-attributes-rounded',
    route: 'role',
    order: 3,
    component: '/pages/Role/index.tsx',
  },
  {
    id: 4,
    parentId: null,
    label: 'sys.menu.route',
    name: 'Route',
    icon: 'material-symbols:route-sharp',
    route: 'route',
    order: 4,
    component: '/pages/Route/index.tsx',
  },
]
