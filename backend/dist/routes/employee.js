"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../controller/employee");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const employeeRouter = express_1.default.Router();
employeeRouter.post('/addEmployee', authMiddleware_1.default, employee_1.addEmployee);
employeeRouter.get('/getEmployees', authMiddleware_1.default, employee_1.getAllEmployees);
employeeRouter.put('/edit', authMiddleware_1.default, employee_1.updateEmployee);
employeeRouter.delete('/delete/:_id', authMiddleware_1.default, employee_1.deleteEmployee);
exports.default = employeeRouter;
