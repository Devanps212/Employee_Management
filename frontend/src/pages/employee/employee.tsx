import { useEffect, useState } from "react";
import Table from "../../components/table/table";
import DynamicForm from "../../components/form/form";
import Modal from "../../components/modal";
import ADDEMPLOYEE from "../../constants/employee";
import { AddEmployee } from "../../types/form";
import { Department } from "../../types";
import Header from "../../components/header/header";
import { fetchEmployees, handleAddEmployee } from "../../services/employeeService";
import { useSelector } from "react-redux";
import Search from "../../components/search/search";
import DepartmentFilter from "../../components/filter/departmentFilter";

const EmployeeManagement = () => {
  const [employee, setEmployee] = useState<AddEmployee[] | null>(null)
  const [filteredEmployee, setFilteredEmployee] = useState<AddEmployee[] | null>(null)
  const [departments, setDepartments] = useState<Department[] | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const token = useSelector((state: { token: string }) => state.token)

  useEffect(() => {
    const fetchData = async()=>{
      const fetchedEmployees = await fetchEmployees(token)
      if(fetchedEmployees){
        setEmployee(fetchedEmployees)
        setFilteredEmployee(fetchedEmployees)
      }

      const departmentNames = fetchedEmployees?.map(emp => emp.department)
      const uniqueDepartments = Array.from(new Set(departmentNames))

      const departmentList = uniqueDepartments.map((deptName)=>({
        _id: deptName._id,
        name: deptName.name,
        description: ""
      }))

      setDepartments(departmentList)
    }

    fetchData()
  }, [token])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchQuery(e.target.value)
  }

  const handleDepartmentFilter = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedDepartment(e.target.value)
  }

  useEffect(()=>{
    let filteredData = employee || []
    if(employee){
      if(searchQuery){
        filteredData = filteredData.filter(emp =>
          emp.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      if(selectedDepartment){
        filteredData = filteredData.filter(emp =>
          emp.department.name.toLowerCase() === selectedDepartment.toLowerCase()
        )
      }
      setFilteredEmployee(filteredData)
    }
  }, [searchQuery, selectedDepartment, employee])

  return (
    <>
      <Header/>
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg" data-testid="employee-management-card">
          <h1 className="text-center font-semibold text-2xl text-blue-500 mb-6">Employee Management</h1>

          <Search searchQuery={searchQuery} onSearchChange={handleSearch} />
          <DepartmentFilter
            departments={departments}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentFilter}
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4"
          >
            Add Employee
          </button>

          <Table datas={filteredEmployee ? filteredEmployee : []} type="Employee" />

          {showModal && (
            <Modal showCancelButton={true} title="Add New Employee" setShowModal={setShowModal}>
              <DynamicForm
                departments={departments}
                inputsWithLabel={ADDEMPLOYEE}
                onSubmit={handleAddEmployee}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  )
}

export default EmployeeManagement
