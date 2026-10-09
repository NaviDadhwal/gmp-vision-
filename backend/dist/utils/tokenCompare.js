"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeCompare = safeCompare;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Timing-safe comparison wrapper to prevent timing attacks on token hashes.
 * Follows instructions.md Section 4.5
 */
function safeCompare(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string')
        return false;
    if (a.length !== b.length)
        return false;
    return crypto_1.default.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
