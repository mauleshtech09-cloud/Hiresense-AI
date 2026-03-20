"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const resumeRoutes_1 = __importDefault(require("./routes/resumeRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const planRoutes_1 = __importDefault(require("./routes/planRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/resume', resumeRoutes_1.default);
app.use('/api/report', reportRoutes_1.default);
app.use('/api/profile', profileRoutes_1.default);
app.use('/api/plan', planRoutes_1.default);
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`HireSense AI Backend running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map