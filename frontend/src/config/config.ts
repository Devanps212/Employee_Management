import baseUrl from "./baseUrl"

const config = {
    login: `${baseUrl}/login`,
    addEmployee: `${baseUrl}/employee/addEmployee`,
    getAllEmployees :`${baseUrl}/employee/getEmployees`,
    editEmployee:`${baseUrl}/employee/edit`,
    deleteEmployee:`${baseUrl}/employee/delete`,
    getAllDepartments :`${baseUrl}/department/getDepartments`,
    deleteDepartment:`${baseUrl}/department/deleteEmployee`,
    addDepartment:`${baseUrl}/department/addDepartment`,
    editDepartment:`${baseUrl}/department/updateDepartment`

}

export default config