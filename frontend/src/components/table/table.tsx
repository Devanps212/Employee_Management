import { useEffect, useState } from 'react';
import { AddEmployee, TableData } from '../../types/form';
import Modal from '../modal';
import DynamicForm from '../form/form';
import ADDEMPLOYEE from '../../constants/employee';
import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '../../config/config';
import { Department } from '../../types';
import RenderHeader from './head';
import RenderRows from './body';
import { FaTimes } from 'react-icons/fa';
import ADD_DEPARTMENT from '../../constants/department';


const Table = ({ datas, type }: { datas: AddEmployee[] | Department[], type: TableData }) => {
  const [showModal, setShowModal] = useState(false)
  const [initialValues, setInitialValues] = useState<AddEmployee | Department | null>(null)
  const [departments, setDepartments] = useState<Department[] | []>([])
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<AddEmployee | Department | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentResponse: AxiosResponse = await axios.get(config.getAllDepartments)
        setDepartments(departmentResponse.data)
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message)
          return
        }
        alert(error)
      }
    }

    fetchDepartments()
  }, [])

  const handleSubmit = async (values: Record<string, string>, helpers: { resetForm: () => void }) => {
    try {
      const updatedValues = { ...values, _id: initialValues?._id }
      const response = await axios.put(config.editEmployee, updatedValues)
      alert(response.data.message)
      helpers.resetForm()
      setShowModal(false)
      window.location.reload()
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
        return
      }
      console.log(error)
    }
  }

  const handleEdit = (item: Department | AddEmployee) => {
    setInitialValues(item)
    setShowModal(true)
  }

  const handleDelete = async () => {
    try {
      if (!itemToDelete?._id) return
      const url = type === 'Employee' 
      ? `${config.deleteEmployee}/${itemToDelete._id}` 
      : `${config.deleteDepartment}/${itemToDelete._id}`
      const response = await axios.delete(url)
      alert(response.data)
      setShowDeleteConfirmation(false)
      window.location.reload()
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
        return
      }
      console.log(error)
    }
  }

  const confirmDelete = (item: Department | AddEmployee) => {
    setItemToDelete(item)
    setShowDeleteConfirmation(true)
  }

  const cancelDelete = () => {
    setItemToDelete(null)
    setShowDeleteConfirmation(false)
  }

  const handleDepartmentClick = (department: Department) => {
    setSelectedDepartment(department)
  }

  return (
    <>
      <table className="min-w-full table-auto border-collapse" style={{ tableLayout: 'auto' }}>
        <RenderHeader type={type} />
        {datas.length > 0 && (
          <RenderRows
            type={type}
            data={datas}
            confirmDelete={confirmDelete}
            handleEdit={handleEdit}
            handleDepartmentClick={handleDepartmentClick}
          />
        )}
      </table>

      {selectedDepartment && (
        <section className="mt-8">
          <div className='flex justify-between'>
            <h3 className="text-xl font-semibold">Department Details</h3>
            <FaTimes 
              className='transform transition ease-in hover:text-red-600 cursor-pointer' 
              onClick={() => setSelectedDepartment(null)} 
            />
          </div>
          <div className="mt-4">
            <p><strong>Name:</strong> {selectedDepartment.name}</p>
            <p><strong>Description:</strong> {selectedDepartment.description}</p>
          </div>
        </section>
      )}

      {showModal && (
        <Modal 
          title={type === 'Employee' ? 'Edit Employee' : 'Edit Department'} 
          showCancelButton={true} 
          setShowModal={setShowModal}>
          <DynamicForm
            inputsWithLabel={type === "Employee" ? ADDEMPLOYEE : ADD_DEPARTMENT}
            existingValues={initialValues ?? undefined}
            onSubmit={handleSubmit}
            departments={departments}
            type={type}
          />
        </Modal>
      )}

      {showDeleteConfirmation && (
        <Modal title="Confirm Deletion" showCancelButton={false} setShowModal={setShowDeleteConfirmation}>
          <div className="space-y-4">
            <p className="text-lg text-center">
              Are you sure you want to delete this {type === 'Employee' ? 'employee' : 'department'}?
            </p>
            <div className="flex justify-end space-x-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Table
