import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { Admin } from '../models/admin';
import config from '../config';
import { NotFoundError, InternalServerError, ValidationError } from '../utils/appError';
import logger from '../utils/logger';


const adminLogin = async(req: Request, res: Response, next: NextFunction):Promise<Response | any>=>{
  try{
    const { Email, Password } = req.body

    logger.info(`Admin login attempt with email: ${Email}`)
    const admin = await Admin.findOne({ email: Email })

    if(!admin){
      logger.warn(`Admin not found for email: ${Email}`)
      return next(new NotFoundError('Admin not found.'))
    }

    const passCheck = await bcrypt.compare(Password, admin.password)

    if(passCheck){
      const token = jwt.sign(
        { adminId: admin._id, email: admin.email },
        config.SECRET_KEY as string,
        { expiresIn: '1h' }
      )

      logger.info(`Admin login successful for email: ${Email}`)
      return res.status(200).json({ message: 'Login successful', token })
    }

    logger.warn(`Incorrect password attempt for email: ${Email}`)
    return next(new ValidationError('Incorrect password.'))
  }catch(error){
    logger.error('Error during admin login:', error)
    return next(new InternalServerError('Internal server error during admin login.'))
  }
}

export { adminLogin }
