"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../controller/admin");
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
adminRouter.post('/login', admin_1.adminLogin);
exports.default = adminRouter;
