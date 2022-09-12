import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZWRequestConfig, ZWRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import 'element-plus/theme-chalk/el-loading.css'

const DEFAULT_LOADING = true

class ZWRequest {
  instance: AxiosInstance
  interceptors?: ZWRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean
  initialLoading: boolean // 最初的loading，保证关闭loading时showLoading的值还是最初的值

  constructor(config: ZWRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.initialLoading = config.showLoading ?? DEFAULT_LOADING
    this.showLoading = this.initialLoading

    // 不同实例的拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 每个实例都有的拦截
    this.instance.interceptors.request.use(
      (config) => {
        // 请求加载
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '数据请求中...',
            background: 'rgba(0, 0, 0, .5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        const data = res.data
        if (data) {
          // if (data.code === '0') {
          //   console.log('请求失败')
          // } else {
          //   return data
          // }
          return data
        } else {
          throw new Error(res.request.response)
        }
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404')
        }
        return err
      }
    )
  }

  request<T = any>(config: ZWRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (
        config.showLoading !== undefined &&
        config.showLoading !== this.initialLoading
      ) {
        this.showLoading = config.showLoading
      }

      // 每个请求的拦截
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 每个响应的拦截
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
          this.showLoading = this.initialLoading
        })
        .catch((err) => {
          {
            this.showLoading = this.initialLoading
            reject(err)
          }
        })
    })
  }

  get<T = any>(config: ZWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: ZWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: ZWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: ZWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default ZWRequest
