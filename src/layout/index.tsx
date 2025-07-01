import { Layout } from 'antd'
import SideBar from './components/SiderBar'
import Navbar from './components/Navbar'
import Main from './components/Main'
import NProgress from '@/components/progress-bar'
import { useSettings } from '@/store/settingStore'
import { useThemeToken } from '@/theme/hooks/use-theme-token'

const { Header, Sider, Content } = Layout

export default function DashBoardLayout() {
  const settings = useSettings()
  const { colorBgContainer, colorBorder } = useThemeToken()

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
  return (
    <>
      {/* 进度条 */}
      <NProgress />
      <Layout>
        {/* 侧边栏 */}
        <Sider
          trigger={null}
          collapsible
          collapsed={settings.collapseMenu}
          width={260}
          className="h-screen border-r-[0.1px] border-dashed"
          style={siderStyle}>
          <SideBar collapsed={settings.collapseMenu} />
        </Sider>
        {/* 右侧 */}
        <Layout className="h-screen">
          {/* 顶部 */}
          <Header className="p-0 h-10" style={{ backgroundColor: colorBgContainer }}>
            <Navbar />
          </Header>
          {/* 内容 */}
          <Content className="h-full" style={{ backgroundColor: colorBgContainer }}>
            <Main />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
