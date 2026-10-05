import { Model, Types } from 'mongoose';
import { AppError } from '../middleware/errorHandler';

/**
 * Asserts resource exists and is active.
 * Always throws 404 NOT_FOUND (never 403) to prevent resource enumeration.
 * Follows instructions.md Section 4.4
 */
export async function assertOwnership<T>(
  ModelClass: Model<T>,
  resourceId: string,
  extraFilter: Record<string, any> = {}
): Promise<T> {
  if (!Types.ObjectId.isValid(resourceId)) {
    throw new AppError('Resource not found', 404, 'NOT_FOUND');
  }

  const query: Record<string, any> = {
    _id: new Types.ObjectId(resourceId),
    ...extraFilter,
  };

  const doc = await ModelClass.findOne(query);
  if (!doc) {
    throw new AppError('Resource not found', 404, 'NOT_FOUND');
  }

  return doc as unknown as T;
}
