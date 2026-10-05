import { z } from 'zod';

export const createLeadSchema = z.object({
  companyName: z.string().min(1).max(200).default('Direct WhatsApp Visitor'),
  contactName: z.string().min(1).max(100).default('WhatsApp Lead'),
  designation: z.string().max(100).optional().default(''),
  email: z.string().email('Valid email required').or(z.literal('')).default('inquiry@placeholder.gmpvision.com'),
  phone: z.string().min(8).max(25),
  location: z.string().max(200).optional().default(''),
  projectType: z.array(z.string()).default(['General Turnkey Inquiry']),
  message: z.string().min(1).max(3000),
  divisions: z.array(z.string()).optional().default([]),
  roomDimensions: z.string().max(100).optional().default(''),
  cfm: z.number().positive().optional().nullable(),
  targetDate: z.string().max(50).optional().default(''),
  source: z.enum(['rfq_form', 'contact_form', 'whatsapp']),
  referrerUrl: z.string().optional().default(''),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'quoted', 'converted', 'closed']),
  notes: z.string().optional(),
});
