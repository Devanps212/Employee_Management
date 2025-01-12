import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import config from '../config/config';
import { AddEmployee, Department } from '../types';

export const useEmployeeActions = (
  type: 'Employee' | 'Department',
  initialValues: AddEmployee | Department | null
) => {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<AddEmployee | Department | null>(null)
  const [departments, setDepartments] = useState<Department[] | []>([])
  const [initialValuesState, setInitialValues] = useState<AddEmployee | Department | null>(initialValues)

  const fetchDepartments = async()=>{
    try{
     const response = await axios.get(config.getAllDepartments)
      setDepartments(response.data)
    }catch(error: unknown){
      if(error instanceof AxiosError){
        alert(error.response?.data.message)
      }else{
        alert(error)
      }
    }
  }

  const handleSubmit =async(
    values: Record<string, string>,
    helpers: { resetForm: () => void }
  ) => {
    try{
     const updatedValues = { ...values, _id: initialValuesState?._id }
      const response = await axios.put(config.editEmployee, updatedValues)
      alert(response.data.message)
      helpers.resetForm()
      setShowModal(false)
      window.location.reload()
    }catch(error: unknown){
      if(error instanceof AxiosError){
        alert(error.response?.data.message)
      }else{
        console.error(error)
      }
    }
  }

  const handleEdit = (item: Department | AddEmployee)=>{
    setInitialValues(item)
    setShowModal(true)
  }

  const handleDelete = async()=>{
    try{
      if(!itemToDelete?._id)return
      const url = type === 'Employee'
        ? `${config.deleteEmployee}/${itemToDelete._id}`
        : `${config.deleteDepartment}/${itemToDelete._id}`
      const response = await axios.delete(url)
      alert(response.data)
      setShowDeleteConfirmation(false)
      window.location.reload()
    }catch(error:unknown){
      if(error instanceof AxiosError){
        alert(error.response?.data.message)
      }else{
        console.error(error)
      }
    }
  }

  const confirmDelete =(item:Department|AddEmployee)=>{
    setItemToDelete(item)
    setShowDeleteConfirmation(true)
  }

  const cancelDelete =()=>{
    setItemToDelete(null)
    setShowDeleteConfirmation(false)
  }

  return {
    showModal,
    setShowModal,
    handleSubmit,
    handleEdit,
    handleDelete,
    confirmDelete,
    cancelDelete,
    showDeleteConfirmation,
    fetchDepartments,
    departments,
    initialValues: initialValuesState,
    setInitialValues
  }
}
