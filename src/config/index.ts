export type RouteItem = {
  id: number
  parentId: number | null
  label: string
  name: string
  route: string
  order: number
  icon?: string
  component?: string
}

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
    label: 'sys.menu.menulevel.index',
    name: 'Menu',
    icon: 'solar:hamburger-menu-bold',
    route: 'menu',
    order: 2,
  },
  {
    id: 3,
    parentId: 2,
    label: 'sys.menu.menulevel.1a',
    name: 'Menu1',
    route: 'menu1',
    order: 1,
    component: '/pages/Menu/menu1.tsx',
  },
  {
    id: 4,
    parentId: 2,
    label: 'sys.menu.menulevel.1b',
    name: 'Menu2',
    route: 'menu2',
    order: 2,
    component: '/pages/Menu/menu2.tsx',
  },
]
