"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planController_1 = require("../controllers/planController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/upgrade', authMiddleware_1.requireAuth, planController_1.upgradePlan);
exports.default = router;
//# sourceMappingURL=planRoutes.js.map