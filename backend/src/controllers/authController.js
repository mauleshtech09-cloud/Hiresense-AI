"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const express_1 = require("express");
const memoryDb_1 = require("../models/memoryDb");
const login = (req, res) => {
    const { email } = req.body;
    let user = memoryDb_1.db.findUserByEmail(email);
    if (!user) {
        user = { id: Math.random().toString(36).substr(2, 9), email, name: email.split('@')[0] };
        memoryDb_1.db.users.push(user);
    }
    const token = 'mock-jwt-token-' + user.id;
    res.json({ token, user });
};
exports.login = login;
const register = (req, res) => {
    const { name, email, password, industry, location } = req.body;
    const user = { id: Math.random().toString(36).substr(2, 9), email, name, password, industry, location };
    memoryDb_1.db.users.push(user);
    memoryDb_1.db.organizations.push({
        id: 'org-' + user.id,
        name: name + ' Organization',
        plan: 'Basic',
        scanCount: 0,
        billingCycle: 'monthly'
    });
    res.json({ token: 'mock-jwt-token-' + user.id, user });
};
exports.register = register;
//# sourceMappingURL=authController.js.map