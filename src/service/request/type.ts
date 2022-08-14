import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ZWRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

export interface ZWRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZWRequestInterceptors<T>
  showLoading?: boolean
}
