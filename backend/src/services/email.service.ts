import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { ILead } from '../modules/leads/lead.model';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: env.SMTP_HOST || 'smtp.gmail.com',
    port: env.SMTP_PORT || 465,
    secure: (env.SMTP_PORT || 465) === 465,
    auth: {
      user: env.SMTP_USER || '',
      pass: env.SMTP_PASS || '',
    },
  });

  static async sendNewLeadAlert(lead: ILead): Promise<void> {
    if (!env.SMTP_USER || !env.SMTP_PASS || env.SMTP_PASS === 'mock_smtp_pass') {
      console.log(`📧 [Mock Email] New lead notification for ${lead.companyName} (${lead.contactName}) - ${lead.source}`);
      return;
    }

    try {
      const subject = `[GMP VISION Inquiry] New ${lead.source.toUpperCase()}: ${lead.companyName} - ${lead.contactName}`;
      const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #ea580c; padding-bottom: 8px;">New Lead Received — GMP VISION</h2>
          <p><strong>Company:</strong> ${lead.companyName}</p>
          <p><strong>Contact:</strong> ${lead.contactName} ${lead.designation ? `(${lead.designation})` : ''}</p>
          <p><strong>Phone:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>
          <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
          <p><strong>Location:</strong> ${lead.location || 'Not specified'}</p>
          <p><strong>Source:</strong> ${lead.source}</p>
          <p><strong>Divisions of Interest:</strong> ${lead.divisions.join(', ') || 'General'}</p>
          ${lead.roomDimensions ? `<p><strong>Cleanroom Dimensions:</strong> ${lead.roomDimensions}</p>` : ''}
          ${lead.cfm ? `<p><strong>Airflow (CFM):</strong> ${lead.cfm}</p>` : ''}
          <div style="background: #f8fafc; padding: 12px; border-left: 4px solid #ea580c; margin-top: 16px;">
            <strong>Message / Scope:</strong>
            <p style="white-space: pre-wrap;">${lead.message}</p>
          </div>
          <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Received via GMP VISION Web Platform.</p>
        </div>
      `;

      await this.transporter.sendMail({
        from: `"${env.EMAIL_FROM}" <${env.SMTP_USER}>`,
        to: env.ADMIN_NOTIFICATION_EMAIL,
        subject,
        html,
      });

      console.log(`📧 [Email Alert Sent] Notification delivered to ${env.ADMIN_NOTIFICATION_EMAIL}`);
    } catch (error) {
      console.error('⚠️ [Email Alert Failed] Could not dispatch lead alert email:', error);
    }
  }
}
