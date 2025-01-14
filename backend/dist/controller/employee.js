"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getAllEmployees = exports.addEmployee = void 0;
const employee_1 = require("../models/employee");
const appError_1 = require("../utils/appError");
const logger_1 = __importDefault(require("../utils/logger"));
const addEmployee = async (req, res, next) => {
    try {
        const data = req.body;
        const checkExist = await employee_1.Employees.findOne({ email: data.email });
        if (checkExist) {
            logger_1.default.warn(`Attempt to add duplicate employee with email: ${data.email}`);
            return next(new appError_1.ValidationError('Employee already exists with this email.'));
        }
        await employee_1.Employees.create(data);
        logger_1.default.info(`Employee added successfully: ${data.email}`);
        return res.status(201).json('Employee added successfully.');
    }
    catch (error) {
        logger_1.default.error('Error adding employee:', error);
        return next(new appError_1.InternalServerError('Server error while adding employee.'));
    }
};
exports.addEmployee = addEmployee;
const getAllEmployees = async (req, res, next) => {
    try {
        const allEmployees = await employee_1.Employees.find().populate('department');
        if (allEmployees.length === 0) {
            logger_1.default.warn('No employees found.');
            return next(new appError_1.NotFoundError('No employees found.'));
        }
        logger_1.default.info('Fetched all employees successfully.');
        res.status(200).json(allEmployees);
    }
    catch (error) {
        logger_1.default.error('Error fetching employees:', error);
        return next(new appError_1.InternalServerError('Server error while fetching employees.'));
    }
};
exports.getAllEmployees = getAllEmployees;
const updateEmployee = async (req, res, next) => {
    try {
        const data = req.body;
        if (!data._id) {
            logger_1.default.warn('Employee ID is missing in the request.');
            return next(new appError_1.ValidationError('Employee ID is required.'));
        }
        const existingEmployee = await employee_1.Employees.findById(data._id);
        if (!existingEmployee) {
            logger_1.default.warn(`Employee not found for update: ID ${data._id}`);
            return next(new appError_1.NotFoundError('Employee not found.'));
        }
        let updateData = {
            name: data.name,
            position: data.position,
            department: data.department,
            dateOfJoining: data.dateOfJoining,
            salary: data.salary,
        };
        if (existingEmployee.email !== data.email) {
            const emailExists = await employee_1.Employees.findOne({ email: data.email, _id: { $ne: data._id } });
            if (emailExists) {
                logger_1.default.warn(`Duplicate email detected during update: ${data.email}`);
                return next(new appError_1.ValidationError('Email is already associated with another employee.'));
            }
            updateData.email = data.email;
        }
        const update = await employee_1.Employees.updateOne({ _id: data._id }, { $set: updateData });
        if (update.modifiedCount > 0) {
            logger_1.default.info(`Employee updated successfully: ID ${data._id}`);
            return res.status(200).json('Employee updated successfully');
        }
        else {
            logger_1.default.warn(`No changes made to the employee: ID ${data._id}`);
            return next(new appError_1.ValidationError('No changes made to the employee.'));
        }
    }
    catch (error) {
        logger_1.default.error('Error updating employee:', error);
        return next(new appError_1.InternalServerError('Server error while updating employee.'));
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const deletedEmployee = await employee_1.Employees.findByIdAndDelete(_id);
        if (!deletedEmployee) {
            logger_1.default.warn(`Employee not found for deletion: ID ${_id}`);
            return next(new appError_1.NotFoundError('Employee not found.'));
        }
        logger_1.default.info(`Employee deleted successfully: ID ${_id}`);
        res.status(200).json('Employee deleted successfully');
    }
    catch (error) {
        logger_1.default.error('Error deleting employee:', error);
        return next(new appError_1.InternalServerError('Server error while deleting employee.'));
    }
};
exports.deleteEmployee = deleteEmployee;
