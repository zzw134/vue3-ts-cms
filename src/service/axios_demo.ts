import axios from 'axios'

// axios.get('http://httpbin.org/get').then((res) => {
//   console.log(res)
// })

// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'lmz',
//       age: 22
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'yjh',
//       age: 23
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// axios配置
// 全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000

// axios
//   .get('/get', {
//     params: {
//       name: 'lmz',
//       age: 22
//     },
//     // 局部配置
//     timeout: 5000,
//     headers: {}
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios
//   .post('/post', {
//     data: {
//       name: 'yjh',
//       age: 23
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios拦截器
axios.interceptors.request.use(
  (config) => {
    console.log('请求成功的拦截')
    return config
  },
  (err) => {
    console.log('请求失败')
    return err
  }
)

axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    return err
  }
)

// 多个请求，一起返回
axios
  .all([
    axios.get('/get', {
      params: {
        name: 'lmz',
        age: 22
      },
      // 局部配置
      timeout: 5000,
      headers: {}
    }),
    axios.post('/post', {
      data: {
        name: 'yjh',
        age: 23
      }
    })
  ])
  .then((res) => {
    console.log(res)
  })
