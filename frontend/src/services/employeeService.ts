import axios, { AxiosError, AxiosResponse } from "axios"
import config from "../config/config"
import { AddEmployee } from "../types"

export const fetchEmployees = async (): Promise<AddEmployee[] | void> => {
    try {
      const response: AxiosResponse = await axios.get(config.getAllEmployees)
      return response.data
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
        return
      }
      alert(error)
    }
}

export const handleAddEmployee = async(
    values: Record<string, string>, 
    { resetForm }: { resetForm: () => void }
): Promise<void> => {
    try{
      const response : AxiosResponse = await axios.post(config.addEmployee, values)
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