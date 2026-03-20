"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const express_1 = require("express");
const memoryDb_1 = require("../models/memoryDb");
const getProfile = (req, res) => {
    const userId = req.user.id;
    const user = memoryDb_1.db.users.find(u => u.id === userId);
    res.json(user || {});
};
exports.getProfile = getProfile;
const updateProfile = (req, res) => {
    const userId = req.user.id;
    const userIndex = memoryDb_1.db.users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        memoryDb_1.db.users[userIndex] = { ...memoryDb_1.db.users[userIndex], ...req.body };
        res.json(memoryDb_1.db.users[userIndex]);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=profileController.js.map