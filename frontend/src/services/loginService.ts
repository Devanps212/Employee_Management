import axios, { AxiosError, AxiosResponse } from "axios"
import config from "../config/config"

export const handleLogin = async(values:Record<string, string>): Promise<string>=>{
    try{
      const response: AxiosResponse = await axios.post(config.login, values)
      const token : string = response.data.token
      return token

    }catch(error: unknown){
      if(error instanceof AxiosError){
        throw new Error(error.response?.data.message)
      }else if (error instanceof Error){
        throw new Error(error.message || "An unexpected error occurred.")
      }
      throw new Error("Unknown error occured")  
    }
}