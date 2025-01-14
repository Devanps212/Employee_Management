"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const errorHandling_1 = __importDefault(require("./middlewares/errorHandling"));
const config_1 = __importDefault(require("./config"));
const admin_1 = __importDefault(require("./routes/admin"));
const employee_1 = __importDefault(require("./routes/employee"));
const department_1 = __importDefault(require("./routes/department"));
const PORT = config_1.default.PORT || 5000;
const app = (0, express_1.default)();
const options = {
    origin: config_1.default.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: [
        "Cross-Origin-Opener-Policy",
        "Cross-Origin-Resource-Policy",
        "Access-Control-Allow-Origin",
    ],
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(options));
(0, db_1.connectDB)();
app.use('/', admin_1.default);
app.use('/employee', employee_1.default);
app.use('/department', department_1.default);
app.use(errorHandling_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
app.listen(PORT, () => {
    console.log(`server listening to PORT ${PORT}`);
});
