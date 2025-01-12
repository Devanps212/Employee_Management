import { Department } from '../models/department'
import { Request, Response } from 'express'
import { Departments } from '../types/departmentInterface'

const getAllDepartment = async(req: Request, res: Response): Promise<void>=>{
    try{
        const departments = await Department.find()
        res.status(200).json(departments)
        return
        
    }catch(error){
        res.status(500).json("internal server error")
    }
}

const deleteDepartment = async(req: Request, res: Response): Promise<void>=>{
    try{
        const { _id } = req.params

        const deleteDepartment = await Department.findByIdAndDelete(_id)
        if(!deleteDepartment){
            res.status(404).json({ message: 'Employee not found' })
            return
        }

        res.status(200).json('Employee deleted successfully')
    }catch(error){
        res.status(500).json("internal server error")
    }
}

const addDepartment = async(req: Request, res: Response): Promise<void>=>{
    try{
        const data : Departments = req.body
        console.log(data)
        const check = await Department.findOne({name:data.name})

        if(check){
            res.status(401).json("Already exist")
            return
        }

        await Department.create(data)
        res.status(201).json("Department added successfully")
    }catch(error){
        res.status(500).json("internal server error")
    }
}

const updateDepartment = async(req: Request, res: Response):Promise<void>=>{
    try{
        const updatedData : Departments = req.body
        const department = await Department.findById({_id: updatedData._id})
        if(!department){
            res.status(404).json({ message: "Department not found" })
            return
        }

        Object.assign(department, updatedData)
        await department.save()
        res.status(200).json("Department updated successfully")
    }catch(error){
        res.status(500).json("internal server error")
    }
}



export {
    getAllDepartment,
    deleteDepartment,
    addDepartment,
    updateDepartment
}

