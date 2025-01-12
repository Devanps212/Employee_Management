import {adminLogin} from "../controller/admin";
import  express from 'express'

const adminRouter = express.Router()

adminRouter.post('/login', adminLogin as any)

export default adminRouter