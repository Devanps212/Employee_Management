import { addEmployee, getAllEmployees, updateEmployee, deleteEmployee } from "../controller/employee";
import express from 'express'

const employeeRouter = express.Router()

employeeRouter.post('/addEmployee', addEmployee)
employeeRouter.get('/getEmployees', getAllEmployees)
employeeRouter.put('/edit', updateEmployee)
employeeRouter.delete('/delete/:_id', deleteEmployee)


export default employeeRouter