"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateOffset = paginateOffset;
exports.paginateCursor = paginateCursor;
const mongoose_1 = require("mongoose");
/**
 * Mode A: Offset-based Pagination for Admin Management Tables
 */
async function paginateOffset(query, countQuery, page = 1, limit = 20) {
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
        data: data,
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
async function paginateCursor(modelQuery, cursor, limit = 12, sortField = '_id', sortOrder = -1) {
    const safeLimit = Math.min(50, Math.max(1, limit));
    const query = { ...modelQuery };
    if (cursor && mongoose_1.Types.ObjectId.isValid(cursor)) {
        const operator = sortOrder === -1 ? '$lt' : '$gt';
        query[sortField] = { [operator]: new mongoose_1.Types.ObjectId(cursor) };
    }
    const items = await query.model
        .find(query)
        .sort({ [sortField]: sortOrder })
        .limit(safeLimit + 1)
        .lean()
        .exec();
    const hasMore = items.length > safeLimit;
    const data = hasMore ? items.slice(0, safeLimit) : items;
    const nextCursor = hasMore && data.length > 0 ? data[data.length - 1]._id.toString() : null;
    return {
        success: true,
        data: data,
        pagination: {
            nextCursor,
            hasMore,
            limit: safeLimit,
        },
    };
}
