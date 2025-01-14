"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://devanps212:6cdhhHsEJhnWLmDE@cluster0.gqhwx.mongodb.net/EmployeeManagement");
        console.log("connected to db");
    }
    catch (error) {
        //throw error after setting global error
        console.log(error);
    }
};
exports.connectDB = connectDB;
