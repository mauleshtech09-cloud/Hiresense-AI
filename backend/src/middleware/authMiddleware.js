"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const express_1 = require("express");
const requireAuth = (req, res, next) => {
    // Simple mock auth check picking up a hardcoded header or just passing through
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Simulate decoding token to get user info
    req.user = { id: 'u1', email: 'demo@hiresense.ai' };
    next();
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=authMiddleware.js.map