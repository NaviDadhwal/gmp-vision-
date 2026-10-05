import cron from 'node-cron';
import { LeadModel } from '../modules/leads/lead.model';
import { env } from '../config/env';

export class CronService {
  static init(): void {
    // 08:00 AM IST daily = 02:30 AM UTC daily
    // Cron format: '30 2 * * *'
    cron.schedule('30 2 * * *', async () => {
      console.log('⏰ [Cron] Running daily lead digest at 08:00 AM IST...');
      try {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const newLeads = await LeadModel.find({
          createdAt: { $gte: yesterday },
        });

        console.log(`📊 [Daily Digest] ${newLeads.length} new leads recorded in past 24 hours`);
      } catch (error) {
        console.error('❌ [Cron Error] Failed to process daily digest:', error);
      }
    });

    console.log('⏱️ [Cron] Background jobs scheduled successfully');
  }
}
