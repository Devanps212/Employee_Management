"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logDirectory = path_1.default.join(__dirname, '..', 'logs');
if (!fs_1.default.existsSync(logDirectory)) {
    fs_1.default.mkdirSync(logDirectory);
}
const logLevels = {
    levels: {
        info: 0,
        warn: 1,
        error: 2,
        debug: 3,
    },
    colors: {
        info: 'green',
        warn: 'yellow',
        error: 'red',
        debug: 'blue',
    },
};
const logger = winston_1.default.createLogger({
    levels: logLevels.levels,
    transports: [
        new winston_1.default.transports.Console({
            level: 'debug',
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(logDirectory, 'application.log'),
            level: 'info',
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(logDirectory, 'error.log'),
            level: 'error',
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
        }),
    ],
});
winston_1.default.addColors(logLevels.colors);
exports.default = logger;
