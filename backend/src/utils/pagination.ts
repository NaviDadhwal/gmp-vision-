import { Query, Types } from 'mongoose';

export interface IOffsetPaginationResult<T> {
  success: true;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ICursorPaginationResult<T> {
  success: true;
  data: T[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
    limit: number;
  };
}

/**
 * Mode A: Offset-based Pagination for Admin Management Tables
 */
export async function paginateOffset<T>(
  query: Query<T[], T>,
  countQuery: Query<number, T>,
  page = 1,
  limit = 20
): Promise<IOffsetPaginationResult<T>> {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(100, Math.max(1, limit));
  const skip = (safePage - 1) * safeLimit;

  const [data, total] = await Promise.all([
    query.skip(skip).limit(safeLimit).lean().exec(),
    countQuery.exec(),
  ]);

  const totalPages = Math.ceil(total / safeLimit) || 1;

  return {
    success: true,
    data: data as T[],
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    },
  };
}

/**
 * Mode B: Cursor-based Pagination for Public Feeds & Infinite Scrolling
 */
export async function paginateCursor<T extends { _id: Types.ObjectId }>(
  modelQuery: any,
  cursor: string | null | undefined,
  limit = 12,
  sortField = '_id',
  sortOrder: 1 | -1 = -1
): Promise<ICursorPaginationResult<T>> {
  const safeLimit = Math.min(50, Math.max(1, limit));
  const query = { ...modelQuery };

  if (cursor && Types.ObjectId.isValid(cursor)) {
    const operator = sortOrder === -1 ? '$lt' : '$gt';
    query[sortField] = { [operator]: new Types.ObjectId(cursor) };
  }

  const items = await query.model
    .find(query)
    .sort({ [sortField]: sortOrder })
    .limit(safeLimit + 1)
    .lean()
    .exec();

  const hasMore = items.length > safeLimit;
  const data = hasMore ? items.slice(0, safeLimit) : items;
  const nextCursor = hasMore && data.length > 0 ? (data[data.length - 1]._id as Types.ObjectId).toString() : null;

  return {
    success: true,
    data: data as T[],
    pagination: {
      nextCursor,
      hasMore,
      limit: safeLimit,
    },
  };
}
