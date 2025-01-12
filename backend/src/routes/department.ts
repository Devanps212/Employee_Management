import express from 'express'
import { getAllDepartment } from '../controller/department'

const departmentRouter = express.Router()

departmentRouter.get('/getDepartments', getAllDepartment)

export default departmentRouter