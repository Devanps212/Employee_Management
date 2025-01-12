import express from 'express'
import verifyToken from '../middlewares/authMiddleware'
import { getAllDepartment, deleteDepartment, addDepartment, updateDepartment } from '../controller/department'

const departmentRouter = express.Router()

departmentRouter.get('/getDepartments', verifyToken, getAllDepartment)
departmentRouter.post('/addDepartment', verifyToken,addDepartment)
departmentRouter.put('/updateDepartment', verifyToken,updateDepartment)
departmentRouter.delete('/deleteEmployee/:_id', verifyToken,deleteDepartment)

export default departmentRouter