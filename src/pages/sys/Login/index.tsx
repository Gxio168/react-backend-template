import { Layout, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import DashboardImg from '@/assets/img/background.png'
import LoginForm from './LoginForm'
import { useUserToken } from '@/store/userStore'
import { Navigate } from 'react-router-dom'
import { useThemeToken } from '@/theme/hooks/use-theme-token'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
export default function Login() {
  const { colorBorder, colorBgContainer } = useThemeToken()
  const { t } = useTranslation()

  // 设置边框
  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'auto',
    backgroundColor: colorBgContainer,
    borderColor: colorBorder,
  }

  // 判断用户是否有权限
  const token = useUserToken()
  if (token) {
    // 如果有 token ，则尝试跳转到首页
    return <Navigate to={HOMEPAGE} replace />
  }
  return (
    <>
      <Layout className="h-screen w-screen flex flex-row">
        {/* 左侧展示 */}
        <div
          className="h-screen w-[80%] flex justify-center items-center flex-col border-r"
          style={siderStyle}>
          <span className="text-5xl font-bold">Gxio Admin</span>
          <img src={DashboardImg} className="mb-10" />
          <Typography.Text>{t('sys.login.signInSecondTitle')}</Typography.Text>
        </div>
        {/* 右侧登录Form */}
        <div
          className="h-screen flex-1  flex flex-col justify-center items-center"
          style={{ backgroundColor: colorBgContainer }}>
          <LoginForm />
        </div>
      </Layout>
    </>
  )
}
