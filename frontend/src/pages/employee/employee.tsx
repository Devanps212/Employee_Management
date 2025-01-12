import { useEffect, useState } from "react";
import Table from "../../components/table/table";
import DynamicForm from "../../components/form/form";
import Modal from "../../components/modal";
import ADDEMPLOYEE from "../../constants/employee";
import axios, { AxiosError, AxiosResponse } from "axios";
import config from "../../config/config";
import { AddEmployee } from "../../types/form";
import { Department } from "../../types";

const EmployeeManagement = () => {

  const [employee, setEmployee] = useState<AddEmployee[] | null>(null)
  const [departments, setDepartments] = useState<Department[] | null>(null)
  

  const fetchEmployees = async () => {
    try {
      const employees: AxiosResponse = await axios.get(config.getAllEmployees)
      setEmployee(employees.data)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
        return
      }
      alert(error)
    }
  }

  const fetchDepartments = async()=>{
    try {
      const departmentResponse: AxiosResponse = await axios.get(
        config.getAllDepartments
      )
      setDepartments(departmentResponse.data)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
        return
      }
      alert(error)
    }
  }

  useEffect(()=>{
    fetchDepartments()
    fetchEmployees()
  }, [])
  
  const [showModal, setShowModal] = useState(false)

  const handleAddEmployee = async(values: Record<string, string>, { resetForm }: { resetForm: () => void }) => {
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

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-center font-semibold text-2xl text-blue-500 mb-6">Employee Management</h1>
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4"
        >
          Add Employee
        </button>

        <Table datas={employee ? employee: []} type="Employee" />

        {showModal && (
          <Modal
            showCancelButton={true} 
            title="Add New Employee"
            setShowModal={setShowModal}>
             <DynamicForm 
              departments={departments} 
              inputsWithLabel={ADDEMPLOYEE} 
              onSubmit={handleAddEmployee} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;
