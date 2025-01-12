import { useEffect, useState } from "react";
import Table from "../../components/table/table";
import DynamicForm from "../../components/form/form";
import Modal from "../../components/modal";
import ADDEMPLOYEE from "../../constants/employee";
import { AddEmployee } from "../../types/form";
import { Department } from "../../types";
import Header from "../../components/header/header";
import { fetchEmployees, handleAddEmployee } from "../../services/employeeService";
import { fetchDepartments } from "../../services/departmentService";

const EmployeeManagement = () => {

  const [employee, setEmployee] = useState<AddEmployee[] | null>(null)
  const [departments, setDepartments] = useState<Department[] | null>(null)
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    const fetchData = async()=>{
      const fetchedDepartments = await fetchDepartments()
      if(fetchedDepartments){
        setDepartments(fetchedDepartments)
      }

      const fetchedEmployees = await fetchEmployees()
      if(fetchedEmployees){
        setEmployee(fetchedEmployees)
      }
    }

    fetchData()
  }, [])
  
  

  return (
    <>
    <Header/>
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
    </>
  )
}

export default EmployeeManagement
