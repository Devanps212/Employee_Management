import { Department } from '../models/department';
import { Request, Response, NextFunction } from 'express';
import { Departments } from '../types/departmentInterface';
import { NotFoundError, ValidationError, InternalServerError } from '../utils/appError';
import logger from '../utils/logger'

const getAllDepartment = async (req: Request, res: Response, next: NextFunction):Promise<void>=>{
  try{
    const departments = await Department.find()
    if(departments.length === 0){
      logger.warn('No departments found.')
      return next(new NotFoundError('No departments found.'))
    }
    logger.info('Fetched all departments successfully.')
    res.status(200).json(departments)
  }catch(error){
    logger.error('Error fetching departments:', error)
    return next(new InternalServerError('Internal server error while fetching departments.'))
  }
}

const deleteDepartment = async (req: Request, res: Response, next: NextFunction):Promise<void>=>{
  try{
    const { _id } = req.params
    const deletedDepartment = await Department.findByIdAndDelete(_id)

    if(!deletedDepartment){
      logger.warn(`Department not found for ID: ${_id}`)
      return next(new NotFoundError('Department not found.'))
    }

    logger.info(`Department deleted successfully: ID ${_id}`)
    res.status(200).json('Department deleted successfully')
  }catch(error){
    logger.error('Error deleting department:', error)
    return next(new InternalServerError('Internal server error while deleting department.'))
  }
}

const addDepartment = async (req: Request, res: Response, next: NextFunction):Promise<void>=>{
  try{
    const data: Departments = req.body

    const check = await Department.findOne({ name: data.name })
    if(check){
      logger.warn(`Attempt to add a duplicate department: ${data.name}`)
      return next(new ValidationError('Department already exists.'))
    }

    await Department.create(data)
    logger.info(`Department added successfully: ${data.name}`)
    res.status(201).json('Department added successfully')
  }catch(error){
    logger.error('Error adding department:', error)
    return next(new InternalServerError('Internal server error while adding department.'))
  }
}

const updateDepartment = async (req: Request, res: Response, next: NextFunction):Promise<void>=>{
  try{
    const updatedData: Departments = req.body
    const department = await Department.findById(updatedData._id)

    if(!department){
      logger.warn(`Department not found for update: ID ${updatedData._id}`)
      return next(new NotFoundError('Department not found.'))
    }

    let updateData: Partial<Departments> = {
      description: updatedData.description,
    }

    if(department.name !== updatedData.name){
      const nameExists = await Department.findOne({ name: updatedData.name, _id: { $ne: updatedData._id } })
      if(nameExists){
        logger.warn(`Duplicate name detected during update: ${updatedData.name}`)
        return next(new ValidationError('Name is already associated with another department.'))
      }
      updateData.name = updatedData.name
    }

    department.set(updateData)
    await department.save()
    logger.info(`Department updated successfully: ID ${updatedData._id}`)
    res.status(200).json('Department updated successfully')
  }catch(error){
    logger.error('Error updating department:', error)
    return next(new InternalServerError('Internal server error while updating department.'))
  }
}


export {
  getAllDepartment,
  deleteDepartment,
  addDepartment,
  updateDepartment,
}
