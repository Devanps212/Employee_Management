"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartment = exports.addDepartment = exports.deleteDepartment = exports.getAllDepartment = void 0;
const department_1 = require("../models/department");
const appError_1 = require("../utils/appError");
const logger_1 = __importDefault(require("../utils/logger"));
const getAllDepartment = async (req, res, next) => {
    try {
        const departments = await department_1.Department.find();
        if (departments.length === 0) {
            logger_1.default.warn('No departments found.');
            return next(new appError_1.NotFoundError('No departments found.'));
        }
        logger_1.default.info('Fetched all departments successfully.');
        res.status(200).json(departments);
    }
    catch (error) {
        logger_1.default.error('Error fetching departments:', error);
        return next(new appError_1.InternalServerError('Internal server error while fetching departments.'));
    }
};
exports.getAllDepartment = getAllDepartment;
const deleteDepartment = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const deletedDepartment = await department_1.Department.findByIdAndDelete(_id);
        if (!deletedDepartment) {
            logger_1.default.warn(`Department not found for ID: ${_id}`);
            return next(new appError_1.NotFoundError('Department not found.'));
        }
        logger_1.default.info(`Department deleted successfully: ID ${_id}`);
        res.status(200).json('Department deleted successfully');
    }
    catch (error) {
        logger_1.default.error('Error deleting department:', error);
        return next(new appError_1.InternalServerError('Internal server error while deleting department.'));
    }
};
exports.deleteDepartment = deleteDepartment;
const addDepartment = async (req, res, next) => {
    try {
        const data = req.body;
        const check = await department_1.Department.findOne({ name: data.name });
        if (check) {
            logger_1.default.warn(`Attempt to add a duplicate department: ${data.name}`);
            return next(new appError_1.ValidationError('Department already exists.'));
        }
        await department_1.Department.create(data);
        logger_1.default.info(`Department added successfully: ${data.name}`);
        res.status(201).json('Department added successfully');
    }
    catch (error) {
        logger_1.default.error('Error adding department:', error);
        return next(new appError_1.InternalServerError('Internal server error while adding department.'));
    }
};
exports.addDepartment = addDepartment;
const updateDepartment = async (req, res, next) => {
    try {
        const updatedData = req.body;
        const department = await department_1.Department.findById(updatedData._id);
        if (!department) {
            logger_1.default.warn(`Department not found for update: ID ${updatedData._id}`);
            return next(new appError_1.NotFoundError('Department not found.'));
        }
        let updateData = {
            description: updatedData.description,
        };
        if (department.name !== updatedData.name) {
            const nameExists = await department_1.Department.findOne({ name: updatedData.name, _id: { $ne: updatedData._id } });
            if (nameExists) {
                logger_1.default.warn(`Duplicate name detected during update: ${updatedData.name}`);
                return next(new appError_1.ValidationError('Name is already associated with another department.'));
            }
            updateData.name = updatedData.name;
        }
        department.set(updateData);
        await department.save();
        logger_1.default.info(`Department updated successfully: ID ${updatedData._id}`);
        res.status(200).json('Department updated successfully');
    }
    catch (error) {
        logger_1.default.error('Error updating department:', error);
        return next(new appError_1.InternalServerError('Internal server error while updating department.'));
    }
};
exports.updateDepartment = updateDepartment;
