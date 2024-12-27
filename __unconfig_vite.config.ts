
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { Plugin } from 'vite'
import mockjs from 'mockjs'
import url from 'node:url'
import path from 'path'

const viteMockServer = (): Plugin => {
  return {
    name: 'vite-mock-server',
    configureServer(server) {
      server.middlewares.use('/api/list', (req, res) => {
        const parseUrl = url.parse(req.originalUrl!, true).query
        res.setHeader('content-type', 'application/json')
        const data = mockjs.mock({
          'list|1000': [
            {
              'id|+1': 1,
              name: parseUrl.keyWord,
              address: '@county(true)',
            },
          ],
        })
        res.end(JSON.stringify(data))
      })
    },
  }
}

const __unconfig_default =  defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_APP_BASE_PATH || '/'
  return {
    base,
    plugins: [react(), viteMockServer()],
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
        '/api': {
          target: 'http://localhost:5173',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;