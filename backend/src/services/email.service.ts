import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { ILead } from '../modules/leads/lead.model';

function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeSubject(str: string | undefined | null): string {
  if (!str) return '';
  return String(str).replace(/[\r\n\t]+/g, ' ').trim();
}

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
      const cleanCompany = sanitizeSubject(lead.companyName);
      const cleanContact = sanitizeSubject(lead.contactName);
      const cleanSource = sanitizeSubject(lead.source).toUpperCase();
      const subject = `[GMP VISION Inquiry] New ${cleanSource}: ${cleanCompany} - ${cleanContact}`;

      const safeCompany = escapeHtml(lead.companyName);
      const safeContact = escapeHtml(lead.contactName);
      const safeDesignation = lead.designation ? `(${escapeHtml(lead.designation)})` : '';
      const safePhone = escapeHtml(lead.phone);
      const safeEmail = escapeHtml(lead.email);
      const safeLocation = escapeHtml(lead.location) || 'Not specified';
      const safeSource = escapeHtml(lead.source);
      const safeDivisions = escapeHtml(lead.divisions.join(', ')) || 'General';
      const safeDimensions = lead.roomDimensions ? `<p><strong>Cleanroom Dimensions:</strong> ${escapeHtml(lead.roomDimensions)}</p>` : '';
      const safeCfm = lead.cfm ? `<p><strong>Airflow (CFM):</strong> ${escapeHtml(String(lead.cfm))}</p>` : '';
      const safeMessage = escapeHtml(lead.message);

      const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #ea580c; padding-bottom: 8px;">New Lead Received — GMP VISION</h2>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Contact:</strong> ${safeContact} ${safeDesignation}</p>
          <p><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Location:</strong> ${safeLocation}</p>
          <p><strong>Source:</strong> ${safeSource}</p>
          <p><strong>Divisions of Interest:</strong> ${safeDivisions}</p>
          ${safeDimensions}
          ${safeCfm}
          <div style="background: #f8fafc; padding: 12px; border-left: 4px solid #ea580c; margin-top: 16px;">
            <strong>Message / Scope:</strong>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
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
