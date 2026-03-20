"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = exports.saveReport = void 0;
const express_1 = require("express");
const memoryDb_1 = require("../models/memoryDb");
const saveReport = (req, res) => {
    const report = req.body;
    memoryDb_1.db.reports.push(report);
    res.json({ message: 'Report saved', report });
};
exports.saveReport = saveReport;
const getHistory = (req, res) => {
    res.json(memoryDb_1.db.reports);
};
exports.getHistory = getHistory;
//# sourceMappingURL=reportController.js.map