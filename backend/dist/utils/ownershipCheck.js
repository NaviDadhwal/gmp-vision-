"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertOwnership = assertOwnership;
const mongoose_1 = require("mongoose");
const errorHandler_1 = require("../middleware/errorHandler");
/**
 * Asserts resource exists and is active.
 * Always throws 404 NOT_FOUND (never 403) to prevent resource enumeration.
 * Follows instructions.md Section 4.4
 */
async function assertOwnership(ModelClass, resourceId, extraFilter = {}) {
    if (!mongoose_1.Types.ObjectId.isValid(resourceId)) {
        throw new errorHandler_1.AppError('Resource not found', 404, 'NOT_FOUND');
    }
    const query = {
        _id: new mongoose_1.Types.ObjectId(resourceId),
        ...extraFilter,
    };
    const doc = await ModelClass.findOne(query);
    if (!doc) {
        throw new errorHandler_1.AppError('Resource not found', 404, 'NOT_FOUND');
    }
    return doc;
}
