import { lazy } from 'react'
import { createHashRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'
import { getDynamicRoutes } from './utils/getDynamicRoutes'

import { Menu } from '@/config'

import AuthGuard from '@/router/modules/AuthGuard'
import NotFound from './modules/NotFound'
import Layout from '@/layout'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
const LoginRoute: RouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/Login')),
}

const PAGE_NOT_FOUND_ROUTE: RouteObject = {
  path: '*',
  element: <NotFound />,
}

export default function Router() {
  const dynamicRoutes = getDynamicRoutes(Menu)
  const asyncRoutes: RouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      // { path: '/dashboard', element: <Dashboard /> },
      // {
      //   path: '/menu',
      //   element: <Outlet />,
      //   children: [
      //     { index: true, element: <Navigate to="/menu/menu1" replace /> },
      //     { path: '/menu/menu1', element: <Menu1 /> },
      //     { path: '/menu/menu2', element: <Menu2 /> },
      //   ],
      // },
      ...dynamicRoutes,
    ],
  }
  const routes = [LoginRoute, asyncRoutes, PAGE_NOT_FOUND_ROUTE] as RouteObject[]

  const router = createHashRouter(routes)

  return <RouterProvider router={router} />
}
