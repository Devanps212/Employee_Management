import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if(!authHeader ||typeof authHeader !== 'string' || !authHeader.startsWith('Bearer '))
    throw new Error('User is not authorized')
    
    const token = authHeader.substring(7)
    
    if(!token){
        throw new Error("No token provided!")
    }

    jwt.verify(token, config.SECRET_KEY!, (err) => {
        if(err){
            throw new Error(err instanceof Error ? err.message : 'Invalid or expired token')
        }
        next()
    })
}

export default verifyToken
