import axios, { AxiosError, AxiosResponse } from "axios"
import config from "../config/config"
import { Department } from "../types"
import { setInterceptor } from "../feature/axios/axiosInterceptor"
import { toast } from "react-toastify"

export const fetchDepartments = async(token: string): Promise<Department[] | void>=>{
    try{
      setInterceptor(token)
      const response: AxiosResponse = await axios.get(
        config.getAllDepartments
      )
      return response.data
    }catch(error: unknown) {
        if(error instanceof AxiosError){
            toast.error(error.response?.data.message)
            return
        }
      toast.error(String(error))
    }
}

export const deleteDepartment = async(
  url: string, 
  setShowDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
  token: string
): Promise<void>=>{
  try{
    setInterceptor(token)
    const response: AxiosResponse = await axios.delete(url)
    toast.success(response.data)
    setShowDeleteConfirmation(false)
    window.location.reload()
  }catch(error: unknown) {
      if(error instanceof AxiosError){
          toast.error(error.response?.data)
          return
      }
    toast.error(String(error))
  }
}

export const addDepartment = async(url: string, token: string): Promise<void>=>{
  try{
    setInterceptor(token)
    const response: AxiosResponse = await axios.delete(url)
    toast.success(response.data)
  }catch(error: unknown) {
      if(error instanceof AxiosError){
          toast.error(error.response?.data)
          return
      }
    toast.error(String(error))
  }
}

export const handleAddDepartment = async(
  values: Record<string, string>,
  helpers: { resetForm: () => void },
  token: string
 ): Promise<void>=>{
    try{
      setInterceptor(token)
      const response : AxiosResponse = await axios.post(config.addDepartment, values)
      toast.success(response.data)
      helpers.resetForm()
      window.location.reload()
    }catch(error){
      if(error instanceof AxiosError){
        toast.error(error.response?.data.message)
        return
      }
      toast.error(String(error))
    }
}

export const handleEditDepartment = async(
  values: Record<string, string>,
  helpers: { resetForm: () => void },
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setEdit: React.Dispatch<React.SetStateAction<boolean>>,
  token: string
 ): Promise<void>=>{
    try{
      setInterceptor(token)
      const response : AxiosResponse = await axios.put(config.editDepartment, values)
      toast.success(response.data)
      helpers.resetForm()
      if(setShowModal)setShowModal(false)
        setEdit(false)
      window.location.reload()
    }catch(error){
      if(error instanceof AxiosError){
        toast.error(error.response?.data.message)
        return
      }
      toast.error(String(error))
    }
}
