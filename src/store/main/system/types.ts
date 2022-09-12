export interface ISystemState {
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
}

export interface IMutationPayload {
  pageName: string
  list?: any[]
  totalCount?: number
}

export interface IActionPayload {
  pageName: string
  queryInfo: object
}
