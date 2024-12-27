export type MenuItem = {
  id: string
  parentId: string
  label: string
  name: string
  route: string
  order: number
  children: MenuItem[]
  icon?: string
  component?: string
}

export const Menu: MenuItem[] = [
  {
    id: '1',
    parentId: '',
    label: 'sys.menu.dashboard',
    name: 'Dashboard',
    icon: 'solar:home-bold',
    route: 'dashboard',
    order: 1,
    children: [],
    component: '/pages/Dashboard/index.tsx',
  },
  {
    id: '2',
    parentId: '',
    label: 'sys.menu.menulevel.index',
    name: 'Menu',
    icon: 'solar:hamburger-menu-bold',
    route: 'menu',
    order: 2,
    children: [
      {
        id: '3',
        parentId: '2',
        label: 'sys.menu.menulevel.1a',
        name: 'Menu1',
        route: 'menu1',
        order: 1,
        children: [],
        component: '/pages/Menu/menu1.tsx',
      },
      {
        id: '4',
        parentId: '2',
        label: 'sys.menu.menulevel.1b',
        name: 'Menu2',
        route: 'menu2',
        order: 2,
        children: [],
        component: '/pages/Menu/menu2.tsx',
      },
    ],
  },
]
