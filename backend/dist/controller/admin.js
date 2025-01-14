"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = require("../models/admin");
const appError_1 = require("../utils/appError");
const logger_1 = __importDefault(require("../utils/logger"));
const adminLogin = async (req, res, next) => {
    try {
        const { Email, Password } = req.body;
        logger_1.default.info(`Admin login attempt with email: ${Email}`);
        const admin = await admin_1.Admin.findOne({ email: Email });
        if (!admin) {
            logger_1.default.warn(`Admin not found for email: ${Email}`);
            return next(new appError_1.NotFoundError('Admin not found.'));
        }
        const passCheck = await bcrypt_1.default.compare(Password, admin.password);
        if (passCheck) {
            const token = jsonwebtoken_1.default.sign({ adminId: admin._id, email: admin.email }, "SECR3TK3Y", { expiresIn: '1h' });
            logger_1.default.info(`Admin login successful for email: ${Email}`);
            return res.status(200).json({ message: 'Login successful', token });
        }
        logger_1.default.warn(`Incorrect password attempt for email: ${Email}`);
        return next(new appError_1.ValidationError('Incorrect password.'));
    }
    catch (error) {
        logger_1.default.error('Error during admin login:', error);
        return next(new appError_1.InternalServerError('Internal server error during admin login.'));
    }
};
exports.adminLogin = adminLogin;
