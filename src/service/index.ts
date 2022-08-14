import ZWRequest from './request'

const zwRequest = new ZWRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: Number(process.env.VUE_APP_TIMEOUT),
  interceptors: {
    requestInterceptors(config) {
      const token = ''
      config.headers = {
        Authorization: `Bear${token}`
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
