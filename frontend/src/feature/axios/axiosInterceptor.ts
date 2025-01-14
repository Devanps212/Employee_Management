import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

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
  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
      return Promise.reject(error)
    }
  )
}