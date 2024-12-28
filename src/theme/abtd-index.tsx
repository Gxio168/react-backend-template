import 'antd/dist/reset.css'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider, theme } from 'antd'
import { ThemeMode } from '#/enum'
import useLocale from '@/lang/useLocal'
import { useSettings } from '@/store/settingStore'
import {
  colorPrimarys,
  customComponentConfig,
  customThemeTokenConfig,
  themeModeToken,
} from './antd-theme'
type Props = {
  children: React.ReactNode
}

export default function AntdConfig({ children }: Props) {
  const { themeMode, themeColorPresets } = useSettings()
  const { language } = useLocale()
  // 切换明暗
  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm
  // 主题色，六选一
  const colorPrimary = colorPrimarys[themeColorPresets]
  return (
    <ConfigProvider
      locale={language.antdLocal}
      theme={{
        token: {
          colorPrimary,
          ...customThemeTokenConfig,
          ...themeModeToken[themeMode].token,
        },
        components: {
          ...customComponentConfig,
          ...themeModeToken[themeMode].components,
        },
        algorithm,
      }}>
      <StyleProvider hashPriority="low">{children}</StyleProvider>
    </ConfigProvider>
  )
}
