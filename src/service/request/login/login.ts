import zwRequest from '../../index'
import type { IAccountType, ILoginResult } from './type'
import type { IDataType } from '../type'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users', // /user/:id
  UserRoleMenu = '/role' // /role/:id/menu
}

export const accountLoginRequest = (accountInfo: IAccountType) => {
  return zwRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: accountInfo
  })
}

export const requestUserInfoById = (id: number) => {
  return zwRequest.get<IDataType>({
    url: LoginAPI.UserInfo + '/' + id,
    showLoading: false
  })
}

export const requestUserMenuByRoleId = (id: number) => {
  return zwRequest.get<IDataType>({
    url: LoginAPI.UserRoleMenu + `/${id}/menu`,
    showLoading: false
  })
}
