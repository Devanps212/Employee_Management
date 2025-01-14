"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employees = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const employeeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
        min: [0, 'Salary must be a positive number'],
    },
}, { timestamps: true });
exports.Employees = mongoose_1.default.model('Employee', employeeSchema);
