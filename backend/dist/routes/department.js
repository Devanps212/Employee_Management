"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const department_1 = require("../controller/department");
const departmentRouter = express_1.default.Router();
departmentRouter.get('/getDepartments', authMiddleware_1.default, department_1.getAllDepartment);
departmentRouter.post('/addDepartment', authMiddleware_1.default, department_1.addDepartment);
departmentRouter.put('/updateDepartment', authMiddleware_1.default, department_1.updateDepartment);
departmentRouter.delete('/deleteEmployee/:_id', authMiddleware_1.default, department_1.deleteDepartment);
exports.default = departmentRouter;
