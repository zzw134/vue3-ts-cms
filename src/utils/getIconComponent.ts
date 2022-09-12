import { defineAsyncComponent } from 'vue'
const getIconComponent = (iconName: string) => {
  return defineAsyncComponent(async () => {
    const res: any = await import('@element-plus/icons-vue')
    return new Promise((resolve) => {
      resolve(res[iconName])
    })
  })
}

export default getIconComponent
