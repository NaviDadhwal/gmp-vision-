"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const lead_model_1 = require("../modules/leads/lead.model");
class CronService {
    static init() {
        // 08:00 AM IST daily = 02:30 AM UTC daily
        // Cron format: '30 2 * * *'
        node_cron_1.default.schedule('30 2 * * *', async () => {
            console.log('⏰ [Cron] Running daily lead digest at 08:00 AM IST...');
            try {
                const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
                const newLeads = await lead_model_1.LeadModel.find({
                    createdAt: { $gte: yesterday },
                });
                console.log(`📊 [Daily Digest] ${newLeads.length} new leads recorded in past 24 hours`);
            }
            catch (error) {
                console.error('❌ [Cron Error] Failed to process daily digest:', error);
            }
        });
        console.log('⏱️ [Cron] Background jobs scheduled successfully');
    }
}
exports.CronService = CronService;
