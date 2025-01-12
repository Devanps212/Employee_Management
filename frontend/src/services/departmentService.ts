import axios, { AxiosError, AxiosResponse } from "axios"
import config from "../config/config"
import { Department } from "../types"

export const fetchDepartments = async(): Promise<Department[] | void>=>{
    try{
      const response: AxiosResponse = await axios.get(
        config.getAllDepartments
      )
      return response.data
    }catch(error: unknown) {
        if(error instanceof AxiosError){
            alert(error.response?.data.message)
            return
        }
      alert(error)
    }
}

export const handleAddDepartment = async(
    values: Record<string, string>, 
    { resetForm }: { resetForm: () => void }
): Promise<void> => {
    try{
      const response : AxiosResponse = await axios.post(config.addDepartment, values)
      alert(response.data.message)
      resetForm()

    }catch(error){
      if(error instanceof AxiosError){
        alert(error.response?.data.message)
        return
      }
      alert(error)
    }
}