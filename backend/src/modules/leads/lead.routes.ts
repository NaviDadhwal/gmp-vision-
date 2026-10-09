import { Request, Response, NextFunction, Router } from 'express';
import { LeadModel } from './lead.model';
import { AppError } from '../../middleware/errorHandler';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import { createLeadSchema, updateLeadStatusSchema } from './lead.schema';
import { paginateOffset } from '../../utils/pagination';
import { EmailService } from '../../services/email.service';

export class LeadController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lead = await LeadModel.create(req.body);

      // Async email alert without blocking response
      EmailService.sendNewLeadAlert(lead).catch((e) => console.error(e));

      res.status(201).json({
        success: true,
        data: {
          id: lead._id,
          message: 'Inquiry received. A GMP VISION engineering consultant will review your specifications.',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        status,
        source,
        division,
        startDate,
        endDate,
        page = '1',
        limit = '20',
      } = req.query as Record<string, string>;

      const filter: Record<string, any> = {};

      if (status) filter.status = status;
      if (source) filter.source = source;
      if (division) filter.divisions = division;

      if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) filter.createdAt.$lte = new Date(endDate);
      }

      const query = LeadModel.find(filter).sort({ createdAt: -1 });
      const countQuery = LeadModel.countDocuments(filter);

      const result = await paginateOffset(query, countQuery, parseInt(page, 10), parseInt(limit, 10));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lead = await LeadModel.findById(req.params.id);
      if (!lead) {
        throw new AppError('Lead not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: lead,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, notes } = req.body;
      const updateData: Record<string, any> = { status };
      if (typeof notes === 'string') updateData.notes = notes;

      const lead = await LeadModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!lead) {
        throw new AppError('Lead not found.', 404, 'NOT_FOUND');
      }

      res.status(200).json({
        success: true,
        data: lead,
      });
    } catch (error) {
      next(error);
    }
  }

  static async exportCSV(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const leads = await LeadModel.find().sort({ createdAt: -1 });

      const headers = [
        'ID',
        'Date',
        'Company',
        'Contact Name',
        'Phone',
        'Email',
        'Source',
        'Status',
        'Divisions',
        'Dimensions',
        'CFM',
        'Message',
      ];

      const escapeCSV = (val: any) => {
        let str = String(val ?? '');
        // Prevent CSV Formula Injection (CWE-1236)
        if (/^[=+\-@\t\r]/.test(str)) {
          str = `'${str}`;
        }
        return `"${str.replace(/"/g, '""')}"`;
      };

      const rows = leads.map((l) => [
        escapeCSV(l._id),
        escapeCSV(l.createdAt.toISOString()),
        escapeCSV(l.companyName),
        escapeCSV(l.contactName),
        escapeCSV(l.phone),
        escapeCSV(l.email),
        escapeCSV(l.source),
        escapeCSV(l.status),
        escapeCSV(l.divisions.join('; ')),
        escapeCSV(l.roomDimensions),
        escapeCSV(l.cfm),
        escapeCSV(l.message),
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="gmp_vision_leads_${Date.now()}.csv"`);
      res.status(200).send(csvContent);
    } catch (error) {
      next(error);
    }
  }
}

export const leadRouter = Router();

leadRouter.post('/', validate({ body: createLeadSchema }), LeadController.create);
leadRouter.get('/', requireAuth, roleGuard(['admin', 'superadmin']), LeadController.getAll);
leadRouter.get('/export', requireAuth, roleGuard(['admin', 'superadmin']), LeadController.exportCSV);
leadRouter.get('/:id', requireAuth, roleGuard(['admin', 'superadmin']), LeadController.getById);
leadRouter.patch('/:id/status', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: updateLeadStatusSchema }), LeadController.updateStatus);
leadRouter.patch('/:id', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: updateLeadStatusSchema }), LeadController.updateStatus);
