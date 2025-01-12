import mongoose from "mongoose";

export interface Employee{
    _id?:string
    name: string;
    email: string;
    position: string;
    department: mongoose.Types.ObjectId;
    dateOfJoining: Date;
    salary: number;
}

export interface login{
    email: string,
    password: string
}