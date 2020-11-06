import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6/',
    timeout: 5000
  })

  // 拦截器-请求拦截
  instance.interceptors.request.use( config => {
    return config
  }, err => {
    return err
  })

  // 拦截器-响应拦截
  instance.interceptors.response.use( res => {
    return res.data
  }, err => {
    return err
  })

  return instance(config)

}