import { Employees } from '../models/employee';
import { NextFunction, Request, Response } from 'express';
import { Employee } from '../types/employeeInterface';
import { NotFoundError, ValidationError, InternalServerError } from '../utils/appError';
import logger from '../utils/logger';

const addEmployee = async (req: Request, res: Response, next: NextFunction):Promise<any>=>{
  try{
    const data: Employee = req.body
    
    const checkExist = await Employees.findOne({ email: data.email })
    if(checkExist){
      logger.warn(`Attempt to add duplicate employee with email: ${data.email}`)
      return next(new ValidationError('Employee already exists with this email.'))
    }

    await Employees.create(data)

    logger.info(`Employee added successfully: ${data.email}`)
    return res.status(201).json('Employee added successfully.')
  }catch(error){
    logger.error('Error adding employee:', error)
    return next(new InternalServerError('Server error while adding employee.'))
  }
}

const getAllEmployees = async (req: Request, res: Response, next: NextFunction):Promise<void>=>{
  try{
    const allEmployees = await Employees.find().populate('department')

    if(allEmployees.length === 0){
      logger.warn('No employees found.')
      return next(new NotFoundError('No employees found.'))
    }
    
    logger.info('Fetched all employees successfully.')
    res.status(200).json(allEmployees)
  }catch(error){
    logger.error('Error fetching employees:', error)
    return next(new InternalServerError('Server error while fetching employees.'))
  }
}

const updateEmployee = async (req: Request, res: Response, next: NextFunction):Promise<any>=>{
  try {
    const data: Employee = req.body

    if(!data._id){
      logger.warn('Employee ID is missing in the request.')
      return next(new ValidationError('Employee ID is required.'))
    }

    const existingEmployee = await Employees.findById(data._id)
    if(!existingEmployee){
      logger.warn(`Employee not found for update: ID ${data._id}`)
      return next(new NotFoundError('Employee not found.'))
    }

    let updateData: Partial<Employee> = {
      name: data.name,
      position: data.position,
      department: data.department,
      dateOfJoining: data.dateOfJoining,
      salary: data.salary,
    }

    if(existingEmployee.email !== data.email){
      const emailExists = await Employees.findOne({ email: data.email, _id: { $ne: data._id } })
      if(emailExists){
        logger.warn(`Duplicate email detected during update: ${data.email}`)
        return next(new ValidationError('Email is already associated with another employee.'))
      }
      updateData.email = data.email
    }

    const update = await Employees.updateOne({ _id: data._id }, { $set: updateData })

    if(update.modifiedCount > 0){
      logger.info(`Employee updated successfully: ID ${data._id}`)
      return res.status(200).json('Employee updated successfully')
    }else{
      logger.warn(`No changes made to the employee: ID ${data._id}`)
      return next(new ValidationError('No changes made to the employee.'))
    }
  }catch(error){
    logger.error('Error updating employee:', error)
    return next(new InternalServerError('Server error while updating employee.'))
  }
}



const deleteEmployee = async (req: Request, res: Response, next: NextFunction):Promise<void>=>{
  try{
    const { _id } = req.params
    const deletedEmployee = await Employees.findByIdAndDelete(_id)

    if(!deletedEmployee){
      logger.warn(`Employee not found for deletion: ID ${_id}`)
      return next(new NotFoundError('Employee not found.'))
    }

    logger.info(`Employee deleted successfully: ID ${_id}`)
    res.status(200).json('Employee deleted successfully')
  }catch(error){
    logger.error('Error deleting employee:', error)
    return next(new InternalServerError('Server error while deleting employee.'))
  }
}

export {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
}
