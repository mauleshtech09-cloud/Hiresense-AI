"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/save', authMiddleware_1.requireAuth, reportController_1.saveReport);
router.get('/history', authMiddleware_1.requireAuth, reportController_1.getHistory);
exports.default = router;
//# sourceMappingURL=reportRoutes.js.map