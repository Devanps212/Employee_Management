import mongoose from 'mongoose'
import config from '.././config'

export const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://devanps212:6cdhhHsEJhnWLmDE@cluster0.gqhwx.mongodb.net/EmployeeManagement")
        console.log("connected to db")
    }catch(error){
        //throw error after setting global error
        console.log(error)
    }
}

