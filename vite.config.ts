import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_APP_BASE_PATH || '/'
  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '#': path.resolve(__dirname, './types'),
      },
    },
    server: {
      open: true,
      host: true,
      port: 5173,
      proxy: {
        // 配置/api前缀的请求转发到后端
        '/api': {
          target: env.VITE_BACKEND_URL, // 后端地址
          changeOrigin: false,
          rewrite: (path: string) => path.replace(/^\/api/, ''), // 移除请求路径中的/api前缀
        },
      },
    },
  }
})
