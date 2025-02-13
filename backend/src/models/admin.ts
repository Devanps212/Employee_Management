import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true 
    },
    password: { 
      type: String, 
      required: true 
    }
  }, { timestamps: true })
  
export const Admin = mongoose.model('Admin', adminSchema)