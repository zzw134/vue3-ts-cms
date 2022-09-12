import { useStore } from '@/store'
export function usePermission(pageName: string, permission: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${permission}`
  return !!permissions.find((item) => item === verifyPermission)
}
