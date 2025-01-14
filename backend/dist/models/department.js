"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const departmentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
exports.Department = mongoose_1.default.model('Department', departmentSchema);
