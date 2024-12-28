import { useThemeToken } from '@/theme/hooks/use-theme-token'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

NProgress.configure({
  showSpinner: false,
})

const NProgressStyle = createGlobalStyle<{ $background: string }>`
	#nprogress .bar {
		background: ${props => props.$background} !important;
		box-shadow: 0 0 2px ${props => props.$background} !important;
	}
	#nprogress .peg {
		box-shadow: 0 0 10px ${props => props.$background}, 0 0 5px ${props =>
  props.$background} !important;
	}
`

export default function ProgressBar() {
  const { colorPrimary } = useThemeToken()
  const location = useLocation()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    NProgress.start()
    // 路由变化完成时, 结束进度条
    const timer = setTimeout(() => {
      NProgress.done()
    }, 100)

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [location.pathname])

  return <NProgressStyle $background={colorPrimary} />
}
