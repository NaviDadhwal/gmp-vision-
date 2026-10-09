import type { Request, Response } from 'express';
import { app } from '../src/app';
import { connectDB } from '../src/config/db';

export default async function handler(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
  } catch (err: any) {
    console.error('⚠️ [Serverless MongoDB] Connection warning:', err?.message || err);
  }

  return new Promise((resolve) => {
    res.on('finish', resolve);
    res.on('close', resolve);
    app(req, res);
  });
}
