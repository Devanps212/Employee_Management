import baseUrl from "./baseUrl"

const config = {
    login: `${baseUrl}/login`,
    addEmployee: `${baseUrl}/employee/addEmployee`,
    getAllEmployees :`${baseUrl}/employee/getEmployees`,
    editEmployee:`${baseUrl}/employee/edit`,
    deleteEmployee:`${baseUrl}/employee/delete`,
    getAllDepartments :`${baseUrl}/department/getDepartments`,
    deleteDepartment:`${baseUrl}/department/delete`,
    addDepartment:`${baseUrl}/department/add`

}

export default config