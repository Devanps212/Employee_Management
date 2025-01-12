import { Employees } from '../models/employee';
import { Request, Response } from 'express';
import { Employee } from '../types/employeeInterface';

const addEmployee = async(req: Request, res: Response):Promise<any>=>{
  try {
    const data : Employee = req.body
    const checkExist = await Employees.findOne({ email: data.email })
    if(checkExist){
      return res.status(400).json('Employee already exists with this email.')
    }

    await Employees.create(data)

    return res.status(201).json('Employee added successfully.' )
  }catch(error){
    console.error("Error adding employee:", error)
    return res.status(500).json({message: 'Server error while adding employee.'})
  }
}

const getAllEmployees = async(req: Request, res: Response):Promise<void>=>{
  try{
    const allEmployees = await Employees.find().populate('department')

    if(allEmployees.length === 0){
      res.status(404).json('No employees found.')
      return
    }
    res.status(200).json(allEmployees)
  }catch(error){
    console.error("Error fetching employees:", error)
    res.status(500).json({ message: 'Server error while fetching employees.' })
  }
}

const updateEmployee = async(req: Request, res: Response):Promise<any>=>{
  try{
    const data : Employee = req.body

    console.log(data)

    if(!data._id){
      return res.status(400).json('Employee ID is required')
    }

    const existingEmployee = await Employees.findById(data._id)
    if(!existingEmployee){
      return res.status(404).json('Employee not found')
    }

    const update = await Employees.updateOne(
      { _id: data._id },
      {
        $set: {
          name: data.name,
          email: data.email,
          position: data.position,
          department: data.department,
          dateOfJoining: data.dateOfJoining,
          salary: data.salary,
        },
      }
    )

    if(update.modifiedCount > 0){
      return res.status(200).json('Employee updated successfully')
    }else{
      return res.status(400).json('No changes made to the employee')
    }
  }catch(error){
    return res.status(500).json({ message: 'Server error' })
  }
}
const deleteEmployee = async (req: Request, res: Response):Promise<void>=>{
  try {
    const { _id } = req.params
    const deletedEmployee = await Employees.findByIdAndDelete(_id)

    if(!deletedEmployee){
      res.status(404).json({ message: 'Employee not found' })
      return
    }

    res.status(200).json('Employee deleted successfully')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error while deleting employee' })
  }
}


export {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
}
