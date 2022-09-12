export interface IAccountType {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  token: string
  name: string
}
