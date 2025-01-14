import mongoose from 'mongoose'
import config from '.././config'

export const connectDB = async()=>{
    try{
        await mongoose.connect(config.MONGO_URL!)
        console.log("connected to db")
    }catch(error){
        //throw error after setting global error
        console.log(error)
    }
}

