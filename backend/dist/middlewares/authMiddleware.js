"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer '))
        throw new Error('User is not authorized');
    const token = authHeader.substring(7);
    if (!token) {
        throw new Error("No token provided!");
    }
    jsonwebtoken_1.default.verify(token, config_1.default.SECRET_KEY, (err) => {
        if (err) {
            throw new Error(err instanceof Error ? err.message : 'Invalid or expired token');
        }
        next();
    });
};
exports.default = verifyToken;
