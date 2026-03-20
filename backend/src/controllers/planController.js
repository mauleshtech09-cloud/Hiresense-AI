"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradePlan = void 0;
const express_1 = require("express");
const memoryDb_1 = require("../models/memoryDb");
const upgradePlan = (req, res) => {
    const { plan, billingCycle } = req.body;
    // For mock, just grab the first org or the user's org
    if (memoryDb_1.db.organizations.length > 0) {
        memoryDb_1.db.organizations[0].plan = plan;
        memoryDb_1.db.organizations[0].billingCycle = billingCycle;
    }
    res.json({ message: 'Plan upgraded successfully', org: memoryDb_1.db.organizations[0] });
};
exports.upgradePlan = upgradePlan;
//# sourceMappingURL=planController.js.map