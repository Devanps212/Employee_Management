import { AddEmployee, Department, TableData } from "../../types";

const RenderRows = ({
    type,
    data,
    confirmDelete,
    handleEdit,
    handleDepartmentClick,
  }: {
    type: TableData,
    data: unknown,
    confirmDelete: (item: Department | AddEmployee) => void,
    handleEdit: (item: Department | AddEmployee) => void,
    handleDepartmentClick: (department: Department) => void,
  }) => {
    
    const renderNoData = (colSpan: number) => (
      <tr>
        <td colSpan={colSpan} data-testid="no-data-cell">
          <h2 className="text-3xl font-bold text-gray-900 text-center p-10">No Data Found</h2>
        </td>
      </tr>
    )
  
    return (
      <tbody>
        {type === "Employee" ? (
          (data as AddEmployee[]).length > 0 ? (
            (data as AddEmployee[]).map((employee, index) => (
              <tr key={employee?._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{employee.name}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{employee.position}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">
                  <button
                    onClick={() => handleDepartmentClick(employee.department)}
                    className="text-blue-500"
                    data-testid={`employee-department-button-${employee._id}`}
                  >
                    {employee.department.name}
                  </button>
                </td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{employee.email}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{employee.salary}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(employee)}
                    data-testid={`employee-edit-button-${employee._id}`}>
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2"
                    onClick={() => confirmDelete(employee)}
                    data-testid={`employee-delete-button-${employee._id}`}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            renderNoData(7)
          )
        ) : type === "Department" ? (
          (data as Department[]).length > 0 ? (
            (data as Department[]).map((department, index) => (
              <tr key={department._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{department.name}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{department.description}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(department)}
                    data-testid={`department-edit-button-${department._id}`}>
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2"
                    onClick={() => confirmDelete(department)}
                    data-testid={`department-delete-button-${department._id}`}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            renderNoData(5) 
          )
        ) : null}
      </tbody>
    )
  }
  
  export default RenderRows
  