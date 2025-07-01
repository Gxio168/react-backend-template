import { useRouter } from '@/router/hooks/useRouter'
import { useUserInfo } from '@/store/userStore'
import { useThemeToken } from '@/theme/hooks/use-theme-token'
import { Avatar, Divider, Dropdown, DropdownProps, MenuProps } from 'antd'
import { t } from 'i18next'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

export default function Navbar() {
  const router = useRouter()
  const location = useLocation()
  const { colorPrimary } = useThemeToken()
  const { avatar, username, email } = useUserInfo()
  // 退出登录
  const logout = () => {
    router.replace(location.pathname + '?logout=true')
  }

  const { colorBgElevated, borderRadiusLG, boxShadowSecondary } = useThemeToken()

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  }

  const dropdownRender: DropdownProps['dropdownRender'] = menu => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{username}</div>
        <div className="text-gray-500">{email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement)}
    </div>
  )

  const items: MenuProps['items'] = [
    {
      label: (
        <NavLink to="https://docs-admin.slashspaces.com/" target="_blank">
          {t('sys.docs')}
        </NavLink>
      ),
      key: '0',
    },
    {
      label: <NavLink to={HOMEPAGE}>{t('sys.menu.dashboard')}</NavLink>,
      key: '1',
    },
    { type: 'divider' },
    {
      label: (
        <button
          className="font-bold"
          type="button"
          style={{
            color: colorPrimary,
          }}>
          {t('sys.login.logout')}
        </button>
      ),
      key: '4',
      onClick: logout,
    },
  ]
  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      dropdownRender={dropdownRender}
      className="cursor-pointer">
      <Avatar size={32} src={avatar} />
    </Dropdown>
  )
}
