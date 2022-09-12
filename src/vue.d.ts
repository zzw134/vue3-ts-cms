export {}
interface FiltersType {
  formatTime(value: string): string
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: FiltersType
  }
}
