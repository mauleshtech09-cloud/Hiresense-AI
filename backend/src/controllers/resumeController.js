"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeResume = void 0;
const express_1 = require("express");
const matchEngineService_1 = require("../services/matchEngineService");
const analyzeResume = (req, res) => {
    try {
        const file = req.file;
        const jobRole = req.body.jobRole;
        const isReassess = req.body.isReassess === 'true';
        if (!file || !jobRole) {
            return res.status(400).json({ error: 'Missing file or jobRole' });
        }
        const report = (0, matchEngineService_1.generateReport)(file.originalname, jobRole, isReassess);
        res.json(report);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.analyzeResume = analyzeResume;
//# sourceMappingURL=resumeController.js.map