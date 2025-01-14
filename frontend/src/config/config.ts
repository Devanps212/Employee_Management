import baseUrl from "./baseUrl"

const config = {
    login: `${baseUrl}/api/login`,
    addEmployee: `${baseUrl}/api/employee/addEmployee`,
    getAllEmployees :`${baseUrl}/api/employee/getEmployees`,
    editEmployee:`${baseUrl}/api/employee/edit`,
    deleteEmployee:`${baseUrl}/api/employee/delete`,
    getAllDepartments :`${baseUrl}/api/department/getDepartments`,
    deleteDepartment:`${baseUrl}/api/department/deleteEmployee`,
    addDepartment:`${baseUrl}/api/department/addDepartment`,
    editDepartment:`${baseUrl}/api/department/updateDepartment`

}

export default config