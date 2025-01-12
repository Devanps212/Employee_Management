import axios, { InternalAxiosRequestConfig } from "axios"

export const setInterceptor = (token: string) => {
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (token) config.headers.Authorization = `Bearer ${token}`
        return config
      },
    (error: Error) => {
      throw new Error(error.message)
    }
  )
}