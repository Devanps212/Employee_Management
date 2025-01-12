import { addEmployee, getAllEmployees, updateEmployee, deleteEmployee } from "../controller/employee";
import express from 'express'
import verifyToken from "../middlewares/authMiddleware";

const employeeRouter = express.Router()

employeeRouter.post('/addEmployee', verifyToken, addEmployee)
employeeRouter.get('/getEmployees', verifyToken, getAllEmployees)
employeeRouter.put('/edit', verifyToken, updateEmployee)
employeeRouter.delete('/delete/:_id', verifyToken, deleteEmployee)


export default employeeRouter