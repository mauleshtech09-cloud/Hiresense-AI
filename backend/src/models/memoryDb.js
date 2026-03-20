"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// In-Memory DB Objects
class MemoryDB {
    users = [];
    organizations = [];
    reports = [];
    constructor() {
        // Preload some mock data as requested
        this.users.push({ id: 'u1', email: 'demo@hiresense.ai', name: 'Demo User' });
        this.organizations.push({ id: 'org1', name: 'Tech Innovations Inc', plan: 'Pro', scanCount: 0, billingCycle: 'monthly' });
    }
    findUserByEmail(email) {
        return this.users.find(u => u.email === email);
    }
}
exports.db = new MemoryDB();
//# sourceMappingURL=memoryDb.js.map