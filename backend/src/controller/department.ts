import { Department } from '../models/department'
import { Request, Response } from 'express'

const getAllDepartment = async(req: Request, res: Response): Promise<void>=>{
    try{
        const departments = await Department.find()
        res.status(200).json(departments)
        return
        
    }catch(error){
        res.status(500).json("internal server error")
    }
}

export {
    getAllDepartment
}

