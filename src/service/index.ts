import ZWRequest from './request'
import localCache from '@/utils/localCache'

const zwRequest = new ZWRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: Number(process.env.VUE_APP_TIMEOUT),
  interceptors: {
    requestInterceptors(config) {
      const token = localCache.getCache('token')

      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorsCatch(err) {
      return err
    },
    responseInterceptors(res) {
      return res
    },
    responseInterceptorsCatch(err) {
      return err
    }
  }
})
export default zwRequest
