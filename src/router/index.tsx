import { lazy } from 'react'
import { createHashRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'
import { getDynamicRoutes } from './utils/getDynamicRoutes'

import { Menu } from '@/config'

import AuthGuard from '@/router/modules/AuthGuard'
import NotFound from './modules/NotFound'
import Layout from '@/layout'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

// 登录组件
const LoginRoute: RouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/Login')),
}

// 404 组件
const PAGE_NOT_FOUND_ROUTE: RouteObject = {
  path: '*',
  element: <NotFound />,
}

export default function Router() {
  // 获取动态路由
  const dynamicRoutes = getDynamicRoutes(Menu)
  const asyncRoutes: RouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...dynamicRoutes],
  }
  const routes = [LoginRoute, asyncRoutes, PAGE_NOT_FOUND_ROUTE] as RouteObject[]

  const router = createHashRouter(routes)

  return <RouterProvider router={router} />
}
