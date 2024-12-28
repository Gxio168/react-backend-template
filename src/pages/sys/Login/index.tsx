import { Layout, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import DashboardImg from '@/assets/img/background.png'
import LoginForm from './LoginForm'
import { useUserToken } from '@/store/userStore'
import { Navigate } from 'react-router-dom'
import { useThemeToken } from '@/theme/hooks/use-theme-token'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
export default function Login() {
  const { colorBgBase, colorBgContainer } = useThemeToken()
  const { t } = useTranslation()

  // 判断用户是否有权限
  const token = useUserToken()
  if (token) {
    // 如果有授权，则跳转到首页
    return <Navigate to={HOMEPAGE} replace />
  }
  return (
    <>
      <Layout className="h-screen w-screen flex flex-row">
        {/* 左侧展示 */}
        <div
          className="h-screen w-[80%] flex justify-center items-center flex-col"
          style={{ backgroundColor: colorBgContainer }}>
          <span className="text-5xl font-bold">Gxio Admin</span>
          <img src={DashboardImg} className="mb-10" />
          <Typography.Text>{t('sys.login.signInSecondTitle')}</Typography.Text>
        </div>
        {/* 右侧登录Form */}
        <div
          className="h-screen flex-1   flex flex-col justify-center items-center"
          style={{ backgroundColor: colorBgBase }}>
          <LoginForm />
        </div>
      </Layout>
    </>
  )
}
