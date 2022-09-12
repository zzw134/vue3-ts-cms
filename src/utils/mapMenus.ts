import { IBreadType } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
export function mapMenus(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 获取默认的所有路由对象
  const AllRoutes: RouteRecordRaw[] = []
  // 这里的context是webpack在处理
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((file) => {
    const route = require('../router/main' + file.substring(1))
    AllRoutes.push(route.default)
  })
  function _recurseGetRoute(menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = AllRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function menuMapToBreadcrumb(userMenus: any[], path: string): any {
  const breadcrumbItems: IBreadType[] = []
  pathMapToMenu(userMenus, path, breadcrumbItems)
  return breadcrumbItems
}

export function pathMapToMenu(
  userMenus: any[],
  path: string,
  breadcrumb?: IBreadType[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 2 && menu.url === path) {
      return menu
    } else if (menu.type === 1) {
      const children = menu.children || []
      const findMenu = pathMapToMenu(children, path)
      if (findMenu) {
        breadcrumb?.push({ name: menu.name })
        breadcrumb?.push({ name: findMenu.name })
        return findMenu
      }
    }
  }
}

export function menuMapToPermissions(userMenus: any[]): any {
  const permissions: string[] = []
  function _recurseGetPermissions(menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermissions(menu.children || [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermissions(userMenus)
  return permissions
}

export function menuMapToLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  function _recurseGetLeafKeys(menus: any[]) {
    for (const menu of menus) {
      if (menu.children) {
        _recurseGetLeafKeys(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeafKeys(menuList)
  return leafKeys
}

export { firstMenu }
