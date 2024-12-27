import { useRouter } from '@/router/hooks/useRouter'
import { useLocation, useMatches } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { Menu } from 'antd'

import { setMenuList } from '../utils/setMenuList'

import { Menu as menuList } from '@/config/index'

import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
type MenuItem = Required<MenuProps>['items'][number]

export default function SideBar({ collapsed }: any) {
  const menuItems: MenuItem[] = setMenuList(menuList)
  const router = useRouter()
  const location = useLocation()

  const matches = useMatches()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  // 首次加载时设置 openKeys
  useEffect(() => {
    if (!collapsed) {
      const keys = matches
        .filter(match => match.pathname !== '/' && match.pathname !== location.pathname)
        .map(match => match.pathname)
      setOpenKeys(keys)
    }
  }, [collapsed, matches, location.pathname])

  // 点击触发路由切换
  const onClick: MenuProps['onClick'] = e => {
    router.replace(e.key)
  }

  // 关闭时也触发一次，刚好设置为 []
  const handleOpenChange: MenuProps['onOpenChange'] = keys => {
    setOpenKeys(keys)
  }

  return (
    <>
      <div className="flex items-center justify-center h-20">
        <Icon icon="noto:beaming-face-with-smiling-eyes" className="text-5xl" />
        {!collapsed && <span className="font-bold text-2xl">Gxio Admin</span>}
      </div>
      {/* 菜单部分 */}
      <div>
        <Menu
          onClick={onClick}
          selectedKeys={[location.pathname]}
          openKeys={openKeys.length ? openKeys : undefined}
          onOpenChange={handleOpenChange}
          mode="inline"
          items={menuItems}
          className="!border-none"
        />
      </div>
    </>
  )
}
