import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Admin } from '../models/admin';
import config from '../config';

const adminLogin = async(req: Request, res: Response): Promise<Response>=>{
  const {Email, Password} = req.body
  const admin = await Admin.findOne({ email: Email })

  console.log(admin)

  if(!admin){
    return res.status(404).json({ message: 'Admin not found' })
  }
  

  const passCheck = await bcrypt.compare(Password, admin.password)

  if(passCheck){
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      config.SECRET_KEY as string,
      { expiresIn: '1h' }
    )

    return res.status(200).json({ message: 'Login successful', token })
  }

  return res.status(401).json({ message: 'Incorrect password' })
}

export {
    adminLogin
}
