"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnosesRoute_1 = __importDefault(require("./routes/diagnosesRoute"));
const patientsRoute_1 = __importDefault(require("./routes/patientsRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 3001; //this is the port in patientor's request url
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send("pong");
});
app.use('/api/diagnoses', diagnosesRoute_1.default);
app.use('/api/patients', patientsRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
